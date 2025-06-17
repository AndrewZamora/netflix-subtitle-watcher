import { getSubtitleContainer } from "./getSubtitleContainer";
import { createObserver } from "./createObserver";
import { updateSubtitleDisplay } from "./updateSubtitleDisplay";
import { hideElement } from "./hideElement";

export function startSubtitleObserver() {
    return createObserver(() => {
        const subtitleContainer = getSubtitleContainer();
        if (subtitleContainer) {
            updateSubtitleDisplay(subtitleContainer.textContent.trim());
            hideElement(subtitleContainer)
        }
    });
}
