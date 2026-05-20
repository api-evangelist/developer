---
layout: page
title: About
description: About the API Evangelist developer portal and its static JSON feeds.
permalink: /about/
---

# About

This is the developer portal for the [API Evangelist](https://apievangelist.com) network — the family of sites maintained by Kin Lane covering the technology, business, politics, and people of APIs.

## What this portal provides

API Evangelist has long published its research across a set of focused sites, each one dedicated to one dimension of API operations: APIs themselves, plus contracts, policies, rules, properties, schema, standards, strategies, guidance, conversations, experiences, partners, utilities, videos, and vocabularies. Every site is its own Jekyll project, every site renders an HTML browse view, and every site emits a static JSON feed of the same data.

This portal aggregates those feeds. Each feed is documented here as if it were an API — because for the purposes of integration, that's exactly what it is. Pick a feed, fetch the JSON file, parse it, integrate it. No API key, no rate limit, no signup.

## The collections

- **[APIs]({{ site.url }}/feeds/apis/)** — individual API resources with OpenAPI reviews
- **[Posts]({{ site.url }}/feeds/posts/)** — 4,000+ blog posts since 2010
- **[Conversations]({{ site.url }}/feeds/conversations/)** — interviews with producers, consumers, and service providers
- **[Contracts]({{ site.url }}/feeds/contracts/)** — business and technical details of API resources
- **[Experiences]({{ site.url }}/feeds/experiences/)** — developer-experience records across teams
- **[Guidance]({{ site.url }}/feeds/guidance/)** — modular best-practice guidance
- **[Partners]({{ site.url }}/feeds/partners/)** — API Evangelist partner network
- **[Policies]({{ site.url }}/feeds/policies/)** — business reasons behind governance decisions
- **[Properties]({{ site.url }}/feeds/properties/)** — individual properties of API operations
- **[Rules]({{ site.url }}/feeds/rules/)** — technical governance guardrails
- **[Schema]({{ site.url }}/feeds/schema/)** — schema definitions for digital objects
- **[Standards]({{ site.url }}/feeds/standards/)** — Internet and industry standards
- **[Strategies]({{ site.url }}/feeds/strategies/)** — high-level approaches to API operations
- **[Utilities]({{ site.url }}/feeds/utilities/)** — utility APIs powering the platform
- **[Videos]({{ site.url }}/feeds/videos/)** — video content
- **[Vocabularies]({{ site.url }}/feeds/vocabularies/)** — controlled vocabularies
- **[Spotlight Rules]({{ site.url }}/feeds/spotlight-rules/)** — curated governance ruleset

## APIs.json

This portal publishes an [apis.json]({{ site.url }}/apis.json) cataloging every feed as a machine-readable API definition per the [APIs.json specification](https://apisjson.org). APIs.json is the discovery format Kin Lane has been championing for over a decade — using it here is intentional.

## Open source

The portal is open source at [github.com/api-evangelist/developer](https://github.com/api-evangelist/developer). Each underlying collection lives in its own repo under the [api-evangelist GitHub organization](https://github.com/api-evangelist).

## Contact

Questions, issues, or pull requests: [github.com/api-evangelist/developer/issues](https://github.com/api-evangelist/developer/issues) or [info@apievangelist.com](mailto:info@apievangelist.com).
