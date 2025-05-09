import { Hono } from "hono";
import { getPrisma } from "../prismaFunction";
import { sign } from "hono/jwt";
import { signinUser, signupUser } from "@devxhustler/common";
export const userRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    SECRET_KEY: string;
  };
  Variables: {
    userId: string;
  };
}>();





userRouter.post("/signup/", async (c) => {
  try {
    const prisma = getPrisma(c.env.DATABASE_URL);

    // Validate the request body
    const body = await c.req.json();
    const newUser = signupUser.safeParse(body);

    //if validation faild then send response with error
    if (!newUser.success) {
      c.status(400);
      return c.json({
        error: "Validation error",
      });
    }
    const { name, email, password } = newUser.data;

    // if validation is successfull then check if user with same exists or not
    const existUser = await prisma.user.findFirst({
      where: {
        email: email,
      },
    });

    //if user with same email exists than return with error
    if (existUser) {
      c.status(400);
      return c.json({
        error: "User already exist",
      });
    }

    const res = await prisma.user.create({
      data: {
        name: name,
        email: email,
        password: password,
      },
    });
    return c.json({
      message: "'user created successfully'",
      user: res,
    });
  } catch (e) {
    c.status(500);
    return c.json({
      message: "Internal Server Error",
    });
  }
});

userRouter.post("/signin/", async (c) => {
  try {
    const prisma = getPrisma(c.env.DATABASE_URL);

    const body = await c.req.json();
    const userInfo = signinUser.safeParse(body);

    //if validation faild then send response with error
    if (!userInfo.success) {
      c.status(400);
      return c.json({
        error: "Validation error",
      });
    }
    const { email, password } = userInfo.data;

    //checking user exist or not
    const existUser = await prisma.user.findFirst({
      where: {
        email,
      },
    });

    //if not then return with error
    if (!existUser) {
      c.status(404);
      return c.json({
        error: "User not found",
      });
    }

    //if user found then compare password
    if (existUser.password !== password) {
      c.status(404);
      return c.json({
        error: "Password doesn't match",
      });
    }

    const token = await sign({ id: existUser.id }, c.env.SECRET_KEY);
    c.res.headers.set("Authorization", `bearer ${token}`);
    return c.json({
      jwt: token,
    });
  } catch (e) {
    c.status(500);
    return c.json({
      message: "Internal Server Error",
    });
  }
});
