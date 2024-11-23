document.getElementById("download").addEventListener("click", async () => {
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  
    if (!tab || !tab.url.includes("youtube.com/watch")) {
      document.getElementById("status").innerText =
        "Please open a YouTube video.";
      return;
    }
  
    chrome.runtime.sendMessage(
      { action: "downloadTranscript", url: tab.url },
      (response) => {
        if (response && response.success) {
          document.getElementById("status").innerText =
            "Transcript downloaded successfully.";
        } else {
          document.getElementById("status").innerText =
            response?.error || "Failed to download the transcript.";
        }
      }
    );
  });