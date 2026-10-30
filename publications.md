---
layout: default
title: Publications
permalink: /publications/
---

<div class="page-header"><h1>Publications & Research</h1><p class="page-description">My academic publications and research contributions</p></div>
<div class="content">
    <section class="publications-section">
        <div class="publication-list" data-publications="all" data-bib-source="{{ '/assets/data/publications.bib' | relative_url }}"><p class="publication-loading">Loading publications…</p></div>
        <p><a class="pub-link" href="{{ '/assets/data/publications.bib' | relative_url }}">Download BibTeX (.bib)</a></p>
    </section>
    <section class="research-interests">
        <h2>Research Interests</h2>
        <div class="interests-grid">
            {% for interest in site.data.research.interests %}<div class="interest-card"><h4>{{ interest.title }}</h4><p>{{ interest.description }}</p></div>{% endfor %}
        </div>
    </section>
</div>
