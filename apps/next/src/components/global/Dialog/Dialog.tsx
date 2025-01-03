"use client";
import { Root } from "@radix-ui/react-dialog";
import React, { useEffect, useState } from "react";

import { DialogProps as Props } from "./Dialog.types";

// Fixes issue with SSR when used as a route
const Dialog = (props: Props) => {
  const { children, open, ...rest } = props;
  const [opened, setOpened] = useState(false);

  useEffect(() => {
    if (typeof open === "undefined") return;
    setOpened(open);
  }, [open]);

  return (
    <Root {...rest} open={opened}>
      {children}
    </Root>
  );
};

Dialog.displayName = Root.displayName;

export default Dialog;
