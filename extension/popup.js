import { CountUp } from "./node_modules/countup.js/dist/countUp.js";

async function makeCORSRequest(url, method) {
    return new Promise((resolve) => {
        chrome.runtime.sendMessage({ action: "makeCORSRequest", url, method }, (response) => {
            resolve(response);
        });
    });
}

function login() {
    let email = document.getElementById("inputEmail").value;
    let password = document.getElementById("inputPassword").value;

    setPage("preloader");
    makeCORSRequest(`https://alessio.ddnss.de/api/login?email=${email}&password=${password}`, "POST").then(d => {
        if (d.success) {
            let data = JSON.parse(d.data);
        } else {
            alert("failed!")
        }
    })
}

document.getElementById("button-login").addEventListener("click", login);


chrome.storage.local.get(["userID"]).then((result) => {
    if (result.userID) {
        console.log(result.userID);
        chrome.runtime.sendMessage({ action: "getUserData", userID: `${result.userID}` });
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

function initContentPage(articleTitle, articlePrice, userData) {
    setPage("content");
    alert(JSON.stringify(userData));
}
