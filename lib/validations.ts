import { z } from "zod";
import { SHIPMENT_TYPES } from "./constants";

// ---- Auth ----
export const registerSchema = z
  .object({
    name: z.string().min(2, "Name is required").max(120),
    email: z.string().email("Enter a valid email"),
    phone: z.string().max(40).optional().or(z.literal("")),
    password: z.string().min(8, "Password must be at least 8 characters").max(100),
    confirmPassword: z.string(),
  })
  .refine((d) => d.password === d.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export const loginSchema = z.object({
  email: z.string().email("Enter a valid email"),
  password: z.string().min(1, "Password is required"),
});

// ---- Quote request ----
export const quoteSchema = z.object({
  fullName: z.string().min(2, "Full name is required").max(120),
  email: z.string().email("Enter a valid email"),
  phone: z.string().min(7, "Phone number is required").max(40),
  companyName: z.string().max(120).optional().or(z.literal("")),
  shipmentType: z.enum(SHIPMENT_TYPES, {
    errorMap: () => ({ message: "Select a shipment type" }),
  }),
  pickupCountry: z.string().max(80).optional().or(z.literal("")),
  pickupState: z.string().max(80).optional().or(z.literal("")),
  pickupCity: z.string().max(80).optional().or(z.literal("")),
  pickupAddress: z.string().min(3, "Pickup address is required").max(300),
  destinationCountry: z.string().max(80).optional().or(z.literal("")),
  destinationState: z.string().max(80).optional().or(z.literal("")),
  destinationCity: z.string().max(80).optional().or(z.literal("")),
  destinationAddress: z.string().min(3, "Destination address is required").max(300),
  packageDescription: z.string().min(3, "Describe the package").max(1000),
  packageWeight: z.coerce.number().positive().optional().or(z.literal("")),
  packageDimensions: z.string().max(120).optional().or(z.literal("")),
  quantity: z.coerce.number().int().positive().optional().or(z.literal("")),
  preferredShippingDate: z.string().optional().or(z.literal("")),
  additionalNotes: z.string().max(2000).optional().or(z.literal("")),
  consent: z.literal(true, {
    errorMap: () => ({ message: "You must accept to continue" }),
  }),
});

export type QuoteInput = z.infer<typeof quoteSchema>;

// ---- Contact ----
export const contactSchema = z.object({
  name: z.string().min(2, "Name is required").max(120),
  email: z.string().email("Enter a valid email"),
  phone: z.string().max(40).optional().or(z.literal("")),
  subject: z.string().min(2, "Subject is required").max(160),
  message: z.string().min(5, "Message is required").max(3000),
});

export type ContactInput = z.infer<typeof contactSchema>;

// ---- Public tracking ----
export const trackSchema = z.object({
  trackingCode: z.string().min(4, "Enter a tracking code").max(40),
});

// ---- Admin: quote pricing ----
export const quotePricingSchema = z.object({
  quoteId: z.string().min(1),
  estimatedPrice: z.coerce.number().nonnegative("Price must be 0 or more"),
  adminNote: z.string().max(2000).optional().or(z.literal("")),
});

// ---- Admin: create rider/operator ----
export const createRiderSchema = z
  .object({
    name: z.string().min(2, "Name is required").max(120),
    email: z.string().email("Enter a valid email"),
    phone: z.string().max(40).optional().or(z.literal("")),
    vehicleType: z.string().max(80).optional().or(z.literal("")),
    vehiclePlateNumber: z.string().max(40).optional().or(z.literal("")),
    password: z.string().min(8, "Password must be at least 8 characters").max(100),
  });

// ---- Rider/admin: shipment status update ----
export const statusUpdateSchema = z.object({
  shipmentId: z.string().min(1),
  status: z.string().min(1),
  note: z.string().max(1000).optional().or(z.literal("")),
});

// ---- Rider: proof of delivery ----
export const proofSchema = z.object({
  shipmentId: z.string().min(1),
  receiverName: z.string().max(120).optional().or(z.literal("")),
  note: z.string().max(1000).optional().or(z.literal("")),
  imageUrl: z.string().max(500).optional().or(z.literal("")),
});

// ---- Admin: payment status ----
export const paymentStatusSchema = z.object({
  shipmentId: z.string().min(1),
  paymentStatus: z.string().min(1),
  amount: z.coerce.number().nonnegative().optional().or(z.literal("")),
  method: z.string().optional().or(z.literal("")),
  transactionReference: z.string().max(120).optional().or(z.literal("")),
});
