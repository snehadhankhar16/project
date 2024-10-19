 const { ObjectId } = require("mongodb")
var Connection=require("./Connection")
 var express=require("express")
 var cors=require("cors")
 var app=express()
 app.use(express.json())//permission for allowing external json data type
 app.use(cors())
 app.post("/Insert",async function(req,res)
{

   var result= await Connection()
   var data=await result.insertOne(req.body)
   res.send(data);
    
})
app.get("/Fetch", async function(req,res)
{
    var result=await Connection()
    var data=await result.find().toArray()
    res.send(data);
    
})
app.delete("/delete", async function(req,res)
{
    var result=await Connection()
    var data=await result.deleteOne({_id:new ObjectId(req.body.id)})
    res.send(data);
    
})
app.delete("/DeleteAll",async function(req,resp)
{   
    var result=await Connection()
    var data= await result.deleteMany({})
    resp.send(data)
})
app.put("/update", async function(req,res)
{
    var result=await Connection()
    var data= await result.updateOne({_id:new ObjectId(req.body.id)},{$set:req.body.data})
    res.send(data)
   // var result=await Connection()
   // var data=await result.updateOne({_id:new ObjectId("66d02fe379f3bde8cd37db87")},{$set:{Name:"Pooja Rohilla"}})
   // res.send(data);
    
})
app.delete("/Del",async function(req,res)
{
    var result=await Connection()
    var array=["66d03da953ad5ac57aed91ef","66d0614c12d8b47e7b565191"]
    varUpdatedArray=array.map(function(item)
{
    return new ObjectId(item)
})
 const data=await result.deleteMany({_id:{$in:UpdatedArray}});
 res.send(data);
})

 app.listen(3010)