chrome.runtime.onMessage.addListener(async (message, sender, sendResponse) => {
    if (message.action === "downloadTranscript") {
      const videoId = getYouTubeVideoId(message.url);
      if (!videoId) {
        sendResponse({ success: false, error: "Invalid YouTube URL." });
        return;
      }
  
      // Step 1: Attempt to fetch the transcript
      const transcript = await fetchTranscript(videoId);
      if (transcript) {
        saveToFile("transcript.txt", transcript);
        sendResponse({ success: true });
        return;
      }
  
      // Step 2: Fallback for audio URL extraction
      const audioUrl = `https://www.yt-download.org/api/button/mp3/${videoId}`;
      sendResponse({
        success: false,
        error: `No transcript available. Extract audio from: ${audioUrl}`,
      });
    }
  });
  
  function getYouTubeVideoId(url) {
    const regex = /v=([a-zA-Z0-9_-]{11})/;
    const match = url.match(regex);
    return match ? match[1] : null;
  }
  
  async function fetchTranscript(videoId) {
    try {
      const response = await fetch(
        `https://www.youtube.com/api/timedtext?lang=en&v=${videoId}`
      );
      if (!response.ok) return null;
  
      const text = await response.text();
      const parser = new DOMParser();
      const xmlDoc = parser.parseFromString(text, "text/xml");
      const texts = Array.from(xmlDoc.getElementsByTagName("text"))
        .map((node) => node.textContent)
        .join("\n");
  
      return texts || null;
    } catch (error) {
      console.error("Error fetching transcript:", error);
      return null;
    }
  }
  
  function saveToFile(filename, content) {
    const blob = new Blob([content], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
  
    chrome.downloads.download({
      url: url,
      filename: filename,
    });
  }