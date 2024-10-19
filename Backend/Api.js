var express=require('express')
var app=express()

app.get("/Show",function(req,res)
{
 res.write("Hlo world");
 res.end()
})
app.post("/Save",function(req,res)
{
 res.write("i am in post api");
 res.end()
})
app.delete("/delete",function(req,res)
{
 res.write("i am in delete api");
 res.end()
})
app.put("/update",function(req,res)
{
 res.write("i am in put api");
 res.end()
})
app.listen(3010)