function getSelectionInfo(event, getSelection = () => window.getSelection()) {
    const selection = getSelection()?.toString() || "";
    const sentence = event.target?.textContent?.trim() || "";
    return { selection, sentence };
}

export function onTextSelection(element, callback, getSelection = () => window.getSelection()) {
    if (!element) return;
    element.addEventListener("mouseup", (event) => {
        const info = getSelectionInfo(event, getSelection);
        callback(info);
    });
}