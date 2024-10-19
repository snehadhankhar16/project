import React, { useEffect, useRef, useState } from 'react'

const App = () => {
  const[Arr,SetArr]=useState([])
  const[Obj,SetObj]=useState({})
  const[Key,SetKey]=useState("")
 var name= useRef()
 var phone=useRef()
 var city=useRef()
  useEffect(function()
  {
   Show()
  },[])
  async function Show()
  {
   var result=await fetch("http://localhost:3010/Fetch")
   var data=await result.json()
   SetArr(data); 
  } 
  function set(event)
  {
    SetObj({...Obj,[event.target.name]:event.target.value})
  }
async function Save(e)
 {
  e.preventDefault()
  if(Obj.Name && Obj.Phone && Obj.City)
  {
   var result= await fetch("http://localhost:3010/Insert",{
    method:"post",
    body:JSON.stringify(Obj),
    headers:{
      "Content-Type":"application/json"
    }
   })
   if(result.status==200)
   {
   var data= await result.json()
    console.log(data);
    alert("Inserted Successfully")
    Show()
    
   }
   else
   {
    alert("Error Occured")
   }
   
  }
  else
  {
    alert("Field is Empty")
  }

 }
 async function Delete(e)
  {
    e.preventDefault()
  var result= await fetch("http://localhost:3010/DeleteAll",{
    method:"delete",
    headers:{
      "Content-Type":"application/json"
    }
  })
  if(result.status==200)
  {
   var data= await result.json()
   console.log(data);
   alert("Deleted Successfully")
   Show()
  } 
  else
  {
    alert("Error Occured")
  }
  }
 async function Del(id)
  {
   var result=await fetch("http://localhost:3010/Delete",{
      method:"delete",
      body:JSON.stringify({"id":id}),
      headers:{
        "Content-Type":"application/json"
      }
    })
    if(result.status==200)
    {
     var data=await result.json()
     console.log(data);
     alert("Deleted Successfully")
     Show()
    }
    else
    {
      alert("Error Occured")
    }
    
  }
  function Edit(id)
  {
    SetKey(id)
   var result= Arr.filter(function(obj)
  {
    return (obj._id==id)
  })
  name.current.value=result[0].Name
  phone.current.value=result[0].Phone
  city.current.value=result[0].City
    
  }
 async function Update(e)
  {
    e.preventDefault()
   var Name= name.current.value
   var Phone= phone.current.value
   var City= city.current.value

   var obj={
    "Name":Name,
    "Phone":Phone,
    "City":City
   }

   var object={
    "id":Key,
    "data":obj
   }
  
   
  var result= await fetch("http://localhost:3010/update",{
    method:"put",
    body:JSON.stringify(object),
    headers:{
      "Content-Type":"application/json"
    }
   })
   if(result.status==200)
   {
      var data=  await result.json()
      console.log(data);
      alert("Updated Successfully")
      Show()
   }
    else
    {
      alert("Error Occured")
    }   
    
  }
 return (
    <div className='container'>
      <h1 className="text-center text-white">Registration Form</h1>
      <div className="container">
        {/* <button className="btn btn-success" onClick={Show}>Show</button> */}
      <div className="container text-white">
        <form>
          <label>Name:</label>
          <input type="text" ref={name} placeholder='Enter your Name' onChange={set} name='Name' className="form-control" />
          <label>Phone Number:</label>
          <input type="text" ref={phone} placeholder='Enter your Phone Number' onChange={set} name='Phone' className="form-control" />
          <label>City:</label>
          <input type="text" ref={city} placeholder='Enter your City' onChange={set} name='City' className="form-control" />
          <button className='btn btn-primary' onClick={Save}>Save</button>
          <button className='btn btn-danger' onClick={Delete}>Delete</button>
          <button className='btn btn-warning' onClick={Update}>Update</button>
        </form>
      </div>
     <div className="container">
     <table className='table table-bordered table-hover table-striped'>
        <thead>
          <tr>
            <th>S.No</th>
            <th>Name</th>
            <th>Id</th>
            <th>City</th>
            <th>Action</th>
          </tr>
          </thead>
        <tbody>
        {
          Arr.map(function(obj,index)
        {
          return(
            <tr key={index}>
              <td>{index+1}</td>
              <td>{obj.Name}</td>
              <td>{obj.Phone}</td>
              <td>{obj.City}</td>
              <td><button className='btn btn-danger' onClick={()=>Del(obj._id)}>Delete</button>
              <button className='btn btn-success' onClick={()=>Edit(obj._id)}>Edit</button></td>
            </tr>
          )
        })
        }
        </tbody>
      </table>
     </div>
      </div>
    </div>
  )
}

export default App