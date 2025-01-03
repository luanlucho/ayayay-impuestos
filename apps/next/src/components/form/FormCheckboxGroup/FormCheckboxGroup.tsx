import { CheckedState } from "@radix-ui/react-checkbox";
import React from "react";
import { FieldValues } from "react-hook-form";
import { twMerge } from "tailwind-merge";

import { CheckboxItem } from "./FormCheckboxGroup.types";
import { FormCheckboxGroupProps as Props } from "./FormCheckboxGroup.types";
import { Checkbox } from "ui/checkbox";
import { FormControl, FormDescription, FormField } from "ui/form";
import { FormItem, FormLabel, FormMessage } from "ui/form";

const FormCheckbox = <TSchema extends FieldValues>(props: Props<TSchema>) => {
  const { className, description, control, messageClassName, ...rest } = props;
  const { labelClassName, descriptionClassName, label, name } = rest;
  const { wrapperClassName, onCheckedChange, disabled, items } = rest;

  return (
    <FormField
      control={control}
      name={name}
      defaultValue={rest.defaultChecked}
      render={fieldProps => {
        const { field } = fieldProps;

        const changeHandler = (item: CheckboxItem, checked: CheckedState) => {
          let res;
          if (checked) {
            res = [...field.value, item.value];
          } else {
            res = field.value?.filter((value: string) => value !== item.value);
          }
          field.onChange(res);
          onCheckedChange?.(res);
        };

        return (
          <FormItem className={wrapperClassName}>
            <div className="flex flex-col items-start gap-2">
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
              <div className="grid grid-cols-2 gap-4 px-4">
                {items.map(item => (
                  <FormField
                    key={item.value}
                    control={control}
                    name={name}
                    render={({ field }) => {
                      return (
                        <FormItem
                          key={item.value}
                          className="flex flex-row items-start space-x-3 space-y-0"
                        >
                          <FormControl>
                            <Checkbox
                              checked={field.value?.includes(item.value)}
                              onCheckedChange={res => changeHandler(item, res)}
                            />
                          </FormControl>
                          <div className="flex flex-col gap-1">
                            <FormLabel className="font-normal">
                              {item.label}
                            </FormLabel>
                            {item.description ? (
                              <p className="text-muted-foreground text-xs">
                                {item.description}
                              </p>
                            ) : null}
                          </div>
                        </FormItem>
                      );
                    }}
                  />
                ))}
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
