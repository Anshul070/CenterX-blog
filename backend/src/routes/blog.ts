import { Hono } from "hono";
import { getPrisma } from "../prismaFunction";
import { verify } from "hono/jwt";
import { createPost, updatePost } from "@devxhustler/common"

export const blogRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    SECRET_KEY: string;
  },
  Variables: {
    userId: string;
  };
}>();



//Middleware
blogRouter.use("/*", async (c, next) => {
  try {
    //Check if token exist or not for authantication
    const token = c.req.header("Authorization")?.split(" ")[1];

    if (!token) {
      c.status(401);
      return c.text("You are not authorized");
    }
    const auth = await verify(token, c.env.SECRET_KEY);
    if(!auth){
        return c.json({
            message : "You are not logged in"
        })
    }
    c.set("userId", auth.id as string);
    return await next();
  } catch (e) {
    c.status(401);
    return c.text("You are not authorized");
  }
})

// Uploading new post
blogRouter.post("/", async (c) => {
  try {
    const prisma = getPrisma(c.env.DATABASE_URL);

    //Get body and run post validation
    const body = await c.req.json();
    const newPost = createPost.safeParse(body);

    //if validation fail return
    if (!newPost.success) {
      c.status(400);
      return c.json({
        message: "Validaition error",
      });
    }

    //If validation pass then create post
    const res = await prisma.post.create({
      data: {
        title: newPost.data.title,
        content: newPost.data.content,
        published: newPost.data.publish,
        // authorId : c.var.userId
        author: {
          connect: {
            id: c.var.userId,
          },
        },
      },
    });

    return c.json({
      message: "post done",
      userId: c.var.userId,
      post: res,
    });
  } catch (e) {
    c.status(500);
    return c.json({
      message: "Internal Server Error",
    });
  }
});

//Fetching all posts
blogRouter.get("/bulk/", async (c) => {
  try {
    const prisma = getPrisma(c.env.DATABASE_URL);
    //Fetch all the posts form database
    const res = await prisma.post.findMany({
      where: {
        published: true,
      },
      select :{
        id: true,
        title: true,
        content: true,
        published: true,
        createdAt: true,
        author: {
          select : {
            name : true,
            username: true
          }
        }
      }
    });
    return c.json({
      published: false,
      posts: res,
    });
  } catch (e) {
    c.status(500);
    return c.json({
      message: "Internal Server Error",
    });
  }
});

//Fetching logged users posts
blogRouter.get("/mine/", async (c) => {
  try {
    const prisma = getPrisma(c.env.DATABASE_URL);
    //Fetch all the posts form database
    const res = await prisma.post.findMany({
      where: {
        authorId: c.var.userId,
      },
      select :{
        id: true,
        title: true,
        content: true,
        published: true,
        createdAt: true,
        author: {
          select : {
            name : true,
            username: true,
          }
        }
      }
    });
    return c.json({
      posts: res,
    });
  } catch (e) {
    c.status(500);
    return c.json({
      message: "Internal Server Error",
    });
  }
});

//Fetching post by id
blogRouter.get("/:id", async (c) => {
  try {
    const prisma = getPrisma(c.env.DATABASE_URL);
    //Fetching the post using id from params
    const res = await prisma.post.findFirst({
      where: {
        id: c.req.param().id,
      },
      select :{
        id: true,
        title: true,
        content: true,
        published: true,
        createdAt: true,
        author: {
          select : {
            name : true,
            username: true,
          }
        }
      }
    });
    return c.json(res);
  } catch (e) {
    c.status(500);
    return c.json({
      message: "Internal Server Error",
    });
  }
});

//Updating the blog
blogRouter.put("/:id", async (c) => {
  try {
    const prisma = getPrisma(c.env.DATABASE_URL);

    //Getting data from body
    const body = await c.req.json();
    const updatedPost = updatePost.safeParse(body)

    if(!updatedPost.success){
        c.status(400)
        return c.json({
            message : "Validation error"
        })
    }
    //Updating the post
    const res = await prisma.post.update({
      where: {
        id: c.req.param().id,
        authorId: c.var.userId,
      },
      data: updatedPost.data,
    });
    if (!res) {
      c.status(404);
      return c.json({
        message: "Post not found",
      });
    }
    return c.json({
      message: "Post updated successfully",
    });
  } catch (e) {
    c.status(500);
    return c.json({
      message: "Internal Server Error",
    });
  }
});

//Deleting the blog
blogRouter.delete("/:id", async (c) => {
  try {
    const prisma = getPrisma(c.env.DATABASE_URL);

    //Deleting the post
    const res = await prisma.post.delete({
      where: {
        id: c.req.param().id,
        authorId: c.var.userId,
      },
    });
    console.log(res);

    if (!res) {
      c.status(404);
      return c.json({
        message: "Post not found",
      });
    }

    return c.json({
      message: "Post deleted successfully",
    });
  } catch (e) {
    c.status(500);
    return c.json({
      message: "Internal Server Error",
    });
  }
});
