import React, { useState } from "react";

const AddProduct = () =>{
    const[name,setName]=useState("");
    const[price,setPrice]=useState("");
    const[category,setCategory]=useState("");
    const[company,setCompany]=useState("");
    const[error,setError]=useState(false);

   
    const addProduct = async()=>{
        if(!name || !price || !category || !company){
            setError(true);
            return false;
        }
    
    //  console.log(name,price,category,company);
     const userId = JSON.parse(localStorage.getItem("user"))._id;
     let result = await fetch("http://localhost:5000/add-product" ,{
        method:"post",
        body:JSON.stringify({name,price,category,company,userId}),
        headers:{
            'Content-type':'Application/json'
        }
     });
     result = await result.json();
     //  console.log(result);
     setName("");
     setPrice("");
     setCategory("");
     setCompany("");
    }
    
    return(
        <div className="add-product">
            <h1>Add Product</h1>
            <input type="text" placeholder="Enter Product name" className="inputBox"
            value={name} onChange={(e)=>{setName(e.target.value)}}/>
            {error && !name && <span typeof="text" className="invalid-input">Enter Valid Name</span>}

            <input type="text" placeholder="Enter Product price" className="inputBox"
            value={price} onChange={(e)=>{setPrice(e.target.value)}}></input>
            {error && !price && <span typeof="text" className="invalid-input">Enter price</span>}

            <input type="text" placeholder="Enter Product category" className="inputBox"
            value={category} onChange={(e)=>{setCategory(e.target.value)}}></input>
            {error && !category && <span typeof="text" className="invalid-input">Please Enter category</span>}

            <input type="text" placeholder="Enter Product company" className="inputBox"
             value={company} onChange={(e)=>{setCompany(e.target.value)}}></input>
            {error && !company && <span typeof="text" className="invalid-input">Please Enter company</span>}

            <button type="button" className="btnBox" onClick={addProduct}>Add Product</button>
        </div>
    )
}

export default AddProduct;