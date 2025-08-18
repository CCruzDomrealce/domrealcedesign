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

      // Store contact in database
      const contact = await storage.createContact(contactData);

      // Send emails in parallel
      await Promise.all([
        sendContactEmail(contactData),
        sendAutoReplyEmail(contactData.email, contactData.nome)
      ]);

      res.json({ 
        success: true, 
        message: "Mensagem enviada com sucesso! Entraremos em contacto em breve.",
        contactId: contact.id
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