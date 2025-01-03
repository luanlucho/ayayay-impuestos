import invariant from "invariant";
import { TimerIcon } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import { FieldValues, useFormContext, useWatch } from "react-hook-form";
import { twMerge } from "tailwind-merge";

import { options } from "./FormRelativeDateInput.helpers";
import { FormRelativeDateInputProps as Props } from "./FormRelativeDateInput.types";
import { FormControl, FormDescription, FormMessage } from "ui/form";
import { FormField, FormItem, FormLabel } from "ui/form";
import { Input } from "ui/input";
import { Select, SelectContent, SelectValue } from "ui/select";
import { SelectTrigger, SelectItem } from "ui/select";

const FormRelativeDateInput = <TSchema extends FieldValues>(
  props: Props<TSchema>
) => {
  const { className, description, control, messageClassName, ...rest } = props;
  const { labelClassName, descriptionClassName, label, name, ...rest2 } = rest;
  const { placeholder, disabled, onValueChange } = rest2;
  const { setValue, getValues } = useFormContext();
  const field = useWatch({ control, name });
  const [inputValue, setInputValue] = useState("");
  const [selectValue, setSelectValue] = useState(options[0]);
  const inputRef = useRef<HTMLInputElement>(null);

  const sanitizeInputValue = (value: string) => {
    let newValue = value;
    newValue = newValue.startsWith("0") ? newValue.slice(1) : newValue;
    newValue = newValue.slice(0, 2).padStart(2, "0");
    return newValue;
  };

  const replaceField = (
    input: string | undefined,
    select: string | undefined
  ) => {
    const fieldValue = getValues(name) ?? "";
    const [fieldInputValue = "", fieldSelectValue = ""] = fieldValue.split("/");
    invariant(input || select, "input and select cannot be both undefined");
    if (input) return `${input}/${fieldSelectValue}`;
    else return `${fieldInputValue}/${select}`;
  };

  const inputChangeHandler = (value: string) => {
    if (!value) return;
    const newValue = sanitizeInputValue(value);
    setInputValue(newValue);
    const newFieldValue = replaceField(newValue, undefined);
    setValue(name, newFieldValue as any);
    onValueChange?.(newFieldValue);
  };

  const selectChangeHandler = (value: string) => {
    if (!value) return;
    setSelectValue(value);
    const newFieldValue = replaceField(undefined, value);
    setValue(name, newFieldValue as any);
    onValueChange?.(newFieldValue);
  };

  // Focus the input after the select options are blurred
  const focusHandler = (e: React.FocusEvent) => {
    if (inputValue || !inputRef.current) return;
    if (document.activeElement === inputRef.current) return;
    if (e.target.contains(inputRef.current)) return;
    inputRef.current?.select();
  };

  // Handle controlled input passed value
  useEffect(() => {
    const fieldValues = (field ?? "").split("/");
    const [fieldInputValue = "", fieldSelectValue = ""] = fieldValues;
    if (fieldInputValue) setInputValue(fieldInputValue);
    if (fieldSelectValue) setSelectValue(fieldSelectValue);
  }, [field]);

  useEffect(() => {
    if (getValues(name)) return;
    setValue(name, `${inputValue}/${selectValue}` as any);
    onValueChange?.(`${inputValue}/${selectValue}`);
  }, [getValues, inputValue, name, selectValue, setValue, onValueChange]);

  return (
    <FormField
      control={control}
      name={name}
      defaultValue={rest2.defaultValue}
      render={fieldProps => {
        const { field } = fieldProps;
        return (
          <FormItem className="flex flex-col">
            <FormLabel
              className={twMerge(
                "FormRelativeDateInputLabel leading-6",
                labelClassName
              )}
            >
              {label}
            </FormLabel>
            <div
              tabIndex={0}
              className={twMerge(
                "border-input bg-background ring-offset-background placeholder:text-muted-foreground focus-visible:ring-ring flex h-10 w-full items-baseline justify-start gap-0 rounded-md border px-3 py-2 text-sm file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
                className
              )}
            >
              <TimerIcon
                className="mr-2 h-4 w-4 self-center opacity-50"
                onClick={() => inputRef.current?.select()}
              />
              <Input
                className="h-6 w-max border-none p-0 !ring-0 [-moz-appearance:textfield] [&::-webkit-inner-spin-button]:m-0 [&::-webkit-inner-spin-button]:[-webkit-appearance:none] [&::-webkit-outer-spin-button]:m-0 [&::-webkit-outer-spin-button]:[-webkit-appearance:none]"
                placeholder={placeholder ?? "00"}
                type="number"
                maxLength={2}
                min={1}
                max={99}
                step={1}
                value={inputValue}
                onChange={e => inputChangeHandler(e.target.value)}
                ref={inputRef}
              />
              <Select
                disabled={disabled}
                value={selectValue}
                onValueChange={selectChangeHandler}
              >
                <SelectTrigger
                  className="h-6 w-20 border-none p-0 capitalize !ring-0"
                  onFocusCapture={focusHandler}
                >
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="max-h-[300px]">
                  {options.map(option => {
                    return (
                      <SelectItem
                        key={option}
                        value={option}
                        className="capitalize"
                      >
                        {option}
                      </SelectItem>
                    );
                  })}
                </SelectContent>
              </Select>
            </div>
            <FormControl>
              <input type="hidden" {...field} value={field.value ?? ""} />
            </FormControl>
            <FormDescription
              className={twMerge(
                "FormRelativeDateInputDescription",
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

export default FormRelativeDateInput;
