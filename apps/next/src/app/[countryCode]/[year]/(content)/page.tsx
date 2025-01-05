import { ShieldCheck, Landmark, Target } from "lucide-react";
import Link from "next/link";
import React from "react";

import { PageProps as Props } from "app/types";
import PageHeader from "components/global/PageHeader/PageHeader";
import CardItem from "components/home/Card/Card";
import { Button } from "ui/button";

const HomePage = async (props: Props) => {
  const { countryCode, year } = await props.params;

  return (
    <div className="HomePage grid h-full grid-cols-1 grid-rows-[auto,1fr,auto] flex-col overflow-auto">
      <div className="layout">
        <div className="layout-content md:py-8">
          <PageHeader title="Consulta gratis tu impuesto a la renta del 2024 en Ecuador" />
          <p className="text-lg">
            Calcula tus impuestos de forma rápida y sencilla. Esta es la forma
            más fácil de calcular tus impuestos en Ecuador.
          </p>
          <div className="my-8 flex items-center justify-center rounded-lg bg-neutral-200 p-12 md:p-32 dark:bg-neutral-800">
            <Link
              href={`/${countryCode}/${year}/t/calculadora-impuesto-a-la-renta`}
            >
              <Button className="dark:bg-primary dark:hover:bg-primary/80 h-auto px-4 py-2 text-lg md:px-8 md:py-4 md:text-xl dark:text-black">
                Click aquí para calcular
              </Button>
            </Link>
          </div>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            <CardItem
              icon={<ShieldCheck width={64} height={64} />}
              title="Segura"
              description="Tus datos se mantienen seguros y privados"
            />
            <CardItem
              icon={<Landmark width={64} height={64} />}
              title="Institucional"
              description="Proveemos servicios a empresas y personas"
            />
            <CardItem
              icon={<Target width={64} height={64} />}
              title="Precisa"
              description="Nuestros cálculos son precisos y confiables"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
