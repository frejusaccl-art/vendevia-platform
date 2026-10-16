import type { MetadataRoute } from "next";

const base = process.env.NEXT_PUBLIC_SITE_URL ?? "https://vendeviaa.com";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/", disallow: ["/agence", "/proprietaire/tableau-de-bord", "/mot-de-passe-oublie", "/backoffice", "/api"] },
    sitemap: `${base}/sitemap.xml`,
  };
}
