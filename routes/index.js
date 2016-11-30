var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
router.post('/sendMessage',function(req,res){
console.log(req.body.message);

console.log(req.body.phone);
console.log(req.body.name);

var mo = req.body.phone;
var bo = req.body.message;
var name = req.body.name;
var https = require('https');

var data = JSON.stringify({
 api_key: '5acdbf42',
 api_secret: '05e0abf2fe6eae3a',
 to: mo,
 from: 'NEXMO',
 text: bo
});

var options = {
 host: 'rest.nexmo.com',
 path: '/sms/json',
 port: 443,
 method: 'POST',
 headers: {
   'Content-Type': 'application/json',
   'Content-Length': Buffer.byteLength(data)
 }
};

var req = https.request(options);

req.write(data);
req.end();

var responseData = '';
req.on('response', function(res1){
 res1.on('data', function(chunk){
   responseData += chunk;
   var x = JSON.parse(chunk);
   console.log(chunk);
   console.log(x.messages[0].status);
   var y = x.messages[0].status;
   if(y == 0)
   {
		var currdatetime = new Date();
		console.log(currdatetime);
		var otp = bo.substring(15,21);
		console.log(otp);
		var jsonfile = require('jsonfile')
		 
		var file = './public/JSON/SentMessages.json';

		var obj = {"Name":name,"Time":currdatetime,"OTP":otp};

		var out =[];
		var fs = require('fs');
		var obj1 = JSON.parse(fs.readFileSync(file, 'utf8'));
		console.log(obj1);
		obj1.push(obj);	
		console.log("after");
		console.log(obj1);

		jsonfile.writeFile(file, obj1, function (err,doc) {
		if(err)
		  console.error(err);
		  else{
		  console.log("doce");
		  res.send({msg:'Message Sent Successfully'});
		  }
		});
		
   }
   
   else if(y == 29)
   {
		res.send({msg:'Message Failed!! Mobile Number not registered with NEXMO'});
   }
   
   else
   {	
		res.send({msg:'Error'+y+' has occured'});
   }
 });

 res1.on('end', function(){
   console.log(JSON.parse(responseData));
  // return res.send({msg : 'done'});
 });
});

  
  
});
module.exports = router;
