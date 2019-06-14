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

// Функция для получения токена авторизации
serv.post('/api/login', async function(req, res){
  res.set('Access-Control-Allow-Origin', ['*']);
  var name = req.body.name
  var pass = req.body.pass
  console.log(name)
  console.log(pass)
  var fUser;
  const collectionUs = db.collection(dbconf.kCollections.users);
  await dbFn.findMn(collectionUs, name)
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
      // В качестве ответа отправляется имя пользователя, токен, и полную информацию о пользователе.
      res.json({
        name: name,
        token: token,
        fUser: fUser
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

// Функция для получения данных о пользователях
serv.get('/api/users', async function(req, res){
  res.set('Access-Control-Allow-Origin', ['*']);
  const collectionUs = db.collection(dbconf.kCollections.users);
  await dbFn.allUsers(collectionUs)
  .then(
    response => {
      console.log("RESPONSE: ", response);
      jwt.sign(req.body, jwtsecret, (err,token)=>{
        res.json({
          users: response
        });
      })
    },
    error => console.log("<=> error checkUser: ", error)
  )
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
