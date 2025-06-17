export function createObserver(callback, observeTarget = document.body) {
    const observer = new MutationObserver(callback);
    observer.observe(observeTarget, { childList: true, subtree: true });
    return observer;
}