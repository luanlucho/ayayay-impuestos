import { GoogleAnalytics } from "@next/third-parties/google";
import { Metadata } from "next";

import { MetadataProps, RootLayoutProps as Props } from "./types";
import Providers from "components/global/Providers/Providers";
import { buildMetadata } from "utils/seo.utils";

import "../global.css";

const RootLayout = async (props: Props) => {
  const { children } = props;

  return (
    // suppressHydrationWarning needed for theme provider to not console error
    <html lang="en" suppressHydrationWarning>
      <body className="bg-background">
        <Providers>{children}</Providers>
      </body>
      <GoogleAnalytics gaId="G-3DH1FTGKPM" />
    </html>
  );
};

export const generateMetadata = async (
  props: MetadataProps
): Promise<Metadata> => {
  const { countryCode, year } = await props.params;
  const locale = "es";
  const title = `Consulta gratis tu impuesto a la renta en Ecuador  | Ayayay Impuestos`;
  const description = `Consulta tu impuesto a la renta ${year} fácilmente con Ayayay Impuestos. Descubre cuánto debes pagar y mantente al día con tus declaraciones en el SRI`;
  return buildMetadata({
    title,
    description,
    locale,
    path: `/${countryCode}/${year}`
  });
};

export default RootLayout;
