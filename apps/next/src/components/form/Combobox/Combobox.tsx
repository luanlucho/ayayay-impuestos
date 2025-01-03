import { Check, ChevronsUpDown } from "lucide-react";
import React, { forwardRef, useState, ElementRef } from "react";
import { twMerge } from "tailwind-merge";

import { ComboboxProps as Props } from "./Combobox.types";
import { Button } from "ui/button";
import { CommandGroup, CommandInput, CommandItem } from "ui/command";
import { Command, CommandEmpty, CommandList } from "ui/command";
import { FormControl } from "ui/form";
import { Popover, PopoverContentNoPortal, PopoverTrigger } from "ui/popover";
import { ScrollArea } from "ui/scroll-area";

const Combobox = forwardRef<ElementRef<typeof Command>, Props>((props, ref) => {
  const { className, items, notFoundMessage, onItemSelect, ...rest } = props;
  const { onValueChange, placeholder, searchPlaceholder, ...rest2 } = rest;
  const { onSearchValueChange, value, ...rest3 } = rest2;
  const [open, setOpen] = useState(false);

  const openChangeHandler = (open: boolean) => {
    if (!open) onSearchValueChange?.("");
    setOpen(open);
  };

  const changeHandler = (value: string) => {
    onValueChange?.(value);
  };

  const selectedValue = value ? value : undefined;

  return (
    <Popover open={open} onOpenChange={openChangeHandler}>
      <PopoverTrigger asChild>
        <FormControl>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className={twMerge(
              "Combobox mt-2 flex w-full justify-between truncate whitespace-nowrap",
              className
            )}
          >
            {selectedValue
              ? items.find(item => item.value === selectedValue)?.label
              : placeholder}
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
          {...rest3}
          ref={ref}
        >
          <CommandInput
            placeholder={searchPlaceholder}
            onValueChange={onSearchValueChange}
          />
          <ScrollArea>
            <CommandList>
              <CommandEmpty>{notFoundMessage ?? "No items found"}</CommandEmpty>
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
                      onSelect={selectHandler}
                    >
                      <Check
                        className={twMerge(
                          "mr-2 h-4 w-4",
                          selectedValue === value ? "opacity-100" : "opacity-0"
                        )}
                      />
                      {label}
                    </CommandItem>
                  );
                })}
              </CommandGroup>
            </CommandList>
          </ScrollArea>
        </Command>
      </PopoverContentNoPortal>
    </Popover>
  );
});

Combobox.displayName = "Combobox";

export default Combobox;
