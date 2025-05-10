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


export const updateUser = z.object({
    name: z.string().optional(),
    username: z.string().optional(),
    email: z.string().email().optional(),
    password: z.string().optional(),
    bio: z.string().optional(),
})

export const createPost = z.object({
  title: z.string().min(1),
  content: z.string().min(1),
  published: z.boolean().default(false).optional(),
});

export const updatePost = z.object({
  title: z.string().min(1).optional(),
  content: z.string().min(10).optional(),
  published: z.boolean().optional(),
});

export type SignupUser = z.infer<typeof signupUser>
export type SigninUser = z.infer<typeof signinUser>
export type UpdateUser = z.infer<typeof updateUser>
export type CreatePost = z.infer<typeof createPost>;
export type UpdatePost = z.infer<typeof updatePost>;