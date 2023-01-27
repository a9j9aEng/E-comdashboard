import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const ProductList = () =>{
    const[products,setProducts] =useState([]);

    useEffect(()=>{
        getProducts()
    },[]);

    const getProducts = async() =>{
        let result = await fetch("http://localhost:5000/products");
        result = await result.json();
        setProducts(result);
    }
 

    const deleteProduct =async (id) =>{
        let result =await fetch(`http://localhost:5000/product/${id}`,{
            method:"Delete",
         });
        result = await result.json(); 
        if(result){
            getProducts();
        }
       };

    const searchHandler = async (e) =>{
        // console.log(e.target.value);
        let key = e.target.value;
        if(key){
            let result = await fetch(`http://localhost:5000/search/${key}`);
            result = await result.json()
            if(result){
              setProducts(result);
            }
        }else{
            getProducts();
        }
       }

    return(
        <div className="product-list">
        <h1>ProductList</h1>
        <input type="text" placeholder="Search Products....."
         className="search-box" onChange={searchHandler}></input>
        <ul className="list">
            <li>S. No</li>
            <li>Name</li>
            <li>Price</li>
            <li>Category</li>
            <li>Company</li>
            <li>Operation</li>
        </ul>
        {
            products.length>0 ? products.map((item,index)=>(
                <ul key={item._id}>
                    <li>{index+1}</li>
                    <li>{item.name}</li>
                    <li><span>₹</span>{item.price}</li>
                    <li>{item.category}</li>
                    <li>{item.company}</li>
                    <li  className="delete-Button">
                        <button  onClick={()=>deleteProduct(item._id)}>
                           <i className="fa-solid fa-trash"></i>
                        </button>
                        <button className="update-button">
                          <Link to={`/update/${item._id}`}>
                             <i className="fa-regular fa-pen-to-square"></i>
                          </Link>
                        </button>
                    </li> 
                </ul>
            )):
            <h1 className="text">No Result Found</h1>
        }
        </div>
    )
}

export default ProductList;