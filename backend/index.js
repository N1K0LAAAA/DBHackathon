const express = require("express");

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