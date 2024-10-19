const { MongoClient } = require('mongodb');
//const url = 'mongodb://localhost:27017';
const url="mongodb://127.0.0.1:27017";
const client = new MongoClient(url);

async function Connection()
{
  var result=await client.connect()
   var collect=result.db("Flipkart")
   return collect.collection("Employees")

}
 module.exports=Connection