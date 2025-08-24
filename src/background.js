import { lookup } from "./services/jisho/lookup";
import { FetchQueue } from "./utilities/fetchQueue";

const fetchQueue = new FetchQueue();

function storeQuery(query, body) {
  chrome.storage.sync.set({ [query]: body }, () => console.log("stored data"));
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
    // storeQuery(info.selectionText.trim());
    lookup(info.selectionText.trim()).then((data) => { console.log(data) })
  }
});

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  console.log({ request, sender, sendResponse })
  if (request.selection) {
    const url = new URL("api/v1/search/words", "https://jisho.org");
    url.searchParams.append("keyword", request.selection);
    fetchQueue.add(url).then(data => console.log("it worked", data));
  }
});