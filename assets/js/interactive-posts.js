/*
 * Entry point for optional post labs.
 *
 * Add a lab to a post with data-learning-lab="<name>" and register its module
 * here. Keeping the registry small means ordinary posts do not load lab code.
 */
const labModules = {
    timeslice: () => import('./learning-labs/timeslice-lab.js')
};

const requestedLabs = new Set(
    Array.from(document.querySelectorAll('[data-learning-lab]'))
        .map((element) => element.dataset.learningLab)
        .filter(Boolean)
);

requestedLabs.forEach((name) => {
    const load = labModules[name];

    if (load) {
        load().catch((error) => {
            console.error(`Could not load the ${name} learning lab.`, error);
        });
    }
});
