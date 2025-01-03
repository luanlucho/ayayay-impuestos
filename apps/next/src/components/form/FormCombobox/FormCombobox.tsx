import invariant from "invariant";
import { Check, ChevronsUpDown } from "lucide-react";
import React, { useState } from "react";
import { FieldValues } from "react-hook-form";
import { twMerge } from "tailwind-merge";

import { FormComboboxProps as Props } from "./FormCombobox.types";
import { Button } from "ui/button";
import { CommandGroup, CommandInput, CommandItem } from "ui/command";
import { Command, CommandEmpty, CommandList } from "ui/command";
import { FormControl, FormDescription, FormField } from "ui/form";
import { FormItem, FormLabel, FormMessage } from "ui/form";
import { Popover, PopoverContentNoPortal, PopoverTrigger } from "ui/popover";
import { ScrollArea } from "ui/scroll-area";

const FormCombobox = <TSchema extends FieldValues>(props: Props<TSchema>) => {
  const { className, description, control, messageClassName, ...rest } = props;
  const { labelClassName, descriptionClassName, label, items, ...rest2 } = rest;
  const { contentClassName, disabled, name, notFoundMessage, ...rest3 } = rest2;
  const { onValueChange, wrapperClassName, placeholder, ...rest4 } = rest3;
  const { searchPlaceholder, onSearchValueChange, ...rest5 } = rest4;
  const { onItemSelect, footerItem, onFooterSelect, ...rest6 } = rest5;
  const [open, setOpen] = useState(false);

  const openChangeHandler = (open: boolean) => {
    if (!open) onSearchValueChange?.("");
    setOpen(open);
  };

  const renderFooterItem = () => {
    if (!footerItem) return null;
    const selectHandler = () => {
      onSearchValueChange?.("");
      onFooterSelect?.();
      setOpen(false);
    };
    return (
      <CommandItem key={-1} value="" onSelect={selectHandler}>
        {footerItem}
      </CommandItem>
    );
  };

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

        const renderSelectedValue = () => {
          if (!selectedValue) return placeholder;
          const item = items.find(item => item.value === selectedValue);
          invariant(item, "Item not found!!!");
          const { label, suffix } = item;
          return (
            <span>
              {label}
              {suffix ? (
                <span className="text-muted-foreground text-xs">
                  {" "}
                  ({suffix})
                </span>
              ) : null}
            </span>
          );
        };

        return (
          <FormItem
            className={twMerge("FormComboboxWrapper", wrapperClassName)}
          >
            <FormLabel
              className={twMerge(
                "FormComboboxLabel block py-1 leading-4",
                labelClassName
              )}
            >
              {label}
            </FormLabel>
            <Popover open={open} onOpenChange={openChangeHandler}>
              <PopoverTrigger asChild>
                <FormControl>
                  <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className={twMerge(
                      "FormCombobox mt-2 w-full justify-between truncate whitespace-nowrap",
                      className
                    )}
                  >
                    {renderSelectedValue()}
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                  </Button>
                </FormControl>
              </PopoverTrigger>
              <PopoverContentNoPortal className="w-[320px] p-0">
                <Command
                  onValueChange={changeHandler}
                  className="w-full"
                  filter={(value, search) => {
                    const item = items.find(item => item.value === value);
                    const normalizedValue = item?.label.toLowerCase();
                    const normalizedSearch = search.toLowerCase();
                    if (normalizedValue?.includes(normalizedSearch)) return 1;
                    return 0;
                  }}
                  {...rest6}
                >
                  <CommandInput
                    placeholder={searchPlaceholder}
                    onValueChange={onSearchValueChange}
                  />
                  <ScrollArea>
                    <CommandList>
                      <CommandEmpty>
                        {notFoundMessage ?? "No items found"}
                      </CommandEmpty>
                      <CommandGroup>
                        {items.map(item => {
                          const { value, label } = item;
                          const selectHandler = (value: string) => {
                            const isSameValue = value === selectedValue;
                            const newValue = isSameValue ? "" : value;
                            changeHandler(newValue);
                            onSearchValueChange?.("");
                            onItemSelect?.(!isSameValue ? item : undefined);
                            setOpen(false);
                          };
                          return (
                            <CommandItem
                              key={value}
                              value={value}
                              // Cannot use onSelect value since it lowercases the value
                              onSelect={() => selectHandler(value)}
                            >
                              <Check
                                className={twMerge(
                                  "mr-2 h-4 w-4",
                                  selectedValue === value
                                    ? "opacity-100"
                                    : "opacity-0"
                                )}
                              />
                              {label}
                            </CommandItem>
                          );
                        })}
                        {renderFooterItem()}
                      </CommandGroup>
                    </CommandList>
                  </ScrollArea>
                </Command>
              </PopoverContentNoPortal>
            </Popover>
            <FormDescription
              className={twMerge(
                "FormComboboxDescription",
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

export default FormCombobox;
