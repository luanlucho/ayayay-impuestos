import React from "react";
import { FieldValues } from "react-hook-form";
import { twMerge } from "tailwind-merge";

import { FormRadioGroupProps as Props } from "./FormRadioGroup.types";
import { FormControl, FormDescription, FormField, FormMessage } from "ui/form";
import { FormItem, FormLabel } from "ui/form";
import { RadioGroup, RadioGroupItem } from "ui/radio-group";

const FormRadioGroup = <TSchema extends FieldValues>(props: Props<TSchema>) => {
  const { className, description, control, messageClassName, ...rest } = props;
  const { labelClassName, descriptionClassName, label, name, ...rest2 } = rest;
  const { children, contentClassName, disabled, ...rest3 } = rest2;
  const { onValueChange, wrapperClassName, items } = rest3;

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
          <FormItem
            className={twMerge("FormRadioGroupWrapper", wrapperClassName)}
          >
            <FormLabel
              className={twMerge("FormRadioGroupLabel", labelClassName)}
            >
              {label}
            </FormLabel>
            <FormControl>
              <RadioGroup
                onValueChange={changeHandler}
                value={selectedValue}
                disabled={disabled}
                className="flex items-center gap-4"
              >
                {items.map((item, index) => {
                  const { label, value, ...rest } = item;
                  return (
                    <FormItem
                      key={item.id ?? value ?? index}
                      className="flex items-center space-x-1.5 space-y-0"
                    >
                      <FormControl>
                        <RadioGroupItem value={value} {...rest} />
                      </FormControl>
                      <FormLabel className="font-normal">
                        {label ?? value}
                      </FormLabel>
                    </FormItem>
                  );
                })}
              </RadioGroup>
            </FormControl>
            <FormDescription
              className={twMerge(
                "FormRadioGroupDescription",
                descriptionClassName
              )}
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

export default FormRadioGroup;
