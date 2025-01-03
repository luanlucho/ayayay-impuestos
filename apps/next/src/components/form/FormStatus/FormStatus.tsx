import React from "react";
import { useFormContext } from "react-hook-form";
import { twMerge } from "tailwind-merge";

import { FormStatusProps as Props } from "./FormStatus.types";
import FormStatusSelect from "../FormStatusSelect/FormStatusSelect";

const FormStatus = (props: Props) => {
  const { className } = props;
  const { control } = useFormContext();

  return (
    <section
      className={twMerge(
        "FormStatus bg-background-2 col-start-2 flex-1 rounded p-6",
        className
      )}
    >
      <FormStatusSelect
        control={control}
        name="status"
        label="Status"
        statuses={["ACTIVE", "INACTIVE"]}
      />
    </section>
  );
};

export default FormStatus;
