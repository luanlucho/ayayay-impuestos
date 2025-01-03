import React, {
  ChangeEvent,
  useEffect,
  useRef,
  FocusEvent,
  useCallback
} from "react";
import { FieldValues, useFormContext } from "react-hook-form";
import { twMerge } from "tailwind-merge";

import { formatPercentageInput } from "./FormPercentageInput.helpers";
import { FormPercentageInputProps as Props } from "./FormPercentageInput.types";
import { FormDescription, FormMessage, FormField } from "ui/form";
import { FormControl, FormItem, FormLabel } from "ui/form";
import { Input } from "ui/input";
import { numberRegex } from "utils/common.utils";

const FormPercentageInput = <TSchema extends FieldValues>(
  props: Props<TSchema>
) => {
  const { className, description, control, messageClassName, ...rest } = props;
  const { labelClassName, descriptionClassName, label, name, ...rest2 } = rest;
  const { wrapperClassName, max = Infinity, ...rest3 } = rest2;
  const { onBlur, onFocus, onChange, ...rest4 } = rest3;
  const internalRef = useRef<HTMLInputElement>(null);
  const onChangeRef = useRef(onChange);
  const { setValue } = useFormContext();

  useEffect(() => {
    onChangeRef.current = onChange;
  });

  const format = useCallback(
    (value: string) => {
      let digits = value.replace(",", ".");
      digits = value.replace(numberRegex, "");
      let newValue = Math.min(parseFloat(digits), max);
      if (isNaN(newValue)) newValue = 0;
      return formatPercentageInput(newValue);
    },
    [max]
  );

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
  }, [format]);

  return (
    <FormField
      control={control}
      name={name}
      defaultValue={rest3.defaultValue}
      render={fieldProps => {
        const { field } = fieldProps;
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
              "FormPercentageInputWrapper flex-1",
              wrapperClassName
            )}
          >
            <FormLabel
              className={twMerge("FormPercentageInputLabel", labelClassName)}
            >
              {label}
            </FormLabel>
            <FormControl>
              <Input
                className={twMerge("FormPercentageInput", className)}
                {...rest4}
                {...field}
                onChange={changeHandler}
                onBlur={blurHandler}
                onFocus={focusHandler}
              />
            </FormControl>
            <FormDescription
              className={twMerge(
                "FormPercentageInputDescription",
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

export default FormPercentageInput;
