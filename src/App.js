import React from "react";
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Footer from "./components/Footer";
import Nav from './components/Nav';
import Signup from "./components/Signup";
import PrivateComponent from "./components/PrivateComponent";
import Login from "./components/Login";
import AddProduct from "./components/AddProduct";
import ProductList from "./components/ProductList"
import UpdateProduct from "./components/UpdateProduct";
function App() {
  return (
    <div>
      <Router>
       <Nav/>
       <Routes>
        <Route element={<PrivateComponent/>}>
         <Route path="/" element={<ProductList/>}></Route>
         <Route path="/add" element={<AddProduct/>}></Route>
         <Route path="/update/:id" element={<UpdateProduct/>}></Route>
         <Route path="/logout" element={<h1>logout</h1>}></Route>
         <Route path="/profile" element={<h1>profile</h1>}></Route>
         </Route>

         <Route path="/signup" element={<Signup/>}></Route>
         <Route path="/login" element={<Login/>}></Route>
       </Routes>
       <Footer/>
      </Router>
     
    </div>
  );
}

export default App;
