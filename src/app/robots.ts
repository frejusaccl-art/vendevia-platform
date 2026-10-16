import type { MetadataRoute } from "next";

const base = process.env.NEXT_PUBLIC_SITE_URL ?? "https://vendevia.fr";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/", disallow: ["/agence", "/proprietaire/tableau-de-bord", "/backoffice", "/api"] },
    sitemap: `${base}/sitemap.xml`,
  };
}
