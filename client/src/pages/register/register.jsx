import React,{useState,useContext} from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import "./register.css";


const Register =()=>{
    const[userInfo,setUserInfo] =useState({
        username:"",
        email:"",
        country:"",
        img:"",
        city:"",
        phone:"",
        password:"",
    });

    const {loading ,error,dispatch}=useContext(AuthContext);
    const navigate =useNavigate();

    const handleChange =(e)=>{
        setUserInfo((prev)=>({ ...prev,[e.target.id]: e.target.value}));
    };

    const handleClick =async(e)=>{
        e.preventDefault();
        dispatch({ type:"REGISTER_START"});
        try{
            const res = await axios.post("/auth/register",{
                username: userInfo.username,
                email : userInfo.email,
                country:userInfo.country,
                img:userInfo.img,
                city:userInfo.city,
                phone:userInfo.phone,
                password:userInfo.password
            });
            dispatch({type :'REGISTER_SUCCESS', payload:res.data.details })  ;
            navigate('/login');

        }catch(err){
            dispatch({type:"REGISTER_FAILURE" ,payload: err.response.data});
        }


    }


return(
    <div  className="register">
        
        <div className="rContainer">
        <div>
            <h1 >Register Here</h1>
        </div>
            <label>UserName:</label>
            <input type="text" id='username' onChange={handleChange} className="rInput" placeholder='Username' value={userInfo.username} /><br />
            <label>Password:</label>
            <input type="password" id="password" onChange={handleChange} className="rInput" placeholder="Password" value={userInfo.password}/><br/>
            <label>Email :</label>
            <input type="email" id="email" onChange={handleChange} className="rInput"  placeholder="Email Address" value={userInfo.email} /><br/>
            <label>Country:</label>
            <select id="country" name="country" className="rInput" required onChange={handleChange}>
            <option value="">Select Country</option>
            <option value="India">India</option>
            </select><br/>
            <label>City:</label>
            <select id="city" name="city" className="rInput" required onChange={handleChange}>
                <option value="">Select City</option>
                <option value="Mumbai">Mumbai</option>
                <option value="Pune">Pune</option>
                <option value="Thane">Thane</option>
            </select><br/>
            <label>Phone:</label>
            <input type="tel" id="phone" placeholder="Phone Number" className="rInput" onChange={handleChange} name="phone" required /><br/>

            <button disabled={loading} onClick={handleClick} className="rButton" type="submit">Register</button><br/>

            {error && <span>{error.message}</span>}
            <p className="rtext">Already a User ?</p> <button className="rlogin" onClick ={()=>navigate("/login")}>Login Here!</button>
             
        </div>
    </div>
);
};
export default Register;