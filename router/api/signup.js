const express = require('express');
const router = express.Router();
const fs = require("fs");
const path = require("path");

const usersFilePath = path.resolve(__dirname, "../../addedUser.txt");
console.log("Resolved path:", usersFilePath);

router.post('/', (req, res) => {
    const { name, password, email, gender, dob } = req.body;

    const newUser = {
        name: name,
        password: password,
        email: email,
        gender: gender,
        dob: dob
    };

    // Read existing users data from JSON file
    let users = [];
    try {
        users = JSON.parse(fs.readFileSync(usersFilePath, 'utf8'));
    } catch (error) {
        console.error("Error reading users file:", error);
    }
    users.push(newUser);
    // Write updated users array back to JSON file
    try {
        // Attempt to write to the file
        fs.writeFileSync(usersFilePath, JSON.stringify(users), 'utf8');
        console.log("User added successfully:", newUser);
        // res.send("User added Successfully");
        res.json({ success: true, token: "fake-jwt-token",user:newUser.name });
    } catch (error) {
        res.json({ success: false, message: 'User is not added.' });
        console.error("Error writing users file:", error);
        res.status(500).send("Error adding user");
    }
    
});

module.exports = router;
