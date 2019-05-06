const MongoClient = require("mongodb").MongoClient;
const dbconf = require("./conf/dbconf.json");

const url = dbconf.kUrl;
const mongoClient = new MongoClient(url, { useNewUrlParser: true });
 
createUser(dbconf, "Dima4", "Иван Иванович", "222", "user");
    // let res = await checkUser(collectionUs, "Andrew");
    // await delUser(collectionUs, "Andrew");
    // console.log("res:", res);

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
async function checkUser (collection, oldUser) {
  await collection.find({name: oldUser}).toArray(function(err, results){
    if(err){ 
      return console.log(err);
    }
    console.log(results);
    return (results)
  });
}
// Удалить пользователя
async function delUser (collection, oldUser) {
  await collection.deleteOne({name: oldUser}, function(err, results){
    if(err){ 
      return console.log(err);
    }
    console.log("del: ", oldUser);
  });
}
// Изменить пароль/роль выбранному пользователю
// Создать задачу
// Удалить задачу
// Изменить задачу