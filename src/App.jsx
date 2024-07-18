import { useEffect } from 'react';
import { Routes, Route, useNavigate, Navigate } from "react-router-dom";
import './App.css';

import Login from './screens/Login';
import HomeScreen from './screens/HomeScreen';
import UserProfile from './screens/UserProfile';
import UserSettings from './screens/UserSettings';
import Certificate from './screens/Certificate';
import CertificateAdmin from './screens/CertificateAdmin';
import OrgScreen from './screens/OrgScreen';

function App() {
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem("user") && !location.pathname.startsWith('/certificate/') && !location.pathname.startsWith('/user/')) {
      navigate("/login");
    }
  }, [navigate]);

  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/home" element={<HomeScreen />} />

      <Route path="/user/:userId" element={<UserProfile />} />

      <Route path="/user-settings" element={<UserSettings />} />

      <Route path="/certificate/:certId" element={<Certificate />} />
      <Route path="/certificate-admin/:certId" element={<CertificateAdmin />} />

      <Route path="/org/:orgId" element={<OrgScreen />} />

      <Route path="/" element={<Navigate to="/login" />} />
    </Routes>
  )
}

export default App
