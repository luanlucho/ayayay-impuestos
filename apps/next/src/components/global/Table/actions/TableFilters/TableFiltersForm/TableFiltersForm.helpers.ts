// BrandForm helper functions and data
import { z } from "zod";

const itemTypesSchema = z.union([
  z.literal("text"),
  z.literal("boolean"),
  z.literal("select")
]);

const itemSchema = z.object({
  label: z.string(),
  value: z.coerce.string().optional().default(""),
  operator: z.string(),
  type: itemTypesSchema.optional().default("text")
});

export const schema = z.object({
  filters: z.array(itemSchema)
});

export const defaultValues = { filters: [] as string[] };
