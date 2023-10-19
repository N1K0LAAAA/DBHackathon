const settings = require("./config.json");
const express = require("express");
const fs = require("fs");

const api = require("./api");

const app = express();

let path = __dirname.split("/");
path.pop();
path.push("Dashboard");
path = path.join("/");
app.use("/", express.static(path));

app.use("/api", api);

app.listen(3000, () => {
    console.log("running...");
});

if (settings.webserver.https) {
    const https = require("https");
    const http = require("http");

    http.createServer(app).listen(settings.webserver.port.http, () => {
        `running on http://localhost:${settings.webserver.port.http}/`
    })

    https
        .createServer(
            {
                key: fs.readFileSync(settings.webserver.certificate.key),
                cert: fs.readFileSync(settings.webserver.certificate.cert),
                ca: fs.readFileSync(settings.webserver.certificate.ca),
            },
            app
        )
        .listen(settings.webserver.port.https, () => console.log(`running on https://localhost:${settings.webserver.port.https}/`))
} else {
    app.listen(settings.webserver.port.http, () => console.log(`running on http://localhost:${settings.webserver.port.http}/`))
}