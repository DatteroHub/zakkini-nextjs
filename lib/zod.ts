import { z } from "zod";

export const emailSchema = z
  .string()
  .email({ message: "Please enter a valid email." })
  .trim();

export const passwordSchema = z
  .string()
  .min(8, { message: "Should be at least 8 characters long." })
  .regex(/[a-zA-Z]/, { message: "Should contain at least one letter." })
  .regex(/[0-9]/, { message: "Should contain at least one number." })
  .regex(/[#?!@$%^&*-]/, {
    message: "Should contain at least one special character.",
  })
  .trim();

export const datteroUserScherma = z.object({
  userName: z.string().optional(),
  email: z.string().email().optional(),
  emailVerified: z.boolean().optional(),
  authProviders: z.array(z.string()).optional(),
  datteroApps: z.array(z.string()).optional(),
});
export type DatteroUserType = z.infer<typeof datteroUserScherma>;

export const zakkiniUserScherma = z.object({
  userName: z.string().optional(),
  email: z.string().email().optional(),
});
export type ZakkiniUserType = z.infer<typeof zakkiniUserScherma>;

export const userProfileSchema = z.object({
  name: z.string().optional(),
  imgId: z.number().optional(),
  country: z.string().optional(),
  metal: z.string().optional(),
  hDay: z.string().optional(),
  isZakater: z.boolean().optional(),
});
export type UserProlfileType = z.infer<typeof userProfileSchema>;
