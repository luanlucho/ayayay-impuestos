import { PopoverArrow } from "@radix-ui/react-popover";
import { Eye, EyeOff, Copy } from "lucide-react";
import React, { useState } from "react";
import { FieldValues, useWatch } from "react-hook-form";
import { twMerge } from "tailwind-merge";

import { FormApiKeyInputProps as Props } from "./FormApiKeyInput.types";
import FormInput from "../FormInput/FormInput";
import { Button } from "ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "ui/popover";

const FormApiKeyInput = <TSchema extends FieldValues>(
  props: Props<TSchema>
) => {
  const { className, ...rest } = props;
  const value = useWatch({ control: rest.control, name: rest.name });
  const [opened, setOpened] = useState(false);
  const [status, setStatus] = useState<"hidden" | "revealed" | "copied">(
    "hidden"
  );

  const revealHandler = () => {
    setStatus("revealed");
    setOpened(false);
  };

  const copyHandler = async () => {
    await navigator.clipboard.writeText(value);
    setStatus("copied");
    setOpened(true);
    setTimeout(() => setOpened(false), 1500);
  };

  const hideHandler = () => {
    setStatus("hidden");
    setOpened(false);
  };

  const renderButton = () => {
    const buttonClassName =
      "flex items-center gap-1 absolute right-1 px-2 top-9 h-8 z-10";

    const buttonOptions = {
      hidden: {
        icon: <Eye width={16} />,
        text: "Reveal",
        onClick: revealHandler
      },
      revealed: {
        icon: <Copy width={16} />,
        text: "Copy",
        onClick: copyHandler
      },
      copied: {
        icon: <EyeOff width={16} />,
        text: "Hide",
        onClick: hideHandler
      }
    };

    return (
      <Popover open={opened}>
        <PopoverTrigger asChild>
          <Button
            onClick={buttonOptions[status].onClick}
            className={buttonClassName}
            variant="outline"
            type="button"
          >
            {buttonOptions[status].icon}
            {buttonOptions[status].text}
          </Button>
        </PopoverTrigger>
        <PopoverContent side="top" className="w-max px-4 py-2">
          Copied!
          <PopoverArrow height={8} width={10} />
        </PopoverContent>
      </Popover>
    );
  };

  return (
    <div className={twMerge("FormApiKeyInput relative", className)}>
      <FormInput
        placeholder="Server-side API key"
        {...rest}
        type={status === "hidden" ? "password" : "text"}
        readOnly
      />
      {renderButton()}
    </div>
  );
};

export default FormApiKeyInput;
