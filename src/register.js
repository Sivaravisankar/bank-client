import axios from 'axios';
import { useContext, useState } from "react";
import { Button } from "react-bootstrap";
import './App.css'
export default function Register(){
    let [name,setName]=useState('');
    let [email,setEmail]=useState('');
    let [pass,setPass]=useState('');
    function handleSubmit(e){
        e.preventDefault()
        console.log(name,email,pass)
        let item=({name:name,email:email,password:pass,amount:1000})
        axios.post('https://bank-server-obsg.onrender.com/create',item)
    }
    return(<>
<h1>REGISTER</h1>
<form onSubmit={handleSubmit}>
<div class="mb-3">
    <label for="exampleInputEmail1" class="form-label">NAME</label>
    <input type="text" onChange={(e)=>{setName(e.target.value)}} class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"></input>
  </div>
  <div class="mb-3">
    <label for="exampleInputEmail1" class="form-label">E-MAIL</label>
    <input type="text" onChange={(e)=>{setEmail(e.target.value)}} class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"></input>
  </div>
  <div class="mb-3">
    <label for="exampleInputPassword1" class="form-label">PASSWORD</label>
    <input type="text" onChange={(e)=>{setPass(e.target.value)}} class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"></input>
  </div>
  
  <Button type="submit" class="btn btn-primary">CREATE ACCOUNT</Button>
</form>
</>)
}
