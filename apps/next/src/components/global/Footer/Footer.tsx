import React from "react";
import { twMerge } from "tailwind-merge";

import { FooterProps as Props } from "./Footer.types";

const Footer = (props: Props) => {
  const { className } = props;

  return (
    <footer
      className={twMerge(
        "Footer layout w-full bg-yellow-400 px-2 py-2 md:px-32",
        className
      )}
    >
      <div className="layout-content flex flex-col gap-4 text-xs text-black">
        <div className="flex flex-col gap-4">
          <p className="text-center">
            Todos los derechos reservados © {new Date().getFullYear()}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
