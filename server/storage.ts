import { type User, type InsertUser, type Contact, type InsertContact, type Product, type InsertProduct, type News, type InsertNews, type Slide, type InsertSlide, users, contacts, products, news, slides } from "@shared/schema";
import { randomUUID } from "crypto";
import { db } from "./db";
import { eq, desc } from "drizzle-orm";

// modify the interface with any CRUD methods
// you might need

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  createContact(contact: InsertContact): Promise<Contact>;
  getContacts(): Promise<Contact[]>;
  getAllContacts(): Promise<Contact[]>;
  getFeaturedProducts(): Promise<Product[]>;
  getAllProducts(): Promise<Product[]>;
  updateProduct(id: string, product: InsertProduct): Promise<Product>;
  deleteProduct(id: string): Promise<boolean>;
  getRecentNews(): Promise<News[]>;
  getAllNews(): Promise<News[]>;
  updateNews(id: string, news: InsertNews): Promise<News>;
  deleteNews(id: string): Promise<boolean>;
  createProduct(product: InsertProduct): Promise<Product>;
  createNews(news: InsertNews): Promise<News>;
  getSlides(): Promise<Slide[]>;
  createSlide(slide: InsertSlide): Promise<Slide>;
  updateSlide(id: string, slide: InsertSlide): Promise<Slide>;
  deleteSlide(id: string): Promise<boolean>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private contacts: Map<string, Contact>;

  constructor() {
    this.users = new Map();
    this.contacts = new Map();
  }

  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async createContact(insertContact: InsertContact): Promise<Contact> {
    const id = randomUUID();
    const contact: Contact = { 
      ...insertContact, 
      id, 
      createdAt: new Date(),
      telefone: insertContact.telefone ?? null,
      empresa: insertContact.empresa ?? null,
      ficheiros: insertContact.ficheiros ?? null
    };
    this.contacts.set(id, contact);
    return contact;
  }

  async getContacts(): Promise<Contact[]> {
    return Array.from(this.contacts.values());
  }

  async getAllContacts(): Promise<Contact[]> {
    return Array.from(this.contacts.values()).sort((a, b) => 
      new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime()
    );
  }

  async getFeaturedProducts(): Promise<Product[]> {
    return [];
  }

  async getAllProducts(): Promise<Product[]> {
    return [];
  }

  async updateProduct(id: string, product: InsertProduct): Promise<Product> {
    throw new Error("Product update not implemented in memory storage");
  }

  async deleteProduct(id: string): Promise<boolean> {
    return false;
  }

  async getRecentNews(): Promise<News[]> {
    return [];
  }

  async getAllNews(): Promise<News[]> {
    return [];
  }

  async updateNews(id: string, news: InsertNews): Promise<News> {
    throw new Error("News update not implemented in memory storage");
  }

  async deleteNews(id: string): Promise<boolean> {
    return false;
  }

  async createProduct(product: InsertProduct): Promise<Product> {
    const id = randomUUID();
    const newProduct: Product = { ...product, id, createdAt: new Date(), destaque: product.destaque ?? false };
    return newProduct;
  }

  async createNews(newsItem: InsertNews): Promise<News> {
    const id = randomUUID();
    const newNews: News = { ...newsItem, id, createdAt: new Date(), data: newsItem.data ?? new Date() };
    return newNews;
  }

  async getSlides(): Promise<Slide[]> {
    return [];
  }

  async createSlide(slide: InsertSlide): Promise<Slide> {
    throw new Error("Slide creation not implemented in memory storage");
  }

  async updateSlide(id: string, slide: InsertSlide): Promise<Slide> {
    throw new Error("Slide update not implemented in memory storage");
  }

  async deleteSlide(id: string): Promise<boolean> {
    return false;
  }
}

export class DatabaseStorage implements IStorage {
  async getUser(id: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db.insert(users).values(insertUser).returning();
    return user;
  }

  async createContact(insertContact: InsertContact): Promise<Contact> {
    const [contact] = await db.insert(contacts).values(insertContact).returning();
    return contact;
  }

  async getContacts(): Promise<Contact[]> {
    return await db.select().from(contacts);
  }

  async getAllContacts(): Promise<Contact[]> {
    return await db.select().from(contacts).orderBy(desc(contacts.createdAt));
  }

  async getFeaturedProducts(): Promise<Product[]> {
    return await db.select().from(products).where(eq(products.destaque, true)).orderBy(desc(products.createdAt));
  }

  async getRecentNews(): Promise<News[]> {
    return await db.select().from(news).orderBy(desc(news.data)).limit(3);
  }

  async createProduct(insertProduct: InsertProduct): Promise<Product> {
    const [product] = await db.insert(products).values(insertProduct).returning();
    return product;
  }

  async createNews(insertNews: InsertNews): Promise<News> {
    const [newsItem] = await db.insert(news).values(insertNews).returning();
    return newsItem;
  }

  async getAllProducts(): Promise<Product[]> {
    return await db.select().from(products).orderBy(desc(products.createdAt));
  }

  async updateProduct(id: string, product: InsertProduct): Promise<Product> {
    const [updatedProduct] = await db.update(products).set(product).where(eq(products.id, id)).returning();
    return updatedProduct;
  }

  async deleteProduct(id: string): Promise<boolean> {
    const result = await db.delete(products).where(eq(products.id, id));
    return result.rowCount !== null && result.rowCount > 0;
  }

  async getAllNews(): Promise<News[]> {
    return await db.select().from(news).orderBy(desc(news.data));
  }

  async updateNews(id: string, newsData: InsertNews): Promise<News> {
    const [updatedNews] = await db.update(news).set(newsData).where(eq(news.id, id)).returning();
    return updatedNews;
  }

  async deleteNews(id: string): Promise<boolean> {
    const result = await db.delete(news).where(eq(news.id, id));
    return result.rowCount !== null && result.rowCount > 0;
  }

  async getSlides(): Promise<Slide[]> {
    return await db.select().from(slides).where(eq(slides.active, true)).orderBy(slides.order_position);
  }

  async createSlide(slide: InsertSlide): Promise<Slide> {
    const [newSlide] = await db.insert(slides).values(slide).returning();
    return newSlide;
  }

  async updateSlide(id: string, slide: InsertSlide): Promise<Slide> {
    const [updatedSlide] = await db.update(slides).set(slide).where(eq(slides.id, id)).returning();
    return updatedSlide;
  }

  async deleteSlide(id: string): Promise<boolean> {
    const result = await db.delete(slides).where(eq(slides.id, id));
    return result.rowCount !== null && result.rowCount > 0;
  }
}

// Use database storage for production
export const storage = new DatabaseStorage();
