const browserRoot = document.querySelector('[data-learning-log-browser]');

if (browserRoot) {
    const items = Array.from(browserRoot.querySelectorAll('[data-learning-log-item]'));
    const searchInput = browserRoot.querySelector('[data-learning-search]');
    const spaceFilter = browserRoot.querySelector('[data-learning-filter="space"]');
    const subjectFilter = browserRoot.querySelector('[data-learning-filter="subject"]');
    const resetButton = browserRoot.querySelector('[data-learning-filter-reset]');
    const countLabel = browserRoot.querySelector('[data-learning-log-count]');
    const emptyState = browserRoot.querySelector('[data-learning-log-empty]');
    const activeFilters = browserRoot.querySelector('[data-active-filters]');

    const labels = {
        space: {
            all: 'all tracks',
            university: 'University',
            'high-school': 'High School',
            lab: 'Lab',
            other: 'Other'
        }
    };

    function getSelectedText(select) {
        return select.options[select.selectedIndex].text;
    }

    function updateActiveFilters(visibleCount) {
        const parts = [];

        if (spaceFilter.value !== 'all') {
            parts.push(labels.space[spaceFilter.value] || getSelectedText(spaceFilter));
        }

        if (subjectFilter.value !== 'all') {
            parts.push(getSelectedText(subjectFilter));
        }

        const query = searchInput.value.trim();
        if (query) {
            parts.push(`Search: "${query}"`);
        }

        if (parts.length === 0) {
            activeFilters.innerHTML = '<span>Showing all Learning Log notes</span>';
        } else {
            activeFilters.innerHTML = `<span>Filtered by ${parts.join(' / ')}</span>`;
        }

        countLabel.textContent = `${visibleCount} ${visibleCount === 1 ? 'note' : 'notes'}`;
    }

    function applyFilters() {
        let visibleCount = 0;
        const query = searchInput.value.trim().toLowerCase();

        items.forEach((item) => {
            const matchesSpace = spaceFilter.value === 'all' || item.dataset.space === spaceFilter.value;
            const matchesSubject = subjectFilter.value === 'all' || item.dataset.subject === subjectFilter.value;
            const matchesSearch = !query || item.dataset.search.includes(query);
            const isVisible = matchesSpace && matchesSubject && matchesSearch;

            item.hidden = !isVisible;
            if (isVisible) {
                visibleCount += 1;
            }
        });

        emptyState.hidden = visibleCount > 0;
        updateActiveFilters(visibleCount);
    }

    searchInput.addEventListener('input', applyFilters);
    spaceFilter.addEventListener('change', applyFilters);
    subjectFilter.addEventListener('change', applyFilters);
    resetButton.addEventListener('click', () => {
        searchInput.value = '';
        spaceFilter.value = 'all';
        subjectFilter.value = 'all';
        applyFilters();
    });

    applyFilters();
}
