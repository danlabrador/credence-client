import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import MyContext from "../MyContext";
import axios from "axios";

const useUpdateUser = () => {
  const { setIsLoggedIn, setUser } = useContext(MyContext);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleUserRefresh = async (id) => {
    try {
      setLoading(true);

      const {
        data: { data },
      } = await axios.get(`https://credence-server-x3h2.onrender.com/api/v1/users/${id}`);

      localStorage.setItem("user", JSON.stringify(data));
      setIsLoggedIn(true);
      setUser(data);
      setLoading(false);
      window.location.reload();
    } catch (error) {
      console.error(error);
      setLoading(false);
      setError(error.message);
    }
  };

  return { error, loading, handleUserRefresh };
};

export default useUpdateUser;
