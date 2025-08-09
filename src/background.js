function storeQuery(query) {
  chrome.storage.sync.set({ [query]: { definition: '' } }, () => console.log("stored data"));
}

chrome.runtime.onInstalled.addListener(() => {
  console.log("installed");
  chrome.contextMenus.create({
    id: "searchOnJisho",
    title: "Search on Jisho.org",
    contexts: ["selection"]
  }, () => { console.log("created context menu item") });
});

chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === "searchOnJisho" && info.selectionText) {
    console.table(info)
    const query = encodeURIComponent(info.selectionText.trim());
    const url = `https://jisho.org/search/${query}`;
    chrome.tabs.create({ url });
    storeQuery(info.selectionText.trim())
  }
});