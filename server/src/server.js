var async = require('async');
var express = require('express');
var bodyParser = require("body-parser");
var serv = express();
//Auth modules
const jwt = require('jsonwebtoken');



jwtsecret = 'supersecret'
serv.use(bodyParser.json());

serv.use(async (req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  next();
});

const cUser = 'user'
const cPass = '123'

// Функция для получения токена авторизации
serv.post('/api/login', function(req, res){
  res.set('Access-Control-Allow-Origin', ['*']);
  var name = req.body.name
  var pass = req.body.pass
  console.log(name)
  console.log(pass)
  if(name === cUser && pass === cPass)
  {
    jwt.sign(req.body, jwtsecret, (err,token)=>{
      // В качестве ответа отправляется имя пользователя и токен
      res.json({
        name: name,
        token: token
      });
    })
  }
  else
  {
    console.log("Auth length Error")
    res.json({
      name: name,
      token:'AuthError'
    });
  }
})

serv.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});
