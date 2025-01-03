// FormTimezonesSelect types and interfaces

import { FieldValues } from "react-hook-form";

import { FormSelectProps } from "components/form/FormSelect/FormSelect.types";

// Component Props
export interface FormTimezonesSelectProps<TSchema extends FieldValues>
  extends FormSelectProps<TSchema> {}
