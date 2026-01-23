# Academic Website & Blog

A professional academic website featuring a CV-style homepage, research publications, project portfolio, and personal blog.

## 🎯 Features

- **CV-Style Homepage**: Modern, professional landing page with research highlights
- **Blog Platform**: Full Jekyll blog with pagination and category support
- **Publications Page**: Showcase research papers and academic work
- **Projects Portfolio**: Highlight technical projects and initiatives
- **Awards & Scholarships**: Display achievements and recognitions
- **Full CV Page**: Comprehensive curriculum vitae
- **Responsive Design**: Mobile-friendly and print-optimized
- **Professional Academic Styling**: Clean, elegant design suitable for academia

## 📁 Structure

```
├── _config.yml              # Jekyll configuration with blog settings
├── _layouts/
│   ├── default.html         # Main layout with navigation
│   └── post.html            # Blog post layout
├── _posts/                  # Blog posts (YYYY-MM-DD-title.md format)
│   ├── 2026-01-23-welcome-to-my-blog.md
│   └── 2026-01-20-understanding-few-shot-learning.md
├── _includes/               # Reusable components
│   ├── education.html
│   ├── experience.html
│   ├── projects.html
│   └── publications.html
├── assets/
│   └── css/
│       └── style.scss       # Enhanced professional styling
├── index.md                 # Homepage (CV-style)
├── blog.html                # Blog listing page
├── publications.md          # Publications page
├── projects.md              # Projects page
├── awards.md                # Awards & scholarships page
└── cv.md                    # Full CV page
```

## 🚀 Getting Started

### Prerequisites

- Ruby (2.7 or higher)
- Jekyll
- Bundler

### Installation

1. Install dependencies:
```bash
bundle install
```

2. Run the development server:
```bash
bundle exec jekyll serve
```

3. Visit `http://localhost:4000` in your browser

### Building for Production

```bash
bundle exec jekyll build
```

The site will be generated in the `_site/` directory.

## ✍️ Writing Blog Posts

Create new blog posts in the `_posts/` directory with the following naming convention:

```
YYYY-MM-DD-title-of-post.md
```

### Post Template

```markdown
---
layout: post
title: "Your Post Title"
date: YYYY-MM-DD
categories: [Category1, Category2]
tags: [tag1, tag2, tag3]
author: Pham Dinh Trung Hieu
excerpt: "A brief excerpt of your post"
---

Your content here...
```

## 🎨 Customization

### Colors

Edit the color variables in `assets/css/style.scss`:

```scss
$primary-text: #1a1a1a;
$accent-color: #2563eb;
// etc.
```

### Navigation

Update navigation links in `_layouts/default.html`:

```html
<div class="nav-menu">
    <a href="/" class="nav-item">Home</a>
    <!-- Add more items -->
</div>
```

### Personal Information

Update your information in `_config.yml`:

```yaml
title: Your Name
email: your.email@example.com
position: Your Position
affiliation: Your Institution
# etc.
```

## 📄 Pages

### Homepage (`index.md`)
- Hero section with contact links
- About section
- Research highlights
- Latest blog posts
- Quick access cards

### Blog (`blog.html`)
- Paginated list of all blog posts
- Category and date metadata
- Excerpt previews

### Publications (`publications.md`)
- Research papers and publications
- Abstracts (expandable)
- Links to papers
- Research interests

### Projects (`projects.md`)
- Featured projects
- Project descriptions
- Technology tags
- Links to repositories/websites

### Awards (`awards.md`)
- University achievements
- High school achievements
- Competition achievements
- Scholarships
- Certifications

### CV (`cv.md`)
- Complete academic CV
- All sections in one place
- Print-friendly
- PDF download option (add PDF to `/assets/cv/`)

## 🎓 Content Guidelines

### Academic Tone
- Professional and scholarly language
- Clear, concise explanations
- Well-structured content
- Proper citations when needed

### Blog Post Ideas
- Research paper summaries
- Technical tutorials
- Project updates
- Conference experiences
- Learning resources
- Industry insights

## 🔧 Maintenance

### Adding Publications

Edit `publications.md` to add new publications:

```markdown
<div class="publication-item">
    <h3 class="pub-title">Paper Title</h3>
    <div class="pub-venue">Conference/Journal</div>
    <div class="pub-date">Year</div>
    <!-- etc. -->
</div>
```

### Adding Projects

Edit `projects.md`:

```markdown
<div class="project-item">
    <h3>Project Name</h3>
    <div class="project-role">Your Role</div>
    <!-- etc. -->
</div>
```

### Updating Awards

Edit `awards.md` to add achievements.

## 📱 Responsive Design

The site is fully responsive and optimized for:
- Desktop (1200px+)
- Tablet (768px - 1199px)
- Mobile (< 768px)

## 🖨️ Print Support

The CV page and blog posts are print-optimized. Users can print directly from the browser for a clean, professional output.

## 🌐 Deployment

### GitHub Pages

1. Push to GitHub repository
2. Enable GitHub Pages in repository settings
3. Set source to `main` branch
4. Site will be available at `https://yourusername.github.io`

### Custom Domain

Add a `CNAME` file with your domain name to the root directory.

## 📝 License

Feel free to customize this template for your own use.

## 🤝 Contributing

This is a personal website, but suggestions and improvements are welcome!

## 📧 Contact

Pham Dinh Trung Hieu
- Email: phamdinhtrunghieu1103@gmail.com
- GitHub: [@hieupham1103](https://github.com/hieupham1103)
- LinkedIn: [pham-dinh-trung-hieu](https://linkedin.com/in/pham-dinh-trung-hieu)

---

Built with ❤️ using Jekyll
