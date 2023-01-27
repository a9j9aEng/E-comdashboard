import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Signup= () =>{
    const [name,setName] = useState("");
    const [password,setPassword]=useState("");
    const [email,setEmail]=useState("");
    const navigate =useNavigate()

    useEffect(()=>{
        const auth=localStorage.getItem("user");
        if(auth){
            navigate("/")
        }
    })

    const handleData = async()=>{
        try {
               // console.log(name,email,password);
            const result = await fetch("http://localhost:5000/signup",{
            method:"post",
            body:JSON.stringify({name,email,password}),
            headers:{
                "content-Type":"application/json"
               },
           });
           const data=await result.json()
           console.log(data);
            if(data){
            navigate("/");
            localStorage.setItem("user",JSON.stringify(data));
               } 
        } catch (error) {
             console.log("Can't fetch data");
        }
    }
    
    return(
        <div className="SignUp">
            <h1 >Register</h1>
            <input className="inputBox" type="text"
             value={name} onChange={(e)=>setName(e.target.value)} placeholder="Enter Name"></input>

            <input className="inputBox" type="email" 
            value={email} onChange={(e)=>setEmail(e.target.value)} placeholder="Enter Email"></input>

            <input className="inputBox" type="password"
            value={password} onChange={(e)=>setPassword(e.target.value)} placeholder="Enter Password"></input>
            <button className="btnBox" type="button" onClick={handleData}>SignUp</button>
        </div>
    )
}
export default Signup;