import { MetadataRoute } from "next";

import CONSTANTS from "config/constants";

const baseRoutes = [
  {
    url: `${CONSTANTS.MARKETING_URL}/`,
    lastModified: new Date().toISOString()
  },
  {
    url: `${CONSTANTS.MARKETING_URL}/2024/calculadora-impuesto-a-la-renta`,
    lastModified: new Date().toISOString()
  }
];

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: `${CONSTANTS.MARKETING_URL}/favicon.ico`,
      lastModified: "2024-01-04"
    },
    ...baseRoutes
  ];
}
