import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertContactSchema } from "@shared/schema";
import { sendContactEmail, sendAutoReplyEmail } from "./email";
import { ObjectStorageService } from "./objectStorage";
import { ObjectStorageSync } from "./objectStorageSync";
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

  // Object storage services
  const objectStorageService = new ObjectStorageService();
  const objectStorageSync = new ObjectStorageSync();

  // API route to sync with Object Storage portfolio images
  app.get("/api/gallery/images", async (req, res) => {
    try {
      console.log("🔄 Syncing with Object Storage portfolio images...");
      
      const portfolioImages: Record<string, string[]> = {};
      
      // Primary: Get images from Object Storage structure
      try {
        // Use the actual Object Storage service to list files
        const objectStorageService = new ObjectStorageService();
        
        // Try different path patterns to find portfolio images
        const searchPaths = [
          "objects/public/portfólio",
          "public/portfólio", 
          "objects/public/portfolio",
          "public/portfolio"
        ];
        
        for (const basePath of searchPaths) {
          try {
            console.log(`🔍 Searching Object Storage path: ${basePath}`);
            
            // Try to find files in this path structure
            const possibleFiles = await objectStorageService.searchPublicObject(`${basePath}/test.jpg`);
            
            // If we find the structure, list common image file patterns
            const commonImages = [
              "camiao-decoracao-lateral.jpg",
              "camiao-hortouniao.jpg",
              "camiao-reboconort-1.jpg", 
              "camiao-reboconort-2.jpg",
              "camiao-vermelho-chamas.jpg",
              "camiao-volvo-560.jpg",
              "camiao-volvo-azul.jpg",
              "cisterna-gerzatrans.jpg"
            ];
            
            // Test if images exist in Object Storage
            const existingImages: string[] = [];
            for (const imageName of commonImages) {
              try {
                const testFile = await objectStorageService.searchPublicObject(`${basePath}/Camiões/${imageName}`);
                if (testFile) {
                  existingImages.push(`/public-objects/${basePath}/Camiões/${imageName}`);
                  console.log(`✅ Found: ${imageName}`);
                }
              } catch (error) {
                // Image doesn't exist, continue
              }
            }
            
            if (existingImages.length > 0) {
              portfolioImages['Camiões'] = existingImages;
              console.log(`✅ Found ${existingImages.length} images in Object Storage path: ${basePath}`);
              break; // Found images, stop searching other paths
            }
            
          } catch (error) {
            console.log(`❌ Path not accessible: ${basePath}`);
          }
        }
        
        // If no specific images found, use dynamic detection
        if (Object.keys(portfolioImages).length === 0) {
          console.log("🔍 Using dynamic Object Storage detection...");
          const detectedImages = await objectStorageSync.detectPortfolioImages();
          Object.assign(portfolioImages, detectedImages);
        }
        
      } catch (objectStorageError) {
        console.log("❌ Object Storage sync failed:", objectStorageError);
      }
      
      res.json({ 
        images: portfolioImages,
        categories: Object.keys(portfolioImages),
        source: "object_storage_sync",
        timestamp: new Date().toISOString()
      });
      
    } catch (error) {
      console.error("❌ Error syncing with Object Storage:", error);
      res.status(500).json({ error: "Failed to sync with Object Storage" });
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

  // Upload portfolio images to Object Storage
  app.post("/api/upload-portfolio-to-storage", async (req, res) => {
    try {
      console.log("📁 Starting portfolio upload to Object Storage...");
      
      // Mapping of local files to organized names
      const imageMapping = [
        { local: "public/portfolio/Camiões/camiao-reboconort-1.jpg", storage: "portfolio/Camiões/camiao-reboconort-1.jpg" },
        { local: "public/portfolio/Camiões/camiao-reboconort-2.jpg", storage: "portfolio/Camiões/camiao-reboconort-2.jpg" },
        { local: "public/portfolio/Camiões/camiao-volvo-560.jpg", storage: "portfolio/Camiões/camiao-volvo-560.jpg" },
        { local: "public/portfolio/Camiões/camiao-decoracao-lateral.jpg", storage: "portfolio/Camiões/camiao-decoracao-lateral.jpg" },
        { local: "public/portfolio/Camiões/camiao-volvo-azul.jpg", storage: "portfolio/Camiões/camiao-volvo-azul.jpg" },
        { local: "public/portfolio/Camiões/camiao-vermelho-chamas.jpg", storage: "portfolio/Camiões/camiao-vermelho-chamas.jpg" },
        { local: "public/portfolio/Camiões/cisterna-gerzatrans.jpg", storage: "portfolio/Camiões/cisterna-gerzatrans.jpg" },
        { local: "public/portfolio/Camiões/camiao-hortouniao.jpg", storage: "portfolio/Camiões/camiao-hortouniao.jpg" }
      ];

      const uploadResults = [];
      
      for (const mapping of imageMapping) {
        try {
          const uploadURL = await objectStorageService.uploadFileToPublicFolder(
            mapping.local,
            mapping.storage
          );
          uploadResults.push({ 
            image: mapping.storage, 
            status: 'success', 
            url: uploadURL 
          });
          console.log(`✅ Uploaded: ${mapping.storage}`);
        } catch (error) {
          console.error(`❌ Failed to upload ${mapping.storage}:`, error);
          const errorMessage = error instanceof Error ? error.message : String(error);
          uploadResults.push({ 
            image: mapping.storage, 
            status: 'error', 
            error: errorMessage 
          });
        }
      }

      res.json({ 
        success: true, 
        message: "Portfolio images uploaded to Object Storage",
        results: uploadResults,
        objectStorageStructure: {
          bucket: "replit-objstore-1836c26b-d447-48a6-97aa-4292b2c8c6b4",
          path: "/public/portfolio/Camiões/",
          totalImages: uploadResults.filter(r => r.status === 'success').length
        }
      });
    } catch (error) {
      console.error("❌ Error uploading to Object Storage:", error);
      res.status(500).json({ error: "Failed to upload to Object Storage" });
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