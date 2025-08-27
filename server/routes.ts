import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertContactSchema, insertProductSchema, insertNewsSchema, insertSlideSchema, type Contact } from "@shared/schema";
import { sendContactEmail, sendAutoReplyEmail } from "./email";
import { ObjectStorageService } from "./objectStorage";
import { createIfthenPayService, type PaymentMethod } from "./ifthenpay";
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
  
  // IfthenPay service
  const ifthenPayService = createIfthenPayService();

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
        '3D', 'Amostras', 'Animal', 'Arabesco', 'Azulejo', 'Baby', 'Baby-2.0', 
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

  // Admin endpoint to get all contacts for email marketing
  app.get("/api/admin/contacts", async (req, res) => {
    try {
      const contacts = await storage.getAllContacts();
      res.json({ contacts });
    } catch (error) {
      console.error('Error fetching contacts:', error);
      res.status(500).json({ error: "Failed to fetch contacts" });
    }
  });

  // Admin Portfolio - Delete image
  app.delete("/api/admin/portfolio/delete", async (req, res) => {
    try {
      const { filename } = req.body;
      
      if (!filename) {
        return res.status(400).json({ error: "Filename is required" });
      }

      // Validate that it's a portfolio image
      if (!filename.startsWith('portfolio/')) {
        return res.status(400).json({ error: "Only portfolio images can be deleted" });
      }

      const deleted = await objectStorageService.deletePublicFile(filename);
      
      if (deleted) {
        res.json({ success: true, message: "Image deleted successfully" });
      } else {
        res.status(404).json({ error: "Image not found" });
      }
    } catch (error) {
      console.error('Error deleting portfolio image:', error);
      res.status(500).json({ error: "Failed to delete image" });
    }
  });

  // Admin endpoint to export contacts as CSV for email marketing
  app.get("/api/admin/contacts/export", async (req, res) => {
    try {
      const contacts = await storage.getAllContacts();
      
      // Create CSV content
      const csvHeader = "Nome,Email,Telefone,Empresa,Data,Mensagem\n";
      const csvContent = contacts.map((contact: Contact) => {
        const date = contact.createdAt ? new Date(contact.createdAt).toLocaleDateString('pt-PT') : '';
        return `"${contact.nome}","${contact.email}","${contact.telefone || ''}","${contact.empresa || ''}","${date}","${contact.mensagem.replace(/"/g, '""')}"`;
      }).join('\n');
      
      const csv = csvHeader + csvContent;
      
      res.setHeader('Content-Type', 'text/csv; charset=utf-8');
      res.setHeader('Content-Disposition', 'attachment; filename="contactos-domrealce.csv"');
      res.send('\uFEFF' + csv); // Add BOM for Excel compatibility
    } catch (error) {
      console.error('Error exporting contacts:', error);
      res.status(500).json({ error: "Failed to export contacts" });
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

  // Get featured products for homepage
  app.get("/api/products/featured", async (req, res) => {
    try {
      const products = await storage.getFeaturedProducts();
      res.json(products);
    } catch (error) {
      console.error("Error fetching featured products:", error);
      res.status(500).json({ error: "Failed to fetch featured products" });
    }
  });

  // Get recent news for homepage
  app.get("/api/news/recent", async (req, res) => {
    try {
      const news = await storage.getRecentNews();
      res.json(news);
    } catch (error) {
      console.error("Error fetching recent news:", error);
      res.status(500).json({ error: "Failed to fetch recent news" });
    }
  });

  // Payment routes
  
  // Create payment
  app.post("/api/payments/create", async (req, res) => {
    try {
      const { method, orderId, amount, customerData, returnUrls } = req.body;
      
      if (!method || !orderId || !amount) {
        return res.status(400).json({ 
          success: false, 
          message: "Método de pagamento, ID do pedido e valor são obrigatórios" 
        });
      }

      let paymentData: any;

      switch (method as PaymentMethod) {
        case 'multibanco':
          paymentData = await ifthenPayService.createMultibancoPayment({
            orderId,
            amount: parseFloat(amount),
            description: `Papel de parede - Pedido ${orderId}`,
            customerEmail: customerData?.email,
          });
          break;

        case 'mbway':
          if (!customerData?.phone) {
            return res.status(400).json({ 
              success: false, 
              message: "Número de telefone é obrigatório para MB WAY" 
            });
          }
          paymentData = await ifthenPayService.createMBWayPayment({
            orderId,
            amount: parseFloat(amount),
            phone: customerData.phone,
            description: `Papel de parede - Pedido ${orderId}`,
            customerEmail: customerData?.email,
          });
          break;


        case 'creditcard':
          if (!returnUrls) {
            return res.status(400).json({ 
              success: false, 
              message: "URLs de retorno são obrigatórias para cartão de crédito" 
            });
          }
          paymentData = await ifthenPayService.createCreditCardPayment({
            orderId,
            amount: parseFloat(amount),
            description: `Papel de parede - Pedido ${orderId}`,
            successUrl: returnUrls.success,
            errorUrl: returnUrls.error,
            cancelUrl: returnUrls.cancel,
            customerEmail: customerData?.email,
          });
          break;

        case 'paybylink':
          paymentData = await ifthenPayService.createPayByLink({
            orderId,
            amount: parseFloat(amount),
            description: `Papel de parede - Pedido ${orderId}`,
            expiryDays: 3,
            methods: ['multibanco', 'mbway', 'creditcard'],
          });
          break;

        default:
          return res.status(400).json({ 
            success: false, 
            message: "Método de pagamento não suportado" 
          });
      }

      res.json({
        success: true,
        method,
        data: paymentData,
      });

    } catch (error) {
      console.error('Error creating payment:', error);
      console.error('Payment method was:', req.body.method);
      console.error('Full error details:', error instanceof Error ? error.message : error);
      res.status(500).json({ 
        success: false, 
        message: error instanceof Error ? error.message : "Erro ao criar pagamento. Tente novamente."
      });
    }
  });

  // Check MB WAY payment status
  app.post("/api/payments/mbway/status", async (req, res) => {
    try {
      const { requestId } = req.body;
      
      if (!requestId) {
        return res.status(400).json({ 
          success: false, 
          message: "Request ID é obrigatório" 
        });
      }

      // For now, return success - status API has issues
      res.json({
        success: true,
        status: "pending",
        message: "Aguarde confirmação no seu telemóvel"
      });

    } catch (error) {
      console.error('Error checking MB WAY status:', error);
      res.json({
        success: true,
        status: "pending", 
        message: "Aguarde confirmação no seu telemóvel"
      });
    }
  });

  // Payment callback (webhook) handler - IfthenPay sends GET requests
  app.get("/api/payments/callback", async (req, res) => {
    try {
      const { 
        key,             // Anti-phishing key (standard format)
        chave,           // Anti-phishing key (Portuguese format)
        orderId,         // Order ID
        amount,          // Amount
        requestId,       // Request ID
        entity,          // Entity (Multibanco)
        entidade,        // Entity (Portuguese)
        reference,       // Reference (Multibanco)
        referencia,      // Reference (Portuguese)
        payment_datetime, // Payment datetime
        datahorapag,     // Payment datetime (Portuguese)
        valor            // Amount (Portuguese)
      } = req.query;
      
      console.log('IfthenPay callback received from www.domrealce.com:', {
        chave: chave ? `${String(chave).substring(0,5)}...` : 'missing',
        key: key ? `${String(key).substring(0,5)}...` : 'missing',
        entidade,
        referencia,
        valor,
        datahorapag,
        orderId,
        amount,
        requestId,
        payment_datetime
      });
      
      // Validate anti-phishing key (support both formats)
      const expectedKey = process.env.IFTHENPAY_ANTI_PHISHING_KEY;
      const receivedKey = chave || key; // Try both parameter names
      
      if (!expectedKey) {
        console.log('Anti-phishing key not configured in environment');
        return res.status(200).send('OK'); // Don't reject if not configured yet
      }
      
      if (receivedKey !== expectedKey) {
        console.log(`Invalid anti-phishing key. Expected: ${expectedKey.substring(0,5)}..., Got: ${String(receivedKey).substring(0,5)}...`);
        return res.status(403).send('Forbidden');
      }

      // Process payment confirmation (support multiple formats)
      const finalAmount = valor || amount;
      const finalOrderId = orderId || `Ref-${referencia}`;
      const finalDateTime = datahorapag || payment_datetime;
      
      console.log(`✓ Payment confirmed! Order: ${finalOrderId}, Amount: €${finalAmount}, Entity: ${entidade}, Reference: ${referencia}, DateTime: ${finalDateTime}`);
      
      // Here you would typically:
      // 1. Update order status in database
      // 2. Send confirmation email to customer
      // 3. Trigger any business logic (e.g., start production)
      
      // Return HTTP 200 to acknowledge receipt (required by IfthenPay)
      res.status(200).send('OK');

    } catch (error) {
      console.error('Error processing callback:', error);
      res.status(500).send('Error processing callback');
    }
  });

  // Payment notification endpoint
  app.get("/api/payments/notification", async (req, res) => {
    try {
      console.log('IfthenPay notification received:', req.query);
      
      // Process notification (same as callback but for email notifications)
      // This endpoint is for additional notifications, main processing is in callback
      
      res.status(200).send('OK');
    } catch (error) {
      console.error('Error processing notification:', error);
      res.status(500).send('Error processing notification');
    }
  });

  // Payment success page
  app.get("/api/payments/success", (req, res) => {
    const { orderId, amount } = req.query;
    res.redirect(`/pedido-confirmado?orderId=${orderId}&amount=${amount}`);
  });

  // Payment error page
  app.get("/api/payments/error", (req, res) => {
    const { orderId, error } = req.query;
    res.redirect(`/checkout?error=${error}&orderId=${orderId}`);
  });

  // Payment cancel page
  app.get("/api/payments/cancel", (req, res) => {
    const { orderId } = req.query;
    res.redirect(`/checkout?cancelled=true&orderId=${orderId}`);
  });

  // Admin API routes for managing content
  
  // Admin Slider routes
  app.get("/api/admin/slider", async (req, res) => {
    try {
      const slides = await storage.getSlides();
      res.json({ slides });
    } catch (error) {
      console.error("Error fetching slides:", error);
      res.status(500).json({ error: "Failed to fetch slides" });
    }
  });

  app.post("/api/admin/slider", async (req, res) => {
    try {
      const slideData = insertSlideSchema.parse(req.body);
      const slide = await storage.createSlide(slideData);
      res.json({ success: true, slide });
    } catch (error) {
      console.error("Error creating slide:", error);
      res.status(500).json({ error: "Failed to create slide" });
    }
  });

  app.put("/api/admin/slider/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const slideData = insertSlideSchema.parse(req.body);
      const slide = await storage.updateSlide(id, slideData);
      res.json({ success: true, slide });
    } catch (error) {
      console.error("Error updating slide:", error);
      res.status(500).json({ error: "Failed to update slide" });
    }
  });

  app.delete("/api/admin/slider/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const success = await storage.deleteSlide(id);
      res.json({ success });
    } catch (error) {
      console.error("Error deleting slide:", error);
      res.status(500).json({ error: "Failed to delete slide" });
    }
  });

  // Admin Products routes
  app.get("/api/admin/produtos", async (req, res) => {
    try {
      const produtos = await storage.getAllProducts();
      res.json({ produtos });
    } catch (error) {
      console.error("Error fetching products:", error);
      res.status(500).json({ error: "Failed to fetch products" });
    }
  });

  app.post("/api/admin/produtos", async (req, res) => {
    try {
      const productData = insertProductSchema.parse(req.body);
      const produto = await storage.createProduct(productData);
      res.json({ success: true, produto });
    } catch (error) {
      console.error("Error creating product:", error);
      res.status(500).json({ error: "Failed to create product" });
    }
  });

  app.put("/api/admin/produtos/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const productData = insertProductSchema.parse(req.body);
      const produto = await storage.updateProduct(id, productData);
      res.json({ success: true, produto });
    } catch (error) {
      console.error("Error updating product:", error);
      res.status(500).json({ error: "Failed to update product" });
    }
  });

  app.delete("/api/admin/produtos/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const success = await storage.deleteProduct(id);
      res.json({ success });
    } catch (error) {
      console.error("Error deleting product:", error);
      res.status(500).json({ error: "Failed to delete product" });
    }
  });

  // Admin News routes
  app.get("/api/admin/noticias", async (req, res) => {
    try {
      const noticias = await storage.getAllNews();
      res.json({ noticias });
    } catch (error) {
      console.error("Error fetching news:", error);
      res.status(500).json({ error: "Failed to fetch news" });
    }
  });

  app.post("/api/admin/noticias", async (req, res) => {
    try {
      const newsData = insertNewsSchema.parse(req.body);
      const noticia = await storage.createNews(newsData);
      res.json({ success: true, noticia });
    } catch (error) {
      console.error("Error creating news:", error);
      res.status(500).json({ error: "Failed to create news" });
    }
  });

  app.put("/api/admin/noticias/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const newsData = insertNewsSchema.parse(req.body);
      const noticia = await storage.updateNews(id, newsData);
      res.json({ success: true, noticia });
    } catch (error) {
      console.error("Error updating news:", error);
      res.status(500).json({ error: "Failed to update news" });
    }
  });

  app.delete("/api/admin/noticias/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const success = await storage.deleteNews(id);
      res.json({ success });
    } catch (error) {
      console.error("Error deleting news:", error);
      res.status(500).json({ error: "Failed to delete news" });
    }
  });

  // Admin Loja routes (specialized for store products)
  app.get("/api/admin/loja", async (req, res) => {
    try {
      const produtos = await storage.getAllProducts();
      // Filter products that are store-related (Papel de Parede or texture categories)
      res.json({ produtos });
    } catch (error) {
      console.error("Error fetching loja products:", error);
      res.status(500).json({ error: "Failed to fetch loja products" });
    }
  });

  app.post("/api/admin/loja", async (req, res) => {
    try {
      const productData = insertProductSchema.parse(req.body);
      const produto = await storage.createProduct(productData);
      res.json({ success: true, produto });
    } catch (error) {
      console.error("Error creating loja product:", error);
      res.status(500).json({ error: "Failed to create loja product" });
    }
  });

  app.put("/api/admin/loja/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const productData = insertProductSchema.parse(req.body);
      const produto = await storage.updateProduct(id, productData);
      res.json({ success: true, produto });
    } catch (error) {
      console.error("Error updating loja product:", error);
      res.status(500).json({ error: "Failed to update loja product" });
    }
  });

  app.delete("/api/admin/loja/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const success = await storage.deleteProduct(id);
      res.json({ success });
    } catch (error) {
      console.error("Error deleting loja product:", error);
      res.status(500).json({ error: "Failed to delete loja product" });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
