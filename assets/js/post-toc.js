const postBody = document.querySelector('[data-post-body]');
const postToc = document.querySelector('[data-post-toc]');
const postTocNav = document.querySelector('[data-post-toc-nav]');

if (postBody && postToc && postTocNav) {
    const headings = Array.from(postBody.querySelectorAll('h2, h3, h4'));

    if (headings.length > 1) {
        const usedIds = new Set();

        function slugify(text) {
            return text
                .toLowerCase()
                .trim()
                .replace(/[^a-z0-9\s-]/g, '')
                .replace(/\s+/g, '-')
                .replace(/-+/g, '-')
                .replace(/^-|-$/g, '') || 'section';
        }

        headings.forEach((heading) => {
            if (!heading.id) {
                let id = slugify(heading.textContent);
                const baseId = id;
                let index = 2;

                while (usedIds.has(id) || document.getElementById(id)) {
                    id = `${baseId}-${index}`;
                    index += 1;
                }

                heading.id = id;
            }

            usedIds.add(heading.id);
        });

        const list = document.createElement('ol');
        list.className = 'post-toc-list';

        headings.forEach((heading) => {
            const level = Number(heading.tagName.replace('H', ''));
            const item = document.createElement('li');
            item.className = `post-toc-item post-toc-level-${level}`;

            const link = document.createElement('a');
            link.href = `#${heading.id}`;
            link.textContent = heading.textContent;

            item.appendChild(link);
            list.appendChild(item);
        });

        postTocNav.appendChild(list);
        postToc.hidden = false;

        const links = Array.from(postTocNav.querySelectorAll('a'));
        const observer = new IntersectionObserver((entries) => {
            const visibleEntry = entries
                .filter((entry) => entry.isIntersecting)
                .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0];

            if (!visibleEntry) return;

            links.forEach((link) => {
                link.classList.toggle('active', link.getAttribute('href') === `#${visibleEntry.target.id}`);
            });
        }, {
            rootMargin: '-20% 0px -70% 0px',
            threshold: 0
        });

        headings.forEach((heading) => observer.observe(heading));
    }
}
