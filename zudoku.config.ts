import type { ZudokuConfig } from "zudoku";

// API Evangelist developer portal, served at the root of https://developer.apievangelist.com/.
// The live API contract at apis/apievangelist-v1-openapi.yml drives the reference; the legacy
// static feeds are documented from data/feeds.yml via scripts/generate-feeds-pages.mjs.
const config: ZudokuConfig = {
  canonicalUrlOrigin: "https://developer.apievangelist.com",

  site: {
    title: "API Evangelist Developers",
    logo: {
      src: {
        light:
          "https://kinlane-images.s3.amazonaws.com/shared/api-evangelist-logos/api-evangelist-logo-butterfly-transparent.png",
        dark: "https://kinlane-images.s3.amazonaws.com/shared/api-evangelist-logos/api-evangelist-logo-butterfly-transparent.png",
      },
      alt: "API Evangelist",
      width: "64px",
    },
  },

  metadata: {
    title: "API Evangelist Developers — API, MCP & Feeds",
    description:
      "Developer documentation for the API Evangelist Network API: sixteen years of API research as one REST API, an MCP server for agents, and static JSON feeds.",
  },

  navigation: [
    {
      type: "category",
      label: "Documentation",
      items: ["overview", "getting-started", "authentication", "mcp-server"],
    },
    { type: "link", to: "/api", label: "API Reference" },
    {
      type: "category",
      label: "Static Feeds",
      items: ["feeds/index"],
    },
    {
      type: "category",
      label: "Network",
      items: ["network", "about"],
    },
    { type: "link", to: "https://apievangelist.com", label: "API Evangelist ↗" },
  ],

  redirects: [{ from: "/", to: "/overview" }],

  docs: {
    files: "/pages/**/*.{md,mdx}",
  },

  apis: {
    type: "file",
    input: "./apis/apievangelist-v1-openapi.yml",
    path: "/api",
  },

  theme: {
    // Brand blue #3098d8 (light) / #38a0e0 (dark) expressed as HSL triplets.
    light: { primary: "203 68% 52%", primaryForeground: "0 0% 100%" },
    dark: { primary: "203 73% 55%", primaryForeground: "0 0% 100%" },
  },
};

export default config;
