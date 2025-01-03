"use client";
import { DialogClose } from "@radix-ui/react-dialog";
import { useIsMutating } from "@tanstack/react-query";
import React from "react";
import { twMerge } from "tailwind-merge";

import { ConfirmationModalProps as Props } from "./ConfirmationModal.types";
import DialogContent from "components/global/DialogContent/DialogContent";
import { Button } from "ui/button";
import { Dialog, DialogDescription, DialogFooter } from "ui/dialog";
import { DialogHeader, DialogTitle, DialogTrigger } from "ui/dialog";

const ConfirmationModal = (props: Props) => {
  const { className, children, formName, title, description, onSubmit } = props;
  const mutating = useIsMutating();

  const submitHandler = async () => {
    await onSubmit?.();
    document.getElementById("close-dialog")?.click();
  };

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent
        className={twMerge("PointFormModal sm:max-w-[425px]", className)}
      >
        <DialogHeader className="pb-4">
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <Button
            type="submit"
            form={`form-${formName}`}
            className="flex items-center gap-2"
            disabled={!!mutating}
            onClick={submitHandler}
          >
            Confirm
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ConfirmationModal;
