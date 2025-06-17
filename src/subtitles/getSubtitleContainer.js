import { streamingServices } from "../utilities/utilities";

export function getSubtitleContainer(querySelector = document.querySelector.bind(document)) {
    for (const service of Object.values(streamingServices)) {
        const container = querySelector(service.container);
        if (container) return container;
    }
    return null;
}