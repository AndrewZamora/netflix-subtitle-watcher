export function updateSubtitleDisplay(text, documentRef = document) {
    const subtitleDisplay = documentRef.getElementById("custom-subtitle-display");
    if (subtitleDisplay) {
        subtitleDisplay.textContent = text;
    }
}