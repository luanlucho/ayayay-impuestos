import React from "react";

import { PageProps as Props } from "app/types";
import PageHeader from "components/global/PageHeader/PageHeader";
import CalculatorForm from "components/tools/CalculatorForm/CalculatorForm";

const HomePage = async (props: Props) => {
  return (
    <div className="HomePage layout h-full overflow-auto pb-16">
      <div className="layout-content flex flex-col gap-8 py-[--pad]">
        <div className="flex flex-col gap-4">
          <PageHeader title="Impuesto a la renta" />
        </div>
        <CalculatorForm />
      </div>
    </div>
  );
};

export default HomePage;
