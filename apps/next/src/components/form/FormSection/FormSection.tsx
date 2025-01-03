import React from "react";
import { twMerge } from "tailwind-merge";

import { FormSectionProps as Props } from "./FormSection.types";
import MoreInfoTooltip from "components/global/MoreInfoTooltip/MoreInfoTooltip";

const FormSection = (props: Props) => {
  const { className, title, description, children } = props;

  const renderTitle = () => {
    return (
      <div className="flex items-center gap-2">
        <h4 className="large">{title}</h4>
        <MoreInfoTooltip className="block xl:hidden">
          {description}
        </MoreInfoTooltip>
      </div>
    );
  };

  return (
    <section
      className={twMerge("FormSection col-start-1 flex gap-4", className)}
    >
      {title && description ? (
        <div className="hidden border-t px-0 py-6 lg:w-40 xl:w-64 [@media(min-width:1200px)]:block">
          {renderTitle()}
          <p className="text-muted-foreground hidden xl:block">{description}</p>
        </div>
      ) : null}
      <div className="bg-background-2 flex flex-1 flex-col gap-4 rounded p-6">
        {children}
      </div>
    </section>
  );
};

export default FormSection;
