chrome.action.onClicked.addListener((tab) => {
  console.log("Injecting script into tab:", tab.id);
  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    files: ["testScript.js"],
    world: "MAIN"
  }, () => {
    if (chrome.runtime.lastError) {
      console.error("Script injection failed:", chrome.runtime.lastError.message);
    } else {
      console.log("Script injected successfully.");
    }
  });
});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === "parsedData") {
    console.log("Parsed data from the active tab:", message.data);
    sendResponse({ status: "success" });
  }
});
