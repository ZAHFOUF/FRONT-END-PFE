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

import { sample } from 'lodash';

import Iconify from '../../components/iconify';




import { actionsUsers } from '../../store'


import { useContextProvider } from '../../context/contextProvider';

//
import Header from './header';
import Nav from './nav';



import SvgColor from '../../components/svg-color';
import { respo } from '../../_mock/user'

import axios from '../../api/axios';




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
  const {token , user} = useContextProvider()
  const navigate = useNavigate();
  useEffect(()=>{
    if (    token === 0 ) {
        navigate("/login")
    }
  },[])

  /* ----------------------- config of nav ------------------------------------ */

  const icon = (name) => <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />;
const navConfigFilter = []


const navConfig = [
  {
    title: 'dashboard',
    path: '/dashboard/',
    icon: icon('ic_analytics'),
  },
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
    title: 'blog',
    path: '/blog',
    icon: icon('ic_blog'),
  },
  {
    title: 'login',
    path: '/login',
    icon: icon('ic_lock'),
  },
  {
    title: 'Not found',
    path: '/404',
    icon: icon('ic_disabled'),
  },
  {
    title: 'projects',
    path: '/projects',
    icon: <Iconify icon='grommet-icons:projects' color='#637381' /> ,
  }
];


respo().map((e1)=>{
   // eslint-disable-next-line no-var
   var item = navConfig.filter((e)=> e.title === e1.reccord)
   if (item[0]) {
    navConfigFilter.push(item[0])
   }
  
   return 0
 
}) 

/* -------------- end of confug ------------------- */






if (localStorage.getItem("user_session")) {
  const key = JSON.parse(localStorage.getItem("user_session"))
  const hash = AES.decrypt(key.user.role,"younes")
const role = hash.toString(enc.Utf8)
user.icon =  key.user.icon
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