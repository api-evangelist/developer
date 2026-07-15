import type { ZudokuConfig } from "zudoku";

// API Evangelist developer portal, served at the root of https://developer.apievangelist.com/.
// The live API contract at apis/apievangelist-v1-openapi.yml drives the reference.
const config: ZudokuConfig = {
  canonicalUrlOrigin: "https://developer.apievangelist.com",

  site: {
    title: "API Evangelist Developers",
    logo: {
      src: {
        light:
          "https://kinlane-images.s3.amazonaws.com/shared/api-evangelist-logos/api-evangelist-logo-butterfly-trimmed.png",
        dark: "https://kinlane-images.s3.amazonaws.com/shared/api-evangelist-logos/api-evangelist-logo-butterfly-trimmed.png",
      },
      alt: "API Evangelist",
      width: "280px",
    },
  },

  metadata: {
    title: "API Evangelist Developers — API & MCP",
    description:
      "Developer documentation for the API Evangelist Network API: sixteen years of API research as one REST API and an MCP server for agents.",
  },

  navigation: [
    {
      type: "category",
      label: "Documentation",
      items: ["overview", "getting-started", "authentication", "plans", "mcp-server", "about"],
    },
    { type: "link", to: "/api", label: "API Reference" },
    {
      type: "category",
      label: "Governance & Discovery",
      items: ["governance/index", "governance/free-vs-pro"],
    },
    { type: "link", to: "/governance-api", label: "Governance API Reference" },
    { type: "link", to: "https://apievangelist.com", label: "API Evangelist ↗" },
  ],

  redirects: [{ from: "/", to: "/overview" }],

  docs: {
    files: "/pages/**/*.{md,mdx}",
  },

  apis: [
    {
      type: "file",
      input: "./apis/apievangelist-v1-openapi.yml",
      path: "/api",
    },
    {
      type: "file",
      input: "./apis/apievangelist-governance-openapi.json",
      path: "/governance-api",
    },
  ],

  theme: {
    // Brand blue #3098d8 (light) / #38a0e0 (dark) expressed as HSL triplets.
    light: { primary: "203 68% 52%", primaryForeground: "0 0% 100%" },
    dark: { primary: "203 73% 55%", primaryForeground: "0 0% 100%" },
    // The logo is a wide banner (905x166 trimmed) — width drives its size. Keep the
    // header compact; the 280px logo renders ~51px tall inside the 64px bar.
    customCss: ":root { --top-header-height: 64px; }",
  },
};

export default config;
