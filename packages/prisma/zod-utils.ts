import { z } from "zod";

export const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/

export const signupSchema = z.object({
    username: z.string().min(3, "Username must be at least 3 characters long.").max(32, "Username must be at most 32 characters long."),
    email: z.string().regex(EMAIL_REGEX, "Invalid email format").optional(),
    password: z.string().min(8, "Password must be at least 8 characters long.")
})
