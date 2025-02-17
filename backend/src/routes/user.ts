import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { Hono } from "hono";
import {sign} from 'hono/jwt'
import { signinInput,signupInput } from "@mukeshloney/medium-common";

export const userRouter = new Hono<{
	Bindings: {
		DATABASE_URL: string
        JWT_SECRET: string
	};
}>();


userRouter.post("/signup", async (c) => {
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());
    const body = await c.req.json();
    const success = signupInput.safeParse(body);
    if(!success){
        c.status(411) // inputs are wrong
        return c.json({
        message: "Inputs are not correct"
        })
    }
    try {
      const user= await prisma.user.create({
        data: {
          username: body.username,
          password: body.password,
          name: body.name
        },
      })
    
      const token = await sign({ id : user.id}, c.env.JWT_SECRET)
      
     return c.json({
      message: "User created successfully",
      jwt:token
     })
    } catch (error) {
      console.log(error);
      c.status(411);
      return c.text("Invalid");
    }
    
  })
  
  userRouter.post('/signin', async (c) => {
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
      }).$extends(withAccelerate())
      const body =  await c.req.json();
      const success = signinInput.safeParse(body)
      if(!success){
        c.status(411) // inputs are wrong
        return c.json({
        message: "Inputs are not correct"
        })
      }
      try {
        const user = await prisma.user.findFirst({
          where: {
            username: body.email,
            password: body.password
          }
          })
          if(!user){
            c.status(403);  // 403 Status code for forbidden and 401 means unauthorized--
            return c.json({message: 'Invalid credentials'}) 
          }
          const jwt = await sign({ id: user.id }, c.env.JWT_SECRET);
          return c.json({ 
            jwt,
            message: "Logged in"
           });
      } catch (error) {
        console.log(error);
        return c.text("incorrect creds")
      }
   })

