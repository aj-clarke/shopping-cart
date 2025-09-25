import { z } from "zod";

export const productSchema = z.object({
  _id: z.string(),
  title: z.string(),
  quantity: z.number(),
  price: z.number(),
});

export const newProductSchema = productSchema
  .omit({
    _id: true,
  })
  .loose();

export interface Test {
  _id: string;
  title: string;
  quantity: number;
  price: number;
}

// // export type Products = Product[];

export interface CartItem extends Test {
  productId: string;
}

export type Product = z.infer<typeof productSchema>;
export type NewProduct = z.infer<typeof newProductSchema>;
