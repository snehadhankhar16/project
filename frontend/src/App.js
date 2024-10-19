import React, { useEffect, useState } from 'react'

const App = () => {
  const[Arr,SetArr]=useState([])
  const[Obj,SetObj]=useState({})
  useEffect(function()
{
  show()
},[])
  async function show()
  {
   var result= await fetch("http://localhost:3010/Fetch")
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
     var result=await fetch("http://localhost:3010/Insert",{
      method:"post",
      body:JSON.stringify(Obj),
      headers:{
        "Content-Type":"application/json"
      }
     })
     if(result.status==200)
     {
      var data=await result.json()
      console.log(data);
      alert("Inserted sucessfully")
      show()
     }
     else
     {
      alert("error occured")
     }
   }
   else
   {
    alert("Field empty")
   }
  }
  return (
    <div className='container'>
    <h1 className='text-center'>Registration form</h1>
    <div className='container'></div>
    
    <button className='btn btn-success' onClick={show}>Show</button>
    <div className='container'>
      <form>
          <label>Name</label>
          <input type='text' className='form-control' onChange={set} placeholder='Enter your Name' name='Name'></input>
          <label>Phone</label>
          <input type='text' className='form-control'  onChange={set} placeholder='Enter your Phone' name='Phone'></input>
          <label>City</label>
          <input type='text' className='form-control'  onChange={set} placeholder='Enter your City' name='City'></input>
          <button className='btn btn-primary' onClick={Save}>Save</button>
      </form>
      
    </div>

    <div className='container'>
    <table className='table table-bordered table-hover table-striped'>
    <thead>
      <tr>
        <th>Sr.no</th>
        <th>Name</th>
        <th>Id</th>
        <th>City</th>
      </tr>
    </thead>
    <tbody>
     {
      Arr.map(function(obj,index)
      {
        return(
          <tr>
            <td>{index+1}</td>
            <td>{obj.Name}</td>
            <td>{obj._id}</td>
            <td>{obj.City}</td>
          </tr>
        )
      }
      )
     }
    </tbody>
    </table>
    </div>
    </div>
  )
}

export default App