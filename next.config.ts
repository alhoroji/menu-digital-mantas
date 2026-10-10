// next.config.ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  cacheComponents: true,
  partialPrefetching: true,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
  // 👇 AQUÍ AGREGAMOS EL PERMISO PARA TUS FOTOS DE SUPABASE 👇
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'jclzrvizljglhhndkmvo.supabase.co',
        port: '',
        pathname: '/storage/v1/object/public/**',
      },
    ],
  },
};

export default nextConfig;