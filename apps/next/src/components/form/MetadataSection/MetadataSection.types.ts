// MetadataSection types and interfaces
import { z } from "zod";

import { schema } from "./MetadataSection.helpers";

// Component Props
export interface MetadataSectionProps {
  className?: string;
  defaultValue: string;
  entity: string;
}

export type WithMetadataSchema = z.infer<typeof schema>;
