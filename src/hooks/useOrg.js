import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import MyContext from "../MyContext";

import useCertificate from "./useCertificate";

const useOrg = () => {
  const { user } = useContext(MyContext);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleGetOrgCertificates = async (orgId) => {
    try {
      setLoading(true);

      const response = await axios.get(`https://credence-server-x3h2.onrender.com/api/v1/certificates/organization/${orgId}`);
      console.log(response.data.certificates);

      return response.data.certificates;
    } catch (error) {
      alert(error);
      console.error(error);
      setError(error.response ? error.response.data.message : error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleGetOrgMembers = async (orgId) => {
    try {
      setLoading(true);

      const response = await axios.get(`https://credence-server-x3h2.onrender.com/api/v1/organizations/${orgId}/members`);

      return response.data.members;
    } catch (error) {
      alert(error);
      console.error(error);
      setError(error.response ? error.response.data.message : error.message);
    } finally {
      setLoading(false);
    }
  }


  return {
    error,
    handleGetOrgCertificates,
    handleGetOrgMembers
  };
}

export default useOrg;