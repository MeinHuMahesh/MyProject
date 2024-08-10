import "./navbar.css";
import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";


const Navbar = () => {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const handleLogin=()=>{
    navigate('/login');
  }
  const handleRegister=()=>{
    navigate("/register");
  }

  return (
    <div className="navbar">
      <div className="navContainer">
        <Link to="/" style={{ color: "inherit", textDecoration: "none" }}>
          <span className="logo">booking</span>
        </Link>
        {user ? user.username : (
          <div className="navItems">
            <button className="navButton" onClick={handleRegister}>Register</button>
            <button className="navButton" onClick={handleLogin} >Login</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
