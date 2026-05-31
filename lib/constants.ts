// Centralized enum-like constants + state-machine rules.
// Kept in one place so the DB layer, Zod validation, and UI stay in sync.

export const ROLES = ["ADMIN", "CUSTOMER", "RIDER"] as const;
export type Role = (typeof ROLES)[number];

export const USER_STATUSES = ["ACTIVE", "INACTIVE", "SUSPENDED"] as const;

export const SHIPMENT_TYPES = [
  "Air freight",
  "Sea freight",
  "Land transport",
  "Customs clearance",
  "Door-to-door delivery",
  "Warehousing",
  "Freight consulting",
  "Other",
] as const;
export type ShipmentType = (typeof SHIPMENT_TYPES)[number];

export const SHIPMENT_STATUSES = [
  "PENDING",
  "QUOTED",
  "APPROVED",
  "REJECTED",
  "ASSIGNED",
  "ACCEPTED",
  "PICKED_UP",
  "IN_TRANSIT",
  "DELIVERED",
  "FAILED",
  "CANCELLED",
] as const;
export type ShipmentStatus = (typeof SHIPMENT_STATUSES)[number];

export const PAYMENT_STATUSES = [
  "UNPAID",
  "PENDING_CONFIRMATION",
  "PAID",
  "FAILED",
  "REFUNDED",
] as const;
export type PaymentStatus = (typeof PAYMENT_STATUSES)[number];

export const PAYMENT_METHODS = [
  "CASH",
  "BANK_TRANSFER",
  "PAYSTACK",
  "FLUTTERWAVE",
  "OTHER",
] as const;

export const RIDER_AVAILABILITY = [
  "AVAILABLE",
  "BUSY",
  "OFFLINE",
  "SUSPENDED",
] as const;

export const CONTACT_STATUSES = ["NEW", "READ", "RESOLVED"] as const;

// Allowed status transitions for the shipment state machine.
// Used server-side before persisting any status change.
export const SHIPMENT_TRANSITIONS: Record<ShipmentStatus, ShipmentStatus[]> = {
  PENDING: ["QUOTED", "REJECTED", "CANCELLED"],
  QUOTED: ["APPROVED", "REJECTED", "CANCELLED"],
  APPROVED: ["ASSIGNED", "CANCELLED"],
  REJECTED: [],
  ASSIGNED: ["ACCEPTED", "FAILED"],
  ACCEPTED: ["PICKED_UP", "FAILED"],
  PICKED_UP: ["IN_TRANSIT", "FAILED"],
  IN_TRANSIT: ["DELIVERED", "FAILED"],
  DELIVERED: [],
  FAILED: [],
  CANCELLED: [],
};

export function canTransition(from: ShipmentStatus, to: ShipmentStatus): boolean {
  return SHIPMENT_TRANSITIONS[from]?.includes(to) ?? false;
}
