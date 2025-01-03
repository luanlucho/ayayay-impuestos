import { CheckedState } from "@radix-ui/react-checkbox";
import React from "react";
import { FieldValues } from "react-hook-form";
import { twMerge } from "tailwind-merge";

import { FormCheckboxProps as Props } from "./FormCheckbox.types";
import { Checkbox } from "ui/checkbox";
import { FormControl, FormDescription, FormField } from "ui/form";
import { FormItem, FormLabel, FormMessage } from "ui/form";

const FormCheckbox = <TSchema extends FieldValues>(props: Props<TSchema>) => {
  const { className, description, control, messageClassName, ...rest } = props;
  const { labelClassName, descriptionClassName, label, name } = rest;
  const { wrapperClassName, onCheckedChange, disabled } = rest;

  return (
    <FormField
      control={control}
      name={name}
      defaultValue={rest.defaultChecked}
      render={fieldProps => {
        const { field } = fieldProps;

        const changeHandler = (checked: CheckedState) => {
          field.onChange(checked);
          onCheckedChange?.(checked);
        };

        return (
          <FormItem className={wrapperClassName}>
            <div className="flex items-start gap-2">
              <FormControl>
                <Checkbox
                  id={name}
                  className={twMerge("FormInput", className)}
                  checked={field.value}
                  onCheckedChange={changeHandler}
                  disabled={disabled}
                />
              </FormControl>
              <div className="flex flex-col gap-2">
                <FormLabel
                  className={twMerge(
                    "FormInputLabel cursor-pointer",
                    disabled ? "cursor-not-allowed" : "",
                    labelClassName
                  )}
                  htmlFor={name}
                >
                  {label}
                </FormLabel>
                <FormDescription
                  className={twMerge(
                    "FormInputDescription",
                    descriptionClassName
                  )}
                >
                  {description}
                </FormDescription>
              </div>
            </div>
            <FormMessage className={twMerge("FormError", messageClassName)} />
          </FormItem>
        );
      }}
    />
  );
};

export default FormCheckbox;
