import { useNavigate } from "react-router-dom";
import "../styles/pages.scss";

const Logout = ({ setIsAuthenticated }) => {
    const navigate = useNavigate();

    const handleLogout = () => {
        setIsAuthenticated(false);
        localStorage.removeItem("user"); 
        navigate("/register");
      };
    
      return (
        <div className = "logout">
            <p>Точно хочеш вийти?</p>
            <button onClick = {handleLogout}>Вийти</button>
        </div>
      );
};

export default Logout;