import { Metadata, ResolvingMetadata } from "next";
import Image from "next/image";
import Link from "next/link";
import React from "react";

import { MetadataProps, PageProps as Props } from "app/types";
import PageHeader from "components/global/PageHeader/PageHeader";
import CalculatorForm from "components/tools/CalculatorIREC2024Form/CalculatorIREC2024Form";
import { buildMetadata } from "utils/seo.utils";

const Page = async (props: Props) => {
  const { year, countryCode } = await props.params;

  return (
    <div className="Page layout h-full overflow-auto pb-4">
      <div className="layout-content flex flex-col gap-8 py-[--pad]">
        <div className="flex flex-col gap-4">
          <PageHeader
            title={`Calcula tu declaración del impuesto a la renta ${year}`}
          />
        </div>
        <div className="flex flex-col justify-between gap-4 lg:flex-row lg:gap-8">
          <CalculatorForm className="flex-1" />
          <aside className="flex gap-4">
            <div className="flex h-[calc(100vh-300px)] flex-1 flex-col gap-4 rounded-xl border p-4 sm:px-8 sm:py-12">
              <h3 className="h3">Más recursos</h3>
              <ul className="flex flex-col gap-2">
                <li className="ml-4 list-disc">
                  <Link
                    href={`/${countryCode}/${year}/t/calculadora-impuesto-a-la-renta`}
                  >
                    <span className="active:text-primary hover:underline">
                      Calculadora del impuesto a la renta 2024 por régimen
                    </span>
                  </Link>
                </li>
                <li className="ml-4 list-disc">
                  <Link
                    href={`/${countryCode}/${year}/i/tabla-impuesto-a-la-renta`}
                  >
                    <span className="active:text-primary hover:underline">
                      Tabla de impuestos a la renta 2024 por régimen
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
                <a
                  href="https://github.com/luanlucho/ayayay-impuestos"
                  target="_blank"
                >
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
          </aside>
        </div>
      </div>
    </div>
  );
};

export const generateMetadata = async (
  props: MetadataProps,
  parent: ResolvingMetadata
): Promise<Metadata> => {
  const { countryCode, year } = await props.params;
  const locale = "es";
  const title = `Calcula tu declaración del impuesto a la renta ${year} | Ayayay Impuestos`;
  const description = `Usa la calculadora de Ayayay impuestos para conocer el valor que debes pagar en la declaración del ${year} en el SRI`;
  const parentOGImages = (await parent).openGraph?.images || [];
  const parentTweeterImages = (await parent).twitter?.images || [];
  return buildMetadata({
    title,
    description,
    locale,
    path: `/${countryCode}/${year}/t/calculadora-impuesto-a-la-renta`,
    openGraph: { images: parentOGImages },
    twitterCard: { images: parentTweeterImages }
  });
};

export default Page;
