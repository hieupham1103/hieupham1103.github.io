(() => {
    const escapeHtml = (value = '') => value.replace(/[&<>'"]/g, (character) => ({
        '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;'
    }[character]));

    const parseBibtex = (source) => {
        const entries = [];
        const entryPattern = /@(\w+)\s*\{\s*([^,]+),([\s\S]*?)\n\}/g;
        let entryMatch;

        while ((entryMatch = entryPattern.exec(source))) {
            const [, type, id, body] = entryMatch;
            const fields = { type, id };
            const fieldPattern = /(\w+)\s*=\s*\{([\s\S]*?)\}(?:,|\s*$)/g;
            let fieldMatch;
            while ((fieldMatch = fieldPattern.exec(body))) {
                fields[fieldMatch[1].toLowerCase()] = fieldMatch[2].replace(/\s+/g, ' ').trim();
            }
            entries.push(fields);
        }
        return entries;
    };

    const authorList = (entry, compact = false) => {
        const authors = compact && entry.home_authors ? entry.home_authors : entry.author;
        return escapeHtml(authors || '').replace(/Hieu Dinh Trung Pham|H\. D\. T\. Pham/g, '<strong>$&</strong>');
    };

    const details = (entry) => {
        if (entry.preprint) return `<div class="pub-details"><span class="detail-label">Preprint on:</span> ${escapeHtml(entry.preprint)}</div>`;
        if (entry.arxiv) return `<div class="pub-details"><span class="detail-label">arXiv ID:</span> ${escapeHtml(entry.arxiv)}</div>`;
        if (entry.pages) return `<div class="pub-details"><span class="detail-label">Pages:</span> ${escapeHtml(entry.pages)}</div>`;
        return '';
    };

    const publicationMarkup = (entry, compact) => {
        const title = escapeHtml(entry.title || 'Untitled publication');
        const venue = escapeHtml(entry.booktitle || entry.journal || '');
        const date = [entry.month, entry.year].filter(Boolean).join(' ');
        const abstract = !compact && entry.abstract
            ? `<div class="pub-abstract"><details><summary>Abstract</summary><p>${escapeHtml(entry.abstract)}</p></details></div>`
            : '';
        const heading = entry.url
            ? `<a href="${escapeHtml(entry.url)}" target="_blank" rel="noopener">${title}</a>`
            : title;

        return `<article class="${compact ? 'pub-item' : 'publication-item'}">
            <h${compact ? '4' : '3'} class="pub-title">${heading}</h${compact ? '4' : '3'}>
            <div class="pub-venue">${venue}</div>
            ${compact ? '' : `<div class="pub-date">${escapeHtml(date)}</div>`}
            <div class="pub-authors">${authorList(entry, compact)}</div>
            ${compact ? '' : details(entry)}
            ${abstract}
        </article>`;
    };

    const render = async (container) => {
        try {
            const response = await fetch(container.dataset.bibSource);
            if (!response.ok) throw new Error('Could not load BibTeX');
            let publications = parseBibtex(await response.text());
            const compact = container.dataset.publications === 'selected';
            if (compact) publications = publications.filter((publication) => publication.selected === 'true').slice(0, 2);
            container.innerHTML = publications.map((publication) => publicationMarkup(publication, compact)).join('') || '<p>No publications found.</p>';
        } catch (error) {
            container.innerHTML = '<p class="publication-loading">Publications are temporarily unavailable. Please try again shortly.</p>';
        }
    };

    document.querySelectorAll('[data-publications][data-bib-source]').forEach(render);
})();
