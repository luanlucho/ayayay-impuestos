import Image from "next/image";
import Link from "next/link";
import React from "react";
import { twMerge } from "tailwind-merge";

import { HighlightedArticlesProps as Props } from "./HighlightedArticles.types";

const HighlightedArticles = (props: Props) => {
  const { className, year, countryCode } = props;

  const liClassName =
    "ml-4 list-disc underline underline-offset-4 text-muted-foreground hover:text-primary active:text-primary/60";
  const textClassName =
    "hover:text-primary active:text-primary/60 transition-all";

  return (
    <div
      className={twMerge(
        "HighlightedArticles flex flex-1 flex-col gap-4 rounded-xl border p-4 sm:px-8 sm:py-12",
        className
      )}
    >
      <h3 className="h3">Más recursos</h3>
      <ul className="flex flex-col gap-4">
        <li className={liClassName}>
          <Link
            href={`/${countryCode}/${year}/t/calculadora-impuesto-a-la-renta`}
          >
            <span className={textClassName}>
              Calculadora del impuesto a la renta periodo 2024 por régimen
            </span>
          </Link>
        </li>
        <li className={liClassName}>
          <Link href={`/${countryCode}/${year}/i/tabla-impuesto-a-la-renta`}>
            <span className={textClassName}>
              Tabla de impuestos a la renta periodo 2024 por régimen
            </span>
          </Link>
        </li>
        <li className={liClassName}>
          <Link href={`/${countryCode}/${year}/i/lista-de-feriados`}>
            <span className={textClassName}>
              Lista de feriados nacionales y provinciales en Ecuador 2025
            </span>
          </Link>
        </li>
      </ul>
      <div className="mt-auto flex flex-col gap-4 pt-4">
        <a
          href="https://www.producthunt.com/products/ayayay-impuestos"
          target="_blank"
        >
          <Image
            src="https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=759207&theme=light&t=1736604602522"
            alt="Ayayay&#0032;Impuestos - The&#0032;taxes&#0032;automation&#0032;tool&#0032;for&#0032;LATAM&#0032;countries | Product Hunt"
            style={{ width: "250px", height: "54px" }}
            className="block dark:hidden"
            width="250"
            height="54"
          />
          <Image
            src="https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=759207&theme=dark&t=1736605728012"
            alt="Ayayay&#0032;Impuestos - The&#0032;taxes&#0032;automation&#0032;tool&#0032;for&#0032;LATAM&#0032;countries | Product Hunt"
            style={{ width: "250px", height: "54px" }}
            className="hidden dark:block"
            width="250"
            height="54"
          />
        </a>
        <a href="https://github.com/luanlucho/ayayay-impuestos" target="_blank">
          <div className="flex h-[54px] w-[250px] items-center gap-2 rounded-[8px] border border-black px-4 py-2 text-lg font-semibold dark:border-white">
            <svg
              className="h-6 w-6 fill-black dark:fill-white"
              role="img"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <title>GitHub</title>
              <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
            </svg>
            Contribuye en Github
          </div>
        </a>
      </div>
    </div>
  );
};

export default HighlightedArticles;
