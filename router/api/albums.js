const express = require('express');
const router = express.Router();
const fs= require("node:fs");
const path = require("path");

let Albums = [];

const usersFilePath = path.resolve(__dirname, "../../albums.txt");

fs.readFile(usersFilePath, 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      return;
    }
    try{
     Albums = JSON.parse(data);
    }
    catch(parseError){
        console.log(parseError);
    }
  });
    router.get('/',(req,res)=>{
        res.json(Albums);
    });
router.get('/:id',(req,res)=>{
    const found = Albums.some(album => album.id === parseInt(req.params.id));
    if(found){
        const album = Albums.filter(album => album.id === parseInt(req.params.id));
        res.json(album);
    }else{
        res.status(400).send("No Albumb found with the id :"+req.params.id);
    }
});

module.exports = router;
