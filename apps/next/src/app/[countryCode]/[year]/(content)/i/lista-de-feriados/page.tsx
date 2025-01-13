import { Metadata, ResolvingMetadata } from "next";
import React from "react";

import { MetadataProps, PageProps as Props } from "app/types";
import HighlightedArticles from "components/global/HighlightedArticles/HighlightedArticles";
import PageHeader from "components/global/PageHeader/PageHeader";
import FeriadosProvincialesTable from "components/tables/FeriadosProvincialesTable/FeriadosProvincialesTable";
import FeriadosTable from "components/tables/FeriadosTable/FeriadosTable";
import { buildMetadata } from "utils/seo.utils";

const TableIRPage = async (props: Props) => {
  const { countryCode, year } = await props.params;

  return (
    <div className="TableIRPage grid h-full grid-cols-1 grid-rows-[auto,1fr,auto] flex-col overflow-auto">
      <div className="layout">
        <div className="layout-content flex flex-col gap-8 md:py-8">
          <div>
            <PageHeader title="Lista de feriados Ecuador 2025" />
            <p className="text-lg">
              Descubre cuando serán los feriados en Ecuador en el 2025.
              Encuentra también los días festivos locales y nacionales.
            </p>
          </div>
          <div className="flex flex-col gap-2">
            <h2 className="h2 !pb-0">Feriados nacionales</h2>
            <p className="pb-4">
              Estos feriados son aplicables a todo el territorio ecuatoriano.
            </p>
            <FeriadosTable
              countryCode={countryCode}
              year={+year}
              filename="feriados/nacionales"
            />
          </div>
          <div className="flex flex-col gap-2">
            <h2 className="h2 !pb-0">Feriados provinciales</h2>
            <p className="pb-4">
              Estos feriados son aplicables solo a ciertas provincias del
              Ecuador.
            </p>
            <FeriadosProvincialesTable
              countryCode={countryCode}
              year={+year}
              filename="feriados/provincias"
            />
          </div>
          <aside>
            <HighlightedArticles countryCode={countryCode} year={+year} />
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
  const title = `Feriados Ecuador 2025`;
  const description = `Consulta el calendario de los feriados de Quito, Guayaquil y todas las provincias y ciudades de Ecuador en el 2025`;
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
