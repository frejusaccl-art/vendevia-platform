import type { MetadataRoute } from "next";
import { legalPages } from "@/lib/legal-content";

const base = process.env.NEXT_PUBLIC_SITE_URL ?? "https://vendeviaa.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = ["/", "/tarifs", "/a-propos", "/contact", "/avis", "/proprietaire/projet", "/connexion", "/inscription", ...Object.keys(legalPages).map((s) => `/legal/${s}`)];
  return paths.map((p) => ({ url: `${base}${p}` }));
}
