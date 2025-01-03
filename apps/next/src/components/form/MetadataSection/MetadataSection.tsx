import React, { useEffect } from "react";
import { useFormContext, useWatch } from "react-hook-form";
import { twMerge } from "tailwind-merge";
import capitalize from "voca/capitalize";

import { MetadataSectionProps as Props } from "./MetadataSection.types";
import { WithMetadataSchema } from "./MetadataSection.types";
import FormCheckbox from "components/form/FormCheckbox/FormCheckbox";
import FormJsonEditor from "components/form/FormJsonEditor/FormJsonEditor";
import FormSection from "components/form/FormSection/FormSection";

const MetadataSection = (props: Props) => {
  const { className, defaultValue, entity } = props;
  const { control, setValue } = useFormContext<WithMetadataSchema>();
  const showAdvance = useWatch({ control, name: "showAdvance" });

  // Reset metadata
  useEffect(() => {
    if (showAdvance) return;
    setValue("metadata", defaultValue);
  }, [setValue, showAdvance, defaultValue]);

  return (
    <FormSection
      className={twMerge("MetadataSection", className)}
      title="Metadata"
      description={`Save additional information about your ${entity}.`}
    >
      <FormCheckbox
        control={control}
        name="showAdvance"
        label="Show advance settings?"
        description={`This will allow you to add custom metadata to your ${entity}.`}
      />
      {showAdvance ? (
        <FormJsonEditor
          control={control}
          label={`${capitalize(entity)} metadata`}
          name="metadata"
        />
      ) : null}
    </FormSection>
  );
};

export default MetadataSection;
