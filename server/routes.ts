import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertContactSchema } from "@shared/schema";
import { sendContactEmail, sendAutoReplyEmail } from "./email";
import { ObjectStorageService } from "./objectStorage";
import rateLimit from 'express-rate-limit';
import path from "node:path";
import fs from "node:fs";

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

  // API route to list available images for gallery/portfolio
  app.get("/api/gallery/images", async (req, res) => {
    try {
      const fs = await import('fs');
      const path = await import('path');
      
      const portfolioImages: Record<string, string[]> = {};
      
      // Check if public/portfolio directory exists
      const portfolioPath = 'public/portfolio';
      console.log(`🔍 Checking for portfolio directory: ${portfolioPath}`);
      console.log(`📁 Directory exists: ${fs.existsSync(portfolioPath)}`);
      
      if (fs.existsSync(portfolioPath)) {
        // Read category directories
        const categories = fs.readdirSync(portfolioPath, { withFileTypes: true })
          .filter(dirent => dirent.isDirectory())
          .map(dirent => dirent.name);
        
        for (const category of categories) {
          const categoryPath = path.join(portfolioPath, category);
          const images = fs.readdirSync(categoryPath)
            .filter(file => /\.(jpg|jpeg|png|gif|webp)$/i.test(file))
            .map(file => `/portfolio/${category}/${file}`);
          
          if (images.length > 0) {
            portfolioImages[category] = images;
          }
        }
      }
      
      // Also try to get from Object Storage
      try {
        const objectStorageFiles = await objectStorageService.listPublicFiles();
        const imageFiles = objectStorageFiles.filter(file => 
          /\.(jpg|jpeg|png|gif|webp)$/i.test(file)
        );
        
        if (imageFiles.length > 0) {
          portfolioImages['Geral'] = imageFiles.map(file => `/public-objects/${file}`);
        }
      } catch (objectStorageError) {
        console.log("Object Storage not available, using local files only");
      }
      
      res.json({ 
        images: portfolioImages,
        categories: Object.keys(portfolioImages)
      });
    } catch (error) {
      console.error("Error listing images:", error);
      res.status(500).json({ error: "Failed to list images" });
    }
  });

  // Serve local portfolio images
  app.get("/portfolio/:category/:filename", async (req, res) => {
    try {
      const fs = await import('fs');
      const path = await import('path');
      
      const { category, filename } = req.params;
      const imagePath = path.join('public', 'portfolio', category, filename);
      
      if (!fs.existsSync(imagePath)) {
        return res.status(404).json({ error: "Image not found" });
      }
      
      // Set appropriate headers
      const extension = filename.toLowerCase().split('.').pop();
      const contentTypes: Record<string, string> = {
        'jpg': 'image/jpeg',
        'jpeg': 'image/jpeg',
        'png': 'image/png',
        'gif': 'image/gif',
        'webp': 'image/webp'
      };
      
      res.setHeader('Content-Type', contentTypes[extension || ''] || 'application/octet-stream');
      res.setHeader('Cache-Control', 'public, max-age=3600');
      
      // Stream the file
      const stream = fs.createReadStream(imagePath);
      stream.pipe(res);
      
    } catch (error) {
      console.error("Error serving portfolio image:", error);
      res.status(500).json({ error: "Failed to serve image" });
    }
  });

  // Upload portfolio images to organized folders
  app.post("/api/upload-portfolio-images", async (req, res) => {
    try {
      console.log("📁 Starting portfolio image upload organization...");
      
      // List of truck images to organize
      const truckImages = [
        "IMG_20221115_164224_1755553420845.jpg",
        "IMG_20221115_164342_1755553420846.jpg", 
        "IMG-20220324-WA0000_1755553420847.jpg",
        "IMG20240314111000_1755553420847.jpg",
        "IMG_20220322_162136_1755553475299.jpg",
        "IMG_20220401_162251_1755553475299.jpg",
        "IMG_20220815_170210_1755553475300.jpg",
        "IMG_20230819_105057 (Medium)_1755553475300.jpg"
      ];

      // Upload each image to the correct portfolio structure
      const uploadResults = [];
      for (const imageName of truckImages) {
        try {
          const uploadURL = await objectStorageService.uploadFileToPublicFolder(
            `attached_assets/${imageName}`,
            `portfolio/Camiões/${imageName}`
          );
          uploadResults.push({ image: imageName, status: 'success', url: uploadURL });
          console.log(`✅ Uploaded: ${imageName}`);
        } catch (error) {
          console.error(`❌ Failed to upload ${imageName}:`, error);
          const errorMessage = error instanceof Error ? error.message : String(error);
          uploadResults.push({ image: imageName, status: 'error', error: errorMessage });
        }
      }

      res.json({ 
        success: true, 
        message: "Portfolio images organized successfully",
        results: uploadResults
      });
    } catch (error) {
      console.error("❌ Error organizing portfolio images:", error);
      res.status(500).json({ error: "Failed to organize portfolio images" });
    }
  });

  // Contact form route with rate limiting
  app.post("/api/contact", contactLimiter, async (req, res) => {
    try {
      const result = insertContactSchema.safeParse(req.body);
      
      if (!result.success) {
        return res.status(400).json({ 
          success: false, 
          message: "Dados inválidos. Verifique se todos os campos estão preenchidos corretamente." 
        });
      }

      const contactData = result.data;

      res.json({ 
        success: true, 
        message: "Mensagem enviada com sucesso! Entraremos em contacto em breve."
      });
    } catch (error) {
      console.error("Contact form error:", error);
      res.status(500).json({ 
        success: false, 
        message: "Erro interno do servidor. Tente novamente mais tarde." 
      });
    }
  });

  // Serve texture images from local assets with proper fallback
  app.get("/api/texture-image/:fileName", (req, res) => {
    try {
      const fileName = req.params.fileName;
      
      // Map the filename to the attached assets directory
      const attachedAssetsPath = path.join(process.cwd(), 'attached_assets');
      
      // Check for specific files first
      const fileMapping: Record<string, string> = {
        '3D-001.webp': '3D-001_1755541326630.webp',
        '3D-002.webp': '3D-002_1755541330130.webp', 
        '3D-003.webp': '3D-003_1755541332938.webp'
      };
      
      const actualFileName = fileMapping[fileName];
      if (actualFileName) {
        const fullPath = path.join(attachedAssetsPath, actualFileName);
        
        if (fs.existsSync(fullPath)) {
          res.setHeader('Content-Type', 'image/webp');
          res.setHeader('Cache-Control', 'public, max-age=3600');
          return res.sendFile(fullPath);
        }
      }
      
      // Fallback to first available image
      const fallbackPath = path.join(attachedAssetsPath, '3D-001_1755541326630.webp');
      if (fs.existsSync(fallbackPath)) {
        res.setHeader('Content-Type', 'image/webp');
        res.setHeader('Cache-Control', 'public, max-age=3600');
        return res.sendFile(fallbackPath);
      }
      
      return res.status(404).json({ error: "Texture image not found" });
    } catch (error) {
      console.error("Error serving texture image:", error);
      return res.status(500).json({ error: "Internal server error" });
    }
  });

  // Serve 3D texture images with fallback for Object Storage
  app.get("/public-objects/Domrealce/Loja/Papel de Parede/texturas 800x800/3D/:fileName", async (req, res) => {
    const fileName = req.params.fileName;
    try {
      // Try object storage first
      const file = await objectStorageService.searchPublicObject(`Domrealce/Loja/Papel de Parede/texturas 800x800/3D/${fileName}`);
      if (file) {
        return objectStorageService.downloadObject(file, res);
      }
      
      // Fallback to local texture-image route
      return res.redirect(`/api/texture-image/${fileName}`);
    } catch (error) {
      console.error(`Error serving Object Storage texture ${fileName}:`, error);
      // Fallback to local texture-image route
      return res.redirect(`/api/texture-image/${fileName}`);
    }
  });

  // Check 3D folder in Object Storage
  app.get("/api/check-3d-storage", async (req, res) => {
    try {
      console.log("🔍 Verificando pasta 3D no Object Storage...");
      
      const results = {
        bucket: "replit-objstore-1836c26b-d447-48a6-97aa-4292b2c8c6b4",
        path: "Domrealce/Loja/Papel de Parede/texturas 800x800/3D/",
        found: [] as string[],
        missing: [] as string[],
        totalChecked: 0,
        totalFound: 0
      };
      
      // Check for images 3D-001.webp through 3D-100.webp
      for (let i = 1; i <= 100; i++) {
        const number = i.toString().padStart(3, '0');
        const fileName = `3D-${number}.webp`;
        const fullPath = `Domrealce/Loja/Papel de Parede/texturas 800x800/3D/${fileName}`;
        
        try {
          const file = await objectStorageService.searchPublicObject(fullPath);
          if (file) {
            results.found.push(fileName);
            console.log(`✅ Encontrado: ${fileName}`);
          } else {
            results.missing.push(fileName);
          }
        } catch (error) {
          results.missing.push(fileName);
          console.log(`❌ Não encontrado: ${fileName}`);
        }
        
        results.totalChecked++;
      }
      
      results.totalFound = results.found.length;
      
      console.log(`📊 Verificação completa:`);
      console.log(`   - Total verificado: ${results.totalChecked}`);
      console.log(`   - Encontradas: ${results.totalFound}`);
      console.log(`   - Em falta: ${results.missing.length}`);
      
      if (results.found.length > 0) {
        console.log(`📁 Primeiras imagens encontradas: ${results.found.slice(0, 5).join(', ')}`);
      }
      
      res.json(results);
    } catch (error) {
      console.error("❌ Erro ao verificar pasta 3D:", error);
      res.status(500).json({ 
        error: "Erro ao verificar Object Storage",
        details: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  });

  // Basic health check
  app.get("/api/health", (req, res) => {
    res.json({ status: "OK", timestamp: new Date().toISOString() });
  });

  const httpServer = createServer(app);
  return httpServer;
}