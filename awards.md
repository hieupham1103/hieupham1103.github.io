---
layout: default
title: Awards & Scholarships
permalink: /awards/
---

<div class="page-header"><h1>Awards & Scholarships</h1><p class="page-subtitle">Recognition and achievements throughout my academic journey</p></div>
<div class="awards-container">
    {% for award in site.data.awards %}
    <div class="award-item"><div class="award-year">{{ award.year }}</div><div class="award-content"><h3 class="award-title">{{ award.title }}</h3><p class="award-organization">{{ award.organization }}</p><p class="award-description">{{ award.description }}</p></div></div>
    {% endfor %}
</div>
