# Pham Dinh Trung Hieu - GitHub Pages

Personal academic profile built with Jekyll and GitHub Pages.

## Run Locally

Install dependencies once:

```bash
bundle install
```

Start the local site:

```bash
bundle exec jekyll serve
```

Build the static site:

```bash
bundle exec jekyll build
```

## Content Structure

- `_posts/`: blog posts, research posts, and Learning Log entries.
- `_videos/`: video pages with YouTube embeds.
- `_includes/content-card.html`: shared card UI for posts and videos.
- `content.html`: main content hub.
- `learning-log.html`: Learning Log index at `/content/learning-log/`.

## Add A Learning Log Entry

Learning Log entries are journal-style notes for courses, study sessions, and research ideas.
Create a Markdown file in `_posts` named `YYYY-MM-DD-slug.md`.

```yaml
---
layout: post
title: "Tên bài học / ghi chú"
date: YYYY-MM-DD
categories: [Learning Log, University]
tags: [calculus, linear-algebra]
subject: "Mathematics"
level: "University"
course: "Calculus 1"
semester: "Semester 1"
excerpt: "Ghi chú ngắn về nội dung bài."
thumbnail: "/assets/img/thumbnails/example.png"
---
```

Use `level: "High School"` for high school notes, `level: "University"` for university notes, and `level: "Lab"` for lab or research-group notes. The Learning Log page automatically builds filters from `level` and `subject`.

## Add A Research Post

```yaml
---
layout: post
title: "Post Title"
date: YYYY-MM-DD
categories: [AI, Research, Tutorial]
tags: [few-shot-learning, computer-vision]
excerpt: "Short summary shown on content cards."
thumbnail: "/assets/img/thumbnails/example.png"
---
```

## Add A Video

Create a Markdown file in `_videos` named `YYYY-MM-DD-slug.md`.

```yaml
---
title: "Video Title"
date: YYYY-MM-DD
categories: [Machine Learning, Education]
tags: [CNN, visualization]
duration: "7:51"
thumbnail: "/assets/img/thumbnails/example.png"
youtube_id: "YouTubeVideoId"
---
```
