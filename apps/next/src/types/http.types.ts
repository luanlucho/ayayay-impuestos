// http types and interfaces

import { NextResponse } from "next/server";
import { UnknownKeysParam, z, ZodObject, ZodRawShape, ZodTypeAny } from "zod";

export type ResponseBodySuccess = { data: unknown };
export type ResponseBodyError = {
  error: string;
  details: unknown;
  [key: string]: unknown;
};
export type ResponseBody = ResponseBodySuccess | ResponseBodyError;
export type ZObject = ZodObject<ZodRawShape, UnknownKeysParam, ZodTypeAny>;

export type ApiInputValidation<
  THeaders extends ZObject,
  TSearchParams extends ZObject,
  TBody extends ZObject,
  TParams extends ZObject
> =
  | z.ZodObject<{
      headers?: THeaders;
      searchParams?: TSearchParams;
      body?: TBody;
      params?: TParams;
    }>
  | z.ZodEffects<
      z.ZodObject<{
        headers?: THeaders;
        searchParams?: TSearchParams;
        body?: TBody;
        params?: TParams;
      }>
    >
  | z.ZodEffects<
      z.ZodEffects<
        z.ZodObject<{
          headers?: THeaders;
          searchParams?: TSearchParams;
          body?: TBody;
          params?: TParams;
        }>
      >
    >;

export type ApiOutputValidation<TData> =
  | z.ZodObject<{
      data: z.ZodType<TData>;
    }>
  | z.ZodObject<{
      error: z.ZodString;
    }>;

export interface ApiInputInputs<
  THeaders extends Record<string, string>,
  TSearchParams extends Record<string, string>,
  TBody extends Record<string, unknown>,
  TParams extends Record<string, string>
> {
  headers: THeaders;
  searchParams: TSearchParams;
  body: TBody;
  params: TParams;
}

export type ApiResponse<TData> = NextResponse<
  ApiOutputValidation<TData>["_output"]
>;

export type ApiHandlerFn<
  THeaders extends Record<string, string>,
  TSearchParams extends Record<string, string>,
  TBody extends Record<string, unknown>,
  TParams extends Record<string, string>,
  TData
> = (
  input: ApiInputInputs<THeaders, TSearchParams, TBody, TParams>
) => Promise<ApiResponse<TData>>;
