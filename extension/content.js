function getItemData() {
    const priceElement = document.querySelector(".a-price.aok-align-center.reinventPricePriceToPayMargin.priceToPay");
    const titleElement = document.querySelector("#productTitle");

    const price = priceElement ? priceElement.innerText.split("\n")[0] : "N/A";
    const title = titleElement ? titleElement.innerText : "N/A";

    return {
        success: true,
        price,
        title
    };
}
