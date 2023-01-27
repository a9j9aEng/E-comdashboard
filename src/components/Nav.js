import React, { useState } from "react";
import "../App.css";
import {useNavigate,NavLink} from "react-router-dom";



const Nav = ()=>{
  const [isMobile,setIsMobile]=useState(false)
  const auth=localStorage.getItem("user");
  const navigate=useNavigate();
  const logout=()=>{
    localStorage.clear();
    navigate("/signup");
   
  }
    return(
        <div className="Navbar">
          <img  alt ="logo"  className="logo"
            src="https://www.tckpublishing.com/wp-content/uploads/2017/08/ecommerce-shopping-cart.png"/>
          
          {auth ? <ul className={isMobile ? " nav-link-mobile" : "nav-link"}
            onClick={()=>setIsMobile(false)}>
              <li><NavLink to="/" className="Product">Products</NavLink></li>
              <li><NavLink to="/add" className="Add-Product">Add Product</NavLink></li>
              {/* <li><NavLink to="/update" className="up-Product">Update Product</NavLink></li> */}
              <li><NavLink to="/profile" className="profile">Profile</NavLink></li>
              <li><NavLink onClick={logout} to="/signup" className="logout">Logout ({JSON.parse(auth).name})</NavLink></li>
           </ul>
               : 
              <ul className= {isMobile ? "signup login":"nav-link"}
              >
                <li><NavLink to="/signup" className="signup">SignUP</NavLink></li>
                <li><NavLink to="/login" className="login">Login</NavLink></li>
              </ul>
            }
           
            <button className="mobile-menu-icon"
            onClick={()=>setIsMobile(!isMobile)}>
              {
              isMobile ? (
              <i className="fa fa-times" aria-hidden="true"></i>
              ): (<i className="fa fa-bars" aria-hidden="true"></i>
              )
            }
            </button>
            
          </div>
    )
}
export default Nav;