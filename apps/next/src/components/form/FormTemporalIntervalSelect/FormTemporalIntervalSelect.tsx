import React from "react";
import { FieldValues } from "react-hook-form";
import { twMerge } from "tailwind-merge";
import titleCase from "voca/title_case";

import { options } from "./FormTemporalIntervalSelect.helpers";
import { FormTemporalIntervalSelectProps as Props } from "./FormTemporalIntervalSelect.types";
import FormSelect from "../FormSelect/FormSelect";

const FormTemporalIntervalSelect = <TSchema extends FieldValues>(
  props: Props<TSchema>
) => {
  const { className, ...rest } = props;

  return (
    <FormSelect
      {...rest}
      className={twMerge("FormTemporalIntervalSelect", className)}
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

export default FormTemporalIntervalSelect;
