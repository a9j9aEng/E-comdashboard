import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../App.css"

const Login = () =>{
    const [email,setEmail]=useState("");
    const [password,setPassword] = useState("");
    const navigate = useNavigate();
    useEffect(()=>{
       const auth = localStorage.getItem("user")
       if(auth){
        navigate("/")
       }
    },[])
   const handleLogin = async () =>{
    // console.log(email,password);
    try{
      let result = await fetch("http://localhost:5000/login",{
        method:'post',
        body:JSON.stringify({email,password}),
        headers:{
           'Content-Type':'application/json'
        }
      });
      result = await  result.json();
      console.log(result);
      if(result.name){
        localStorage.setItem("user",JSON.stringify(result));
        navigate("/");
      }else{
        alert("Please Enter correct details");
      }
    }
    catch(err){
       alert("You are not authenticated");
    }
   }
    return(
        <div className="LoginPage">
            <h1>Login</h1>
            <input className="inputBox" type="email"
            value={email} onChange={(e)=>setEmail(e.target.value)} placeholder="Enter Email"></input>

            <input className="inputBox" type="password" 
            value={password} onChange={(e)=>setPassword(e.target.value)} placeholder="Enter Password"></input>

            <button className="btnBox" onClick={handleLogin} type="button">Login</button>
        </div>
    )
}

export default Login;