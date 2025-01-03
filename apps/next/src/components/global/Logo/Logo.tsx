import Image from "next/image";
import Link from "next/link";
import React from "react";
import { twMerge } from "tailwind-merge";

import { LogoProps as Props } from "./Logo.types";

const Logo = (props: Props) => {
  const { className, width } = props;

  return (
    <Link href="/">
      <div className={twMerge("Logo flex items-center gap-2", className)}>
        <Image
          src="/assets/images/logo.svg"
          alt="IR logo"
          width={width}
          height={width}
        />
        IR
      </div>
    </Link>
  );
};

export default Logo;
