const express = require("express");
const betterSQLite3 = require("better-sqlite3");
const cors = require("cors");

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
  getBucketData: db.prepare("SELECT * FROM buckets WHERE user_id = ?")
};

api.all("/login", cors(), (req, res) => {
  const { email, password } = req.query;

  // Check if the user exists in the database
  const user = dbQueries.findUserByEmail.get(email);

  if (!user) {
    res.status(401).end();
  } else {
    // Check the provided password against the stored password
    if (user.password === password) {
      // Passwords match, user is authenticated
      res.json({ message: "Login successful", user_id: user.user_id });
    } else {
      // Passwords do not match
      res.status(401).json({ message: "Incorrect password" });
    }
  }
});

api.get("/user-data/:userId", cors(), (req, res) => {
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
  const bucketData = dbQueries.getBucketData.all(user.user_id);

  if (userData.length > 0) {
    const userWithNames = {
      user_id: user.user_id,
      first_name: user.first_name, 
      last_name: user.last_name,
      account_data: userData,
      transactions: transactionHistory,
      buckets: bucketData
    };

    // Send the response with the user's data
    res.json(userWithNames);
  } else {
    // User data not found
    res.status(404).json({ message: "User data not found" });
  }
});



module.exports = api;
