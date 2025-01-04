// Brand validations
import Big from "big.js";
import { z } from "zod";

import { unformatNumber } from "utils/common.utils";

const formValidation = () => {
  return z
    .object({
      regime: z.string().nonempty({ message: "Escoge un régimen" }),
      amountsType: z.enum(["monthly", "yearly"]),
      income: z.coerce.string().transform(value => unformatNumber(value)),
      personalExpenses: z.coerce
        .string()
        .transform(value => unformatNumber(value)),
      rucExpenses: z.coerce.string().transform(value => unformatNumber(value)),
      dependents: z.coerce.number().int().min(0).max(5).default(0)
    })
    .superRefine((data, ctx) => {
      if (data.regime === "general-2024") return;
      const monthly = data.amountsType === "monthly";
      const totalIncome = monthly
        ? Big(data.income).times(12)
        : Big(data.income);
      if (data.regime === "rimpe-emprendedor-2024") {
        if (totalIncome.lt(20_000)) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message:
              "RIMPE Emprendedor aplica solo para ingresos anuales desde $20,000",
            path: ["income"]
          });
        }
        if (totalIncome.gt(300_000)) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message:
              "RIMPE Emprendedor aplica solo para ingresos anuales hasta $300,000",
            path: ["income"]
          });
        }
      }
      if (data.regime === "rimpe-negocio-popular-2024") {
        if (totalIncome.lte(20_000)) return;
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message:
            "RIMPE Negocio Popular aplica solo para ingresos anuales hasta $20,000",
          path: ["income"]
        });
      }
    });
};

export const vCalculator = {
  form: formValidation
};
