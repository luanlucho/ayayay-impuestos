// MetadataSection helper functions and data
import z from "zod";

import { vCommon } from "validations/common.validations";

export const schema = z.object({
  metadata: vCommon.jsonString(),
  showAdvance: z.boolean().optional()
});
