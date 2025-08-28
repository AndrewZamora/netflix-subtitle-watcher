import { getSubtitleContainer } from "./getSubtitleContainer";
import { createObserver } from "./createObserver";
import { updateSubtitleDisplay } from "./updateSubtitleDisplay";
import { onTextSelection } from "./onTextSelection";
import { hideElement } from "./hideElement";

let listening = false;

export function startSubtitleObserver() {
    console.log("startSubtitleObserver.js")
    return createObserver(() => {
        const subtitleContainer = getSubtitleContainer();
        if (subtitleContainer) {
            updateSubtitleDisplay(subtitleContainer.textContent.trim());
            if (!listening) {
                const subtitleDisplay = document.getElementById("custom-subtitle-display");
                onTextSelection(subtitleDisplay, async ({ selection, sentence }) => {
                    chrome.runtime.sendMessage({ selection: selection, sentence: sentence});
                });
                listening = true;
            }
            hideElement(subtitleContainer);
        }
    });
}
