const streamingServices = {
    netflix: { container: ".player-timedtext-text-container" },
    amazon: { container: ".atvwebplayersdk-captions-text", overlay: "atvwebplayersdk-captions-overlay" },
}

function getSubtitleContainer() {
    let subtitleContainer = null
    for (const [key, value] of Object.entries(streamingServices)) {
        const container = document.querySelector(value.container);
        if (container) {
            subtitleContainer = container;
            break
        }
    }
    return subtitleContainer
}


function createSubtitleDisplay() {
    const subtitleDisplay = document.createElement("div");
    subtitleDisplay.id = "custom-subtitle-display";
    subtitleDisplay.style.position = "fixed";
    subtitleDisplay.style.bottom = "10%";
    subtitleDisplay.style.left = "50%";
    subtitleDisplay.style.transform = "translateX(-50%)";
    subtitleDisplay.style.backgroundColor = "rgba(0, 0, 0, 0.8)";
    subtitleDisplay.style.color = "white";
    subtitleDisplay.style.padding = "10px 20px";
    subtitleDisplay.style.borderRadius = "10px";
    subtitleDisplay.style.fontSize = "2.5rem";
    subtitleDisplay.style.textAlign = "center";
    subtitleDisplay.style.zIndex = "99999";
    subtitleDisplay.style.cursor = "text"; // Allow text selection
    subtitleDisplay.style.userSelect = "text"; // Enable text highlighting
    subtitleDisplay.style.lineHeight = "1.1";
    document.body.appendChild(subtitleDisplay);
}

createSubtitleDisplay();

function updateSubtitleDisplay(text) {
    const subtitleDisplay = document.getElementById("custom-subtitle-display");
    if (subtitleDisplay) {
        subtitleDisplay.textContent = text;
    }
}

const observer = new MutationObserver(() => {
    let subtitleContainer = getSubtitleContainer()
    if (subtitleContainer) {
        const text = subtitleContainer.innerText.trim();
        subtitleContainer.style.position = "relative"
        subtitleContainer.style.right = "200vw"
        subtitleContainer.style.zIndex = "-1"
        updateSubtitleDisplay(text);
    }
});

observer.observe(document.body, {
    childList: true,
    subtree: true,
});