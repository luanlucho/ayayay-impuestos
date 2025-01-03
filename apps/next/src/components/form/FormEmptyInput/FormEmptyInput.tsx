import { PlusCircle } from "lucide-react";
import Link from "next/link";
import React from "react";
import { FieldValues } from "react-hook-form";
import { twMerge } from "tailwind-merge";

import { FormEmptyInputProps as Props } from "./FormEmptyInput.types";
import { Button } from "ui/button";
import { FormField } from "ui/form";
import { FormDescription, FormMessage } from "ui/form";
import { FormControl, FormItem, FormLabel } from "ui/form";

const FormEmptyInput = <TSchema extends FieldValues>(props: Props<TSchema>) => {
  const { className, description, control, messageClassName, ...rest } = props;
  const { labelClassName, descriptionClassName, label, name, ...rest2 } = rest;
  const { wrapperClassName, href, title, ...rest3 } = rest2;

  return (
    <FormField
      control={control}
      name={name}
      defaultValue={rest3.defaultValue}
      render={fieldProps => {
        return (
          <FormItem
            className={twMerge("FormEmptyInputWrapper", wrapperClassName)}
          >
            <FormLabel
              className={twMerge("FormEmptyInputLabel", labelClassName)}
            >
              {label}
            </FormLabel>
            <FormControl>
              <Link href={href}>
                <Button
                  className={twMerge("FormEmptyInput mt-2 gap-2", className)}
                  variant="new"
                  type="button"
                >
                  <PlusCircle width={16} />
                  {title}
                </Button>
              </Link>
            </FormControl>
            {rest3.type !== "hidden" ? (
              <FormDescription
                className={twMerge(
                  "FormEmptyInputDescription",
                  descriptionClassName
                )}
              >
                {description}
              </FormDescription>
            ) : null}
            <FormMessage className={twMerge("FormError", messageClassName)} />
          </FormItem>
        );
      }}
    />
  );
};

export default FormEmptyInput;
