/* eslint-disable no-unused-expressions */
/* eslint-disable array-callback-return */
/* eslint-disable prefer-template */
import React from 'react';
import { Navigate, useRoutes } from 'react-router-dom';
// layouts
import DashboardLayout from './layouts/dashboard';
import SimpleLayout from './layouts/simple';
import Guestlayout from './layouts/Guest/guest';
//
import UserPage from './pages/UserPage';
import LoginPage from './pages/LoginPage';
import Page404 from './pages/Page404';
import ProductsPage from './pages/ProductsPage';
import DashboardAppPage from './pages/DashboardAppPage';
import ProjectSearch from './pages/ProductSearch';
import PhasesPage from './pages/PhasesPage';
import LabTabs from './pages/ProjectsPage';
import RolesPage from './pages/Roles';



// ----------------------------------------------------------------------

export default function Router() {


  const paths = [
    
    { path: 'dashboard', element: <DashboardAppPage /> },
    { path: 'employees', element: <UserPage   /> },
    { path: 'organismes', element: <ProductsPage /> },
    { path: 'projects', element: <LabTabs  /> },
    { path: 'projects/search', element: <ProjectSearch  /> },
    { path: 'roles', element: <RolesPage  /> },
    
  ]


  






  const routes = useRoutes([
    {
      path: '/',
      element: <DashboardLayout />,
      children: paths
    },
    {
      path: '/',
      element: <Guestlayout />,
      children: [
        {
          path: 'login',
          element: <LoginPage />,
        }
      ],
    },
    {
      element: <SimpleLayout />,
      children: [
        { element: <Navigate to="/dashboard" />, index: true },
        { path: '404', element: <Page404 /> },
        { path: '*', element: <Navigate to="/404" /> },
      ],
    },
    {
      path: '*',
      element: <Navigate to="/404" replace />,
    },
  ]);


  return routes;
}

/*  // eslint-disable-next-line vars-on-top
       var tk = AES.decrypt(session.st) 
       var userName = AES.decrypt(session.user.name) 
       var userEmail = AES.decrypt(session.user.email) 
       var userId = AES.decrypt(session.user.id) 
       var rl = AES.decrypt(session.user.role) 





       tokenLocal = tk.toString(enc.Utf8)

       var userCrypte ={name:userName.toString(enc.Utf8),email:userEmail.toString(enc.Utf8),id:userId.toString(enc.Utf8),role:rl.toString(enc.Utf8)}

       us = userCrypte */