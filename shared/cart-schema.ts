import { z } from "zod";

// Cart item schema for wallpaper textures
export const cartItemSchema = z.object({
  id: z.string(),
  type: z.literal('papel-parede'),
  textureName: z.string(),
  textureImage: z.string(),
  acabamento: z.enum(['brilho', 'mate']),
  laminacao: z.boolean(),
  precoBase: z.number(),
  precoTotal: z.number(),
  quantity: z.number().min(1).default(1),
  createdAt: z.date().default(() => new Date())
});

export const cartSchema = z.object({
  items: z.array(cartItemSchema),
  total: z.number(),
  updatedAt: z.date().default(() => new Date())
});

export type CartItem = z.infer<typeof cartItemSchema>;
export type Cart = z.infer<typeof cartSchema>;

// Create cart item insert schema
export const createCartItemSchema = cartItemSchema.omit({
  id: true,
  createdAt: true
});

export type CreateCartItem = z.infer<typeof createCartItemSchema>;