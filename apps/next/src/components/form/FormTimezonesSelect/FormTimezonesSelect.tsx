"use client";
import React from "react";
import { FieldValues } from "react-hook-form";
import { twMerge } from "tailwind-merge";

import { FormTimezonesSelectProps as Props } from "./FormTimezonesSelect.types";
import FormSelect from "components/form/FormSelect/FormSelect";
import { trpc } from "config/trpc.config";

const FormTimezonesSelect = <TSchema extends FieldValues>(
  props: Props<TSchema>
) => {
  const { className, disabled, ...rest } = props;
  const { data: timezones } = trpc.general.timezones.select.useQuery();

  return (
    <FormSelect
      className={twMerge("FormTimezonesSelect", className)}
      placeholder="Timezone"
      {...rest}
      disabled={disabled ?? !timezones}
    >
      {timezones?.map(timezone => {
        const { id, name, utc_offset } = timezone;
        if (typeof utc_offset !== "string") return null;
        const offset = `${utc_offset}`.split(":").slice(0, 2).join(":");
        return (
          <FormSelect.Item key={id} value={name}>
            <span className="flex items-center justify-between gap-2">
              <span>{name}</span>
              <span className="text-muted-foreground">(UTC {offset})</span>
            </span>
          </FormSelect.Item>
        );
      })}
    </FormSelect>
  );
};

export default FormTimezonesSelect;
