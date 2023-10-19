// content.js
chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
    if (message.action === "executeCode") {
        const pageData = extractItemContent();
        sendResponse({ from: "content.js", action: "pageData", data: pageData });
    }
});

function extractItemContent() {
    const priceElement = document.querySelector(".a-price.aok-align-center.reinventPricePriceToPayMargin.priceToPay");
    const titleElement = document.querySelector("#productTitle");

    return {
        price: priceElement ? priceElement.innerText.split("\n")[0] : "N/A",
        title: titleElement ? titleElement.innerText : "N/A"
    };
}
