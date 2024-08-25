import { string } from "zod";

export const emailSchema = string()
  .email({ message: "Please enter a valid email." })
  .trim();

export const passwordSchema = string()
  .min(8, { message: "Should be at least 8 characters long." })
  .regex(/[a-zA-Z]/, { message: "Should contain at least one letter." })
  .regex(/[0-9]/, { message: "Should contain at least one number." })
  .regex(/[#?!@$%^&*-]/, {
    message: "Should contain at least one special character.",
  })
  .trim();
