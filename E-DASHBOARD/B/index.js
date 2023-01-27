const express=require("express");
const app=express();
// require("../db/config");
require("./db/config")
const User = require("./db/User");
const cors=require("cors");
const Product = require('./db/Product'); 


app.use(express.json())
app.use(cors());

// ------------------SIGNUP-----------------------
app.post("/signup",async(req,res)=>{
  try{
    const newUser= new User(req.body);
    const savedUser = await newUser.save();
    const result = savedUser.toObject();
    delete result.password;
     res.status(201).send(result)
    //  console.log(result);
  }catch(err){
   res.status(401).send("wrong credentials");
  }
});

// ------------------LOGIN-----------------------
app.post("/login", async (req,res)=>{
  try {
    if(req.body.password && req.body.email){
      const user = await User.findOne(req.body).select("-password");
      if(user){
        res.status(201).send(user)
      }else{
        res.send("User not found")
      }
    }
  } catch (error) {
    res.status(401).send("invalid credentials");
  }
});

// ------------------Add Product--------------------------
app.post("/add-product", async (req,res)=>{
  try {
       let product = new Product(req.body);
       let result = await product.save();
       res.send(result);
  } catch (error) {
     res.send(error)
  }
});

// ---------------Get All Products-------------------------
app.get("/products", async(req,res)=>{
  try{ 
    let products =await Product.find();
    if(products.length > 0){
      res.send(products)
    }else{
      res.send("Product Not found");
    }
  }catch(err){
    res.send("You are not authenticated");
  }
});

// ----------------Delete Product------------------------------
app.delete("/product/:id",async(req,res)=>{
   let result = await Product.deleteOne({_id:req.params.id});
   res.send(result);
})

// ---------------------Find product By Id to Update the product---------------------------------
app.get("/product/:id" ,async (req,res)=>{
 try{
    let result = await Product.findByIdAndUpdate({_id:req.params.id})
    if(result){
    res.status(201).send(result);
   }else{
    res.send("No Record Found");
   }
 }catch(err){
  res.send(err);
 }
});

// ------------------Update product---------------------------------
app.put("/product/:id" ,async (req,res)=>{
  let result = await Product.findByIdAndUpdate(
    {_id:req.params.id},
    {
       $set: req.body
    }
  )
  res.send(result);
});


// ----------------Search Result-----------------------------
app.get("/search/:key", async(req,res) =>{
  let result =await Product.find({
    "$or" :[
      {name: {$regex : req.params.key}},
      {company: {$regex : req.params.key}},
      {category: {$regex : req.params.key}},
      {price: {$regex : req.params.key}},
    ]
  });
  res.send(result);
});










app.listen(5000);