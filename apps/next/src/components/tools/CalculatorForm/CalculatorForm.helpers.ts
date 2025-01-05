// CalculatorForm helper functions and data
import { Big } from "big.js";
import invariant from "invariant";

import { Params2024 } from "./CalculatorForm.types";
import { ResultItem } from "../CalculatorResult/CalculatorResult.types";
import { table as tableGeneral2024 } from "data/ec/2024/general";
import { table as tableRIMPEEmprendedor2024 } from "data/ec/2024/rimpe-emprendedor";
import { table as tableRIMPEPopular2024 } from "data/ec/2024/rimpe-popular";
import { basicBaskets } from "data/ec/basicBasket";
import { vCalculator } from "validations/calculator.validations";

export const schema = vCalculator.form();

export const defaultValues = {
  regime: "",
  amountsType: "monthly" as const,
  income: 0,
  personalExpenses: 0,
  rucExpenses: 0
};

export const formatter = {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2
};

const getBasicBaskets2024 = (dependents: number) => {
  switch (dependents) {
    case 0:
      return 7;
    case 1:
      return 9;
    case 2:
      return 11;
    case 3:
      return 14;
    case 4:
      return 17;
    case 5:
      return 20;
    default:
      throw new Error(`Invalid dependents: ${dependents}`);
  }
};

const calcRebaja2024 = (params: Params2024): number => {
  const { amountsType, personalExpenses, dependents } = params;
  const monthly = amountsType === "monthly";
  const totalPersonalExpenses = monthly
    ? Big(personalExpenses).times(12)
    : personalExpenses;
  const deductible = Big(totalPersonalExpenses).times(0.18).toNumber();
  const basicBasket = basicBaskets[2024];
  let maxRebajaRaw = Big(basicBasket).times(getBasicBaskets2024(dependents));
  maxRebajaRaw = maxRebajaRaw.times(0.18);
  const maxRebaja = maxRebajaRaw.toNumber();
  return Math.min(deductible, maxRebaja);
};

const calc2024General = (params: Params2024): ResultItem[] => {
  invariant(params.regime === "general-2024", "Invalid regime");
  const { amountsType, income, rucExpenses, dependents, personalExpenses } =
    params;
  const monthly = amountsType === "monthly";
  const totalIncome = monthly ? Big(income).times(12) : Big(income);
  const totalRUCExpenses = monthly
    ? Big(rucExpenses).times(12)
    : Big(rucExpenses);
  const taxableIncomeRaw = totalIncome.minus(totalRUCExpenses);
  const taxableIncome = Math.max(taxableIncomeRaw.toNumber(), 0);
  const row = tableGeneral2024.find(row => {
    return taxableIncome >= row.start && taxableIncome < row.end;
  });
  const totalPersonalExpenses = monthly
    ? Big(personalExpenses).times(12).toNumber()
    : personalExpenses;
  invariant(row, "Invalid row");
  const surplus = Big(taxableIncome).minus(row.start);
  const fare = surplus.times(row.rate);
  const subtotal = Big(row.base).plus(fare);
  const rebaja = calcRebaja2024(params);
  const basicBaskets = getBasicBaskets2024(dependents);
  const ir = Math.max(subtotal.minus(rebaja).toNumber(), 0);
  return [
    { label: "Limite inferior", value: row.start },
    { label: "Limite superior", value: row.end },
    {
      label: "Impuesto a la fracción básica",
      value: row.base,
      options: { style: "secondary" }
    },
    {
      label: "Base imponible",
      value: taxableIncome,
      description: `Ingreso (${totalIncome}) - Gastos con RUC (${totalRUCExpenses})`
    },
    {
      label: "Excedente del limite inferior",
      value: surplus.toNumber(),
      description: `Base imponible (${taxableIncome}) - Limite inferior (${row.start})`
    },
    { label: "Tipo marginal (%)", value: `${row.rate * 100}%` },
    {
      label: "Tarifa del excedente",
      value: fare.toNumber(),
      description: `Excedente (${surplus}) * Tipo marginal (${row.rate})`,
      options: { style: "secondary" }
    },
    { label: "Gastos personales", value: totalPersonalExpenses },
    { label: "Cargas familiares", value: `${dependents}` },
    {
      label: "Rebaja",
      value: -rebaja,
      description: `Menor entre 18% de gastos personales y 18% de (${basicBaskets}) canastas básica`,
      options: { style: "secondary" }
    },
    { label: "Impuesto a la Renta", value: ir, options: { style: "primary" } }
  ];
};

const calc2024RIMPEEmprendedor = (params: Params2024): ResultItem[] => {
  invariant(params.regime === "rimpe-emprendedor-2024", "Invalid regime");
  const { amountsType, income } = params;
  const monthly = amountsType === "monthly";
  const totalIncome = monthly ? Big(income).times(12) : Big(income);
  const taxableIncome = totalIncome.toNumber();
  const row = tableRIMPEEmprendedor2024.find(row => {
    return taxableIncome >= row.start && taxableIncome < row.end;
  });
  invariant(row, "Invalid row");
  const surplus = Big(taxableIncome).minus(row.start);
  const fare = surplus.times(row.rate);
  const total = Big(row.base).plus(Big(row.rate).times(surplus));
  const ir = total.toNumber();
  return [
    { label: "Limite inferior", value: row.start },
    { label: "Limite superior", value: row.end },
    {
      label: "Impuesto a la fracción básica",
      value: row.base,
      options: { style: "secondary" }
    },
    { label: "Excedente del limite inferior", value: surplus.toNumber() },
    { label: "Tipo marginal (%)", value: `${row.rate * 100}%` },
    {
      label: "Tarifa del excedente",
      value: fare.toNumber(),
      description: `Excedente (${surplus}) * Tipo marginal (${row.rate})`,
      options: { style: "secondary" }
    },
    { label: "Impuesto a la Renta", value: ir, options: { style: "primary" } }
  ];
};

const calc2024RIMPENegocioPopular = (params: Params2024): ResultItem[] => {
  invariant(params.regime === "rimpe-negocio-popular-2024", "Invalid regime");
  const { amountsType, income } = params;
  const monthly = amountsType === "monthly";
  const totalIncome = monthly ? Big(income).times(12) : Big(income);
  const taxableIncome = totalIncome.toNumber();
  const row = tableRIMPEPopular2024.find(row => {
    return taxableIncome >= row.start && taxableIncome <= row.end;
  });
  invariant(row, "Invalid row");
  const ir = row.base;
  return [
    { label: "Limite inferior", value: row.start },
    { label: "Limite superior", value: row.end },
    { label: "Impuesto a la Renta", value: ir, options: { style: "primary" } }
  ];
};

export const calc = {
  2024: {
    general: calc2024General,
    rimpeEmprendedor: calc2024RIMPEEmprendedor,
    rimpeNegocioPopular: calc2024RIMPENegocioPopular
  }
};
