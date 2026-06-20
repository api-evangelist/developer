---
layout: page
title: API Evangelist Developer Portal
description: Static JSON feeds for the API Evangelist network — APIs, posts, policies, rules, properties, schema, standards, strategies, guidance, conversations, experiences, and more.
---

<div class="text-center mb-5">
  <img src="https://kinlane-images.s3.amazonaws.com/shared/api-evangelist-logos/api-evangelist-logo-butterfly.png" alt="API Evangelist" class="hero-butterfly">
  <h1 class="display-5 fw-bold">API Evangelist Developer Portal</h1>
  <p class="lead text-muted">Static JSON feeds for every collection across the API Evangelist network. No authentication. No rate limits. Just data.</p>
  <a href="/feeds/" class="btn btn-primary btn-lg me-2">Browse Feeds</a>
  <a href="https://apievangelist.com" class="btn btn-outline-secondary btn-lg">apievangelist.com &rarr;</a>
</div>

---

## Available Feeds

{% for feed in site.data.feeds %}
<div class="feed-card">
  <div class="d-flex justify-content-between align-items-start">
    <div>
      <h5 class="mb-1"><a href="{{ site.url }}/feeds/{{ feed.slug }}/">{{ feed.name }}</a></h5>
      <p class="text-muted mb-2">{{ feed.description | truncate: 140 }}</p>
      <div>{% for tag in feed.tags %}<span class="badge bg-secondary me-1">{{ tag }}</span>{% endfor %}</div>
    </div>
    <div class="ms-3 flex-shrink-0">
      <a href="{{ feed.feed_url }}" class="btn btn-sm btn-outline-primary me-1" target="_blank" rel="noopener">JSON</a>
      <a href="{{ site.url }}/feeds/{{ feed.slug }}/" class="btn btn-sm btn-outline-dark">Docs</a>
    </div>
  </div>
</div>
{% endfor %}

---

## About

For more than a decade, API Evangelist has covered the technology, business, politics, and people of APIs. Today that work is spread across a network of static sites — each one focused on a single dimension of API operations: APIs themselves, plus contracts, policies, rules, properties, schema, standards, strategies, guidance, conversations, experiences, partners, utilities, videos, and vocabularies.

This developer portal pulls those collections together in one place and documents each one as a feed you can consume. Every site publishes a static JSON file you can fetch directly — no API key, no signup, no rate limit. Each entry on this page links to the live feed and to documentation describing its fields.

All feeds are:
- **Public** — no API key or registration required
- **Static** — served directly from GitHub Pages via Cloudflare
- **CORS-enabled** — consumable directly from the browser
- **Discoverable** — see the [APIs.json]({{ site.url }}/apis.json) index for the full catalog

The portal itself is open source at [github.com/api-evangelist/developer](https://github.com/api-evangelist/developer).
