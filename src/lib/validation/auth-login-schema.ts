import { z } from "zod";

const requiredString = z.string().trim().min(1, "Harus diisi");

export const loginSchema = z.object({
    email: requiredString,
    password: requiredString,
});

export type LoginValues = z.infer<typeof loginSchema>;
