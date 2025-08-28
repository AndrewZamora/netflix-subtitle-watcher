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
  }
});

chrome.runtime.onMessage.addListener(async (request, sender, sendResponse) => {
  console.log({ request, sender, sendResponse })
  if (!request.selection) return;
  const storage = await chrome.storage.sync.get(request.selection);
  if (storage[request.selection]) return;
  const data = await lookup(request.selection, fetchQueue);
  data.selection = request.selection.trim();
  data.sentence = request.sentence.trim();
  data.timestamp = Date.now();
  storeQuery(request.selection, data);
});