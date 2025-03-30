import { getSubtitleContainer } from "./getSubtitleContainer";

export function startSubtitleObserver() {
    return createObserver(() => {
        const subtitleContainer = getSubtitleContainer();
        if (subtitleContainer) {
            updateSubtitleDisplay(subtitleContainer.innerText.trim());
        }
    });
}