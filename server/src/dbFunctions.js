const MongoClient = require("mongodb").MongoClient;
const dbconf = require("./conf/dbconf.json");

const url = dbconf.kUrl;
const mongoClient = new MongoClient(url, { useNewUrlParser: true });
 
// createUser(dbconf, "Dima4", "Иван Иванович", "222", "user");
delUser(dbconf, "Dima4");
// checkUser(dbconf, "Dima");

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
function checkUser (dbconf, oldUser) {
  mongoClient.connect(async function(err, client){
    const db = client.db(dbconf.kName);
    const collectionUs = db.collection(dbconf.kCollections.users)
    await collectionUs.find({name: oldUser}).toArray(function(err, results){
      if(err){ 
        return console.log(err);
      } else {
        console.log("Finds: ", results);
        client.close();
        return (results)
      }
    });
  });
}
// Удалить пользователя
async function delUser (dbconf, oldUser) {
//   mongoClient.connect(async function(err, client){
//     const db = client.db(dbconf.kName);
//     const collectionUs = db.collection(dbconf.kCollections.users);
//     await collectionUs.deleteOne({name: oldUser}, function(err, results){
//       if(err){ 
//         return console.log(err);
//       }
//       console.log("del: ", oldUser);
//       client.close();
//     });
//   })
// }


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
// Создать задачу
// Удалить задачу
// Изменить задачу