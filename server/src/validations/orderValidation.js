import { z } from "zod";

export const checkoutBodySchema = z.object({
  buyerName: z.string().trim().min(1).max(80),
  buyerEmail: z.string().trim().email(),
  shippingAddress: z.string().trim().min(1).max(300),
  paymentMethod: z.enum(["card", "paypal", "cash_on_delivery"]),
  itemIds: z.array(z.string().regex(/^[a-f\d]{24}$/i, "Invalid item id.")).min(1)
});
