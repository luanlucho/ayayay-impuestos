import React from "react";
import { FieldValues } from "react-hook-form";
import { twMerge } from "tailwind-merge";
import capitalize from "voca/capitalize";

import { options } from "./FormDependentsSelect.helpers";
import { FormDependentsSelectProps as Props } from "./FormDependentsSelect.types";
import FormSelect from "components/form/FormSelect/FormSelect";

const FormDependentsSelect = <TSchema extends FieldValues>(
  props: Props<TSchema>
) => {
  const { className, ...rest } = props;

  return (
    <FormSelect
      placeholder="Número de cargas familiares"
      {...rest}
      className={twMerge(
        "FormDependentsSelect w-40 first-letter:capitalize",
        className
      )}
    >
      {options.map(period => {
        const { label, value } = period;
        return (
          <FormSelect.Item key={value} value={value}>
            <span>{capitalize(label)}</span>
          </FormSelect.Item>
        );
      })}
    </FormSelect>
  );
};

export default FormDependentsSelect;
