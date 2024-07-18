import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import MyContext from "../MyContext";
import axios from "axios";

const useLogin = () => {
  const { setIsLoggedIn, setUser } = useContext(MyContext);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (email, password) => {
    try {
      setLoading(true);

      const {
        data: { data },
      } = await axios.post("https://credence-server-x3h2.onrender.com/api/v1/users/login", {
        email: email,
        password: password,
      });

      localStorage.setItem("user", JSON.stringify(data));
      setIsLoggedIn(true);
      setUser(data);
      setLoading(false);
      navigate("/home");
    } catch (error) {
      console.error(error);
      setLoading(false);
      setError(error.message);
    }
  };

  const handleLogout = () => {
    console.log("logging out...");
    setIsLoggedIn(false);
    setUser({});
    localStorage.clear();
    navigate("/login");
  }

  return { error, loading, handleLogin, handleLogout };
};

export default useLogin;
