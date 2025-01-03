import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import React from "react";
import { FieldValues } from "react-hook-form";
import { twMerge } from "tailwind-merge";

import { FormCalendarInputProps as Props } from "./FormCalendarInput.types";
import { Button } from "ui/button";
import { Calendar } from "ui/calendar";
import { FormControl, FormDescription, FormMessage } from "ui/form";
import { FormField, FormItem, FormLabel } from "ui/form";
import { Popover, PopoverContent, PopoverTrigger } from "ui/popover";
import { cn } from "ui/utils";

const FormCalendarInput = <TSchema extends FieldValues>(
  props: Props<TSchema>
) => {
  const { className, description, control, messageClassName, ...rest } = props;
  const { labelClassName, descriptionClassName, label, today, ...rest2 } = rest;
  const { placeholder, inputDisabled, name, endOfDay, ...rest3 } = rest2;
  const { defaultValue, fromYear, toYear, disabled, ...rest4 } = rest3;
  const { wrapperClassName, captionLayout, onValueChange } = rest4;

  return (
    <FormField
      control={control}
      name={name}
      defaultValue={defaultValue}
      render={fieldProps => {
        const { field } = fieldProps;
        const changeHandler = (date: Date | undefined) => {
          if (!date) {
            field.onChange(date);
            onValueChange?.(date);
            return;
          }
          const startOfDayDate = new Date(date.setHours(0, 0, 0));
          const endOfDayDate = new Date(date.setHours(23, 59, 59));
          const parsedDate = endOfDay ? endOfDayDate : startOfDayDate;
          field.onChange(parsedDate);
          onValueChange?.(parsedDate);
        };
        const parsedValue = field.value ? new Date(field.value) : undefined;
        const key = parsedValue ? parsedValue.getDate() : undefined;
        return (
          <FormItem
            className={twMerge("flex w-full flex-col", wrapperClassName)}
          >
            <FormLabel
              className={twMerge(
                "FormCalendarInputLabel leading-6",
                labelClassName
              )}
            >
              {label}
            </FormLabel>
            <Popover key={key}>
              <PopoverTrigger asChild>
                <FormControl>
                  <Button
                    disabled={inputDisabled}
                    variant={"outline"}
                    className={cn(
                      "w-full min-w-[240px] pl-3 text-left font-normal",
                      !parsedValue && "text-muted-foreground"
                    )}
                  >
                    {parsedValue ? (
                      format(parsedValue, "PPP")
                    ) : (
                      <span>{placeholder}</span>
                    )}
                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                  </Button>
                </FormControl>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={parsedValue}
                  onSelect={(_, selected) => changeHandler(selected)}
                  disabled={disabled}
                  fromYear={fromYear}
                  toYear={toYear}
                  captionLayout={captionLayout}
                  today={today}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
            <FormDescription
              className={twMerge(
                "FormCalendarInputDescription",
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

export default FormCalendarInput;
