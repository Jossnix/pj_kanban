const MongoClient = require("mongodb").MongoClient;
const dbconf = require("./conf/dbconf.json");

const url = dbconf.kUrl;
const mongoClient = new MongoClient(url, { useNewUrlParser: true });

// findMnCon("user")
// .then(
//   response => {
//     console.log("RESPONSE: ", response);
//   },
//   error => console.log("<=> error checkUser: ", error)
// )
// createUser(dbconf, "user", "Пользователь для тестирования", "111", "user");
// changeUser(dbconf, "Dima8", "Dimon", "", "");
// delUser(dbconf, "Dima4");
// checkUser(dbconf, "user");
// createTicket(dbconf, "Title for new ticket");
// delTicket(dbconf, 5);

// Добавить пользователя
async function createUser (dbconf, newUser, userDiscr, password, userRole) {
  mongoClient.connect(async function(err, client){
      const db = client.db(dbconf.kName);
      const collectionUs = db.collection(dbconf.kCollections.users);
      let user = {name: newUser, nameDiscr: userDiscr, pas: password, role: userRole}
      await collectionUs.find({name: newUser}).toArray(async function(err, results){
        if(err){ 
          return console.log(err);
        } else {
          if(results.length === 0) {
            console.log("Done");
            await collectionUs.insertOne(user, function(err, result){
              if(err){ 
                  return console.log(err);
              } else {
                console.log(result.ops);
                client.close();
              }
            })
          } else {
            console.log("User: " + newUser + " exist.");
            client.close();
          }
        }
      })
  })
}
// Проверить, существует ли пользователь
// async function checkUser (dbconf, oldUser) {
//   await mongoClient.connect(async function(err, client){
//     const db = client.db(dbconf.kName);
//     const collectionUs = db.collection(dbconf.kCollections.users)
//     await collectionUs.findOne({name: oldUser}, async function(err, results){
//       if(err){ 
//         return console.log(err);
//       } else {
//         console.log("Finds: ", results);
//         await client.close();
//         return (results)
//       }
//     });
//   });
// }
function findMnCon(oldUser) {
  console.log("-> start findMnCon")
  return new Promise (function (resolve, reject) {
  mongoClient.connect((error, client) => {
      if (error) {
        let error = new Error (this.statusText);
        error.code = this.status;
        reject (error);
      } else {
        const db = client.db(dbconf.kName)
        const collectionUs = db.collection(dbconf.kCollections.users)
        findMn(collectionUs, oldUser)
        .then(
          response => {
            fUser = response;
            resolve (response);
            client.close();
          },
          error => console.log("<=> error checkUser: ", error)
        )
      }
  })
  })
}

