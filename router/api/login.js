const express = require('express');
const router = express.Router();
const fs= require("node:fs");
const path = require("path");

let User = [];
const usersFilePath = path.resolve(__dirname, "../../addedUser.txt");


  console.log(User);
  
router.post('/', (req, res) => {
    const { name, password } = req.body;

    console.log("Request received:", { name, password });

    fs.readFile(usersFilePath, 'utf8', (err, data) => {
        if (err) {
          console.error(err);
          return;
        }
         User = JSON.parse(data);
         
      });

    const found = User.some(user => user.name === name || user.email === name);
    const user = User.find(user => user.name === name || user.email === name);
    if (found) {
        console.log("User found:", user);
        if (user.password === password) {
            res.json({ success: true, token: "fake-jwt-token",user:user.name });
        } else {
            console.log("Password is incorrect");
            res.json({ success: false, message: "Password is incorrect" });
        }
    } else {
        console.log('User not found with such username or email');
        res.json({ success: false, message: 'User not found with such username or email' });
    }
});

module.exports = router;
