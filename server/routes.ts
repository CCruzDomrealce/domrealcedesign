import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertContactSchema } from "@shared/schema";
import { sendContactEmail, sendAutoReplyEmail } from "./email";
import { ObjectStorageService } from "./objectStorage";
import rateLimit from 'express-rate-limit';
import fs from 'fs';
import path from 'path';

export async function registerRoutes(app: Express): Promise<Server> {
  // Rate limiting for contact form
  const contactLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 5, // limit each IP to 5 requests per windowMs
    message: { 
      success: false, 
      message: "Muitas tentativas. Tente novamente em 15 minutos." 
    },
    standardHeaders: true,
    legacyHeaders: false,
  });

  // Object storage service
  const objectStorageService = new ObjectStorageService();

  // Serve public images from object storage
  app.get("/public-objects/:filePath(*)", async (req, res) => {
    const filePath = req.params.filePath;
    try {
      const file = await objectStorageService.searchPublicObject(filePath);
      if (!file) {
        return res.status(404).json({ error: "File not found" });
      }
      objectStorageService.downloadObject(file, res);
    } catch (error) {
      console.error("Error searching for public object:", error);
      return res.status(500).json({ error: "Internal server error" });
    }
  });

  // API route to list available images for gallery (portfolio only)
  app.get("/api/gallery/images", async (req, res) => {
    try {
      const files = await objectStorageService.listPublicFiles();
      
      // Filter only portfolio images (exclude loja)
      const portfolioImages = files.filter(file => 
        /\.(jpg|jpeg|png|gif|webp)$/i.test(file) && 
        file.startsWith('portfolio/') && 
        !file.startsWith('loja/')
      );
      
      res.json({ images: portfolioImages });
    } catch (error) {
      console.error("Error listing images:", error);
      res.status(500).json({ error: "Failed to list images" });
    }
  });

  // API route to auto-generate texture covers from available texture folders
  app.post("/api/auto-generate-covers", async (req, res) => {
    try {
      console.log('Starting auto-generation of texture covers...');
      
      const allImages = await objectStorageService.listPublicFiles();
      
      // Find all texture categories from existing images
      const textureCategories = new Set<string>();
      
      allImages.forEach(path => {
        const match = path.match(/^loja\/papel-de-parede\/texturas\/([^\/]+)\//);
        if (match) {
          textureCategories.add(match[1]);
        }
      });
      
      console.log('Found texture categories:', Array.from(textureCategories));
      
      const generatedCovers = [];
      
      for (const category of Array.from(textureCategories)) {
        // Check if cover already exists
        const coverPath = `loja/papel-de-parede/capas-texturas/${category}.webp`;
        const coverExists = allImages.includes(coverPath);
        
        if (!coverExists) {
          // Find first texture image in this category to use as cover
          const firstTexture = allImages.find(path => 
            path.startsWith(`loja/papel-de-parede/texturas/${category}/`) &&
            /\.(jpg|jpeg|png|gif|webp)$/i.test(path)
          );
          
          if (firstTexture) {
            try {
              // Get the original image from object storage
              const file = await objectStorageService.searchPublicObject(firstTexture.replace(/^loja\/papel-de-parede\//, ''));
              
              if (file) {
                // Download the image data
                const chunks: Buffer[] = [];
                const stream = file.createReadStream();
                
                await new Promise((resolve, reject) => {
                  stream.on('data', (chunk) => chunks.push(chunk));
                  stream.on('end', resolve);
                  stream.on('error', reject);
                });
                
                const imageBuffer = Buffer.concat(chunks);
                
                // Upload as cover with .webp extension
                await objectStorageService.uploadPublicFile(
                  coverPath,
                  imageBuffer,
                  'image/webp'
                );
                
                generatedCovers.push({ category, source: firstTexture, cover: coverPath });
                console.log(`✓ Generated cover for ${category} from ${firstTexture}`);
              }
            } catch (error) {
              console.error(`✗ Error generating cover for ${category}:`, error);
            }
          }
        } else {
          console.log(`Cover for ${category} already exists`);
        }
      }
      
      res.json({ 
        message: 'Auto-generation completed',
        categoriesFound: Array.from(textureCategories),
        coversGenerated: generatedCovers
      });
      
    } catch (error) {
      console.error("Error in auto-generation:", error);
      res.status(500).json({ error: "Failed to auto-generate covers" });
    }
  });

  // File upload endpoint
  app.post("/api/objects/upload", async (req, res) => {
    try {
      const uploadURL = await objectStorageService.getObjectEntityUploadURL();
      res.json({ uploadURL });
    } catch (error) {
      console.error("Error getting upload URL:", error);
      res.status(500).json({ error: "Failed to get upload URL" });
    }
  });

  // Bulk upload endpoint for texture covers
  app.post("/api/upload-textures", async (req, res) => {
    try {
      const fs = await import('fs');
      const path = await import('path');
      
      const texturesPath = 'loja/papel-de-parede/capas-texturas';
      const files = fs.readdirSync(texturesPath);
      const webpFiles = files.filter(file => file.endsWith('.webp'));
      
      const uploadResults = [];
      
      for (const file of webpFiles) {
        try {
          const filePath = path.join(texturesPath, file);
          const fileBuffer = fs.readFileSync(filePath);
          const targetPath = `loja/papel-de-parede/capas-texturas/${file}`;
          
          await objectStorageService.uploadPublicFile(targetPath, fileBuffer, 'image/webp');
          uploadResults.push({ file, status: 'success' });
          console.log(`✓ Uploaded ${file}`);
        } catch (error) {
          const errorMessage = error instanceof Error ? error.message : 'Unknown error';
          uploadResults.push({ file, status: 'error', error: errorMessage });
          console.error(`✗ Error uploading ${file}:`, errorMessage);
        }
      }
      
      res.json({ 
        message: 'Bulk upload completed',
        results: uploadResults,
        total: webpFiles.length,
        successful: uploadResults.filter(r => r.status === 'success').length
      });
      
    } catch (error) {
      console.error("Error in bulk upload:", error);
      res.status(500).json({ error: "Failed to upload textures" });
    }
  });

  // API route to list loja images (separate from portfolio)
  app.get("/api/loja/images", async (req, res) => {
    try {
      const files = await objectStorageService.listPublicFiles();
      
      // Filter only loja images
      const lojaImages = files.filter(file => 
        /\.(jpg|jpeg|png|gif|webp)$/i.test(file) && 
        file.startsWith('loja/')
      );
      
      res.json({ images: lojaImages });
    } catch (error) {
      console.error("Error listing loja images:", error);
      res.status(500).json({ error: "Failed to list loja images" });
    }
  });

  // API route to upload individual textures for each category
  app.post("/api/upload-individual-textures", async (req, res) => {
    try {
      console.log('Starting individual textures upload...');
      
      const textureCategories = [
        '3D', 'Animal', 'Arabesco', 'Azulejo', 'Baby', 'Baby-2.0', 
        'Baby-Colors', 'Baby-Paineis', 'Baby-Pantone', 'Casual', 
        'Chevron', 'Couro', 'Floral', 'Folhas', 'Geometrico'
      ];
      
      const uploadResults = [];
      
      for (const category of textureCategories) {
        const categoryPath = `loja/papel-de-parede/texturas/${category}`;
        
        // Check if directory exists
        if (fs.existsSync(categoryPath)) {
          const files = fs.readdirSync(categoryPath);
          const imageFiles = files.filter((file: string) => 
            /\.(jpg|jpeg|png|gif|webp)$/i.test(file)
          );
          
          for (const file of imageFiles) {
            try {
              const filePath = path.join(categoryPath, file);
              const fileBuffer = fs.readFileSync(filePath);
              const targetPath = `loja/papel-de-parede/texturas/${category}/${file}`;
              
              // Determine content type
              const ext = path.extname(file).toLowerCase();
              const contentType = ext === '.webp' ? 'image/webp' : 
                                ext === '.png' ? 'image/png' : 'image/jpeg';
              
              await objectStorageService.uploadPublicFile(targetPath, fileBuffer, contentType);
              uploadResults.push({ category, file, status: 'success' });
              console.log(`✓ Uploaded ${category}/${file}`);
            } catch (error) {
              const errorMessage = error instanceof Error ? error.message : 'Unknown error';
              uploadResults.push({ category, file, status: 'error', error: errorMessage });
              console.error(`✗ Error uploading ${category}/${file}:`, errorMessage);
            }
          }
        } else {
          console.log(`Directory ${categoryPath} does not exist, skipping...`);
        }
      }
      
      res.json({ 
        message: 'Individual textures upload completed',
        results: uploadResults,
        total: uploadResults.length,
        successful: uploadResults.filter(r => r.status === 'success').length
      });
      
    } catch (error) {
      console.error("Error in individual textures upload:", error);
      res.status(500).json({ error: "Failed to upload individual textures" });
    }
  });

  // Contact form submission endpoint with rate limiting
  app.post("/api/contact", contactLimiter, async (req, res) => {
    try {
      // Validate the request body
      const validatedData = insertContactSchema.parse(req.body);
      
      // Normalize file URLs if any
      if (validatedData.ficheiros && validatedData.ficheiros.length > 0) {
        validatedData.ficheiros = validatedData.ficheiros.map(url => 
          objectStorageService.normalizeObjectEntityPath(url)
        );
      }
      
      // Save contact to storage
      const contact = await storage.createContact(validatedData);
      
      // Send email notifications (don't wait for them)
      Promise.all([
        sendContactEmail(contact),
        sendAutoReplyEmail(contact)
      ]).catch(error => {
        console.error('Error sending emails:', error);
      });
      
      res.json({ 
        success: true, 
        message: "Mensagem enviada com sucesso. Entraremos em contacto brevemente." 
      });
    } catch (error) {
      console.error('Contact form error:', error);
      res.status(400).json({ 
        success: false, 
        message: "Erro ao enviar mensagem. Por favor, tente novamente." 
      });
    }
  });

  // Get all contacts (for admin purposes)
  app.get("/api/contacts", async (req, res) => {
    try {
      const contacts = await storage.getContacts();
      res.json(contacts);
    } catch (error) {
      console.error('Error fetching contacts:', error);
      res.status(500).json({ message: "Erro interno do servidor" });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
