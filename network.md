---
layout: page
title: Network
description: The full network of API Evangelist sites this portal aggregates.
permalink: /network/
---

# The API Evangelist Network

The portal aggregates every collection Kin Lane publishes across the API Evangelist network. Each site below is its own Jekyll project under the [api-evangelist GitHub organization](https://github.com/api-evangelist), and each one publishes a static JSON feed surfaced in this developer portal.

<table class="table table-striped">
  <thead class="table-light">
    <tr>
      <th>Site</th>
      <th>What it publishes</th>
      <th>Repo</th>
      <th>Docs</th>
    </tr>
  </thead>
  <tbody>
    {% for feed in site.data.feeds %}
    <tr>
      <td><a href="{{ feed.url }}" target="_blank" rel="noopener">{{ feed.url | remove: 'https://' | remove: 'http://' | remove_first: '/' }}</a></td>
      <td>{{ feed.description | truncate: 110 }}</td>
      <td>{% if feed.repo_url %}<a href="{{ feed.repo_url }}" target="_blank" rel="noopener">repo</a>{% endif %}</td>
      <td><a href="{{ site.url }}/feeds/{{ feed.slug }}/">{{ feed.name }}</a></td>
    </tr>
    {% endfor %}
  </tbody>
</table>

---

## Linking back to this portal

Every collection site in the network links here for developer-facing documentation. That keeps the operational consumption surface (this portal) separate from the human browse surfaces (the individual sites) without forcing each site to maintain its own developer docs.

If you maintain a fork or downstream consumer of any of these feeds, please link back to [developer.apievangelist.com]({{ site.url }}/) so changes to the feed shapes can be tracked from a single canonical source.
