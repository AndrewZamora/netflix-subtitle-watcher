import { createSubtitleDisplay } from "./subtitles/createSubtitleDisplay";
import { startSubtitleObserver } from "./subtitles/startSubtitleObserver";
import { showToast } from "./notifications/toast";

createSubtitleDisplay();
const observer = startSubtitleObserver();

chrome.runtime.onMessage.addListener(async (request, sender, sendResponse) => {
    console.log("hey",{ request, sender, sendResponse })
    if (request.notification) {
        const data = request.notification;
        showToast(`${data.selection}, ${data.reading}, ${data.english}`)
    };
});
