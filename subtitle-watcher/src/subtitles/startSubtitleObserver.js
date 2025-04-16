import { getSubtitleContainer } from "./getSubtitleContainer";
import { createObserver } from "./createObserver";
import { updateSubtitleDisplay } from "./updateSubtitleDisplay";

export function startSubtitleObserver() {
    return createObserver(() => {
        const subtitleContainer = getSubtitleContainer();
        if (subtitleContainer) {
            updateSubtitleDisplay(subtitleContainer.innerText.trim());
        }
    });
}
