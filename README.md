# developer.apievangelist.com — Developer Portal

[**developer.apievangelist.com**](https://developer.apievangelist.com) is the developer portal for the [API Evangelist](https://apievangelist.com) network — sixteen years of API research documented as one REST API and one MCP server. Built with [Zudoku](https://zudoku.dev).

**Live site:** [https://developer.apievangelist.com](https://developer.apievangelist.com)

## What's in this repo

- `zudoku.config.ts` — site config: navigation, theme, and the OpenAPI contracts that drive the references
- `apis/` — the source of truth for both OpenAPI contracts (Network API + Governance & Discovery API)
- `pages/` — the Markdown/MDX documentation pages
- `scripts/generate-well-known.mjs` — generates the [RFC 9727](https://www.rfc-editor.org/rfc/rfc9727.html) API catalog at `/.well-known/api-catalog` and copies the contracts into `public/apis/`; runs as part of `prebuild`
- `public/` — static assets served from the site root (generated output here is gitignored)

## The surfaces documented here

| Surface | Where | Docs |
|---|---|---|
| Network API | `https://api.apievangelist.com/v1` | `/api` |
| Governance & Discovery API | `https://api.apievangelist.com/v1/governance` | `/governance-api` |
| MCP server | `https://mcp.apievangelist.com/mcp` | `/mcp-server` |

The API and MCP server themselves live in [apievangelist-aws](https://github.com/api-evangelist/apievangelist-aws).

## Local development

```bash
npm install
npm run dev     # runs prebuild, then zudoku dev
npm run build   # runs prebuild, then zudoku build → dist/
```

## Related

- [APIs.io developer portal](https://developer.apis.io) — the sibling portal for the API provider catalog
- [api-evangelist GitHub org](https://github.com/api-evangelist) — the source collections
