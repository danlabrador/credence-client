import { useState } from "react";
import MyContext from "./MyContext";

const MyProvider = (props) => {
  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem("user") ? true : false
  );
  const [user, setUser] = useState(
    localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : {}
  );
  const [isAdmin, setIsAdmin] = useState(false);
  const [orgID, setOrgID] = useState(`01J1YYTREJWYS6AMSK511AG3ZS`);

  const state = {
    isLoggedIn, setIsLoggedIn,
    user, setUser,
    isAdmin, setIsAdmin,
    orgID, setOrgID
  };

  return (
    <MyContext.Provider value={state}>{props.children}</MyContext.Provider>
  );
};

export default MyProvider;
