const express = require("express");
const betterSQLite3 = require("better-sqlite3");

const api = express.Router();
const db = betterSQLite3(__dirname + "/databaseHAc.db", { "fileMustExist": true, "verbose": console.log });

const dbQueries = {
  findUserByEmail: db.prepare("SELECT * FROM Users WHERE email = ?"),
  findUserById: db.prepare("SELECT * FROM Users WHERE user_id = ?"),
  getUserData: db.prepare("SELECT * FROM Account WHERE user_id = ?"),
  getTransactionHistory: db.prepare(`
    SELECT * FROM Transactions
    WHERE from_Account IN (SELECT account_id FROM Account WHERE user_id = ?)
       OR to_Account IN (SELECT account_id FROM Account WHERE user_id = ?);
  `),

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

api.all("/user-data/:userId", (req, res) => {
  const userId = req.params.userId;

  // Check if the user exists in the database
  const user = dbQueries.findUserById.get(userId);

  if (!user) {
    // User not found
    res.status(404).json({ message: "User not found" });
    return;
  }

  // Retrieve user account data from the database
  const userData = dbQueries.getUserData.all(user.user_id); // Use .all() to retrieve multiple rows

  // Retrieve transaction history for the user
  const transactionHistory = dbQueries.getTransactionHistory.all(user.user_id, user.user_id);

  // Retrieve bucket data for the user
  const bucketData = db.prepare("SELECT * FROM buckets WHERE user_id = ?").all(user.user_id);

  if (userData.length > 0) {
    // Send user data, transaction history, and bucket data as a response
    res.json({ user: userData, transactions: transactionHistory, buckets: bucketData });
  } else {
    // User data not found
    res.status(404).json({ message: "User data not found" });
  }
});


module.exports = api;
