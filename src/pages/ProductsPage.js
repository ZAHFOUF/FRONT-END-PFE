import { Helmet } from 'react-helmet-async';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

// @mui
import { Container , Box , CircularProgress , Stack, Typography } from '@mui/material';
// components
import { ProductSort, ProductList, ProductCartWidget, ProductFilterSidebar } from '../sections/@dashboard/products';
// mock
import PRODUCTS from '../_mock/products';
import { actionsOrganismes } from '../store/index';
import axios from '../api/axios'

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




/* ----------------------------------- axios load  ---------------------------------------------- */

useEffect(()=>{

  axios.get("/api/organisations").then((e)=>{
      setOpen1('none')
      dispatch(actionsOrganismes.loadOrganismes(e.data.organisations))
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
        <ProductCartWidget />
      </Container>
    </>
  );
}
