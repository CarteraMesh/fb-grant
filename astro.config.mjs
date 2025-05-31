// @ts-check
import { defineConfig } from "astro/config";
import starlight from "@astrojs/starlight";

import mdx from "@astrojs/mdx";
import react from "@astrojs/react";

// https://astro.build/config
export default defineConfig({
  site: "https://fb.cartera-mesh.com",
  integrations: [
    starlight({
      title: "Fireblocks-Solana Integration Grant Proposal",
      customCss: ["./src/styles/custom.css"],
      social: [
        {
          icon: "github",
          label: "GitHub",
          href: "https://github.com/CarteraMesh/fb-grant",
        },
      ],
      sidebar: [
        {
          label: "Integrations",
          items: [
            { label: "Drift", slug: "use-cases/drift" },
            { label: "Validators", slug: "use-cases/validators" },
          ],
        },
        {
          label: "About",
          autogenerate: { directory: "about" },
        },
      ],
    }),
    mdx(),
    react(),
  ],
});
