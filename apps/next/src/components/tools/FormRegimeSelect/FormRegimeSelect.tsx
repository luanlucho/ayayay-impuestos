import React from "react";
import { FieldValues } from "react-hook-form";
import { twMerge } from "tailwind-merge";
import capitalize from "voca/capitalize";

import { regimes } from "./FormRegimeSelect.helpers";
import { FormRegimeSelectProps as Props } from "./FormRegimeSelect.types";
import FormSelect from "components/form/FormSelect/FormSelect";

const FormRegimeSelect = <TSchema extends FieldValues>(
  props: Props<TSchema>
) => {
  const { className, ...rest } = props;

  return (
    <FormSelect
      placeholder="Selecciona tu régimen"
      {...rest}
      className={twMerge(
        "FormRegimeSelect w-40 first-letter:capitalize",
        className
      )}
    >
      {regimes.map(period => {
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

export default FormRegimeSelect;
