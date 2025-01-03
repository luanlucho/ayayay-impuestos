import React from "react";
import { FieldValues } from "react-hook-form";
import { twMerge } from "tailwind-merge";

import { FormTextareaProps as Props } from "./FormTextarea.types";
import { FormField } from "ui/form";
import { FormDescription, FormMessage } from "ui/form";
import { FormControl, FormItem, FormLabel } from "ui/form";
import { Textarea } from "ui/textarea";

const FormTextarea = <TSchema extends FieldValues>(props: Props<TSchema>) => {
  const { className, description, control, messageClassName, ...rest } = props;
  const { labelClassName, descriptionClassName, label, name, ...rest2 } = rest;

  return (
    <FormField
      control={control}
      name={name}
      defaultValue={rest2.defaultValue}
      render={fieldProps => {
        const { field } = fieldProps;
        const sanitizedValue = field.value ?? undefined;

        return (
          <FormItem>
            <FormLabel className={twMerge("FormTextareaLabel", labelClassName)}>
              {label}
            </FormLabel>
            <FormControl>
              <Textarea
                className={twMerge("FormTextarea", className)}
                {...rest2}
                {...field}
                value={sanitizedValue}
              />
            </FormControl>
            <FormDescription
              className={twMerge(
                "FormTextareaDescription",
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

export default FormTextarea;
