import React, { useState ,useEffect} from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";

const UpdateProduct = () =>{
    const[name,setName]=useState("");
    const[price,setPrice]=useState("");
    const[category,setCategory]=useState("");
    const[company,setCompany]=useState("");
    const params= useParams('');
    const Navigate = useNavigate();

    useEffect(()=>{
       getProductDetails();
    },[]);

    const getProductDetails = async () =>{
        // console.log(params);
        let result= await fetch(`http://localhost:5000/product/${params.id}`);
        result = await result.json()
        // console.log(result);
        setName(result.name);
        setPrice(result.price);
        setCategory(result.category);
        setCompany(result.company);
    }

   const updateProduct = async() =>{
    // console.log(name,price,category,company)
    let result = await fetch(`http://localhost:5000/product/${params.id}`,{
        method:'put',
        body:JSON.stringify({name,price,category,company}),
        headers:{
            'Content-Type':"application/json"
        },
       });
       result = await result.json()
       console.log(result)
       Navigate('/')
   }
       
    
   
return(
        <div className="add-product">
            <h1>Update Product</h1>
            <input type="text" placeholder="Enter Product name" className="inputBox"
            value={name} onChange={(e)=>{setName(e.target.value)}}/>


            <input type="text" placeholder="Enter Product price" className="inputBox"
            value={price} onChange={(e)=>{setPrice(e.target.value)}}></input>


            <input type="text" placeholder="Enter Product category" className="inputBox"
            value={category} onChange={(e)=>{setCategory(e.target.value)}}></input>


            <input type="text" placeholder="Enter Product company" className="inputBox"
             value={company} onChange={(e)=>{setCompany(e.target.value)}}></input>


            <button type="button" className="btnBox" onClick={updateProduct}>Update Product</button>
        </div>
    )
}

export default UpdateProduct;