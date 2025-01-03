import { z } from "zod";

import { vCommon } from "validations/common.validations";

export type VariantTypes =
  | "active"
  | "inactive"
  | "destructive"
  | "default"
  | "outline";

export type MimeType = z.infer<ReturnType<typeof vCommon.mimetype>>;
