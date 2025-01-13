import { MetadataRoute } from "next";

import CONSTANTS from "config/constants";

const baseRoutes = [
  {
    url: `${CONSTANTS.MARKETING_URL}/ec/2025`,
    lastModified: new Date().toISOString()
  },
  {
    url: `${CONSTANTS.MARKETING_URL}/ec/2025/t/calculadora-impuesto-a-la-renta`,
    lastModified: new Date().toISOString()
  },
  {
    url: `${CONSTANTS.MARKETING_URL}/ec/2025/i/tabla-impuesto-a-la-renta`,
    lastModified: new Date().toISOString()
  },
  {
    url: `${CONSTANTS.MARKETING_URL}/ec/2025/i/lista-de-feriados`,
    lastModified: new Date().toISOString()
  }
];

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: `${CONSTANTS.MARKETING_URL}/favicon.ico`,
      lastModified: "2025-01-09"
    },
    ...baseRoutes
  ];
}
