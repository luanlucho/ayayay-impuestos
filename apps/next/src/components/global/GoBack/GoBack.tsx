"use client";
import { MoveLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";
import { twMerge } from "tailwind-merge";

import { GoBackProps as Props } from "./GoBack.types";

const GoBack = (props: Props) => {
  const { className } = props;
  const router = useRouter();

  return (
    <div className={twMerge("GoBack", className)} onClick={() => router.back()}>
      <MoveLeft
        className="fill-foreground cursor-pointer"
        width={48}
        height={48}
      />
    </div>
  );
};

export default GoBack;
