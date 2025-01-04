import Image from "next/image";
import Link from "next/link";
import React from "react";
import { twMerge } from "tailwind-merge";

import { LogoProps as Props } from "./Logo.types";

const Logo = (props: Props) => {
  const { className } = props;

  return (
    <Link href="/">
      <div className={twMerge("Logo flex items-center gap-2", className)}>
        <Image
          src="/assets/images/logo-white.svg"
          alt="Masivo logo"
          width={120}
          height={100}
          className="hidden dark:block"
        />
        <Image
          src="/assets/images/logo-black.svg"
          alt="Masivo logo"
          width={120}
          height={100}
          className="block dark:hidden"
        />
      </div>
    </Link>
  );
};

export default Logo;
