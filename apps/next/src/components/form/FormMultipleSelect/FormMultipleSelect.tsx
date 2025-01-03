import { ChevronDown } from "lucide-react";
import React, { useState } from "react";
import { FieldValues } from "react-hook-form";
import { components, MenuListProps } from "react-select";
import { DropdownIndicatorProps } from "react-select";
import CreatableSelect from "react-select/creatable";
import { twMerge } from "tailwind-merge";

import { getClassNames } from "./FormMultipleSelect.helper";
import { FormMultipleSelectProps as Props } from "./FormMultipleSelect.types";
import { FormDescription, FormField, FormMessage } from "ui/form";
import { FormItem, FormLabel } from "ui/form";
import { SelectItem, SelectLabel } from "ui/select";
import { SelectGroup } from "ui/select";

const FormMultipleSelect = <TSchema extends FieldValues>(
  props: Props<TSchema>
) => {
  const { className, description, control, messageClassName, ...rest } = props;
  const { labelClassName, descriptionClassName, label, name, ...rest2 } = rest;
  const { wrapperClassName, footerItem, onFooterSelect, ...rest3 } = rest2;
  const { onSearchValueChange, options, onCreated, disabled, ...rest4 } = rest3;
  const [inputValue, setInputValue] = useState("");

  // Custom components to override default components and show custom elements
  const MenuList = <OptionType,>(props: MenuListProps<OptionType>) => {
    const footerClickHandler = () => {
      onFooterSelect?.();
      setInputValue("");
      onSearchValueChange?.("");
    };

    return (
      <components.MenuList {...props}>
        {props.children}
        {footerItem ? (
          <div onClick={footerClickHandler} className="px-3 py-2">
            {footerItem}
          </div>
        ) : null}
      </components.MenuList>
    );
  };

  const DropdownIndicator = <OptionType,>(
    props: DropdownIndicatorProps<OptionType>
  ) => {
    return (
      <components.DropdownIndicator {...props}>
        <ChevronDown className="stroke-foreground h-4 w-4 opacity-50" />
      </components.DropdownIndicator>
    );
  };

  return (
    <FormField
      control={control}
      name={name}
      defaultValue={rest4.defaultValue}
      render={fieldProps => {
        const { field } = fieldProps;

        const handleInputChange = (value: string) => {
          setInputValue(value);
          onSearchValueChange?.(value);
        };

        return (
          <FormItem
            className={twMerge("FormMultipleSelectWrapper", wrapperClassName)}
          >
            <FormLabel
              className={twMerge(
                "FormMultipleSelectLabel block py-1 leading-4",
                labelClassName
              )}
            >
              {label}
            </FormLabel>
            <CreatableSelect
              {...field}
              options={options}
              placeholder={rest4.placeholder}
              isMulti
              isDisabled={disabled}
              isSearchable
              onCreateOption={(input: string) => onCreated(input)}
              components={{
                MenuList,
                NoOptionsMessage: () => null,
                DropdownIndicator
              }}
              onInputChange={handleInputChange}
              classNames={{
                control: state => getClassNames(state, "control"),
                option: state => getClassNames(state, "option"),
                menu: state => getClassNames(state, "menu"),
                placeholder: state => getClassNames(state, "placeholder"),
                multiValue: state => getClassNames(state, "multiValue"),
                multiValueLabel: state =>
                  getClassNames(state, "multiValueLabel"),
                input: state => getClassNames(state, "input")
              }}
              inputValue={inputValue}
            />
            <FormDescription
              className={twMerge(
                "FormMultipleSelectDescription",
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

FormMultipleSelect.Item = SelectItem;
FormMultipleSelect.Group = SelectGroup;
FormMultipleSelect.Label = SelectLabel;

export default FormMultipleSelect;
