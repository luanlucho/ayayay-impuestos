import { Editor } from "@monaco-editor/react";
import React from "react";
import { FieldValues } from "react-hook-form";
import { twMerge } from "tailwind-merge";

import { FormJsonEditorProps as Props } from "./FormJsonEditor.types";
import { FormField } from "ui/form";
import { FormDescription, FormMessage } from "ui/form";
import { FormControl, FormItem, FormLabel } from "ui/form";

const FormJsonEditor = <TSchema extends FieldValues>(props: Props<TSchema>) => {
  const { className, description, control, messageClassName, ...rest } = props;
  const { labelClassName, descriptionClassName, label, name, ...rest2 } = rest;
  const { wrapperClassName, ...rest3 } = rest2;

  return (
    <FormField
      control={control}
      name={name}
      defaultValue={rest3.defaultValue}
      render={fieldProps => {
        const { field } = fieldProps;
        const { ref, ...fieldRest } = field;
        return (
          <FormItem
            className={twMerge("FormJsonEditorWrapper", wrapperClassName)}
          >
            <FormLabel
              className={twMerge("FormJsonEditorLabel", labelClassName)}
            >
              {label}
            </FormLabel>
            <FormControl>
              <Editor
                height="400px"
                defaultLanguage="json"
                theme="vs-dark"
                className={twMerge(
                  "FormJsonEditor focus-visible:ring-ring border-input overflow-hidden rounded-md border bg-[hsl(222.2_84%_4.9%)] py-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
                  className
                )}
                {...rest3}
                {...fieldRest}
              />
            </FormControl>
            <FormDescription
              className={twMerge(
                "FormJsonEditorDescription",
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

export default FormJsonEditor;
