export function updateSubtitleDisplay(text, documentRef = document) {
    // TODO: This triggers the mutation observer more than once.
    const subtitleDisplay = documentRef.getElementById("custom-subtitle-display");
    if (subtitleDisplay && subtitleDisplay.textContent !== text) {
        subtitleDisplay.textContent = text;
    }
}