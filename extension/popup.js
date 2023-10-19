import { CountUp } from "./node_modules/countup.js/dist/countUp.js";

let userdata = {};
document.addEventListener("DOMContentLoaded", () => {
    function login() {
        let email = document.getElementById("inputEmail").value;
        let password = document.getElementById("inputPassword").value;

        setPage("preloader");
        chrome.runtime.sendMessage({ action: "runAuth", credits: { mail: email, pwd: password } });
    }

    document.getElementById("button-login").addEventListener("click", login);

    chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
        if (message.from === "background.js") {
            if (message.action === "loginComplete") {
                if (message.data.user_id) {
                    chrome.storage.local.set({ "userID": message.data.user_id });
                    chrome.runtime.sendMessage({ action: "getUserData", userID: message.data.user_id });
                } else {
                    let err_label = document.getElementById("login-error-label");
                    err_label.hidden = false;
                    err_label.innerText = message.data.message;
                    setPage("login");
                }
            } else if (message.action === 'userData') {
                userdata = message.data;
                chrome.runtime.sendMessage({ action: "executeCode" });
            } else if (message.action === 'pageData') {
                initContentPage(message.data.title, message.data.price, userdata);
            }
        }
    });

    chrome.storage.local.get(["userID"]).then((result) => {
        if (result.userID) {
            chrome.runtime.sendMessage({ action: "getUserData", userID: result.userID });
        } else {
            setPage("login");
        }
    });
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
