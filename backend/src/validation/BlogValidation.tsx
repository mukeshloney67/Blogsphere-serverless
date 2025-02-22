import { z } from "zod";

// Create Blog Validation Schema
export const createBlogSchema = z.object({
  title: z.string().min(1, "Title is required"),
  content: z.string().min(1, "Content cannot be empty")
});
export type CreateBlogSchema = z.infer<typeof createBlogSchema>;

// Update Blog Validation Schema
export const updateBlogSchema = z.object({
  id: z.coerce.number(),  // ✅ Ensures ID is always a number, even if received as a string
  title: z.string().min(1, "Title is required"),
  content: z.string().min(1, "Content cannot be empty")
});
export type UpdateBlogSchema = z.infer<typeof updateBlogSchema>;

// Blog ID Validation Schema (For fetching a single blog)
export const blogIdSchema = z.object({
  id: z.coerce.number()
});
export type BlogIdSchema = z.infer<typeof blogIdSchema>;
