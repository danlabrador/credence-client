import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import MyContext from "../MyContext";
import axios from "axios";

const useCertificate = () => {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { orgID } = useContext(MyContext);

  const navigate = useNavigate();

  const handleGetCertificate = async (certId) => {
    try {
      setLoading(true);
      const { data } = await axios.get(`https://credence-server-x3h2.onrender.com/api/v1/certificates/${certId}`, {});
      setLoading(false);
      return data;
    } catch {
      setError(error.response.data.message);
    }
  }

  const handleCreateCertificate = async (dataToSend) => {
    try {
      setLoading(true);
      await axios.post(`https://credence-server-x3h2.onrender.com/api/v1/certificates/create`, dataToSend);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setError(error.message);
    }
  };

  const handleUpdateCertificate = async (dataInput, certId) => {
    try {
      setLoading(true);
      const editData = await axios.put(`https://credence-server-x3h2.onrender.com/api/v1/certificates/${certId}`, dataInput);
      setLoading(false);
      navigate(`/org/${orgID}`);
    } catch (error) {
      setError(error.response.data.message);
    }
  }

  const handleGetCertifications = async (certId) => {
    try {
      setLoading(true);

      const certifications = await axios.get(`https://credence-server-x3h2.onrender.com/api/v1/certifications/certificate/${certId}`, {});

      return certifications;
    } catch {
      setError(error.response.data.message);
    } finally {
      setLoading(false);
    }
  }

  return {
    error, loading,
    handleCreateCertificate,
    handleGetCertificate,
    handleUpdateCertificate,
    handleGetCertifications
  };
};

export default useCertificate;
