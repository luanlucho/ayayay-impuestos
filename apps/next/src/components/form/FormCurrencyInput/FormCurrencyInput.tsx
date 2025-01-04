import React, { ChangeEvent, useEffect, useRef, FocusEvent } from "react";
import { FieldValues, useFormContext } from "react-hook-form";
import { twMerge } from "tailwind-merge";

import { formatByCurrency } from "./FormCurrencyInput.helpers";
import { FormCurrencyInputProps as Props } from "./FormCurrencyInput.types";
import { FormDescription, FormMessage, FormField } from "ui/form";
import { FormControl, FormItem, FormLabel } from "ui/form";
import { Input } from "ui/input";
import { numberRegex } from "utils/common.utils";

const FormCurrencyInput = <TSchema extends FieldValues>(
  props: Props<TSchema>
) => {
  const { className, description, control, messageClassName, ...rest } = props;
  const { labelClassName, descriptionClassName, label, name, ...rest2 } = rest;
  const { wrapperClassName, formatter, ...rest3 } = rest2;
  const { onBlur, onFocus, onChange, ...rest4 } = rest3;
  const internalRef = useRef<HTMLInputElement>(null);
  const formatterRef = useRef(formatter);
  const onChangeRef = useRef(onChange);
  const { setValue } = useFormContext();

  useEffect(() => {
    formatterRef.current = formatter;
    onChangeRef.current = onChange;
  });

  const format = (value: string) => {
    let digits = value.replace(",", ".");
    digits = value.replace(numberRegex, "");
    let newValue = parseFloat(digits);
    if (isNaN(newValue)) newValue = 0;
    return formatByCurrency(newValue, formatterRef.current);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (typeof internalRef.current?.value === "undefined") return;
      const value = format(internalRef.current.value);
      const e = new Event("change");
      internalRef.current.dispatchEvent(e);
      // @ts-ignore no way to type
      e.target.value = value;
      // @ts-ignore no way to type
      onChangeRef.current?.(e);
      clearInterval(interval);
    }, 100);

    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className={twMerge(
        "FormCurrencyInput flex w-full items-start gap-2",
        className
      )}
    >
      <FormField
        control={control}
        name={name}
        defaultValue={rest3.defaultValue}
        render={fieldProps => {
          const { field } = fieldProps;
          const sanitizedValue = field.value ?? "";

          const blurHandler = (e: FocusEvent<HTMLInputElement>) => {
            const value = format(e.target.value);
            e.target.value = value;
            setValue(name, value as any);
            onChange?.(e);
            onBlur?.(e);
            field.onBlur();
          };

          const focusHandler = (e: FocusEvent<HTMLInputElement>) => {
            e.target.select();
            onFocus?.(e);
          };

          const changeHandler = (e: ChangeEvent<HTMLInputElement>) => {
            let digits = e.target.value.replace(",", ".");
            digits = digits.replace(numberRegex, "");
            e.target.value = digits;
            setValue(name, digits as any);
            onChange?.(e);
            field.onChange(e);
          };
          return (
            <FormItem
              className={twMerge(
                "FormCurrencyInputWrapper flex-1",
                wrapperClassName
              )}
            >
              <FormLabel
                className={twMerge("FormCurrencyInputLabel", labelClassName)}
              >
                {label}
              </FormLabel>
              <FormControl>
                <Input
                  className={twMerge("FormCurrencyInput", className)}
                  {...rest4}
                  {...field}
                  value={sanitizedValue}
                  onChange={changeHandler}
                  onBlur={blurHandler}
                  onFocus={focusHandler}
                />
              </FormControl>
              <FormDescription
                className={twMerge(
                  "FormCurrencyInputDescription",
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
      <span className="pt-10">{formatter.currency}</span>
    </div>
  );
};

export default FormCurrencyInput;
