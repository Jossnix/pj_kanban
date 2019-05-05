const MongoClient = require("mongodb").MongoClient;
const dbconf = require("./conf/dbconf.json");

const url = dbconf.kUrl;
const mongoClient = new MongoClient(url, { useNewUrlParser: true });
 
mongoClient.connect(async function(err, client){
    const db = client.db(dbconf.kName);
    const collectionUs = db.collection(dbconf.kCollections.users);
    await createUser(collectionUs, "Ivan", "Иван Иванович", "222", "user");
    let res = await checkUser(collectionUs, "Andrew");
    await delUser(collectionUs, "Andrew");
    console.log("res:", res);
    client.close();
});
// Добавить пользователя
async function createUser (collection, newUser, userDiscr, password, userRole) {
  let user = {name: newUser, nameDiscr: userDiscr, pas: password, role: userRole}
  await collection.insertOne(user, function(err, result){
    if(err){ 
        return console.log(err);
    }
    console.log(result.ops);
  });
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