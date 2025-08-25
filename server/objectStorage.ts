import { Storage, File } from "@google-cloud/storage";
import { Response } from "express";
import { randomUUID } from "crypto";

const REPLIT_SIDECAR_ENDPOINT = "http://127.0.0.1:1106";

// The object storage client is used to interact with the object storage service.
export const objectStorageClient = new Storage({
  credentials: {
    audience: "replit",
    subject_token_type: "access_token",
    token_url: `${REPLIT_SIDECAR_ENDPOINT}/token`,
    type: "external_account",
    credential_source: {
      url: `${REPLIT_SIDECAR_ENDPOINT}/credential`,
      format: {
        type: "json",
        subject_token_field_name: "access_token",
      },
    },
    universe_domain: "googleapis.com",
  },
  projectId: "",
});

export class ObjectNotFoundError extends Error {
  constructor() {
    super("Object not found");
    this.name = "ObjectNotFoundError";
    Object.setPrototypeOf(this, ObjectNotFoundError.prototype);
  }
}

// The object storage service is used to interact with the object storage service.
export class ObjectStorageService {
  constructor() {}

  // Gets the public object search paths.
  getPublicObjectSearchPaths(): Array<string> {
    const pathsStr = process.env.PUBLIC_OBJECT_SEARCH_PATHS || "";
    const paths = Array.from(
      new Set(
        pathsStr
          .split(",")
          .map((path) => path.trim())
          .filter((path) => path.length > 0)
      )
    );
    if (paths.length === 0) {
      throw new Error(
        "PUBLIC_OBJECT_SEARCH_PATHS not set. Create a bucket in 'Object Storage' " +
          "tool and set PUBLIC_OBJECT_SEARCH_PATHS env var (comma-separated paths)."
      );
    }
    return paths;
  }

  // Search for a public object from the search paths.
  async searchPublicObject(filePath: string): Promise<File | null> {
    for (const searchPath of this.getPublicObjectSearchPaths()) {
      const fullPath = `${searchPath}/${filePath}`;

      // Full path format: /<bucket_name>/<object_name>
      const { bucketName, objectName } = parseObjectPath(fullPath);
      const bucket = objectStorageClient.bucket(bucketName);
      const file = bucket.file(objectName);

      // Check if file exists
      const [exists] = await file.exists();
      if (exists) {
        return file;
      }
    }

    return null;
  }

  // Downloads an object to the response.
  async downloadObject(file: File, res: Response, cacheTtlSec: number = 3600) {
    try {
      // Get file metadata
      const [metadata] = await file.getMetadata();
      
      // Set appropriate headers
      res.set({
        "Content-Type": metadata.contentType || "application/octet-stream",
        "Content-Length": metadata.size,
        "Cache-Control": `public, max-age=${cacheTtlSec}`,
      });

      // Stream the file to the response
      const stream = file.createReadStream();

      stream.on("error", (err) => {
        console.error("Stream error:", err);
        if (!res.headersSent) {
          res.status(500).json({ error: "Error streaming file" });
        }
      });

      stream.pipe(res);
    } catch (error) {
      console.error("Error downloading file:", error);
      if (!res.headersSent) {
        res.status(500).json({ error: "Error downloading file" });
      }
    }
  }

  // List all files in the public directory
  async listPublicFiles(): Promise<string[]> {
    const files: string[] = [];
    for (const searchPath of this.getPublicObjectSearchPaths()) {
      const { bucketName, objectName } = parseObjectPath(searchPath);
      const bucket = objectStorageClient.bucket(bucketName);
      
      const [fileList] = await bucket.getFiles({
        prefix: objectName + '/',
      });
      
      fileList.forEach(file => {
        const relativePath = file.name.replace(objectName + '/', '');
        if (relativePath && !relativePath.endsWith('/')) {
          files.push(relativePath);
        }
      });
    }
    return files;
  }

