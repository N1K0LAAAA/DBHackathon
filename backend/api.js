
const express = require("express");
const betterSQLite3 = require("better-sqlite3");

const api = express.Router();
const db = betterSQLite3(__dirname + "/database.db", { "fileMustExist": true, "verbose": console.log });

const dbQueries = {
    getAllMembers: db.prepare("SELECT * FROM members;"),
    getAllMemberNames: db.prepare("SELECT id, first_name, second_name FROM members;"),
    getSingeMemberByID: db.prepare("SELECT * FROM members WHERE id=?;"),
}

/**
 * MEMBERS
 */
api.get("/members", (_req, res) => {
    let data = dbQueries.getAllMembers.all();

    data.forEach((row, i) => {
        data[i].age = getAge(row.birthday)
    })

    res.json(data);
    res.end();
});
