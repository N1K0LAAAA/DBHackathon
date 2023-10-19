chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "makeCORSRequest") {
        (async () => {
            try {
                const response = await fetch(request.url, {
                    method: request.method,
                });

                if (!response.ok) {
                    throw new Error(`Request failed with status ${response.status}`);
                }

                const data = await response.text();
                sendResponse({ success: true, data });
            } catch (error) {
                sendResponse({ success: false, error: error.message });
            }
        })();
        return true;
    }
});
