import { z } from "zod";

// Signup Validation Schema
export const signupSchema = z.object({
  username: z.string().email("Invalid email format"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
  name: z.string().optional()
});
export type SignupSchema = z.infer<typeof signupSchema>;

// Signin Validation Schema
export const signinSchema = z.object({
  username: z.string().email("Invalid email format"),
  password: z.string().min(6, "Password must be at least 6 characters long")
});
export type SigninSchema = z.infer<typeof signinSchema>;
