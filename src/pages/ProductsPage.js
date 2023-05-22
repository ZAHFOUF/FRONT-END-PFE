/* eslint-disable no-plusplus */
/* eslint-disable no-var */
import { Helmet } from 'react-helmet-async';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import { Container , Box , CircularProgress , Stack, Typography , Button } from '@mui/material';

import { useContextProvider } from '../context/contextProvider';

// @mui
// components
import { ProductSort, ProductList, ProductCartWidget, ProductFilterSidebar } from '../sections/@dashboard/products';
// mock
import PRODUCTS from '../_mock/products';
import { actionsOrganismes } from '../store/index';
import axios from '../api/axios'
import Iconify from '../components/iconify';

let globalData = []
var count = 20


// ----------------------------------------------------------------------

export default function ProductsPage() {
  const [openFilter, setOpenFilter] = useState(false);
  const [open1, setOpen1] = useState('flex');

  const handleOpenFilter = () => {
    setOpenFilter(true);
  };

  const handleCloseFilter = () => {
    setOpenFilter(false);
  };

  const organismes = useSelector((state)=>{
    return state.organismes
})

const dispatch = useDispatch()
const navigate = useNavigate()


const { _setToken , user , token , setUser   } = useContextProvider()



// eslint-disable-next-line no-unused-vars

const generateItems = (data) => {
  const items = [];

  for (let i = 0; i < count; i++) {
    if (i < data.length) {
      items.push(data[i]);
    } else {
      break; // Break the loop if there are no more items in the data array
    }
  }

  return items;
};

const handelClick = () =>{
  count += 20

  const data = generateItems(globalData)
  console.log(data,"count",count);
  dispatch(actionsOrganismes.loadOrganismes(data))
}
/* ----------------------------------- axios load  ---------------------------------------------- */

useEffect(()=>{

  axios.get("/api/organisations").then((e)=>{
      setOpen1('none')
      globalData = e.data.organisations
      console.log(e.data.organisations);
      const data = generateItems(e.data.organisations)

      
      

      dispatch(actionsOrganismes.loadOrganismes(data))
  }).catch((e)=>{
       
    if ( e.response.status === 401 ) {

      
     
      Swal.fire({title:e.response.data.message,icon:"error",timer:1500})
      setTimeout(() => {
        localStorage.removeItem("user_session")
        _setToken(0)
        setUser({})
        navigate("/login")
      

       
      }, 1500);

      
      

    }
  })

},[dispatch])

  

  return (
    <>
    
    
      <Helmet>
        <title> Dashboard: Products | Minimal UI </title>
      </Helmet>

      <Container>
        <Typography variant="h4" sx={{ mb: 5 }}>
        Organismes
        </Typography>

        <Stack direction="row" flexWrap="wrap-reverse" alignItems="center" justifyContent="flex-end" sx={{ mb: 5 }}>
          <Stack direction="row" spacing={1} flexShrink={0} sx={{ my: 1 }}>
            <ProductFilterSidebar
              openFilter={openFilter}
              onOpenFilter={handleOpenFilter}
              onCloseFilter={handleCloseFilter}
            />
            <ProductSort />
          </Stack>
        </Stack>


        <Box sx={{display: open1, justifyContent: 'center', padding: '22px' }}>
      <CircularProgress />
    </Box>

        <ProductList products={organismes} />
        <div style={{padding:'50px' , display:'flex' , justifyContent:'center'}}>

        <Button onClick={handelClick} variant="contained" endIcon={<Iconify icon="streamline:interface-arrows-synchronize-arrows-loading-load-sync-synchronize-arrow-reload" />}>
  Load More
</Button>

        </div>
        
        <ProductCartWidget />
      </Container>
    </>
  );
}
