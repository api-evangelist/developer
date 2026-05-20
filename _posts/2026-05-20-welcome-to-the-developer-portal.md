---
layout: post
title: Welcome to the API Evangelist Developer Portal
description: The new portal at developer.apievangelist.com aggregates every collection across the API Evangelist network into a single set of consumable JSON feeds.
date: 2026-05-20 12:00:00 -0700
tags:
  - Announcements
  - Feeds
  - Discovery
---

For more than a decade, [API Evangelist](https://apievangelist.com) has covered the technology, business, politics, and people of APIs. Over that time the research has spread across a network of focused sites — one for [APIs](https://apis.apievangelist.com), one for [policies](https://policies.apievangelist.com), one for [rules](https://rules.apievangelist.com), one for [properties](https://properties.apievangelist.com), and on through schema, standards, strategies, guidance, conversations, experiences, contracts, partners, utilities, videos, and vocabularies.

Each site publishes its own HTML browse view, and each site emits a static JSON feed of the same data. Until now those feeds lived alongside the human pages with no shared documentation surface.

[**developer.apievangelist.com**](https://developer.apievangelist.com) brings them together. Every collection across the network is documented here as a feed: where to fetch it, what fields it returns, and how to consume it from JavaScript, Python, or anything else that can speak HTTP. No API key. No rate limit. No signup.

## What's in this portal

Each [feed](/feeds/) has its own documentation page covering the endpoint URL, response schema, and example requests in JavaScript and Python. The portal also publishes a machine-readable [apis.json](/apis.json) cataloging the entire network per the [APIs.json](https://apisjson.org) specification, so agentic clients can discover every feed from a single entry point.

## Why static feeds

The API Evangelist network has always favored static publishing over hosted APIs:

- **Static feeds are durable.** GitHub Pages will outlive any hosted API I'd build.
- **Static feeds are honest.** What you fetch is what's in the repo — no transformation layer, no caching layer, no surprise.
- **Static feeds are diff-able.** Every change to every collection is in git history.

For more on the pattern, see the [APIs.io developer portal](https://developer.apis.io) — same approach, different network. This portal follows that template intentionally.

## What's next

The collections that don't yet emit a JSON feed at the URL documented here are next on the build list. If you spot a feed URL that returns 404 instead of JSON, [file an issue](https://github.com/api-evangelist/developer/issues) and I'll prioritize it.
