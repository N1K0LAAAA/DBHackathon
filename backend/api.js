const express = require("express");
const betterSQLite3 = require("better-sqlite3");

const api = express.Router();
const db = betterSQLite3(__dirname + "/hackathonDB.db", { "fileMustExist": true, "verbose": console.log });

const dbQueries = {
  findUserByEmail: db.prepare("SELECT * FROM Users WHERE email = ?"),

};

api.all("/login", (req, res) => {
  const { email, password } = req.query;

  // Check if the user exists in the database
  const user = dbQueries.findUserByEmail.get(email);

  if (!user) {
    // User not found
    res.status(401).json({ message: "User not found" });
  } else {
    // Check the provided password against the stored password 
    if (user.password === password) {
      // Passwords match, user is authenticated
      res.json({ message: "Login successful" });
    } else {
      // Passwords do not match
      res.status(401).json({ message: "Incorrect password" });
    }
  }
});

module.exports = api;
