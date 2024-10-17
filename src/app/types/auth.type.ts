import { z } from "zod";

export const LoginBody = z.object({
  username: z.string().email(),
  password: z.string().min(6).max(100)
})



export type LoginBodyType = z.TypeOf<typeof LoginBody>