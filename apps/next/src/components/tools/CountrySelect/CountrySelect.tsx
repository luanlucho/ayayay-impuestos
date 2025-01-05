"use client";
import React from "react";
import { twMerge } from "tailwind-merge";
import capitalize from "voca/capitalize";

import { options } from "./CountrySelect.helpers";
import { CountrySelectProps as Props } from "./CountrySelect.types";
import FormSelect from "components/form/FormSelect/FormSelect";
import { Select, SelectContent, SelectTrigger, SelectValue } from "ui/select";

const CountrySelect = (props: Props) => {
  const { className, contentClassName, ...rest2 } = props;
  const { disabled, value, onValueChange, ...rest } = rest2;

  const changeHandler = (value: string) => {
    onValueChange?.(value);
  };

  return (
    <Select onValueChange={changeHandler} value={value} disabled={disabled}>
      <SelectTrigger
        className={twMerge(
          "CountrySelect h-6 w-max min-w-20 border-none px-2 py-0.5 text-xs md:min-w-24 md:text-base",
          className
        )}
      >
        <SelectValue {...rest} />
      </SelectTrigger>
      <SelectContent
        className={twMerge("FormSelectContent max-h-[300px]", contentClassName)}
      >
        {options.map(period => {
          const { label, value } = period;
          return (
            <FormSelect.Item key={value} value={value}>
              <span>{capitalize(label)}</span>
            </FormSelect.Item>
          );
        })}
      </SelectContent>
    </Select>
  );
};

export default CountrySelect;
