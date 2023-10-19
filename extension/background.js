// background.js

chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
    if (message.action === "runAuth") {
        const { mail, pwd } = message.credits;
        fetch(`http://alessio.ddnss.de/api/login?email=${mail}&password=${pwd}`, {
            method: "GET"
        })
            .then(response => response.json())
            .then(data => {
                chrome.runtime.sendMessage({ from: "background.js", action: "loginComplete", data });
            });
    } else if (message.action === "getUserData") {
        const { userID } = message;
        fetch(`http://alessio.ddnss.de/api/user-data/${userID}`, { method: "GET" })
            .then(response => response.json())
            .then(data => {
                chrome.runtime.sendMessage({ from: "background.js", action: "userData", data });
            });
    }
});
