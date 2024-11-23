const API_KEY = "X-API-Key 8b08e8df-34db-4db9-8ba2-78a3c66da7ff"; // Replace with your GPT-4 API key

chrome.runtime.onMessage.addListener(async (request, sender, sendResponse) => {
  if (request.action === "processText") {
    const processedText = await processTextWithGPT(request.text);
    sendResponse({ text: processedText });
  } else if (request.action === "showPopup") {
    chrome.storage.local.set({ processedText: request.processedText }, () => {
      chrome.action.openPopup(); // Opens the popup window
    });
  }
  return true;
});

async function processTextWithGPT(inputText) {
  const apiUrl = "https://api.openai.com/v1/chat/completions";
  try {
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-4",
        messages: [
          { role: "system", content: "You are an ISL interpreter." },
          { role: "user", content: `Simplify this into ISL-friendly text: "${inputText}"` },
        ],
      }),
    });

    const data = await response.json();
    return data.choices[0].message.content;
  } catch (error) {
    console.error("Error calling GPT-4 API:", error);
    return null;
  }
}
