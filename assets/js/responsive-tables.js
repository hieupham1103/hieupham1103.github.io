document.querySelectorAll('.post-body table').forEach((table) => {
    const headers = Array.from(table.querySelectorAll('thead th')).map((header) => header.textContent.trim());

    if (headers.length === 0) return;

    table.querySelectorAll('tbody tr').forEach((row) => {
        Array.from(row.children).forEach((cell, index) => {
            if (headers[index]) cell.dataset.label = headers[index];
        });
    });

    table.classList.add('responsive-table');
});
