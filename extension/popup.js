import { CountUp } from "./countUp.js";

async function makeCORSRequest(url, method) {
    return new Promise((resolve) => {
        chrome.runtime.sendMessage({ action: "makeCORSRequest", url, method }, (response) => {
            resolve(response);
        });
    });
}

async function getItemData() {
    return new Promise((resolve) => {
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
            chrome.scripting.executeScript({
                target: { tabId: tabs[0].id },
                function: () => {
                    const priceElement = document.querySelector(".a-price.aok-align-center.reinventPricePriceToPayMargin.priceToPay");
                    const titleElement = document.querySelector("#productTitle");
                    return {
                        success: true,
                        price: priceElement ? priceElement.innerText.split("\n")[0] : "N/A",
                        title: titleElement ? titleElement.innerText : "N/A"
                    };
                }
            }, (result) => {
                if (chrome.runtime.lastError) {
                    resolve({ success: false, error: chrome.runtime.lastError.message });
                } else {
                    resolve(result[0]);
                }
            });
        });
    });
}

async function getUserData(id) {
    setPage("preloader");
    return JSON.parse((await makeCORSRequest(`https://alessio.ddnss.de/api/user-data/${id}`, "GET")).data);
}

function login() {
    let email = document.getElementById("inputEmail").value;
    let password = document.getElementById("inputPassword").value;

    setPage("preloader");
    makeCORSRequest(`https://alessio.ddnss.de/api/login?email=${email}&password=${password}`, "POST").then(d => {
        if (d.success) {
            let data = JSON.parse(d.data);
            if (data.user_id) {
                chrome.storage.local.set({"userID": data.user_id});
                initContentPage(data.user_id);
            } else {
                let errLabel = document.getElementById("login-error-label");
                errLabel.hidden = false;
                errLabel.innerText = `Error: ${data.message}`;
                setPage("login")
            }
        } else {
            let errLabel = document.getElementById("login-error-label");
            errLabel.hidden = false;
            errLabel.innerText = `Error: Netzwerkfehler`;
            setPage("login");
        }
    })
}

function truncateString(str, num) {
    if (str.length <= num) {
        return str
    }
    return str.slice(0, num) + '...'
}



chrome.storage.local.get(["userID"]).then((result) => {
    if (result.userID) {
        console.log(result.userID);
        initContentPage(result.userID);
    } else {
        setPage("login");
    }
});

let pages = {
    content: document.getElementById("page-content"),
    login: document.getElementById("page-login"),
    preloader: document.getElementById("page-preloader")
};

function setPage(page) {
    if (page === "content") {
        pages.content.hidden = false;
        pages.login.hidden = true;
        pages.preloader.hidden = true;
    } else if (page === "login") {
        pages.content.hidden = true;
        pages.login.hidden = false;
        pages.preloader.hidden = true;
    } else if (page === "preloader") {
        pages.content.hidden = true;
        pages.login.hidden = true;
        pages.preloader.hidden = false;
    }
}

async function initContentPage(id) {
    let itemData = (await getItemData()).result;
    let userData = await getUserData(id);
    setPage("content");

    document.getElementById("username").innerText = userData.first_name;

    (new CountUp("number-kontostant", userData.account_data[0].balance)).start();

    document.getElementById("article-item-name").innerText = truncateString(itemData.title, 40)

    itemData.price = Number((itemData.price).replace(/[^0-9.-]+/g,""))/100;
    (new CountUp("item-price", itemData.price)).start();

    initBucketUI(userData.buckets[0], itemData.price);

    console.log(userData);
}

function initBucketUI(buckets, itemPrice) {
    let select = document.getElementById("category-select");

    let keys = Object.keys(buckets);
    delete keys[keys.indexOf("bucket_id")];
    delete keys[keys.indexOf("user_id")];
    keys.forEach(key => {
        let option = document.createElement("option");
        option.value = buckets[key];
        option.innerHTML = key;

        select.appendChild(option)
    });

    select.onchange = () => {
        let budget = Number(select.value);
        let bucket = select.options[select.selectedIndex].text;

        document.getElementById("label-budget-selected").innerText = bucket;

        (new CountUp("bucket-budget", budget)).start();

        let percentageContainer = document.getElementById("bucket-percentage")
        let percentageContainerEuro = document.getElementById("bucket-percentage-2")


        let percentage = Math.round(itemPrice / budget * 100);

        if (percentage >= 40) {
            percentageContainer.style.color = 'red';
            percentageContainerEuro.style.color = 'red';
        } else if (percentage >= 20) {
            percentageContainer.style.color = 'orange';
            percentageContainerEuro.style.color = 'orange';
        } else {
            percentageContainer.style.color = 'green';
            percentageContainerEuro.style.color = 'green';
        }

        (new CountUp("bucket-percentage", percentage)).start();
    }
    select.onchange();
}

document.getElementById("button-login").addEventListener("click", login);
