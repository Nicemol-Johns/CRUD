const express = require('express');
const router  = express.Router();

router.use(express.json());
router.use(express.urlencoded({extended:true}));

var data;

//fetch the json file
const fs = require('fs');
fs.readFile('data.json', (error, jsonData) => {
    if (error) {
      console.error('File cannot be found:', error);
    } else {
      data = JSON.parse(jsonData);
     // console.log(typeof(data))
    }
});

//fetch data from backend
router.get('/get',(req,res)=>{
    console.log("GET REQUEST PROCESSING");
    res.send(data);
})

//fetch data from frontend
router.post('/post',(req,res)=>{
    console.log("POST REQUEST PROCESSING");
    //console.log(req.body);
    data.push(req.body);
    const jsonString = JSON.stringify(data);
    fs.writeFile('data.json',jsonString,error =>{
      if(error){
        console.log('Error writing File',error);
        res.send("Action cannot be performed");
      }else{
        console.log("Writing to JSON File");
       // res.send("Data Added");
        res.send(data);
      }
    })
})

//update data in json file
router.put('/update/:ind',(req,res)=>{
  const index=req.params.ind;
  console.log("PUT REQUEST PROCESSING");
  //console.log(index);
  data[index] = req.body;
  //console.log(data[index]);
  const jsonString = JSON.stringify(data);
  fs.writeFile('data.json',jsonString,error =>{
    if(error){
      console.log('Error updating File',error);
      res.send("Action cannot be performed");
    }else{
      console.log("JSON File successfully updated");
     // res.send("Data Added");
      res.send(data);
    }
  })
})


//remove data in json file
router.delete('/remove/:ind',(req,res)=>{
  const index=req.params.ind;
  console.log("DELETE REQUEST PROCESSING");
  //console.log(index);
  data.splice(index,1);
  //console.log(data[index]);
  const jsonString = JSON.stringify(data);
  fs.writeFile('data.json',jsonString,error =>{
    if(error){
      console.log('Error modifying file',error);
      res.send("Action cannot be performed");
    }else{
      console.log("JSON File successfully modified");
     // res.send("Data Added");
      res.send(data);
    }
  })
})


//local module exporting
module.exports = router;