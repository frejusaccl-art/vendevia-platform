import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  cacheComponents: true,
  partialPrefetching: true,
  // Anciennes routes (premier design) -> nouveau site. Temporaires tant que le merge n'est pas fait.
  async redirects() {
    const r = (source: string, destination: string) => ({ source, destination, permanent: false });
    return [
      r("/maison", "/proprietaire/projet"),
      r("/maison/projet/:path*", "/proprietaire/projet"),
      r("/desk", "/agence"),
      r("/desk/dossier", "/agence/leads"),
      r("/desk/projets", "/agence/leads"),
      r("/desk/pipeline", "/agence/pipeline"),
      r("/desk/agenda", "/agence/rendez-vous"),
      r("/desk/relances", "/agence/a-traiter"),
      r("/desk/analytics", "/agence/rapports"),
      r("/desk/equipe", "/agence/equipes"),
      r("/desk/territoire", "/agence/parametres"),
      r("/desk/abonnement", "/agence/credits"),
      r("/desk/parametres", "/agence/parametres"),
      r("/desk/onboarding", "/agence/parametres"),
      r("/socle", "/"),
      r("/agences", "/agence"),
      r("/faq", "/legal/faq"),
      r("/cgv", "/legal/cgv"),
      r("/confidentialite", "/legal/confidentialite"),
      r("/mentions-legales", "/legal/mentions-legales"),
      r("/comment-ca-marche", "/#comment-ca-marche"),
      r("/estimation", "/proprietaire/projet"),
      r("/zones", "/agence/parametres"),
    ];
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
