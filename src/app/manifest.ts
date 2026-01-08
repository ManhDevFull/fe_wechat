import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "VieChat - Nền tảng thuần Việt",
    short_name: "VieChat",
    description: "Nền tảng mạng xã hội cho người Việt",
    start_url: "/",
    display: "standalone",
    background_color: "#dc2626",
    theme_color: "#dc2626",
    icons: [
      {
        src: "/icons/android-chrome-192x192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/icons/icon-512x512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}
