import React from "react";

import { PageProps as Props } from "app/types";
import PageHeader from "components/global/PageHeader/PageHeader";
import { Separator } from "ui/separator";

const HomePage = async (props: Props) => {
  return (
    <div className="HomePage layout h-full overflow-auto pb-16">
      <div className="layout-content flex flex-col gap-8 py-[--pad]">
        <div className="flex flex-col gap-4">
          <PageHeader title="Impuesto a la renta" />
        </div>
        <Separator className="my-4" />
        <div>
          <h3 className="h3">Campaigns</h3>
          <p className="text-muted-foreground">
            Create campaigns to unlock new ways to reward your customers
          </p>
        </div>
        <Separator className="my-4" />
        <div>
          <h3 className="h3">Quick navigate</h3>
          <p className="text-muted-foreground">
            Find the most important links to navigate the app
          </p>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
