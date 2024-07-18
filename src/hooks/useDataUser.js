import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import MyContext from "../MyContext";

import useCertificate from "./useCertificate";

const useDataUser = () => {
  const { user } = useContext(MyContext);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { handleGetCertificate } = useCertificate();
  const navigate = useNavigate();

  const handleGetUserData = async (userId) => {
    try {
      setLoading(true);
      const { data: { data } } = await axios.get(`https://credence-server-x3h2.onrender.com/api/v1/users/${userId}`, {});
      setLoading(false);
      return data;
    } catch {
      setError(error.response.data.message);
    }
  }

  const handleUpdateUserData = async (dataToSend, userId) => {
    try {
      setLoading(true);

      console.log(dataToSend);
      const editData = await axios.patch(`https://credence-server-x3h2.onrender.com/api/v1/users/${userId}`, dataToSend);

      alert("User data updated!");
      setLoading(false);
      navigate("/home");
    } catch (error) {
      console.error(error);
      setError(error.response.data.message);
    }
  }

  const handleGetUserCertifications = async (userId) => {
    try {
      setLoading(true);
      const response = await axios.get(`https://credence-server-x3h2.onrender.com/api/v1/certifications/users/${userId}`);
      const certifications = response.data.data;
      return certifications;
    } catch (error) {
      setError(error.response ? error.response.data.message : error.message);
      return [];
    } finally {
      setLoading(false);
    }
  };

  const handleGetUserCertification = async (userId, certId) => {
    try {
      setLoading(true);
      const certificates = await handleGetUserCertifications(userId);
      const targetCert = certificates.find(cert => cert._id === certId);
      return targetCert;
    } catch (error) {
      setError(error.response ? error.response.data.message : error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleGetCertification = async (certId) => {
    try {
      setLoading(true);
      const response = await axios.get(`https://credence-server-x3h2.onrender.com/api/v1/certifications/${certId}`);
      console.log(response.data);
      return response.data;
    } catch (error) {
      setError(error.response ? error.response.data.message : error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleGetUserIdFromEmail = async (email) => {
    try {
      setLoading(true);

      const getID = await axios.get(`https://credence-server-x3h2.onrender.com/api/v1/users/email/${email}`, {});
      console.log(getID.data.userId);

      return getID.data.userId;
    } catch (error) {
      console.error(error);
      setError(error.response.data.message);
    } finally {
      setLoading(false);
    }
  }

  const handleAwardCertificate = async (dataToSend) => {
    try {
      setLoading(true);

      const userId = await handleGetUserIdFromEmail(dataToSend.email);
      const { email, ...rest } = dataToSend;
      const submissionData = { ...rest, userId };

      console.log(submissionData);
      await axios.post(`https://credence-server-x3h2.onrender.com/api/v1/certifications/award`, submissionData);

      alert("Certificate awarded!");
      navigate("/org/01J1YYTREJWYS6AMSK511AG3ZS");
    } catch (error) {
      alert(`Certificate awarding failed: ${error.message}`);
      console.error(error);
      setError(error.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  const handleAddUserToOrg = async (email, orgId) => {
    try {
      setLoading(true);

      const userId = await handleGetUserIdFromEmail(email);
      await axios.post(`https://credence-server-x3h2.onrender.com/api/v1/organizations/${orgId}/assign-member`, { userId });

      alert("Assigned a new member!");
      navigate("/org/01J1YYTREJWYS6AMSK511AG3ZS");
    } catch (error) {
      alert(`Assigning failed: ${error.message}`);
      console.error(error);
      setError(error.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  return {
    error,
    handleGetUserData,
    handleUpdateUserData,
    handleGetUserCertifications,
    handleGetUserCertification,
    handleGetCertification,
    handleGetUserIdFromEmail,
    handleAwardCertificate,
    handleAddUserToOrg
  };
}

export default useDataUser;