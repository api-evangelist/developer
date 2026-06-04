# developer.apievangelist.com — Developer Portal

[**developer.apievangelist.com**](https://developer.apievangelist.com) is the developer portal for the [API Evangelist](https://apievangelist.com) network. It aggregates every collection Kin Lane publishes across the network and documents each one as a consumable JSON feed.

**Live site:** [https://developer.apievangelist.com](https://developer.apievangelist.com)

## What's in this repo

- `_config.yml` — Jekyll site configuration
- `_data/feeds.yml` — the canonical catalog of every feed surfaced by this portal
- `_data/apisjson.yml` — the [APIs.json](https://apisjson.org) source for `/apis.json`
- `_layouts/`, `_includes/`, `assets/` — page templates and styling (matches the [APIs.io developer portal](https://developer.apis.io) look-and-feel)
- `feeds/` — one Markdown page per feed, each rendered via the `feed` layout
- `_posts/`, `blog/` — portal blog
- `index.md`, `about.md`, `network.md` — landing, about, and network overview pages
- `apis.json`, `atom.xml` — machine-readable indexes

## The API Evangelist network

The feeds documented here are pulled from these collections:

| Site | What it publishes | Repo |
|---|---|---|
| [apis.apievangelist.com](https://apis.apievangelist.com) | Individual APIs with OpenAPI reviews | [apis](https://github.com/api-evangelist/apis) |
| [posts.apievangelist.com](https://posts.apievangelist.com) | 4,000+ blog posts since 2010 | [posts](https://github.com/api-evangelist/posts) |
| [conversations.apievangelist.com](https://conversations.apievangelist.com) | Producer/consumer/provider conversations | [conversations](https://github.com/api-evangelist/conversations) |
| [providers.apievangelist.com](https://providers.apievangelist.com) | Alphabetical listing of companies across the network | [companies](https://github.com/api-evangelist/companies) |
| [experiences.apievangelist.com](https://experiences.apievangelist.com) | Developer-experience records | [experiences](https://github.com/api-evangelist/experiences) |
| [guidance.apievangelist.com](https://guidance.apievangelist.com) | Modular best-practice guidance | [guidance](https://github.com/api-evangelist/guidance) |
| [partners.apievangelist.com](https://partners.apievangelist.com) | Partner network | [partners](https://github.com/api-evangelist/partners) |
| [policies.apievangelist.com](https://policies.apievangelist.com) | Governance policies | [policies](https://github.com/api-evangelist/policies) |
| [properties.apievangelist.com](https://properties.apievangelist.com) | Governable API properties | [properties](https://github.com/api-evangelist/properties) |
| [rules.apievangelist.com](https://rules.apievangelist.com) | Spectral rules | [rules](https://github.com/api-evangelist/rules) |
| [schema.apievangelist.com](https://schema.apievangelist.com) | Schema definitions | [schema](https://github.com/api-evangelist/schema) |
| [standards.apievangelist.com](https://standards.apievangelist.com) | Internet & industry standards | [standards](https://github.com/api-evangelist/standards) |
| [strategies.apievangelist.com](https://strategies.apievangelist.com) | API operations strategies | [strategies](https://github.com/api-evangelist/strategies) |
| [utilities.apievangelist.com](https://utilities.apievangelist.com) | Utility APIs | [utilities](https://github.com/api-evangelist/utilities) |
| [video.apievangelist.com](https://video.apievangelist.com) | Video content | [videos](https://github.com/api-evangelist/videos) |
| [vocabularies.apievangelist.com](https://vocabularies.apievangelist.com) | Controlled vocabularies | [vocabularies](https://github.com/api-evangelist/vocabularies) |
| [spotlight-rules.com](https://spotlight-rules.com) | Curated rules spotlight | [spotlight-rules](https://github.com/api-evangelist/spotlight-rules) |

## Adding a new feed

1. Add a new entry to `_data/feeds.yml` with `slug`, `name`, `description`, `url`, `feed_url`, `repo_url`, `tags`, and `fields`.
2. Add a matching entry under `apis:` in `_data/apisjson.yml`.
3. Create `feeds/<slug>.md` with the `feed` layout pointing at the new slug.
4. Commit and push — GitHub Pages rebuilds on push.

## Local development

```bash
bundle install
bundle exec jekyll serve
```

## Related

- [APIs.io developer portal](https://developer.apis.io) — the sibling portal this one mirrors
- [APIs.json](https://apisjson.org) — the discovery spec the portal publishes
- [api-evangelist GitHub org](https://github.com/api-evangelist) — the source collections
