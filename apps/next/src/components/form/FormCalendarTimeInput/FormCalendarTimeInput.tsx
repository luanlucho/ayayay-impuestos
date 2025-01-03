import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import React from "react";
import { FieldValues } from "react-hook-form";
import { twMerge } from "tailwind-merge";

import { FormCalendarTimeInputProps as Props } from "./FormCalendarTimeInput.types";
import TimePicker from "./TimePicker/TimePicker";
import { Button } from "ui/button";
import { Calendar } from "ui/calendar";
import { FormControl, FormDescription, FormMessage } from "ui/form";
import { FormField, FormItem, FormLabel } from "ui/form";
import { Popover, PopoverContent, PopoverTrigger } from "ui/popover";
import { cn } from "ui/utils";

const FormCalendarTimeInput = <TSchema extends FieldValues>(
  props: Props<TSchema>
) => {
  const { className, description, control, messageClassName, ...rest } = props;
  const { labelClassName, descriptionClassName, label, today, ...rest2 } = rest;
  const { placeholder, inputDisabled, name, captionLayout, ...rest3 } = rest2;
  const { defaultValue, fromYear, toYear, disabled, ...rest4 } = rest3;
  const { wrapperClassName, timeGranularity = "minutes", ...rest5 } = rest4;
  const { onValueChange } = rest5;

  const renderValue = (value: Date | undefined) => {
    if (!value) return <span>{placeholder}</span>;
    let formatStr = "PPP HH:mm:ss";
    if (timeGranularity === "minutes") formatStr = "PPP HH:mm";
    return format(value, formatStr);
  };

  return (
    <FormField
      control={control}
      name={name}
      defaultValue={defaultValue}
      render={fieldProps => {
        const { field } = fieldProps;
        const parsedValue = field.value ? new Date(field.value) : undefined;
        const changeHandler = (date: Date | undefined) => {
          field.onChange(date);
          onValueChange?.(date);
        };
        return (
          <FormItem
            className={twMerge("flex w-full flex-col", wrapperClassName)}
          >
            <FormLabel
              className={twMerge(
                "FormCalendarTimeInputLabel leading-6",
                labelClassName
              )}
            >
              {label}
            </FormLabel>
            <Popover modal>
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
                    {renderValue(parsedValue)}
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
                <div className="border-border border-t p-3">
                  <TimePicker
                    onChange={changeHandler}
                    value={parsedValue}
                    granularity={timeGranularity}
                  />
                </div>
              </PopoverContent>
            </Popover>
            <FormDescription
              className={twMerge(
                "FormCalendarTimeInputDescription",
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

export default FormCalendarTimeInput;
