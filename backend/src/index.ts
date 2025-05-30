import { Hono } from "hono";
import { userRouter } from "./routes/user";
import { blogRouter } from "./routes/blog";
import { cors } from "hono/cors";

const app = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    SECRET_KEY: string;
  };
  Variables: {
    userId: string;
  };
}>();

app.use("*", cors());


app.route("/api/v1/user/", userRouter, );

//Authentication chek using jwt auth token
app.route("/api/v1/blog/", blogRouter);



export default app;
