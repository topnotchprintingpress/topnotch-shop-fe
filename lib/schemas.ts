import { z } from "zod";

// Schema for user registration
export const registerSchema = z
  .object({
    username: z.string().min(1, "Name is required").max(50, "Name is too long"),
    email: z.string().email("Invalid email address"),
    password1: z.string().min(8, "Password must be at least 8 characters long"),
    password2: z.string().min(8, "Confirm password must match"),
  })
  .refine((data) => data.password1 === data.password2, {
    message: "Passwords do not match",
    path: ["confirmPassword"], // Attach error to confirmPassword field
  });

// Schema for user login
export const loginSchema = z.object({
  identifier: z
    .string()
    .min(1, "Username or email is required")
    .max(50, "Username or email is too long")
    .refine((val) => /\S+@\S+\.\S+/.test(val) || val.length > 0, {
      message: "Must be a valid email or username",
    }),
  password: z.string().min(8, "Password must be at least 8 characters long"),
});

export const shippingSchema = z.object({
  first_name: z
    .string()
    .min(1, "First Name is required")
    .max(50, "Name is too long"),
  last_name: z
    .string()
    .min(1, "Last Name is required")
    .max(50, "Name is too long"),
  email: z.string().email("Invalid email address").optional(),
  street_address: z
    .string()
    .min(1, "Street Address is required")
    .max(50, "Name is too long"),
  apartment: z.string().optional(),
  city: z
    .string()
    .min(1, "Please specify your city")
    .max(50, "City Name is too long")
    .optional(),
  county: z
    .string()
    .min(1, "Please specify your county/state")
    .max(50, "County Name is too long"),
  country: z
    .string()
    .min(1, "Please specify your country")
    .max(50, "Country Name is too long"),
  postal_code: z.string().optional(),
  phone_number: z
    .string()
    .min(1, "Phone number is required")
    .max(12, "Phone Number is too long"),
});

// Schema for updating user profile
export const profileSchema = z.object({
  name: z
    .string()
    .min(1, "Name is required")
    .max(50, "Name is too long")
    .optional(),
  email: z.string().email("Invalid email address").optional(),
  bio: z.string().max(500, "Bio is too long").optional(),
});

// Schema for resetting password
export const resetPasswordSchema = z.object({
  email: z.string().email("Invalid email address"),
});

// Schema for changing password
export const changePasswordSchema = z
  .object({
    currentPassword: z.string().min(8, "Current password is required"),
    newPassword: z
      .string()
      .min(8, "New password must be at least 8 characters long"),
    confirmNewPassword: z.string().min(8, "Confirm new password must match"),
  })
  .refine((data) => data.newPassword === data.confirmNewPassword, {
    message: "Passwords do not match",
    path: ["confirmNewPassword"], // Attach error to confirmNewPassword field
  });

// Export all schemas
export type RegisterInput = z.infer<typeof registerSchema>;
export type LoginInput = z.infer<typeof loginSchema>;
export type ProfileInput = z.infer<typeof profileSchema>;
export type ResetPasswordInput = z.infer<typeof resetPasswordSchema>;
export type ChangePasswordInput = z.infer<typeof changePasswordSchema>;
