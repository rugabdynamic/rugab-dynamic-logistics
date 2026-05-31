import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

// Deterministic tracking codes for the seed so README links stay stable.
const CODES = {
  q1: "RGB-DEMO0001",
  q2: "RGB-DEMO0002",
  q3: "RGB-DEMO0003",
  s1: "RGB-SHIP0001",
  s2: "RGB-SHIP0002",
};

async function main() {
  console.log("🌱 Seeding Rugab Dynamic Logistics…");

  // Clean slate (order matters due to FKs).
  await prisma.auditLog.deleteMany();
  await prisma.shipmentStatusLog.deleteMany();
  await prisma.proofOfDelivery.deleteMany();
  await prisma.payment.deleteMany();
  await prisma.shipment.deleteMany();
  await prisma.quoteRequest.deleteMany();
  await prisma.contactMessage.deleteMany();
  await prisma.notification.deleteMany();
  await prisma.customerProfile.deleteMany();
  await prisma.riderProfile.deleteMany();
  await prisma.user.deleteMany();

  const hash = (pw: string) => bcrypt.hash(pw, 12);

  // ---- Users ----
  const admin = await prisma.user.create({
    data: {
      name: "Rugab Admin",
      email: "admin@rugab.com",
      phone: "07033403577",
      passwordHash: await hash("Admin@123"),
      role: "ADMIN",
      status: "ACTIVE",
    },
  });

  const customer1 = await prisma.user.create({
    data: {
      name: "Chidi Okafor",
      email: "customer@rugab.com",
      phone: "08021210156",
      passwordHash: await hash("Customer@123"),
      role: "CUSTOMER",
      status: "ACTIVE",
      customerProfile: { create: { companyName: "Okafor Imports Ltd", address: "Lagos" } },
    },
  });

  const customer2 = await prisma.user.create({
    data: {
      name: "Amaka Eze",
      email: "amaka@rugab.com",
      phone: "09059067154",
      passwordHash: await hash("Customer@123"),
      role: "CUSTOMER",
      status: "ACTIVE",
      customerProfile: { create: { companyName: "Eze Exports", address: "Abuja" } },
    },
  });

  const rider1 = await prisma.user.create({
    data: {
      name: "Tunde Bello",
      email: "rider@rugab.com",
      phone: "08030000001",
      passwordHash: await hash("Rider@123"),
      role: "RIDER",
      status: "ACTIVE",
      riderProfile: { create: { vehicleType: "Van", vehiclePlateNumber: "LAG-123-XY", availabilityStatus: "AVAILABLE" } },
    },
  });

  const rider2 = await prisma.user.create({
    data: {
      name: "Grace Adeyemi",
      email: "rider2@rugab.com",
      phone: "08030000002",
      passwordHash: await hash("Rider@123"),
      role: "RIDER",
      status: "ACTIVE",
      riderProfile: { create: { vehicleType: "Truck", vehiclePlateNumber: "ABJ-456-ZZ", availabilityStatus: "BUSY" } },
    },
  });

  // ---- Quote requests ----
  const quote1 = await prisma.quoteRequest.create({
    data: {
      trackingCode: CODES.q1,
      customerId: customer1.id,
      fullName: "Chidi Okafor",
      email: "customer@rugab.com",
      phone: "08021210156",
      companyName: "Okafor Imports Ltd",
      shipmentType: "Sea freight",
      pickupCountry: "China", pickupCity: "Shanghai", pickupAddress: "Pudong Port Terminal 3",
      destinationCountry: "Nigeria", destinationCity: "Lagos", destinationAddress: "Apapa Port",
      packageDescription: "Electronics — 200 cartons of LED panels",
      packageWeight: 4200, quantity: 200,
      status: "PENDING",
    },
  });

  await prisma.quoteRequest.create({
    data: {
      trackingCode: CODES.q2,
      customerId: customer2.id,
      fullName: "Amaka Eze",
      email: "amaka@rugab.com",
      phone: "09059067154",
      shipmentType: "Air freight",
      pickupCountry: "Nigeria", pickupCity: "Lagos", pickupAddress: "Murtala Muhammed Cargo",
      destinationCountry: "United Kingdom", destinationCity: "London", destinationAddress: "Heathrow Cargo",
      packageDescription: "Fashion samples — 5 boxes",
      packageWeight: 60, quantity: 5,
      status: "QUOTED", estimatedPrice: 480000, adminNote: "Priority client — expedite.",
    },
  });

  const quote3 = await prisma.quoteRequest.create({
    data: {
      trackingCode: CODES.q3,
      fullName: "Walk-in Customer",
      email: "walkin@example.com",
      phone: "08000000000",
      shipmentType: "Door-to-door delivery",
      pickupCountry: "Nigeria", pickupCity: "Lagos", pickupAddress: "Ikeja City Mall",
      destinationCountry: "Nigeria", destinationCity: "Ibadan", destinationAddress: "Bodija Market",
      packageDescription: "Household goods relocation",
      packageWeight: 350,
      status: "APPROVED", estimatedPrice: 95000,
    },
  });

  // ---- Shipments (varied statuses) ----
  const shipment1 = await prisma.shipment.create({
    data: {
      trackingCode: CODES.s1,
      quoteRequestId: quote3.id,
      customerId: customer1.id,
      riderId: rider1.id,
      shipmentType: "Door-to-door delivery",
      pickupCountry: "Nigeria", pickupCity: "Lagos", pickupAddress: "Ikeja City Mall",
      destinationCountry: "Nigeria", destinationCity: "Ibadan", destinationAddress: "Bodija Market",
      receiverName: "Femi A.", receiverPhone: "08055555555",
      packageDescription: "Household goods relocation",
      packageWeight: 350, deliveryFee: 95000,
      status: "IN_TRANSIT", paymentStatus: "PAID",
      pickupTime: new Date(Date.now() - 2 * 864e5),
    },
  });

  const shipment2 = await prisma.shipment.create({
    data: {
      trackingCode: CODES.s2,
      customerId: customer2.id,
      riderId: rider2.id,
      shipmentType: "Land transport",
      pickupCountry: "Nigeria", pickupCity: "Lagos", pickupAddress: "Tin Can Island",
      destinationCountry: "Nigeria", destinationCity: "Kano", destinationAddress: "Bompai Industrial",
      receiverName: "Sani M.", receiverPhone: "08066666666",
      packageDescription: "Building materials — pallets",
      packageWeight: 8000, deliveryFee: 320000,
      status: "DELIVERED", paymentStatus: "PAID",
      pickupTime: new Date(Date.now() - 6 * 864e5),
      deliveredAt: new Date(Date.now() - 3 * 864e5),
    },
  });

  // ---- Status logs (timelines) ----
  await prisma.shipmentStatusLog.createMany({
    data: [
      { shipmentId: shipment1.id, status: "APPROVED", note: "Shipment created from quote", updatedById: admin.id, createdAt: new Date(Date.now() - 3 * 864e5) },
      { shipmentId: shipment1.id, status: "ASSIGNED", note: "Assigned to Tunde Bello", updatedById: admin.id, createdAt: new Date(Date.now() - 2.5 * 864e5) },
      { shipmentId: shipment1.id, status: "ACCEPTED", note: "Rider accepted", updatedById: rider1.id, createdAt: new Date(Date.now() - 2.2 * 864e5) },
      { shipmentId: shipment1.id, status: "PICKED_UP", note: "Picked up from Ikeja", updatedById: rider1.id, createdAt: new Date(Date.now() - 2 * 864e5) },
      { shipmentId: shipment1.id, status: "IN_TRANSIT", note: "En route to Ibadan", updatedById: rider1.id, createdAt: new Date(Date.now() - 1 * 864e5) },
      { shipmentId: shipment2.id, status: "APPROVED", updatedById: admin.id, createdAt: new Date(Date.now() - 6 * 864e5) },
      { shipmentId: shipment2.id, status: "ASSIGNED", updatedById: admin.id, createdAt: new Date(Date.now() - 5.5 * 864e5) },
      { shipmentId: shipment2.id, status: "PICKED_UP", updatedById: rider2.id, createdAt: new Date(Date.now() - 5 * 864e5) },
      { shipmentId: shipment2.id, status: "IN_TRANSIT", updatedById: rider2.id, createdAt: new Date(Date.now() - 4 * 864e5) },
      { shipmentId: shipment2.id, status: "DELIVERED", note: "Delivered and signed for", updatedById: rider2.id, createdAt: new Date(Date.now() - 3 * 864e5) },
    ],
  });

  // ---- Payments ----
  await prisma.payment.createMany({
    data: [
      { shipmentId: shipment1.id, amount: 95000, method: "BANK_TRANSFER", status: "PAID", transactionReference: "TRF-001", confirmedById: admin.id },
      { shipmentId: shipment2.id, amount: 320000, method: "PAYSTACK", status: "PAID", transactionReference: "PSK-002", confirmedById: admin.id },
    ],
  });

  // ---- Proof of delivery ----
  await prisma.proofOfDelivery.create({
    data: { shipmentId: shipment2.id, riderId: rider2.id, receiverName: "Sani M.", note: "Left at warehouse reception." },
  });

  // ---- Contact messages ----
  await prisma.contactMessage.createMany({
    data: [
      { name: "Blessing O.", email: "blessing@example.com", phone: "08012345678", subject: "Bulk shipping rates", message: "Hi, I'd like rates for monthly container shipments from China.", status: "NEW" },
      { name: "Ahmed K.", email: "ahmed@example.com", subject: "Customs clearance help", message: "Need help clearing goods stuck at Apapa.", status: "READ" },
      { name: "Ngozi P.", email: "ngozi@example.com", subject: "Partnership", message: "Interested in a logistics partnership for our e-commerce store.", status: "RESOLVED" },
    ],
  });

  // ---- Audit logs ----
  await prisma.auditLog.createMany({
    data: [
      { userId: admin.id, action: "SHIPMENT_CREATED", entity: "Shipment", entityId: shipment1.id, metadata: JSON.stringify({ from: "quote", trackingCode: CODES.s1 }) },
      { userId: admin.id, action: "RIDER_ASSIGNED", entity: "Shipment", entityId: shipment1.id, metadata: JSON.stringify({ riderId: rider1.id }) },
      { userId: rider2.id, action: "SHIPMENT_DELIVERED", entity: "Shipment", entityId: shipment2.id },
      { action: "QUOTE_CREATED", entity: "QuoteRequest", entityId: quote1.id, metadata: JSON.stringify({ trackingCode: CODES.q1 }) },
    ],
  });

  console.log("✅ Seed complete.");
  console.log("\nDemo accounts (password in parentheses):");
  console.log("  ADMIN     admin@rugab.com      (Admin@123)");
  console.log("  CUSTOMER  customer@rugab.com   (Customer@123)");
  console.log("  CUSTOMER  amaka@rugab.com      (Customer@123)");
  console.log("  RIDER     rider@rugab.com      (Rider@123)");
  console.log("  RIDER     rider2@rugab.com     (Rider@123)");
  console.log("\nSample tracking codes:", Object.values(CODES).join(", "));
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
