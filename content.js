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
    subtitleDisplay.style.fontSize = "40px";
    subtitleDisplay.style.textAlign = "center";
    subtitleDisplay.style.zIndex = "9999";
    subtitleDisplay.style.cursor = "text"; // Allow text selection
    subtitleDisplay.style.userSelect = "text"; // Enable text highlighting
    document.body.appendChild(subtitleDisplay);
}

// Initialize the custom subtitle display
createSubtitleDisplay();

// Function to update the custom subtitle display
function updateSubtitleDisplay(text) {
    const subtitleDisplay = document.getElementById("custom-subtitle-display");
    if (subtitleDisplay) {
        subtitleDisplay.textContent = text;
    }
}

// Observer to monitor changes in the subtitle container
const targetClass = ".player-timedtext-text-container";
const observer = new MutationObserver(() => {
    const subtitleContainer = document.querySelector(targetClass);
    if (subtitleContainer) {
        const text = subtitleContainer.innerText.trim();
        updateSubtitleDisplay(text);
    }
});

// Start observing for changes in the DOM
observer.observe(document.body, {
    childList: true,
    subtree: true,
});