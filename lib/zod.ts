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

const assetsSchema = z
  .object({
    totalAssets: z.number().optional(),
    lastUpdate: z.number().optional(),
    data: z.array(z.number()).optional(),
  })
  .optional();
  
export const userProfileSchema = z.object({
  name: z.string().optional(),
  imgId: z.number().optional(),
  country: z
    .object({
      name: z.string().optional(),
      currencySymbol: z.string().optional(),
      currencyCode: z.string().optional(),
    })
    .optional(),
  metal: z.enum(["gold", "silver"]).optional(),
  assets: assetsSchema,
  zDay: z.number().optional().nullable(),
  isZakater: z.boolean().optional(),
  zakatPaid: z.number().optional(),
  history: z
    .array(
      z.object({
        currencySymbol: z.string().optional(),
        assets: assetsSchema,
        zakatAmount: z.number().optional(),
        date: z.number().optional(),
      })
    )
    .optional(),
});
export type UserProlfileType = z.infer<typeof userProfileSchema>;
