const express = require('express');
const router = express.Router();
const fs= require("node:fs");
const path = require("path");

let User = [];

const usersFilePath = path.resolve(__dirname, "../../addedUser.txt");

fs.readFile(usersFilePath, 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      return;
    }
     User = JSON.parse(data);
  });
router.get('/:name',(req,res)=>{
    const found = User.some(user => user.name === (req.params.name));
    if(found){
        const user = User.filter(user => user.name === (req.params.name));
        res.json(user);
    }else{
        res.status(400).send("No user found with the name :"+req.params.name);
    }
})

router.delete("/:name",(req,res) =>{
    
    const updatedUsers = User.filter(user => user.name !== req.params.name );
    // Write updated users array back to JSON file
    try {
        // Attempt to write to the file
         fs.writeFileSync(usersFilePath, JSON.stringify(updatedUsers), 'utf8');
        console.log("User removed successfully");
        res.json("user removed successfully");
    } catch (error) {
        res.status(500).send("Error removing the user");
    }
});

module.exports = router;