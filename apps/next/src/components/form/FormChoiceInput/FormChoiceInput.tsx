import React from "react";
import { FieldValues, Path, PathValue } from "react-hook-form";
import { twMerge } from "tailwind-merge";

import { FormChoiceInputProps as Props } from "./FormChoiceInput.types";
import { FormField } from "ui/form";
import { FormDescription, FormMessage } from "ui/form";
import { FormControl, FormItem, FormLabel } from "ui/form";
import { Input } from "ui/input";

const FormChoiceInput = <TSchema extends FieldValues>(
  props: Props<TSchema>
) => {
  const { className, description, control, messageClassName, ...rest } = props;
  const { labelClassName, descriptionClassName, label, name, ...rest2 } = rest;
  const { wrapperClassName, options, defaultValue = "", ...rest3 } = rest2;
  const { listClassName, onValueChange, ...rest4 } = rest3;

  return (
    <FormField
      control={control}
      name={name}
      defaultValue={defaultValue as PathValue<TSchema, Path<TSchema>>}
      render={fieldProps => {
        const { field } = fieldProps;
        return (
          <FormItem
            className={twMerge("FormChoiceInputWrapper", wrapperClassName)}
          >
            <FormLabel
              className={twMerge("FormChoiceInputLabel", labelClassName)}
            >
              {label}
            </FormLabel>
            <FormControl>
              <Input
                {...field}
                {...rest4}
                value={field.value ?? defaultValue}
                type="hidden"
                className={twMerge("FormChoiceInput", className)}
              />
            </FormControl>
            <div className={twMerge("flex gap-2", listClassName)}>
              {options.map(option => {
                const { label, value, description } = option;
                const selected = value === field.value;
                const itemKeyDown = (
                  e: React.KeyboardEvent<HTMLDivElement>
                ) => {
                  if (e.key !== "Enter" && e.key !== " ") return;
                  field.onChange(value);
                  onValueChange?.(value);
                };
                const itemClick = () => {
                  field.onChange(value);
                  onValueChange?.(value);
                };

                return (
                  <div
                    key={value.toString()}
                    tabIndex={0}
                    onClick={itemClick}
                    onKeyDown={itemKeyDown}
                    className={twMerge(
                      "hover:border-foreground/60 active:border-primary focus-visible:ring-ring ring-offset-background flex flex-1 cursor-pointer flex-col gap-4 rounded border p-4 transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
                      selected
                        ? "border-primary hover:border-primary focus:border-primary"
                        : ""
                    )}
                  >
                    <FormLabel
                      className={twMerge(
                        "FormChoiceInputLabel",
                        labelClassName,
                        selected ? "text-primary" : ""
                      )}
                    >
                      {label}
                    </FormLabel>
                    {description ? (
                      <FormDescription
                        className={twMerge(
                          "FormChoiceInputDescription",
                          descriptionClassName
                        )}
                      >
                        {description}
                      </FormDescription>
                    ) : null}
                  </div>
                );
              })}
            </div>

            <FormDescription
              className={twMerge(
                "FormChoiceInputDescription",
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

export default FormChoiceInput;
