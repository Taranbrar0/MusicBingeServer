const express = require('express');
const router = express.Router();
const songs = require('../../Songs.js');

router.get('/',(req,res) => res.json(songs));

router.get('/:id',(req,res)=>{
    const found = songs.some(song => song.id === parseInt(req.params.id));
    if(found){
        res.json(songs.filter(song =>song.id === parseInt(req.params.id)));
    }
})

module.exports = router;
