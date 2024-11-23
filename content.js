const observer = new MutationObserver(() => {
  const captions = document.querySelector('.ytp-caption-segment');
  if (captions) {
    const text = captions.innerText.trim();
    chrome.runtime.sendMessage(
      { action: "processText", text },
      (response) => {
        if (response && response.text) {
          // Send the processed text to the popup window
          chrome.runtime.sendMessage({ action: "showPopup", processedText: response.text });
        }
      }
    );
  }
});

observer.observe(document.body, {
  childList: true,
  subtree: true,
});
