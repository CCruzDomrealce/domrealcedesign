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

  // List files in a specific directory of the public object storage
  async listPublicFiles(directoryPath?: string): Promise<string[]> {
    const searchPaths = this.getPublicObjectSearchPaths();
    const allFiles: string[] = [];

    for (const searchPath of searchPaths) {
      const fullPath = directoryPath ? `${searchPath}/${directoryPath}` : searchPath;
      
      try {
        const { bucketName, objectName } = parseObjectPath(fullPath);
        const bucket = objectStorageClient.bucket(bucketName);
        
        // List files with the directory prefix
        const [files] = await bucket.getFiles({
          prefix: objectName,
        });

        // Extract just the filenames from the full paths
        files.forEach(file => {
          const fileName = file.name.split('/').pop();
          if (fileName && !allFiles.includes(fileName)) {
            allFiles.push(fileName);
          }
        });
      } catch (error) {
        console.error(`Error listing files in ${fullPath}:`, error);
      }
    }

    return allFiles;
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

  // Upload file to public folder in Object Storage
  async uploadFileToPublicFolder(localFilePath: string, targetPath: string): Promise<string> {
    try {
      const fs = await import('fs');
      const path = await import('path');
      
      // Get the public search paths
      const searchPaths = this.getPublicObjectSearchPaths();
      if (searchPaths.length === 0) {
        throw new Error("No public search paths configured");
      }
      
      // Use the first search path for uploads
      const publicPath = searchPaths[0];
      const fullTargetPath = `${publicPath}/${targetPath}`;
      
      const { bucketName, objectName } = parseObjectPath(fullTargetPath);
      const bucket = objectStorageClient.bucket(bucketName);
      const file = bucket.file(objectName);
      
      // Upload the file
      await file.save(fs.readFileSync(localFilePath), {
        metadata: {
          contentType: this.getContentType(localFilePath),
        },
      });
      
      console.log(`✅ Uploaded ${localFilePath} to ${fullTargetPath}`);
      return `/public-objects/${targetPath}`;
    } catch (error) {
      console.error(`❌ Failed to upload ${localFilePath}:`, error);
      throw error;
    }
  }

  // Get content type based on file extension
  private getContentType(filePath: string): string {
    const extension = filePath.toLowerCase().split('.').pop();
    const contentTypes: Record<string, string> = {
      'jpg': 'image/jpeg',
      'jpeg': 'image/jpeg', 
      'png': 'image/png',
      'gif': 'image/gif',
      'webp': 'image/webp',
      'svg': 'image/svg+xml'
    };
    return contentTypes[extension || ''] || 'application/octet-stream';
  }

  // Get upload URL for object entity (simplified for public uploads)
  async getObjectEntityUploadURL(): Promise<string> {
    // For public uploads, we'll need a different implementation
    // This is a placeholder that should be implemented based on your needs
    throw new Error("Upload functionality not implemented for public storage");
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