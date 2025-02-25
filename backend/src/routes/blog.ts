import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { Hono } from "hono";
import { verify } from "hono/jwt";
import { createBlogInput, updateBlogInput } from "@mukeshloney/medium-blog";

export const blogRouter = new Hono<{
        Bindings: {
            DATABASE_URL: string;
            JWT_SECRET: string;
        },
        Variables:{
            userId : string;
        }
    }>();

    blogRouter.use('/*', async (c, next) => {
        const header = c.req.header("authorization") || "";
        try {
            const user = await verify(header, c.env.JWT_SECRET)
        if(user) {
            // @ts-ignore
            c.set("userId", user.id);
            await next();
        } else {
            c.status(403);
            return c.json({
            message: "Unauthorized"
        });
    }
        } catch (error) {
            c.status(404);
            return c.json({
            message: "Unauthorized"
        });
        }
        
       })

    blogRouter.post('/',async (c) => {
        const body = await c.req.json();
        const success = createBlogInput.safeParse(body);
        if(!success.success) {
            c.status(411);
            return c.json({
                message: "Invalid request body"
            });
        }

        const prisma = new PrismaClient({
        datasourceUrl: c.env?.DATABASE_URL,
        }).$extends(withAccelerate())

       
        const authId = c.get("userId");
        const blog = await prisma.blog.create({
            data:{
                title: body.title,
                content: body.content,
                authorId: Number(authId)
            }
        })
        return c.json({
            id: blog.id
        })
   })
    blogRouter.put('/', async (c) => {
        const prisma = new PrismaClient({
        datasourceUrl: c.env?.DATABASE_URL,
        }).$extends(withAccelerate())
        const body = await c.req.json();
        const success = updateBlogInput.safeParse(body);
        if(!success.success) {
            c.status(411);
            return c.json({
                message: "Invalid request body"
            });
        }

        const blog = await prisma.blog.update({
            where:{
                id: body.id
            }, 
            data: {
                title: body.title,
                content: body.content
            }
        })
        return c.json({
            id : blog.id
        })

   })

    // ideally should add pagination--- TODO
    blogRouter.get('/bulk', async (c) => {
        const prisma =  new PrismaClient({
            datasourceUrl: c.env?.DATABASE_URL,
            }).$extends(withAccelerate());
            const blogs = await prisma.blog.findMany({
                select:{
                    id: true,
                    title: true,
                    content: true,
                    author: {
                        select:{
                            name: true
                        }
                    },
                    
                }
            });
            return c.json({
                blogs
            })
   })

    blogRouter.get("/:id", async (c)=>{
        const id = c.req.param("id");
        const prisma = new PrismaClient({
            datasourceUrl: c.env?.DATABASE_URL,
            }).$extends(withAccelerate());
       try {
        const blog = await prisma.blog.findFirst({
            where :{
                id : Number(id)
            },
            select:{
                id: true,
                title: true,
                content: true,
                author: {
                    select:{
                        name: true
                    }
                }
            }
        })
        return c.json({
            blog
        })
       } catch (error) {
            c.status(411);
            console.log(error)
            return c.text("Couldn't fetch blogs");
       }
    })

   