import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertContactSchema } from "@shared/schema";
import { sendContactEmail, sendAutoReplyEmail } from "./email";

export async function registerRoutes(app: Express): Promise<Server> {
  // Contact form submission endpoint
  app.post("/api/contact", async (req, res) => {
    try {
      // Validate the request body
      const validatedData = insertContactSchema.parse(req.body);
      
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
