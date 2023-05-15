/* eslint-disable array-callback-return */
/* eslint-disable prefer-template */
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
import Projects from './pages/ProjectsPage';
import ProjectSearch from './pages/ProductSearch';


// ----------------------------------------------------------------------

export default function Router() {


  const paths = [
    
    { path: 'dashboard', element: <DashboardAppPage access={0}/> },
    { path: 'user', element: <UserPage  access={0} /> },
    { path: 'organismes', element: <ProductsPage access={0}/> },
    { path: 'blog', element: <BlogPage access={0}/> },
    { path: 'projects', element: <Projects access={0} /> },
  ]

  const pathConfig = []

  // eslint-disable-next-line consistent-return
  respo().map((e1,n)=>{
    // eslint-disable-next-line no-var
    var item = paths.filter((e)=> e.path === e1.reccord)
    if (n === 0) {
      const path = '/' + item[0].path
      pathConfig.push({  element: <Navigate to={path} />, index: true })
      pathConfig.push(item[0])
    }else if (item[0]){
 
      if (item[0].path ===  'dashboard') {
        item[0].element = <DashboardAppPage access={e1.access}/>
      }else if (item[0].path ===  'user' ){
        item[0].element = <UserPage  access={e1.access}/>
      }else if (item[0].path ===  'organismes' ){
        item[0].element = <ProductsPage  access={e1.access}/>
      }else if (item[0].path ===  'blog' ){
        item[0].element = <BlogPage  access={e1.access}/>
      }else if (item[0].path ===  'projects' ){
        item[0].element = <Projects  access={e1.access}/>
        pathConfig.push({path: 'projects/search', element: <ProjectSearch access={e1.access} />})
      }
      pathConfig.push(item[0])


  
    }

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