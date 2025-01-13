import { Metadata, ResolvingMetadata } from "next";
import Link from "next/link";
import React from "react";

import { MetadataProps, PageProps as Props } from "app/types";
import PageHeader from "components/global/PageHeader/PageHeader";
import IRTable from "components/tables/IRTable/IRTable";
import { Button } from "ui/button";
import { buildMetadata } from "utils/seo.utils";

const TableIRPage = async (props: Props) => {
  const { countryCode, year } = await props.params;
  const absoluteYear = +year - 1;

  return (
    <div className="TableIRPage grid h-full grid-cols-1 grid-rows-[auto,1fr,auto] flex-col overflow-auto">
      <div className="layout">
        <div className="layout-content flex flex-col gap-8 md:py-8">
          <div>
            <PageHeader title="Tabla impuesto a la renta (IR) Ecuador 2024" />
            <p className="text-lg">
              Descubre en que rango entra tu salario y cuanto debes pagar de
              impuesto a la renta en Ecuador, en este 2025.
            </p>
            <p>
              Dependiendo del regimen en el que te hayan catalogado en el 2024,
              utiliza una de las siguientes tablas para consultar tu rango de
              impuestos
            </p>
          </div>
          <div className="my-8 flex items-center justify-center rounded-lg bg-neutral-200 p-12 md:p-32 dark:bg-neutral-800">
            <Link
              href={`/${countryCode}/${year}/t/calculadora-impuesto-a-la-renta`}
            >
              <div className="flex flex-col gap-1">
                <Button className="dark:bg-primary dark:hover:bg-primary/80 h-auto px-4 py-2 text-lg md:px-8 md:py-4 md:text-xl dark:text-black">
                  Calcular impuesto a la renta
                </Button>
              </div>
            </Link>
          </div>
          <div className="flex flex-col gap-2">
            <h2 className="h2 !pb-0">Régimen RIMPE Negocio Popular</h2>
            <p className="pb-4">
              Personas naturales con ingresos brutos anuales de hasta USD 20 000
            </p>
            <IRTable
              countryCode={countryCode}
              year={absoluteYear}
              filename="rimpe-popular"
            />
          </div>
          <div className="flex flex-col gap-2">
            <h2 className="h2 !pb-0">Régimen RIMPE Emprendedor</h2>
            <p className="pb-4">
              Personas naturales y jurídicas con ingresos brutos anuales de
              hasta USD 300 000
            </p>
            <IRTable
              countryCode={countryCode}
              year={absoluteYear}
              filename="rimpe-emprendedor"
            />
          </div>
          <div className="flex flex-col gap-2">
            <h2 className="h2 !pb-0">Régimen General</h2>
            <p className="pb-4">
              Personas naturales bajo relación de dependencia, personas que
              facturen con ingresos anuales superiores a los USD 300 000
            </p>
            <IRTable
              countryCode={countryCode}
              year={absoluteYear}
              filename="general"
            />
          </div>
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
  const title = `Tabla impuesto a la renta (IR) ${year} | Ayayay Impuestos`;
  const description = `Tabla de impuesto a la renta 2025, 2024 SRI de Ecuador. Consulta en que rango entra tu salario y cuanto debes pagar de IR en Ecuador.`;
  const parentOGImages = (await parent).openGraph?.images || [];
  const parentTweeterImages = (await parent).twitter?.images || [];
  return buildMetadata({
    title,
    description,
    locale,
    path: `/${countryCode}/${year}/i/tabla-impuesto-a-la-renta`,
    openGraph: { images: parentOGImages },
    twitterCard: { images: parentTweeterImages }
  });
};

export default TableIRPage;
