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



  // Portfolio images from Object Storage - Simple test first
  app.get("/api/portfolio-images", async (req, res) => {
    try {
      console.log("🔍 Portfolio scan starting...");
      
      // Start with empty data structure - only add what actually exists
      const categories = new Map();
      
      // Test direct access to the known image
      const actualFile = 'IMG-20220324-WA0000.JPG';
      const actualCategory = 'camioes'; // Real folder name user created
      
      // Test if the image is accessible via HTTP (we know it works)
      try {
        const response = await fetch(`http://localhost:5000/public-objects/portfolio/${actualCategory}/${actualFile}`, { method: 'HEAD' });
        if (response.ok) {
          console.log(`✅ Confirmed: ${actualFile} exists in category '${actualCategory}'`);
          
          // Create real category structure based on what actually exists
          if (!categories.has(actualCategory)) {
            categories.set(actualCategory, {
              name: actualCategory.charAt(0).toUpperCase() + actualCategory.slice(1), // "camioes" -> "Camioes"
              subcategories: []
            });
          }
          
          // Add the actual image with its real filename
          const category = categories.get(actualCategory);
          category.subcategories.push({
            name: actualCategory, // Use folder name as subcategory 
            projects: [{
              id: `${actualCategory}-${Date.now()}`,
              title: actualFile.replace(/\.(jpg|jpeg|png|webp|gif)$/i, ''), // Use filename without extension
              image: `portfolio/${actualCategory}/${actualFile}`,
              category: actualCategory,
              subcategory: actualCategory
            }]
          });
        } else {
          console.log(`❌ Image not accessible: ${actualFile}`);
        }
      } catch (error) {
        console.log(`❌ Error testing image access:`, error);
      }
      
      // Convert Map to Array for response
      const result = Array.from(categories.values());
      console.log(`📊 Found ${result.length} categories with real images`);
      res.json(result);
    } catch (error) {
      console.error("❌ Error:", error);
      res.json([]);
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

      // Store contact in database
      const contact = await storage.createContact(contactData);

      // Send emails in parallel - commented out for now to avoid errors
      // await Promise.all([
      //   sendContactEmail(contactData),
      //   sendAutoReplyEmail(contactData.email, contactData.nome)
      // ]);

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

  // Debug: List all public objects
  app.get("/api/debug-storage", async (req, res) => {
    try {
      console.log("🔍 Debug: Checking Object Storage structure...");
      
      // Get the public search paths to understand the bucket structure
      const publicPaths = process.env.PUBLIC_OBJECT_SEARCH_PATHS?.split(',') || [];
      console.log("Public search paths:", publicPaths);
      
      const results = {
        bucketConfig: {
          defaultBucketId: process.env.DEFAULT_OBJECT_STORAGE_BUCKET_ID,
          publicSearchPaths: publicPaths,
          privateDir: process.env.PRIVATE_OBJECT_DIR
        },
        testResults: [] as string[]
      };
      
      // Test different possible paths
      const testPaths = [
        "portfolio/camioes",
        "portfolio/camioes/1.jpg",
        "portfolio/camioes/teste.jpg",
        "portfolio/camioes/exemplo.png",
        "camioes/1.jpg",
        "camioes/teste.jpg"
      ];
      
      for (const testPath of testPaths) {
        try {
          const file = await objectStorageService.searchPublicObject(testPath);
          if (file) {
            results.testResults.push(`✅ Found: ${testPath} -> ${file.name}`);
            console.log(`✅ Found: ${testPath}`);
          } else {
            results.testResults.push(`❌ Not found: ${testPath}`);
            console.log(`❌ Not found: ${testPath}`);
          }
        } catch (error) {
          results.testResults.push(`❌ Error testing ${testPath}: ${error}`);
          console.log(`❌ Error testing ${testPath}:`, error);
        }
      }
      
      res.json(results);
    } catch (error) {
      console.error("Debug error:", error);
      res.status(500).json({ error: error instanceof Error ? error.message : 'Unknown error' });
    }
  });

  // Basic health check
  app.get("/api/health", (req, res) => {
    res.json({ status: "OK", timestamp: new Date().toISOString() });
  });

  const httpServer = createServer(app);
  return httpServer;
}

// Function to automatically scan portfolio folders in Object Storage
async function scanPortfolioFolders(objectStorageService: ObjectStorageService) {
  try {
    const portfolioData: {
      name: string;
      subcategories: {
        name: string;
        projects: {
          id: string;
          title: string;
          image: string;
          category: string;
          subcategory: string;
        }[];
      }[];
    }[] = [];

    // Define categories to scan
    const allCategories = [
      'design-grafico', 'impressao-digital', 'papel-parede', 'decoracao-viaturas',
      'sinaletica', 'material-promocional', 'camioes', 'projetos', 'trabalhos'
    ];

    // Scan each possible category
    for (const category of allCategories) {
      const categoryData = {
        name: category.replace(/-/g, ' ').replace(/\b\w/g, (l: string) => l.toUpperCase()),
        subcategories: [] as any[]
      };

      // Try to find any images directly in the category folder first
      const categoryPath = `portfolio/${category}`;
      const directImages = await scanForImages(objectStorageService, categoryPath, category, category);
      
      if (directImages.length > 0) {
        categoryData.subcategories.push({
          name: "Geral",
          projects: directImages
        });
      }

      // Try to find subcategories
      const possibleSubcategories = [
        'logotipos', 'branding', 'identidade-visual', 'geral',
        'banners', 'folhetos', 'cartazes', 'displays', 'outdoors',
        'texturas', '3d', 'padroes', 'luxo', 'classico',
        'viaturas', 'frotas', 'personalizacao', 'decoracao',
        'placas', 'direcionais', 'informativas', 'exteriores',
        'brindes', 'promocional', 'eventos', 'corporativo'
      ];

      for (const subcategory of possibleSubcategories) {
        const subcategoryPath = `portfolio/${category}/${subcategory}`;
        const subcategoryImages = await scanForImages(objectStorageService, subcategoryPath, category, subcategory);
        
        if (subcategoryImages.length > 0) {
          categoryData.subcategories.push({
            name: subcategory.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
            projects: subcategoryImages
          });
        }
      }

      // Only add category if it has subcategories with projects
      if (categoryData.subcategories.length > 0) {
        portfolioData.push(categoryData);
      }
    }

    console.log(`📁 Portfolio scan complete: Found ${portfolioData.length} categories with content`);
    return portfolioData;
  } catch (error) {
    console.error("Error scanning portfolio folders:", error);
    return [];
  }
}

// Helper function to scan for images in a specific path
async function scanForImages(objectStorageService: ObjectStorageService, basePath: string, category: string, subcategory: string) {
  const projects = [];
  const imageExtensions = ['jpg', 'jpeg', 'png', 'webp', 'gif', 'bmp'];
  
  // Try numbered files (1.jpg, 2.jpg, etc.)
  for (let i = 1; i <= 50; i++) {
    for (const ext of imageExtensions) {
      const fileName = `${i}.${ext}`;
      const fullPath = `${basePath}/${fileName}`;
      
      try {
        const file = await objectStorageService.searchPublicObject(fullPath);
        if (file) {
          projects.push({
            id: `${category}-${subcategory}-${i}`,
            title: `${subcategory.replace(/-/g, ' ')} ${i}`,
            image: fileName,
            category: category,
            subcategory: subcategory
          });
        }
      } catch (error) {
        // Image not found, continue
      }
    }
  }

  // Try common descriptive names
  const commonNames = [
    'exemplo', 'amostra', 'demo', 'projeto', 'trabalho', 'obra',
    'banner', 'cartaz', 'folheto', 'logotipo', 'identidade',
    'textura', 'padrao', 'viatura', 'camiao', 'placa'
  ];
  
  for (const name of commonNames) {
    for (const ext of imageExtensions) {
      const fileName = `${name}.${ext}`;
      const fullPath = `${basePath}/${fileName}`;
      
      try {
        const file = await objectStorageService.searchPublicObject(fullPath);
        if (file) {
          projects.push({
            id: `${category}-${subcategory}-${name}`,
            title: `${subcategory.replace(/-/g, ' ')} - ${name}`,
            image: fileName,
            category: category,
            subcategory: subcategory
          });
        }
      } catch (error) {
        // Image not found, continue
      }
    }
  }
  
  return projects;
}