function findMn(collectionUs, oldUser) {
  console.log("-> start findMn")
  return new Promise (function (resolve, reject) {
    collectionUs.findOne({name: oldUser}, (error, result) => {
      if (error) {
          console.log("local error");
          let error = new Error (this.statusText);
          error.code = this.status;
          reject (error);
      } else {
          resolve (result);
      }
  })
  })
}
async function checkUser (dbconf, oldUser) {
  await mongoClient.connect(async function(err, client){
    const db = client.db(dbconf.kName);
    const collectionUs = db.collection(dbconf.kCollections.users)
    return new Promise (function (resolve, reject) {
            let resultQuery = collectionUs.findOne({name: oldUser}, (error, results) => {
                if (error) {
                    let error = new Error (this.statusText);
                    error.code = this.status;
                    reject (error);
                } else {
                    resolve (results);
                }
            })
        })
  });
}
// Удалить пользователя
async function delUser (dbconf, oldUser) {
  mongoClient.connect(async function(err, client){
    const db = client.db(dbconf.kName);
    const collectionUs = db.collection(dbconf.kCollections.users)
    await collectionUs.find({name: oldUser}).toArray(async function(err, results){
      if(err){ 
        return console.log(err);
      } else {
        if(results.length !== 0) {
          console.log(oldUser + " exist.");
          await collectionUs.deleteOne({name: oldUser}, function(err, results){
            if(err){ 
                return console.log(err);
            } else {
              console.log("del: ", oldUser);
              client.close();
            }
          })
        } else {
          console.log("User: " + oldUser + " not exist.");
          client.close();
        };
      }
    });
  });
}
// Изменить пароль/роль выбранному пользователю
async function changeUser (dbconf, chUser, userDiscr, password, userRole) {
  mongoClient.connect(async function(err, client){
      const db = client.db(dbconf.kName);
      const collectionUs = db.collection(dbconf.kCollections.users);
      let upUser = {name: chUser};
      if (userDiscr.length !==0 ) {
        upUser['nameDiscr'] = userDiscr;
      }
      if (password.length !==0 ) {
        upUser['pas'] = password;
      }
      if (userRole.length !==0 ) {
        upUser['role'] = userRole;
      }
      await collectionUs.find({name: chUser}).toArray(async function(err, results){
        if(err){ 
          return console.log(err);
        } else {
          if(results.length === 1) {
            console.log("user: ", chUser, " fined.");
            await collectionUs.updateOne({name: chUser}, {$set: upUser}, function(err, result){
              if(err){ 
                  return console.log(err);
              } else {
                console.log("user: "+ chUser + " was updated.");
                client.close();
              }
            })
          } else {
            if(results.length === 0) {
              console.log("User: " + newUser + "not exist.");
              client.close();
            }
            if(results.length > 1) {
              console.log("Find more than 1 user " + newUser + ".");
              client.close();
            }
          }
        }
      })
  })
}
// Создать задачу
// async function createTicket (dbconf, сId, сTitle, сStatus, сDescription, сPriority, сCreated, сAssigned, сEndDate, сTime) {
async function createTicket (dbconf, сTitle) {
  mongoClient.connect(async function(err, client){
    const db = client.db(dbconf.kName);
    const collectionTck = db.collection(dbconf.kCollections.tickets);
    let tId;
    // let newTicket = {id: сId, title: сTitle, status: сStatus, description: сDescription, priority: сPriority, created: сCreated, assigned: сAssigned, endDate: сEndDate, time: сTime}
    await collectionTck.find().sort({id: -1}).limit(1).toArray(async function(err, results){;
      if(err){ 
        return console.log(err);
      } else {
        console.log("res == ", results);
        if (results.length){
          console.log(results[0].id[2]);
          tId = results[0].id + 1;
        } else {
          tId = 0
        }
        // let newTicket = {id: tId, title: сTitle, status: сStatus, description: сDescription, priority: сPriority, created: сCreated, assigned: сAssigned, endDate: сEndDate, time: сTime}
        let newTicket = {id: tId, title: сTitle, status: 'new'};
        await collectionTck.insertOne(newTicket, function(err, result){
          if(err){ 
              return console.log(err);
          } else {
            console.log(result.ops);
            client.close();
          }
        })
      }
    })
  })
}
// Удалить задачу
async function delTicket (dbconf, tId) {
  mongoClient.connect(async function(err, client){
    const db = client.db(dbconf.kName);
    const collectionTck = db.collection(dbconf.kCollections.tickets);
    await collectionTck.find({id: tId}).toArray(async function(err, results){
      if(err){ 
        return console.log(err);
      } else {
        if(results.length === 1) {
          console.log("ticket: ", tId, " fined.");
          await collectionTck.updateOne({id: tId}, {$set: {status: "closed"}}, function(err, result){
            if(err){ 
                return console.log(err);
            } else {
              console.log("ticket: "+ tId + " was closed.");
              client.close();
            }
          })
        } else {
          if(results.length === 0) {
            console.log("Ticket: " + tId + "not exist.");
            client.close();
          }
          if(results.length > 1) {
            console.log("Find more than 1 user " + tId + ".");
            client.close();
          }
        }
      }
    })
  })
}
// Изменить задачу
async function changeUser (dbconf, chUser, userDiscr, password, userRole) {
  mongoClient.connect(async function(err, client){
      const db = client.db(dbconf.kName);
      const collectionUs = db.collection(dbconf.kCollections.users);
      let upUser = {name: chUser};
      if (userDiscr.length !==0 ) {
        upUser['nameDiscr'] = userDiscr;
      }
      if (password.length !==0 ) {
        upUser['pas'] = password;
      }
      if (userRole.length !==0 ) {
        upUser['role'] = userRole;
      }
      await collectionUs.find({name: chUser}).toArray(async function(err, results){
        if(err){ 
          return console.log(err);
        } else {
          if(results.length === 1) {
            console.log("user: ", chUser, " fined.");
            await collectionUs.updateOne({name: chUser}, {$set: upUser}, function(err, result){
              if(err){ 
                  return console.log(err);
              } else {
                console.log("user: "+ chUser + " was updated.");
                client.close();
              }
            })
          } else {
            if(results.length === 0) {
              console.log("User: " + newUser + " exist.");
              client.close();
            }
            if(results.length > 1) {
              console.log("Find more than 1 user " + newUser + ".");
              client.close();
            }
          }
        }
      })
  })
}

exports.checkUser = checkUser;
exports.findMnCon = findMnCon;