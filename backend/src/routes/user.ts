import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { Hono } from "hono";
import { sign } from "hono/jwt";
import { signinInput, signupInput } from "@mukeshloney/medium-blog";  // ✅ Using your npm package

export const userRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
}>();

// ✅ Signup Route
userRouter.post("/signup", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const body = await c.req.json();
  console.log("📩 Received Signup Body:", body); // Debugging

  // ✅ Validate input using `signupInput` from your npm package
  const validationResult = signupInput.safeParse(body);
  if (!validationResult.success) {
    console.log("❌ Validation Failed:", validationResult.error.errors); // Debugging
    c.status(411);
    return c.json({
      message: "Invalid input data",
      errors: validationResult.error.errors,
    });
  }

  try {
    // ✅ Now using only validated data
    const user = await prisma.user.create({
      data: validationResult.data,
    });

    const token = await sign({ id: user.id }, c.env.JWT_SECRET);

    return c.json({
      message: "User created successfully",
      jwt: token,
    });
  } catch (error) {
    console.error("⚠️ Error creating user:", error);
    c.status(500);
    return c.text("Internal Server Error");
  }
});

// ✅ Signin Route
userRouter.post("/signin", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const body = await c.req.json();
  console.log("📩 Received Signin Body:", body); // Debugging

  // ✅ Validate input using `signinInput` from your npm package
  const validationResult = signinInput.safeParse(body);
  if (!validationResult.success) {
    console.log("❌ Validation Failed:", validationResult.error.errors); // Debugging
    c.status(411);
    return c.json({
      message: "Invalid input data",
      errors: validationResult.error.errors,
    });
  }

  try {
    // ✅ Now using only validated data
    const user = await prisma.user.findFirst({
      where: {
        username: validationResult.data.username,
        password: validationResult.data.password,
      },
    });

    if (!user) {
      c.status(403);
      return c.json({ message: "Invalid credentials" });
    }

    const jwt = await sign({ id: user.id }, c.env.JWT_SECRET);
    return c.json({
      jwt,
      message: "Logged in successfully",
    });
  } catch (error) {
    console.error("⚠️ Error during signin:", error);
    c.status(500);
    return c.text("Internal Server Error");
  }
});
