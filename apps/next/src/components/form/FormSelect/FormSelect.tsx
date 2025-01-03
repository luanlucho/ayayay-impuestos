import React from "react";
import { FieldValues } from "react-hook-form";
import { twMerge } from "tailwind-merge";

import { FormSelectProps as Props } from "./FormSelect.types";
import { FormControl, FormDescription, FormField, FormMessage } from "ui/form";
import { FormItem, FormLabel } from "ui/form";
import { SelectItem, SelectTrigger, SelectValue, SelectLabel } from "ui/select";
import { Select, SelectContent, SelectGroup } from "ui/select";

const FormSelect = <TSchema extends FieldValues>(props: Props<TSchema>) => {
  const { className, description, control, messageClassName, ...rest } = props;
  const { labelClassName, descriptionClassName, label, name, ...rest2 } = rest;
  const { children, contentClassName, disabled, ...rest3 } = rest2;
  const { onValueChange, wrapperClassName, ...rest4 } = rest3;

  return (
    <FormField
      control={control}
      name={name}
      defaultValue={rest3.defaultValue}
      render={fieldProps => {
        const { field } = fieldProps;
        const { onChange, value } = field;
        const selectedValue = value ? value : undefined;
        const changeHandler = (value: string) => {
          onValueChange?.(value);
          onChange(value);
        };

        return (
          <FormItem className={twMerge("FormSelectWrapper", wrapperClassName)}>
            <FormLabel className={twMerge("FormSelectLabel", labelClassName)}>
              {label}
            </FormLabel>
            <Select
              onValueChange={changeHandler}
              value={selectedValue}
              disabled={disabled}
            >
              <FormControl>
                <SelectTrigger className={twMerge("FormSelect", className)}>
                  <SelectValue {...rest4} />
                </SelectTrigger>
              </FormControl>
              <SelectContent
                className={twMerge(
                  "FormSelectContent max-h-[300px]",
                  contentClassName
                )}
              >
                {children}
              </SelectContent>
            </Select>
            <FormDescription
              className={twMerge("FormSelectDescription", descriptionClassName)}
            >
              {description}
            </FormDescription>
            <FormMessage className={twMerge("FormError", messageClassName)} />
          </FormItem>
        );
      }}
    />
  );
};

FormSelect.Item = SelectItem;
FormSelect.Group = SelectGroup;
FormSelect.Label = SelectLabel;

export default FormSelect;
