// Common validations
import { z } from "zod";
import { errorUtil } from "zod/lib/helpers/errorUtil";

import CONSTANTS from "config/constants";
import { ZObject } from "types/http.types";

const { MAX_PAGE_SIZE } = CONSTANTS;

const statusValidation = (options?: readonly [string, ...string[]]) => {
  const selectedOptions = options ?? ["ACTIVE", "INACTIVE"];
  return z.enum(selectedOptions);
};

const idValidation = (message?: errorUtil.ErrMessage | undefined) => {
  return z.string().uuid(message);
};

const mimeTypeValidation = () => {
  return z.enum(["application", "audio", "image", "video"]);
};

const nameValidation = () => {
  return z
    .string()
    .min(1, "Required")
    .max(100)
    .regex(/^[a-zA-Z0-9\sÀ-ÿ']*$/, "Only letters and numbers are allowed")
    .regex(
      /^ ?[a-zA-Z0-9À-ÿ']+( [a-zA-Z0-9À-ÿ']+)* ?$/,
      "Only single spaces are allowed"
    )
    .trim();
};

const nameLaxValidation = () => {
  return z.string().trim().min(1, "Required").max(100);
};

const percentageValidation = () => {
  return z.number().min(0).max(100);
};

const jsonStringValidation = () => {
  // Min 2 takes into consideration stringify any json value
  return z.string().min(2, "Invalid JSON input");
};

const jsonObjectStringValidation = () => {
  return z
    .string()
    .trim()
    .regex(/^\s*\{[\s\S]*\}\s*$/, "Invalid JSON object");
};

const jsonValidation = () => {
  return z.union([
    z.string(),
    z.number(),
    z.boolean(),
    z.null(),
    z.record(z.string(), z.any()),
    z.array(z.any())
  ]);
};

const jsonObjectValidation = () => {
  return z.record(z.string(), jsonValidation());
};

const jsonArrayValidation = () => {
  return z.array(jsonValidation());
};

const filtersValidation = () => {
  const filter = z.object({
    label: z.string().trim(),
    value: z.string().trim(),
    operator: z.string().trim()
  });
  return z.array(filter);
};

const inputsValidation = <
  THeaders extends ZObject,
  TSearchParams extends ZObject,
  TBody extends ZObject,
  TParams extends ZObject
>(inputs?: {
  headers?: THeaders;
  searchParams?: TSearchParams;
  body?: TBody;
  params?: TParams;
}) => {
  const headers = inputs?.headers ?? (z.object({}) as THeaders);
  const searchParams = inputs?.searchParams ?? (z.object({}) as TSearchParams);
  const body = inputs?.body ?? (z.object({}) as TBody);
  const params = inputs?.params ?? (z.object({}) as TParams);
  return z.object({ headers, searchParams, body, params });
};

const storefrontInputsValidation = <
  THeaders extends ZObject,
  TSearchParams extends ZObject,
  TBody extends ZObject,
  TParams extends ZObject
>(inputs?: {
  headers?: THeaders;
  searchParams?: TSearchParams;
  body?: TBody;
  params?: TParams;
}) => {
  const { headers: additionalHeaders, ...rest } = inputs ?? {};
  const extraHeaders = additionalHeaders ?? z.object({});
  const baseHeaders = z.object({ "x-account-id": idValidation() });
  // Merge headers to avoid overriding the accountId
  const headers = baseHeaders.merge(extraHeaders.merge(baseHeaders));
  type VHeaders = typeof headers;
  return inputsValidation<VHeaders, TSearchParams, TBody, TParams>({
    headers,
    ...rest
  });
};

const storefrontPaginatedInputValidation = <
  THeaders extends ZObject,
  TSearchParams extends ZObject,
  TBody extends ZObject,
  TParams extends ZObject
>(
  inputs?: {
    headers?: THeaders;
    searchParams?: TSearchParams;
    body?: TBody;
    params?: TParams;
  },
  limit = MAX_PAGE_SIZE
) => {
  const invalidRangeLimits = `Invalid range. 'from' must be less than or equal to 'to'`;
  const invalidRangeDistance = `Invalid range, range cannot exceed ${limit} records. Update either 'from' or 'to'.`;
  const numValidation = z.coerce.number().int().min(0);
  const rangeValidation = { from: numValidation, to: numValidation };
  const baseSearchParams = z.object(rangeValidation);
  const rawSearchParams = inputs?.searchParams;
  const extraSearchParams = rawSearchParams ?? (z.object({}) as TSearchParams);
  const searchParams = baseSearchParams.merge(extraSearchParams);
  const baseHeaders = z.object({ "x-account-id": idValidation() });
  const extraHeaders = inputs?.headers ?? (z.object({}) as THeaders);
  const headers = baseHeaders.merge(extraHeaders.merge(baseHeaders));
  const body = inputs?.body ?? (z.object({}) as TBody);
  const params = inputs?.params ?? (z.object({}) as TParams);

  const refinedSearchParams = searchParams
    .refine(d => d.from !== undefined && d.to !== undefined && d.from <= d.to, {
      message: invalidRangeLimits,
      path: ["from", "to"]
    })
    .refine(
      d => d.from !== undefined && d.to !== undefined && d.to - d.from <= limit,
      {
        message: invalidRangeDistance,
        path: ["from", "to"]
      }
    );

  const base = z.object({ searchParams, headers, body, params });

  return base.superRefine((data, ctx) => {
    const searchValidation = refinedSearchParams.safeParse(data.searchParams);
    if (!searchValidation.success) {
      searchValidation.error.issues.forEach(issue => ctx.addIssue(issue));
    }
  });
};

const paymentMethodValidation = () => {
  return z.union([
    z.literal("CREDIT"),
    z.literal("DEBIT"),
    z.literal("CASH"),
    z.literal("BANK_TRANSFER"),
    z.literal("OTHER")
  ]);
};

const externalIdValidation = () => {
  return z
    .string()
    .regex(/^[a-zA-Z0-9_-]+$/g, "Invalid id format")
    .min(1)
    .max(64);
};

const dateStringValidation = () => {
  return z.string().datetime({ offset: true });
};

const dateOnlyStringValidation = () => {
  return z
    .string()
    .regex(/^\d{2}-\d{2}-\d{4}$/, "Invalid date format (DD-MM-YYYY)");
};

const expirationDateValidation = () => {
  return z
    .string()
    .or(z.null())
    .refine(
      value => (value ? value.match(/^\d\d\/.+$/) : true),
      "Invalid period"
    );
};

const temporalIntervalValidation = () => {
  return z.union([
    z.literal("MONTHLY"),
    z.literal("QUARTERLY"),
    z.literal("YEARLY")
  ]);
};

const masivoCronRepeatValidation = () => {
  return z.union([
    z.literal("NONE"),
    z.literal("DAILY"),
    z.literal("WEEKLY"),
    z.literal("WEEKDAYS"),
    z.literal("WEEKENDS"),
    z.literal("FORTNIGHTLY"),
    z.literal("MONTHLY"),
    z.literal("WEEK_OF_MONTH"),
    z.literal("LAST_DAY_OF_MONTH"),
    z.literal("CUSTOM")
  ]);
};

const selectByRangeValidation = <T extends z.ZodRawShape>(
  schema: z.ZodObject<T>,
  limit = MAX_PAGE_SIZE
) => {
  const invalidRangeLimits = `Invalid range. 'from' must be less than or equal to 'to'`;
  const invalidRangeDistance = `Invalid range, range cannot exceed ${limit} records. Update either 'from' or 'to'.`;

  return schema
    .merge(
      z.object({
        from: z.number().int().min(0),
        to: z.number().int().min(0)
      })
    )
    .refine(data => data.from! <= data.to!, invalidRangeLimits)
    .refine(data => data.to! - data.from! <= limit, invalidRangeDistance);
};

const selectByQueryValidation = <T extends z.ZodRawShape>(
  schema: z.ZodObject<T>
) => {
  return schema.merge(
    z.object({
      q: z.string(),
      limit: z.number().min(0).max(MAX_PAGE_SIZE).optional()
    })
  );
};

export const vCommon = {
  id: idValidation,
  mimetype: mimeTypeValidation,
  externalId: externalIdValidation,
  name: nameValidation,
  nameLax: nameLaxValidation,
  description: () => z.string().max(255).optional(),
  longDescription: () => z.string().max(1024).optional(),
  status: statusValidation,
  percentage: percentageValidation,
  temporalInterval: temporalIntervalValidation,
  dateString: dateStringValidation,
  dateOnlyString: dateOnlyStringValidation,
  expirationDate: expirationDateValidation,
  json: jsonValidation,
  jsonString: jsonStringValidation,
  jsonStringObject: jsonObjectStringValidation,
  jsonObject: jsonObjectValidation,
  jsonArray: jsonArrayValidation,
  filters: filtersValidation,
  inputs: inputsValidation,
  storefrontInputs: storefrontInputsValidation,
  storefrontPaginatedInput: storefrontPaginatedInputValidation,
  paymentMethod: paymentMethodValidation,
  selectByRange: selectByRangeValidation,
  selectByQuery: selectByQueryValidation,
  masivoCron: {
    repeat: masivoCronRepeatValidation
  }
};
