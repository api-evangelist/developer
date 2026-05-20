---
layout: page
title: API Evangelist JSON Feeds
description: Static JSON feeds for every collection across the API Evangelist network.
permalink: /feeds/
---

# API Evangelist JSON Feeds

Every site in the API Evangelist network publishes its collection as a static JSON feed. No authentication, no rate limits, CORS-enabled, served straight from GitHub Pages via Cloudflare.

<div class="row row-cols-1 row-cols-md-2 g-4 mt-2">
{% for feed in site.data.feeds %}
<div class="col">
  <div class="feed-card h-100">
    <h5><a href="{{ site.url }}/feeds/{{ feed.slug }}/">{{ feed.name }}</a></h5>
    <p class="text-muted mb-2">{{ feed.description | truncate: 120 }}</p>
    <div class="mb-2">
      {% for tag in feed.tags %}<span class="badge bg-secondary me-1">{{ tag }}</span>{% endfor %}
    </div>
    <div class="d-flex gap-2">
      <a href="{{ feed.feed_url }}" class="btn btn-sm btn-outline-primary" target="_blank" rel="noopener">JSON Feed</a>
      <a href="{{ feed.url }}" class="btn btn-sm btn-outline-secondary" target="_blank" rel="noopener">Browse</a>
      <a href="{{ site.url }}/feeds/{{ feed.slug }}/" class="btn btn-sm btn-outline-dark">Docs</a>
    </div>
  </div>
</div>
{% endfor %}
</div>

---

## Using the Feeds

### Fetch and display

```javascript
const res = await fetch('https://policies.apievangelist.com/policies.json');
const policies = await res.json();

policies.forEach(p => {
  console.log(p.name, p.scope, p.tags);
});
```

### Python

```python
import requests

res = requests.get('https://rules.apievangelist.com/rules.json')
rules = res.json()

for r in rules:
    print(r.get('name'), r.get('severity'))
```

### APIs.json discovery

The portal publishes an [apis.json]({{ site.url }}/apis.json) following the [APIs.json](https://apisjson.org) specification — a machine-readable catalog listing every feed in this portal along with its repository, OpenAPI (where available), and metadata. Agentic clients can fetch the apis.json file once and discover every feed and its documentation URL from a single entry point.
