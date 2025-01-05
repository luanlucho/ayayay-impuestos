import invariant from "invariant";
import { Metadata } from "next";
import { OpenGraph } from "next/dist/lib/metadata/types/opengraph-types";
import { Twitter } from "next/dist/lib/metadata/types/twitter-types";

import CONSTANTS from "config/constants";

type Locale = "es";
type CanonicalPath = `/${Locale}${string}` | `/${string}`;
interface BuildMetadataConfig {
  locale: Locale;
  path: CanonicalPath;
  title: string;
  description: string;
  twitterCard?: Twitter;
  openGraph?: OpenGraph;
}

export const buildSocialImage = (url: string, alt: string) => {
  const lastPath = url.split("/").pop();
  const extension = lastPath?.split(".").pop();
  invariant(extension, "Social image must have an extension");
  const type = `image/${extension}`;
  return {
    url,
    alt,
    type,
    width: 1200,
    height: 630
  };
};

export const buildCanonicalPath = (locale: Locale, path: CanonicalPath) => {
  const isDefault = locale === "es";
  const raw = isDefault ? path : (`/${locale}${path}` as const);
  const removedSlash = raw.substring(0, raw.length - 1) as CanonicalPath;
  const endsInSlash = raw.endsWith("/");
  return raw === "/" || !endsInSlash ? raw : removedSlash;
};

export const buildOpenGraph = (
  locale: Locale,
  path: CanonicalPath,
  options: OpenGraph
) => {
  const url = buildCanonicalPath(locale, path);
  return {
    url,
    locale,
    type: "website",
    siteName: "Ayayay Impuestos",
    ...options
  } satisfies OpenGraph;
};

export const buildTwitterCard = (options: Twitter) => {
  return {
    card: "summary_large_image",
    site: "@ayayayImpuestos",
    creator: "@ayayayImpuestos",
    ...options
  } satisfies Twitter;
};

export const buildMetadata = async (
  config: BuildMetadataConfig
): Promise<Metadata> => {
  const { title, description, locale, path, openGraph, twitterCard } = config;
  const openGraphOptions = { title, description, ...openGraph };
  const twitterCardOptions = { title, description, ...twitterCard };
  return {
    metadataBase: new URL(CONSTANTS.MARKETING_URL),
    title,
    description,
    openGraph: buildOpenGraph(locale, path, openGraphOptions),
    twitter: buildTwitterCard(twitterCardOptions)
  };
};
