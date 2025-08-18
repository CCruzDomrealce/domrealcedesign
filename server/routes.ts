import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertContactSchema } from "@shared/schema";
import { sendContactEmail, sendAutoReplyEmail } from "./email";
import { ObjectStorageService } from "./objectStorage";
import rateLimit from 'express-rate-limit';

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

  // API route to list available images for gallery
  app.get("/api/gallery/images", async (req, res) => {
    try {
      const files = await objectStorageService.listPublicFiles();
      
      // Filter only image files
      const imageFiles = files.filter(file => 
        /\.(jpg|jpeg|png|gif|webp)$/i.test(file)
      );
      
      res.json({ images: imageFiles });
    } catch (error) {
      console.error("Error listing images:", error);
      res.status(500).json({ error: "Failed to list images" });
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
