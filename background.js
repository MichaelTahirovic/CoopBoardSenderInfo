chrome.action.onClicked.addListener((tab) => {
  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    files: ["newscript.js"]
  });
});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === "parsedData") {
    console.log("Parsed data from the active tab:", message.data);
    sendResponse({ status: "success" });
  }
});
