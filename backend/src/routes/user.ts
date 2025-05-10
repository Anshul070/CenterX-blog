import { Hono } from "hono";
import { getPrisma } from "../prismaFunction";
import { sign, verify } from "hono/jwt";
import { signinUser, signupUser, updateUser } from "@devxhustler/common";

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
    const { username, email, password } = newUser.data;

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
        username: username,
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
    c.res.headers.set("Authorization", `Bearer ${token}`);
    c.res.headers.set("Access-Control-Expose-Headers", "Authorization");

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

userRouter.use("/*", async (c, next) => {
  try {
    //Check if token exist or not for authantication
    const token = c.req.header("Authorization")?.split(" ")[1];

    if (!token) {
      c.status(401);
      return c.text("You are not authorized");
    }
    const auth = await verify(token, c.env.SECRET_KEY);
    if (!auth) {
      return c.json({
        message: "You are not logged in",
      });
    }
    c.set("userId", auth.id as string);
    return await next();
  } catch (e) {
    c.status(401);
    return c.text("You are not authorized");
  }
});

userRouter.put("/update/", async (c) => {
  try {
    const prisme = getPrisma(c.env.DATABASE_URL);
    const body = await c.req.json();
    const userId = c.var.userId;
    const userInfo = updateUser.safeParse(body);
    //if validation faild then send response with error
    if (!userInfo.success) {
      c.status(400);
      return c.json({
        error: "Validation error",
      });
    }
    //checking user exist or not
    const user = await prisme.user.update({
      where: {
        id: userId,
      },
      data: body,
    });
    if (!user) {
      c.status(404);
      return c.json({
        error: "User not found",
      });
    }
    return c.json({
      message: "User updated successfully",
      user,
    });
  } catch (e) {
    c.status(500);
    return c.json({
      message: "Internal Server Error",
    });
  }
});

userRouter.get("/me/", async (c) => {
  try {
    const prisma = getPrisma(c.env.DATABASE_URL);
    const userId = c.var.userId;

    //checking user exist or not
    const user = await prisma.user.findFirst({
      where: {
        id: userId,
      },
      include : {
        posts : true
      }
    });

    if (!user) {
      c.status(404);
      return c.json({
        error: "User not found",
      });
    }

    return c.json({
      user,
    });
  } catch (e) {
    c.status(500);
    return c.json({
      message: "Internal Server Error",
    });
  }
});
