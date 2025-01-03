import invariant from "invariant";
import React from "react";
import { FieldValues } from "react-hook-form";
import { twMerge } from "tailwind-merge";

import { FormStatusSelectProps as Props } from "./FormStatusSelect.types";
import FormSelect from "../FormSelect/FormSelect";

const FormStatusSelect = <TSchema extends FieldValues>(
  props: Props<TSchema>
) => {
  const { className, statuses, ...rest } = props;
  invariant(statuses.length, "Provide at least one status");

  return (
    <FormSelect
      placeholder="Status"
      {...rest}
      className={twMerge("FormStatusSelect", className)}
    >
      {statuses.map(status => {
        let label = "";
        let value = "";
        if (typeof status === "string") {
          label = status;
          value = status;
        } else {
          label = status.label;
          value = status.value;
        }
        return (
          <FormSelect.Item key={label} value={value}>
            {label}
          </FormSelect.Item>
        );
      })}
    </FormSelect>
  );
};

export default FormStatusSelect;
