import Link from "next/link";
import React from "react";
import { twMerge } from "tailwind-merge";

import { GoToNewButtonProps as Props } from "./GoToNewButton.types";
import { Button } from "ui/button";

const GoToNewButton = (props: Props) => {
  const { className, href, title, onClick } = props;

  return (
    <Link href={href} onClick={onClick}>
      <Button className={twMerge("GoToNewButton", className)}>
        New {title}
      </Button>
    </Link>
  );
};

export default GoToNewButton;
