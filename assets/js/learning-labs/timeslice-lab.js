const PROCESS_ORDER = ['editor', 'browser', 'sync'];

const PROCESS_NAMES = {
    editor: 'Editor',
    browser: 'Browser',
    sync: 'Sync'
};

function createCell(process, isActive) {
    const cell = document.createElement('span');
    cell.className = `timeslice-cell timeslice-cell--${process}`;
    cell.textContent = PROCESS_NAMES[process].slice(0, 1);
    cell.setAttribute('aria-hidden', 'true');

    if (isActive) cell.classList.add('is-active');

    return cell;
}

function initialiseLab(lab) {
    const track = lab.querySelector('[data-timeslice-track]');
    const status = lab.querySelector('[data-timeslice-status]');
    const stepButton = lab.querySelector('[data-timeslice-step]');
    const runButton = lab.querySelector('[data-timeslice-run]');
    const resetButton = lab.querySelector('[data-timeslice-reset]');

    if (!track || !status || !stepButton || !runButton || !resetButton) return;

    let tick = 0;
    let timerId = null;
    const isRunning = () => timerId !== null;

    function update() {
        const activeProcess = PROCESS_ORDER[tick % PROCESS_ORDER.length];
        track.replaceChildren(...Array.from({ length: 12 }, (_, index) => {
            const process = PROCESS_ORDER[(tick + index) % PROCESS_ORDER.length];
            return createCell(process, index === 0);
        }));

        status.textContent = `The CPU is running ${PROCESS_NAMES[activeProcess]}. After one time slice, the kernel will switch to the next task.`;
        runButton.textContent = isRunning() ? 'Pause' : 'Run automatically';
    }

    function advance() {
        tick = (tick + 1) % PROCESS_ORDER.length;
        update();
    }

    function stop() {
        if (timerId !== null) {
            window.clearInterval(timerId);
            timerId = null;
        }
        update();
    }

    stepButton.addEventListener('click', () => {
        stop();
        advance();
    });

    runButton.addEventListener('click', () => {
        if (isRunning()) {
            stop();
            return;
        }

        timerId = window.setInterval(advance, 900);
        update();
    });

    resetButton.addEventListener('click', () => {
        stop();
        tick = 0;
        update();
    });

    update();
}

document.querySelectorAll('[data-learning-lab="timeslice"]').forEach(initialiseLab);
