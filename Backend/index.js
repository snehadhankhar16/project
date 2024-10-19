
var Connection=require("./Connection")
 var {ObjectId}=require("mongodb")
async function insert()
{
 var collect=await Connection()
 var data=await collect.insertOne({Name:"Dhankhar","Phone":31287,"Adress":"DELHI"})
 console.log(data);
}
async function show()
{
    var collect=await Connection()
    var data=await collect.find().toArray()
    console.log(data);
}
async function Delete()
{
    var collect=await Connection()
   // var result=await collect.deleteOne({"Name":"Dhankhar"})
   var result=await collect.deleteOne({_id:new ObjectId("66cf4c7365bd98422541290a")})
    console.log(result);
}
async function update() 
{
    var collect=await Connection()
    var result=await collect.updateOne({_id:new ObjectId("66c61568fe0eebd9e876350f")},{$set:{"Name":"deepanshu","Phone":8799898787987}})
    console.log(result);
}

update()