/* eslint-disable no-unused-expressions */
/* eslint-disable prefer-template */
/* eslint-disable prefer-destructuring */
/* eslint-disable prefer-const */
import { useEffect, useState } from 'react';
import { useDispatch  } from 'react-redux'
import { Outlet , useNavigate  } from 'react-router-dom';
import Swal from 'sweetalert2';
import BusinessOutlinedIcon from '@mui/icons-material/BusinessOutlined';



import { AES, enc } from 'crypto-js';

// @mui
import { styled } from '@mui/material/styles';

import { faker } from '@faker-js/faker';

import _, { sample } from 'lodash';

import Iconify from '../../components/iconify';




import { actionsUsers } from '../../store'


import { useContextProvider } from '../../context/contextProvider';

//
import Header from './header';
import Nav from './nav';



import SvgColor from '../../components/svg-color';

import axiosClient from '../../api/axios';




// ----------------------------------------------------------------------












// ----------------------------------------------------------------------

const APP_BAR_MOBILE = 64;
const APP_BAR_DESKTOP = 92;

const StyledRoot = styled('div')({
  display: 'flex',
  minHeight: '100%',
  overflow: 'hidden',
});

const Main = styled('div')(({ theme }) => ({
  flexGrow: 1,
  overflow: 'auto',
  minHeight: '100%',
  paddingTop: APP_BAR_MOBILE + 24,
  paddingBottom: theme.spacing(10),
  [theme.breakpoints.up('lg')]: {
    paddingTop: APP_BAR_DESKTOP + 24,
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
  },
}));

// ----------------------------------------------------------------------

export default function DashboardLayout() {
  const [open, setOpen] = useState(false);
  const {token , permissions , user , _setToken , can } = useContextProvider()
  
  const navigate = useNavigate();
  useEffect(()=>{
    if (    token === 0 ) {
        navigate("/login")
    }

  },[])

  /* ----------------------- config of nav ------------------------------------ */

  const icon = (name) => <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />;


  const [navConfigFilter,setnavConfigFilter] = useState([ {
    title: 'dashboard',
    path: '/dashboard/',
    icon: icon('ic_analytics'),
  }])


const navConfig = [
  {
    title: 'employees',
    path: '/employees',
    icon: icon('ic_user'),
  },
  {
    title: 'organismes',
    path: '/organismes',
    icon: <BusinessOutlinedIcon color="action" />,
  },
  {
    title: 'projects',
    path: '/projects',
    icon: <Iconify icon='grommet-icons:projects' color='#637381' /> ,
  } ,
  {
    title: 'roles',
    path: '/roles',
    icon: <Iconify style={{width:'25px' , height:'25px'}} icon='fa-solid:users-cog' color='#637381' /> ,
  }
  ,
  {
    title: 'blog',
    path: '/blog',
    icon: icon('ic_blog'),
  },
  {
    title: 'phases',
    path: '/phases',
    icon: <Iconify icon='gis:step' color='#637381' /> ,
  }
];


useEffect(()=>{
  checkAbilities()
  console.log(navConfigFilter);
},[permissions])







/* -------------- end of confug ------------------- */


function checkAbilities () {
  const filter = []
  can("read-user") ? filter.push(navConfig[0]) : null
  can("read-org") ? filter.push(navConfig[1]) : null
  can("read-project") || can("read-his-project") ? filter.push(navConfig[2]) : null
  can("read-role") ? filter.push(navConfig[3]) : null
  setnavConfigFilter([...navConfigFilter , ...filter])

}


  
  return (
    <StyledRoot>
        
    <Header  onOpenNav={() => setOpen(true)}  user={user}/>

    <Nav navConfig={navConfigFilter} user={user} openNav={open} onCloseNav={() => setOpen(false)} />

    <Main>
      <Outlet />
    </Main>
  </StyledRoot>
  );
}

  

/*  <StyledRoot>
        
      <Header onOpenNav={() => setOpen(true)} />

      <Nav openNav={open} onCloseNav={() => setOpen(false)} />

      <Main>
        <Outlet />
      </Main>
    </StyledRoot> */