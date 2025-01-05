import { MetadataRoute } from "next";

import CONSTANTS from "config/constants";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      disallow: ["/private/"]
    },
    sitemap: `${CONSTANTS.MARKETING_URL}/sitemap.xml`
  };
}
