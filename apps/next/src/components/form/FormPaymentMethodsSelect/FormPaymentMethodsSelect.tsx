import React from "react";
import { FieldValues } from "react-hook-form";
import { twMerge } from "tailwind-merge";
import titleCase from "voca/title_case";

import { FormPaymentMethodsSelectProps as Props } from "./FormPaymentMethodsSelect.types";
import FormSelect from "../FormSelect/FormSelect";

const options = ["CREDIT", "DEBIT", "CASH", "BANK_TRANSFER"];

const FormPaymentMethodsSelect = <TSchema extends FieldValues>(
  props: Props<TSchema>
) => {
  const { className, ...rest } = props;

  return (
    <FormSelect
      placeholder="Status"
      {...rest}
      className={twMerge("FormPaymentMethodsSelect", className)}
    >
      {options.map(option => {
        return (
          <FormSelect.Item key={option} value={option}>
            {titleCase(option.split("_").join(" "))}
          </FormSelect.Item>
        );
      })}
    </FormSelect>
  );
};

export default FormPaymentMethodsSelect;
