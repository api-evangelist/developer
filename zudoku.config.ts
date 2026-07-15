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

  // The static JSON feeds and the network site index were retired in favor of the API
  // and the MCP server. Both were public URLs, so every retired path is redirected
  // rather than left to 404 anyone still holding a link. Each entry below is
  // prerendered to a real file — a bare /feeds/* splat would emit a literal "*.html"
  // that static hosting can never match, so the slugs are enumerated.
  redirects: [
    { from: "/", to: "/overview" },
    { from: "/network", to: "/overview" },
    { from: "/feeds", to: "/overview" },
    { from: "/feeds/index", to: "/overview" },
    // These two documented the API and MCP server themselves — send them to the real docs.
    { from: "/feeds/api", to: "/api" },
    { from: "/feeds/mcp", to: "/mcp-server" },
    ...[
      "apis",
      "posts",
      "conversations",
      "companies",
      "experiences",
      "guidance",
      "partners",
      "policies",
      "properties",
      "rules",
      "schema",
      "standards",
      "strategies",
      "utilities",
      "videos",
      "vocabularies",
      "spotlight-rules",
    ].map((slug) => ({ from: `/feeds/${slug}`, to: "/overview" })),
  ],

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
