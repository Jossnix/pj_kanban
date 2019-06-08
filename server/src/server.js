var async = require('async');
var express = require('express');
var bodyParser = require("body-parser");
const dbconf = require("./conf/dbconf.json");
var dbFn = require("./dbFunctions");
var serv = express();
//Auth modules
const jwt = require('jsonwebtoken');

const MongoClient = require("mongodb").MongoClient;
const url = dbconf.kUrl;
const mongoClient = new MongoClient(url, { useNewUrlParser: true });

let dbClient;
let db;

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
serv.post('/api/login', async function(req, res){
  res.set('Access-Control-Allow-Origin', ['*']);
  var name = req.body.name
  var pass = req.body.pass
  console.log(name)
  console.log(pass)
  var fUser;
  const collectionUs = db.collection(dbconf.kCollections.users);
  await dbFn.findMn(collectionUs, "user")
  .then(
    response => {
      fUser = response;
      console.log("RESPONSE: ", response);
    },
    error => console.log("<=> error checkUser: ", error)
  )
  console.log("data user: ", fUser);
  if(name === fUser.name && pass === fUser.pas)
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
  mongoClient.connect((error, client) => {
    if (error) {
      let error = new Error (this.statusText);
      error.code = this.status;
      console.log("Error in connect")
      reject (error);
    } else {
      dbClient = client;
      db = dbClient.db(dbconf.kName);
    }
  })
});
