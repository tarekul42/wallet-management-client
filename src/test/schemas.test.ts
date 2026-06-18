import { describe, it, expect } from "vitest";

describe("SendMoney schema", () => {
  it("validates correct send money data", async () => {
    const { z } = await import("zod");
    const schema = z.object({
      receiverEmail: z.string().email(),
      amount: z.coerce.number().min(0.01).max(1000000),
    });
    const result = schema.safeParse({ receiverEmail: "test@example.com", amount: 100 });
    expect(result.success).toBe(true);
  });

  it("rejects invalid email", async () => {
    const { z } = await import("zod");
    const schema = z.object({
      receiverEmail: z.string().email(),
      amount: z.coerce.number().min(0.01).max(1000000),
    });
    const result = schema.safeParse({ receiverEmail: "invalid", amount: 100 });
    expect(result.success).toBe(false);
  });

  it("rejects amount below minimum", async () => {
    const { z } = await import("zod");
    const schema = z.object({
      receiverEmail: z.string().email(),
      amount: z.coerce.number().min(0.01).max(1000000),
    });
    const result = schema.safeParse({ receiverEmail: "test@example.com", amount: 0 });
    expect(result.success).toBe(false);
  });

  it("rejects amount above maximum", async () => {
    const { z } = await import("zod");
    const schema = z.object({
      receiverEmail: z.string().email(),
      amount: z.coerce.number().min(0.01).max(1000000),
    });
    const result = schema.safeParse({ receiverEmail: "test@example.com", amount: 2000000 });
    expect(result.success).toBe(false);
  });
});

describe("UpdatePassword schema", () => {
  it("validates matching passwords", async () => {
    const { z } = await import("zod");
    const schema = z.object({
      oldPassword: z.string().min(6),
      newPassword: z.string().min(6),
      confirmPassword: z.string().min(6),
    }).refine((d) => d.newPassword === d.confirmPassword, {
      message: "Passwords do not match",
      path: ["confirmPassword"],
    });
    const result = schema.safeParse({
      oldPassword: "oldpass123",
      newPassword: "newpass123",
      confirmPassword: "newpass123",
    });
    expect(result.success).toBe(true);
  });

  it("rejects non-matching passwords", async () => {
    const { z } = await import("zod");
    const schema = z.object({
      oldPassword: z.string().min(6),
      newPassword: z.string().min(6),
      confirmPassword: z.string().min(6),
    }).refine((d) => d.newPassword === d.confirmPassword, {
      message: "Passwords do not match",
      path: ["confirmPassword"],
    });
    const result = schema.safeParse({
      oldPassword: "oldpass123",
      newPassword: "newpass123",
      confirmPassword: "different",
    });
    expect(result.success).toBe(false);
  });

  it("rejects short passwords", async () => {
    const { z } = await import("zod");
    const schema = z.object({
      oldPassword: z.string().min(6),
      newPassword: z.string().min(6),
      confirmPassword: z.string().min(6),
    });
    const result = schema.safeParse({
      oldPassword: "12345",
      newPassword: "12345",
      confirmPassword: "12345",
    });
    expect(result.success).toBe(false);
  });
});

describe("SystemConfig schema", () => {
  it("validates correct config values", async () => {
    const { z } = await import("zod");
    const schema = z.object({
      sendMoneyFee: z.coerce.number().min(0).max(1),
      cashInFee: z.coerce.number().min(0).max(1),
      withdrawFee: z.coerce.number().min(0).max(1),
      dailyLimit: z.coerce.number().min(1),
    });
    const result = schema.safeParse({
      sendMoneyFee: 0.01,
      cashInFee: 0,
      withdrawFee: 0.015,
      dailyLimit: 50000,
    });
    expect(result.success).toBe(true);
  });

  it("rejects negative fees", async () => {
    const { z } = await import("zod");
    const schema = z.object({
      sendMoneyFee: z.coerce.number().min(0).max(1),
    });
    const result = schema.safeParse({ sendMoneyFee: -0.1 });
    expect(result.success).toBe(false);
  });

  it("rejects fees over 100%", async () => {
    const { z } = await import("zod");
    const schema = z.object({
      sendMoneyFee: z.coerce.number().min(0).max(1),
    });
    const result = schema.safeParse({ sendMoneyFee: 1.5 });
    expect(result.success).toBe(false);
  });
});
