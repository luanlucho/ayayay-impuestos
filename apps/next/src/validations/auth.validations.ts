// Brand validations

import { z } from "zod";

import { vCommon } from "./common.validations";

const getTOTPStorefrontValidation = () => {
  const body = z.object({ customer_id: vCommon.externalId() });
  return vCommon.storefrontInputs({ body });
};

const verifyTOTPStorefrontValidation = () => {
  const searchParams = z.object({ code: z.string().trim().min(4).max(8) });
  return vCommon.storefrontInputs({ searchParams });
};

export const vAuth = {
  storefront: {
    getTOTP: getTOTPStorefrontValidation,
    verifyTOTP: verifyTOTPStorefrontValidation
  }
};
