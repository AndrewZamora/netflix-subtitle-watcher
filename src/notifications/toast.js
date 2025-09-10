function getToastContainer() {
    let el = document.querySelector('.toast-container');
    if (!el) {
        el = document.createElement('div');
        el.className = 'toast-container';
        el.setAttribute('aria-live', 'polite');
        el.setAttribute('aria-atomic', 'false');
        document.body.appendChild(el);
    }
    return el;
}

function createToast(message, opts = {}) {
    const {
        title = '',
        type = 'info', // 'info' | 'success' | 'warning' | 'error'
        duration = 10000, // ms; 0 disables auto-close
        dismissible = true,
    } = opts;

    const toast = document.createElement('div');
    toast.className = `toast toast--${type}`;
    toast.setAttribute('role', 'status');

    const titleEl = document.createElement('div');
    titleEl.className = 'toast__title';
    titleEl.textContent = title || type.charAt(0).toUpperCase() + type.slice(1);

    const msgEl = document.createElement('div');
    msgEl.className = 'toast__msg';
    msgEl.textContent = message;

    const closeBtn = document.createElement('button');
    closeBtn.className = 'toast__close';
    closeBtn.setAttribute('aria-label', 'Close');
    closeBtn.innerHTML = '&#10005;';

    if (!dismissible) closeBtn.style.display = 'none';

    toast.append(titleEl, closeBtn, msgEl);

    // Optional progress bar when auto-closing
    let removeTimer = null, progress = null;
    if (duration > 0) {
        const bar = document.createElement('div');
        bar.className = 'toast__progress';
        progress = document.createElement('i');
        progress.style.animationDuration = duration + 'ms';
        bar.appendChild(progress);
        toast.appendChild(bar);
    }

    function removeToast() {
        toast.classList.add('hide');
        toast.addEventListener('animationend', () => toast.remove(), { once: true });
    }

    closeBtn.addEventListener('click', removeToast);

    if (duration > 0) {
        removeTimer = setTimeout(removeToast, duration);

        // Pause on hover
        toast.addEventListener('mouseenter', () => {
            if (removeTimer) {
                clearTimeout(removeTimer);
                removeTimer = null;
            }
            if (progress) progress.style.animationPlayState = 'paused';
        });
        toast.addEventListener('mouseleave', () => {
            if (!removeTimer) {
                const remaining = (function () {
                    if (!progress) return 2000; 
                    const style = getComputedStyle(progress);
                    const dur = parseFloat(style.animationDuration) * 1000 || duration;
                    const playState = style.animationPlayState;
                    return Math.max(600, duration * 0.25);
                })();
                if (progress) {
                    progress.style.animation = 'none';
                    progress.offsetHeight; // reflow
                    progress.style.animation = `shrink ${remaining}ms linear forwards`;
                }
                removeTimer = setTimeout(removeToast, remaining);
            }
        });
    }

    return toast;
}

export function showToast(message, options = {}) {
    const container = getToastContainer();
    const toast = createToast(message, options);
    container.prepend(toast);
    return toast;
};

