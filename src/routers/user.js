const express = require('express');
const User = require('../models/users');
const csvtojson = require('csvtojson');
const multer = require('multer');
const router = new express.Router();
const fs = require('fs');
const path = require('path');

const dirName = path.join(__dirname + '../../../data');

const upload = multer({
    dest: 'data',
    fileFilter(req, file, cb){
        if(!file.originalname.endsWith('.csv')){
            return cb(new Error('please upload a csv file'))
        }
        cb(undefined, true)
    }
});

router.post('/upload', upload.single('upload'), (req, res)=> {
      
    const parseCsvToJson = (file)=> {
        csvtojson()
      .fromFile(path.join(__dirname + `../../../data/${file}`))
      .then(csvData => {
        //   console.log(csvData)
        for(var i=0; i<csvData.length; i++){
            const user = new User(csvData[i]);
            user.save()
        }
          console.log(csvData[1])
        
        console.log('Data Saved')
      });
      }
    
    
    fs.readdir(dirName, (err, files)=> {
            if(err){
               throw err;
            }
            files.forEach((file)=> parseCsvToJson(file))
        });
        res.send()
    }, (error, req, res, next)=> {
        res.status(400).send({error: error.message})
    });


router.get('/users', async(req, res)=> {
   
    try {
      const users = await User.find({})
        res.status(201).send(users)
    } catch (e) {
        res.status(500).send()
    }
});

router.get('/users/:id', async(req, res)=> {
    const _id = req.params.id
    
    try {
        const user = await User.findById(_id)
        if(!user){
          return  res.status(404).send()
        }
        res.status(201).send(user)
    } catch (e) {
        res.status(500).send()
    }
});

module.exports = router;