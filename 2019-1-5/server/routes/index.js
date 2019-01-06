var express = require('express');
var router = express.Router();

/* GET home page. */
 router.post('/checklogin',function(req, res) {
   let {username,password}=req.body
   console.log(username,password)
   res.send(' iwen');
 })

module.exports = router;
