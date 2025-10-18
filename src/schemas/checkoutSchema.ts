import * as z from "zod";

export const checkoutSchema = z.object({
  name: z.string().min(3, "Nome deve ter no mínimo 3 caracteres").max(100),
  phone: z.string().min(10, "Telefone inválido").max(15),
  deliveryType: z.enum(["delivery", "pickup"]),
  address: z.string().optional(),
  number: z.string().optional(),
  neighborhood: z.string().optional(),
  city: z.string().optional(),
  state: z.string().optional(),
  zipCode: z.string().optional(),
  paymentMethod: z.enum(["card", "cash", "pix"]),
  changeFor: z.string().optional(),
  observations: z.string().max(500).optional(),
});

export type CheckoutForm = z.infer<typeof checkoutSchema>;