  // Get upload URL for public files
  async getPublicUploadURL(filePath: string): Promise<string> {
    const publicSearchPaths = this.getPublicObjectSearchPaths();
    if (publicSearchPaths.length === 0) {
      throw new Error("No public search paths configured");
    }
    
    // Use the first public search path
    const fullPath = `${publicSearchPaths[0]}/${filePath}`;
    const { bucketName, objectName } = parseObjectPath(fullPath);
    
    return await signObjectURL({
      bucketName,
      objectName,
      method: "PUT",
      ttlSec: 900,
    });
  }

  // Upload file directly to public storage
  async uploadPublicFile(filePath: string, fileBuffer: Buffer, contentType: string = 'application/octet-stream'): Promise<void> {
    const publicSearchPaths = this.getPublicObjectSearchPaths();
    if (publicSearchPaths.length === 0) {
      throw new Error("No public search paths configured");
    }
    
    // Use the first public search path
    const fullPath = `${publicSearchPaths[0]}/${filePath}`;
    const { bucketName, objectName } = parseObjectPath(fullPath);
    const bucket = objectStorageClient.bucket(bucketName);
    const file = bucket.file(objectName);
    
    await file.save(fileBuffer, {
      metadata: {
        contentType,
      },
    });
  }

  // Get upload URL for object entity (simplified for public uploads)
  async getObjectEntityUploadURL(): Promise<string> {
    // For public uploads, we'll need a different implementation
    // This is a placeholder that should be implemented based on your needs
    throw new Error("Upload functionality not implemented for public storage");
  }

  // Delete a file from public storage
  async deletePublicFile(filePath: string): Promise<boolean> {
    try {
      for (const searchPath of this.getPublicObjectSearchPaths()) {
        const fullPath = `${searchPath}/${filePath}`;
        const { bucketName, objectName } = parseObjectPath(fullPath);
        const bucket = objectStorageClient.bucket(bucketName);
        const file = bucket.file(objectName);
        
        // Check if file exists first
        const [exists] = await file.exists();
        if (exists) {
          await file.delete();
          console.log(`Deleted file: ${filePath}`);
          return true;
        }
      }
      return false;
    } catch (error) {
      console.error(`Error deleting file ${filePath}:`, error);
      return false;
    }
  }

  // Batch delete files from public storage
  async deleteMultiplePublicFiles(filePaths: string[]): Promise<{success: number, failed: number}> {
    let success = 0;
    let failed = 0;
    
    for (const filePath of filePaths) {
      const deleted = await this.deletePublicFile(filePath);
      if (deleted) {
        success++;
      } else {
        failed++;
      }
    }
    
    return { success, failed };
  }

  // Normalize object entity path
  normalizeObjectEntityPath(rawPath: string): string {
    // Simple normalization for public files
    if (rawPath.startsWith('/public-objects/')) {
      return rawPath;
    }
    if (rawPath.startsWith('http')) {
      // Extract filename from URL
      const url = new URL(rawPath);
      return url.pathname;
    }
    return rawPath;
  }
}

function parseObjectPath(path: string): {
  bucketName: string;
  objectName: string;
} {
  if (!path.startsWith("/")) {
    path = `/${path}`;
  }
  const pathParts = path.split("/");
  if (pathParts.length < 3) {
    throw new Error("Invalid path: must contain at least a bucket name");
  }

  const bucketName = pathParts[1];
  const objectName = pathParts.slice(2).join("/");

  return {
    bucketName,
    objectName,
  };
}

async function signObjectURL({
  bucketName,
  objectName,
  method,
  ttlSec,
}: {
  bucketName: string;
  objectName: string;
  method: "GET" | "PUT" | "DELETE" | "HEAD";
  ttlSec: number;
}): Promise<string> {
  const request = {
    bucket_name: bucketName,
    object_name: objectName,
    method,
    expires_at: new Date(Date.now() + ttlSec * 1000).toISOString(),
  };
  const response = await fetch(
    `${REPLIT_SIDECAR_ENDPOINT}/object-storage/signed-object-url`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(request),
    }
  );
  if (!response.ok) {
    throw new Error(
      `Failed to sign object URL, errorcode: ${response.status}, ` +
        `make sure you're running on Replit`
    );
  }

  const { signed_url: signedURL } = await response.json();
  return signedURL;
}