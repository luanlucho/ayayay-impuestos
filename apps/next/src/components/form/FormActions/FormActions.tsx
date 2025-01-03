"use client";
import { useIsMutating } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import React from "react";
import { twMerge } from "tailwind-merge";

import { FormActionsProps as Props } from "./FormActions.types";
import ConfirmationModal from "components/global/ConfirmationModal/ConfirmationModal";
import { Button } from "ui/button";

const FormActions = (props: Props) => {
  const { className, formName, confirmation } = props;
  const router = useRouter();
  const mutating = useIsMutating();

  const backHandler = () => {
    router.back();
  };

  const confirmationButtonNode = (
    <Button form={`form-${formName}`} type="submit" disabled={!!mutating}>
      Save
    </Button>
  );

  const triggerNode = <Button disabled={!!mutating}>Save</Button>;

  return (
    <footer
      className={twMerge(
        "FormActions bg-background-2 layout row-start-2 h-[--form-actions-height] border-t py-4",
        className
      )}
    >
      <div className="layout-content flex items-center justify-between">
        <Button variant="outline" onClick={backHandler}>
          Cancel
        </Button>
        {confirmation ? (
          <ConfirmationModal {...confirmation} formName={formName}>
            {triggerNode}
          </ConfirmationModal>
        ) : (
          confirmationButtonNode
        )}
      </div>
    </footer>
  );
};

export default FormActions;
