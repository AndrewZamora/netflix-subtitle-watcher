import { getSubtitleContainer } from "./getSubtitleContainer";
import { createObserver } from "./createObserver";
import { updateSubtitleDisplay } from "./updateSubtitleDisplay";
import { onTextSelection } from "./onTextSelection";
import { hideElement } from "./hideElement";

let listening = false;

export function startSubtitleObserver() {
    return createObserver(() => {
        const subtitleContainer = getSubtitleContainer();
        if (subtitleContainer) {
            updateSubtitleDisplay(subtitleContainer.textContent.trim());
            if (!listening) {
                const subtitleDisplay = document.getElementById("custom-subtitle-display");
                onTextSelection(subtitleDisplay, ({ selection, sentence }) => {
                    console.log({ selection, sentence });
                });
                listening = true;
            }
            hideElement(subtitleContainer);
        }
    });
}
