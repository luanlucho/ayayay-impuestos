import { Metadata, ResolvingMetadata } from "next";
import React from "react";

import { MetadataProps, PageProps as Props } from "app/types";
import HighlightedArticles from "components/global/HighlightedArticles/HighlightedArticles";
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
            <HighlightedArticles
              countryCode={countryCode}
              year={+year}
              className="h-[calc(100vh-300px)]"
            />
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
