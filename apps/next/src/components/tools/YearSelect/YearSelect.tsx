"use client";
import invariant from "invariant";
import React, { useMemo } from "react";
import { twMerge } from "tailwind-merge";
import capitalize from "voca/capitalize";

import { YearSelectProps as Props } from "./YearSelect.types";
import FormSelect from "components/form/FormSelect/FormSelect";
import CONSTANTS from "config/constants";
import { Select, SelectContent, SelectTrigger, SelectValue } from "ui/select";

const YearSelect = (props: Props) => {
  const { className, contentClassName, countryCode, ...rest2 } = props;
  const { disabled, value, onValueChange, ...rest } = rest2;

  const options = useMemo(() => {
    const country = CONSTANTS.SUPPORTED_COUNTRIES.find(c => {
      return c.code === countryCode;
    });
    invariant(country, `Country code ${countryCode} not found`);
    return country.years.map(year => {
      return { label: `${year}`, value: `${year}` };
    });
  }, [countryCode]);

  const changeHandler = (value: string) => {
    onValueChange?.(value);
  };

  return (
    <Select onValueChange={changeHandler} value={value} disabled={disabled}>
      <SelectTrigger
        className={twMerge(
          "YearSelect h-6 w-max min-w-16 border-none px-2 py-0.5 text-xs md:min-w-[72px] md:text-base",
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

export default YearSelect;
