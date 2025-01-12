"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect, useState } from "react";
import { flushSync } from "react-dom";
import { SubmitHandler, useForm, useWatch } from "react-hook-form";
import { twMerge } from "tailwind-merge";

import { calc, defaultValues, schema } from "./CalculatorIREC2024Form.helpers";
import { formatter } from "./CalculatorIREC2024Form.helpers";
import { CalculatorIREC2024FormProps as Props } from "./CalculatorIREC2024Form.types";
import { Schema } from "./CalculatorIREC2024Form.types";
import CalculatorResult from "./CalculatorResult/CalculatorResult";
import { ResultItem } from "./CalculatorResult/CalculatorResult.types";
import FormDependentsSelect from "../FormDependentsSelect/FormDependentsSelect";
import FormRegimeSelect from "../FormRegimeSelect/FormRegimeSelect";
import FormCurrencyInput from "components/form/FormCurrencyInput/FormCurrencyInput";
import FormRadioGroup from "components/form/FormRadioGroup/FormRadioGroup";
import useScrollToError from "hooks/useScrollToError";
import { Button } from "ui/button";
import { Form } from "ui/form";
import { Separator } from "ui/separator";
import { formatNumber, unformatNumber } from "utils/common.utils";

const CalculatorIREC2024Form = (props: Props) => {
  const { className } = props;
  const [result, setResult] = useState<ResultItem[]>([]);
  const form = useForm<Schema>({
    resolver: zodResolver(schema),
    defaultValues: { ...defaultValues }
  });
  const { formState, control, handleSubmit, setValue } = form;
  useScrollToError(formState.errors);
  const regime = useWatch({ control, name: "regime" });
  const rawIncome = useWatch({ control, name: "income" });
  const amountsType = useWatch({ control, name: "amountsType" });
  const monthly = amountsType === "monthly";
  const income = unformatNumber(rawIncome);
  const totalIncomeRaw = monthly ? income * 12 : income;
  const totalIncome = formatNumber(totalIncomeRaw, formatter).toValue();
  const rawPersonalExpenses = useWatch({ control, name: "personalExpenses" });
  const personalExpenses = unformatNumber(rawPersonalExpenses);
  const totalPersonalExpensesRaw = monthly
    ? personalExpenses * 12
    : personalExpenses;
  const totalPersonalExpenses = formatNumber(
    totalPersonalExpensesRaw,
    formatter
  ).toValue();
  const rawRucExpenses = useWatch({ control, name: "rucExpenses" });
  const rucExpenses = unformatNumber(rawRucExpenses);
  const totalRUCExpensesRaw = monthly ? rucExpenses * 12 : rucExpenses;
  const totalRUCExpenses = formatNumber(
    totalRUCExpensesRaw,
    formatter
  ).toValue();
  const hasError = Object.keys(formState.errors).length > 0;

  useEffect(() => {
    if (!hasError) return;
    setResult([]);
  }, [hasError]);

  useEffect(() => {
    setResult([]);
    if (regime !== "general-2024") {
      // @ts-ignore es normal porque así funciona rhf
      setValue("dependents", undefined);
      setValue("personalExpenses", 0);
      setValue("rucExpenses", 0);
    }
  }, [regime, setValue]);

  const submitHandler: SubmitHandler<Schema> = async values => {
    let result: ResultItem[] = [];
    switch (values.regime) {
      case "general-2024":
        result = calc[2024].general(values);
        break;
      case "rimpe-emprendedor-2024":
        result = calc[2024].rimpeEmprendedor(values);
        break;
      case "rimpe-negocio-popular-2024":
        result = calc[2024].rimpeNegocioPopular(values);
        break;
      default:
        throw new Error(`Régimen no encontrado: ${values.regime}`);
    }
    flushSync(() => setResult(result));
    const element = document.getElementById("result");
    if (!element) return;
    element.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <Form {...form}>
      <form
        noValidate
        id="form-calculator"
        className={twMerge(
          "CalculatorIREC2024Form flex max-w-[720px] flex-col gap-2 rounded-lg bg-neutral-100 p-4 sm:p-8 md:gap-4 dark:bg-neutral-900 [&_*]:text-base",
          className
        )}
        onSubmit={handleSubmit(submitHandler, console.error)}
      >
        <FormRegimeSelect
          control={control}
          name="regime"
          label="Régimen"
          className="w-full"
        />
        <FormRadioGroup
          control={control}
          name="amountsType"
          label="Tipo de monto"
          items={[
            { value: "monthly", label: "Mensual" },
            { value: "yearly", label: "Anual" }
          ]}
        />
        <FormCurrencyInput
          control={control}
          placeholder={monthly ? "Ingresos mensuales" : "Ingresos anuales"}
          name="income"
          label="Ingresos"
          formatter={{ currency: "USD" }}
          description={
            monthly && totalIncomeRaw > 0
              ? `Ingresos anuales: $${totalIncome}`
              : null
          }
        />
        {regime === "general-2024" ? (
          <FormCurrencyInput
            control={control}
            placeholder={
              monthly
                ? "Gastos personales mensuales"
                : "Gastos personales anuales"
            }
            name="personalExpenses"
            label="Gastos personales"
            formatter={{ currency: "USD" }}
            description={
              monthly && totalPersonalExpensesRaw > 0
                ? `Gastos personales anuales: $${totalPersonalExpenses}`
                : null
            }
          />
        ) : null}
        {regime === "general-2024" ? (
          <FormCurrencyInput
            control={control}
            placeholder={
              monthly ? "Gastos con RUC mensuales" : "Gastos con RUC anuales"
            }
            name="rucExpenses"
            label="Gastos con RUC"
            formatter={{ currency: "USD" }}
            description={
              monthly && totalRUCExpensesRaw > 0
                ? `Gastos con RUC anuales: $${totalRUCExpenses}`
                : null
            }
          />
        ) : null}
        {regime === "general-2024" ? (
          <FormDependentsSelect
            control={control}
            label="Cargas familiares"
            name="dependents"
            className="w-full"
          />
        ) : null}
        <Button type="submit" className="w-48 self-end">
          Calcular
        </Button>
        {result.length ? <Separator className="mb-2 mt-8" /> : null}
        <CalculatorResult data={result} />
      </form>
    </Form>
  );
};

export default CalculatorIREC2024Form;
