import {z} from "zod"

export const signupUser = z.object({
    username: z.string().min(1),
    email: z.string().email(),
    password: z.string().min(6),
});

export const signinUser = z.object({
    email: z.string().email(),
    password: z.string(),
});

export const createPost = z.object({
  title: z.string().min(1),
  content: z.string().min(10),
  publish: z.boolean().default(false).optional(),
});

export const updatePost = z.object({
  title: z.string().min(1).optional(),
  content: z.string().min(10).optional(),
  publish: z.boolean().default(false).optional(),
});

export type SignupUser = z.infer<typeof signupUser>
export type SigninUser = z.infer<typeof signinUser>
export type CreatePost = z.infer<typeof createPost>;
export type UpdatePost = z.infer<typeof updatePost>;