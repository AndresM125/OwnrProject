import React from "react";
import AdminContainerOrganism from "../components/Organisms/AdminContainerOrganism";
import { AdminProvider } from "../contexts/admin";
import AuthService from "../auth/authService";
import { Navigate } from 'react-router-dom';

const Admin = () => {

  // TODO: Move into a component
  if (!AuthService.isLoggedIn())
  {
      return (<Navigate to={{ pathname: '/login' }} />);
  }

  return (
    <AdminProvider>
      <AdminContainerOrganism/>
    </AdminProvider>
  )
};

export default Admin