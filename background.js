function storeQuery(query) {
  let data = {
    'hardcoded': {
      query
    }
  }

  chrome.storage.local.get('hardcoded', () => console.log("stored data"))
  chrome.storage.local.set({ netflix: JSON.stringify(data) }, () => console.log("stored data"))
}

chrome.contextMenus.create({
  id: "searchOnJisho",
  title: "Search on Jisho.org",
  contexts: ["selection"]
});

chrome.contextMenus.create({
  id: "translateWithGoogle",
  title: "Translate with Google (Japanese to English)",
  contexts: ["selection"]
});

// Handle clicks on the context menu item
chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === "searchOnJisho" && info.selectionText) {
    const query = encodeURIComponent(info.selectionText.trim());
    const url = `https://jisho.org/search/${query}`;
    chrome.tabs.create({ url });
    console.log('test')
  }
  if (info.menuItemId === "translateWithGoogle" && info.selectionText) {
    const query = encodeURIComponent(info.selectionText.trim());
    const url = `https://translate.google.com/?sl=ja&tl=en&text=${query}&op=translate`;
    chrome.tabs.create({ url });
  }

  if (info.menuItemId && info.selectionText) {
    storeQuery(info.selectionText.trim())
  }
});
