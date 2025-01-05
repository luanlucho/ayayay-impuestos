import { Metadata, ResolvingMetadata } from "next";
import React from "react";

import { PageProps as Props } from "app/types";
import PageHeader from "components/global/PageHeader/PageHeader";
import CalculatorForm from "components/tools/CalculatorForm/CalculatorForm";
import { buildMetadata } from "utils/seo.utils";

const HomePage = async (props: Props) => {
  return (
    <div className="HomePage layout h-full overflow-auto pb-4">
      <div className="layout-content flex flex-col gap-8 py-[--pad]">
        <div className="flex flex-col gap-4">
          <PageHeader title="Calcula tu declaración del impuesto a la renta 2024" />
        </div>
        <CalculatorForm />
      </div>
    </div>
  );
};

export const generateMetadata = async (
  props: any,
  parent: ResolvingMetadata
): Promise<Metadata> => {
  const locale = "es";
  const title =
    "Calcula tu declaración del impuesto a la renta 2024 | Ayayay Impuestos";
  const description =
    "Usa la calculadora de Ayayay impuestos para conocer el valor que debes pagar en la declaración del 2024 en el SRI";
  const parentOGImages = (await parent).openGraph?.images || [];
  const parentTweeterImages = (await parent).twitter?.images || [];
  return buildMetadata({
    title,
    description,
    locale,
    path: "/2024/calculadora-impuesto-a-la-renta",
    openGraph: { images: parentOGImages },
    twitterCard: { images: parentTweeterImages }
  });
};

export default HomePage;
