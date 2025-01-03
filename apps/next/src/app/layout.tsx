import { cookies } from "next/headers";

import { RootLayoutProps as Props } from "./types";
import Providers from "components/global/Providers/Providers";

import "../global.css";

const RootLayout = async (props: Props) => {
  const { children } = props;
  const cookiesList = await cookies();

  return (
    // suppressHydrationWarning needed for theme provider to not console error
    <html lang="en" suppressHydrationWarning>
      <body className="bg-background">
        <Providers cookies={cookiesList.getAll()}>{children}</Providers>
      </body>
    </html>
  );
};

export default RootLayout;
