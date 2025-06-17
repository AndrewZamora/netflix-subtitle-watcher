export function createSubtitleDisplay(documentRef = document) {
    const subtitleDisplay = documentRef.createElement("div");
    subtitleDisplay.id = "custom-subtitle-display";
    Object.assign(subtitleDisplay.style, {
        position: "fixed",
        bottom: "10%",
        left: "50%",
        transform: "translateX(-50%)",
        backgroundColor: "rgba(0, 0, 0, 0.8)",
        color: "white",
        padding: "10px 20px",
        borderRadius: "10px",
        fontSize: "2.5rem",
        textAlign: "center",
        zIndex: "99999",
        cursor: "text",
        userSelect: "text",
        lineHeight: "1.1",
    });
    documentRef.body.appendChild(subtitleDisplay);
}