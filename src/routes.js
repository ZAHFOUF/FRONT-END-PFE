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
import BlogPage from './pages/BlogPage';
import UserPage from './pages/UserPage';
import LoginPage from './pages/LoginPage';
import Page404 from './pages/Page404';
import ProductsPage from './pages/ProductsPage';
import DashboardAppPage from './pages/DashboardAppPage';
import { respo } from './_mock/user';
import ProjectSearch from './pages/ProductSearch';
import PhasesPage from './pages/PhasesPage';
import LabTabs from './pages/ProjectsPage';



// ----------------------------------------------------------------------

export default function Router() {


  const paths = [
    
    { path: 'dashboard', element: <DashboardAppPage /> },
    { path: 'employees', element: <UserPage   /> },
    { path: 'organismes', element: <ProductsPage /> },
    { path: 'blog', element: <BlogPage /> },
    { path: 'projects', element: <LabTabs  /> },

    { path: 'phases', element: <PhasesPage /> },
  ]

  const pathConfig = []

  // eslint-disable-next-line consistent-return
  respo().map((e1,n)=>{
    // eslint-disable-next-line no-var
    var item = paths.filter((e)=> e.path === e1.reccord)
    if (n === 0) {
      const path = '/' + item[0].path
      pathConfig.push({  element: <Navigate to={path}  />,  index: true })
      const updatedElement = React.cloneElement(item[0].element, { access: e1.access });
      item[0].element = updatedElement;
      item[0].path === 'projects' ? pathConfig.push({path: 'projects/search', element: <ProjectSearch access={e1.access} />}) : null
      pathConfig.push(item[0])
    }else  if (item[0]) {
      const updatedElement = React.cloneElement(item[0].element, { access: e1.access });
      item[0].element = updatedElement;
      item[0].path === 'projects' ? pathConfig.push({path: 'projects/search', element: <ProjectSearch access={e1.access} />}) : null
  
      // Add the updated item to pathConfig
      pathConfig.push(item[0]);
    }

    console.log(pathConfig);
    
    

   

    return 0

  
  
  
  
  })

  






  const routes = useRoutes([
    {
      path: '/',
      element: <DashboardLayout />,
      children: pathConfig
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

  console.log(routes);

  return routes;
}

/*  // eslint-disable-next-line vars-on-top
       console.log("ok");
       var tk = AES.decrypt(session.st) 
       var userName = AES.decrypt(session.user.name) 
       var userEmail = AES.decrypt(session.user.email) 
       var userId = AES.decrypt(session.user.id) 
       var rl = AES.decrypt(session.user.role) 





       tokenLocal = tk.toString(enc.Utf8)

       var userCrypte ={name:userName.toString(enc.Utf8),email:userEmail.toString(enc.Utf8),id:userId.toString(enc.Utf8),role:rl.toString(enc.Utf8)}

       us = userCrypte */