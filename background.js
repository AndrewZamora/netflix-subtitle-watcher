// Create a context menu item for searching on Jisho.org
chrome.contextMenus.create({
    id: "searchOnJisho",
    title: "Search on Jisho.org",
    contexts: ["selection"] // Only show when text is selected
});

// Handle clicks on the context menu item
chrome.contextMenus.onClicked.addListener((info, tab) => {
    if (info.menuItemId === "searchOnJisho" && info.selectionText) {
        const query = encodeURIComponent(info.selectionText.trim());
        const url = `https://jisho.org/search/${query}`;
        chrome.tabs.create({ url });
    }
});
