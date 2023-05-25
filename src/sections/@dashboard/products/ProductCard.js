import PropTypes from 'prop-types';
// @mui
import { Box, Card, Link, Typography, Stack , Button  } from '@mui/material';
import { styled } from '@mui/material/styles';
import PhoneOutlinedIcon from '@mui/icons-material/PhoneOutlined';
import Iconify from '../../../components/iconify';



// ----------------------------------------------------------------------

const StyledProductImg = styled('img')({
  top: 0,
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  position: 'absolute',
});

// ----------------------------------------------------------------------

ShopProductCard.propTypes = {
  product: PropTypes.object,
};


// Example usage:

export default function ShopProductCard({ product }) {
  const { name, address, contactPhone ,cover , contactEmail } = product;

  return (
    <Card>
      <Box sx={{ pt: '100%', position: 'relative' }}>
    
        <StyledProductImg alt={name} src={cover} />
      </Box>

      <Stack spacing={2} sx={{ p: 3 }}>
        <Link color="inherit" underline="hover">
          <Typography variant="subtitle2" noWrap>
            {name}
          </Typography>


          

            <Typography mt={1} variant="body2" noWrap>
           
            <span style={{display:'flex' , alignItems:'center'}}>  <Iconify sx={{width:18}} icon="ic:baseline-phone" /> {contactPhone} </span>

            
            
          </Typography>

          
          <Typography mt={1} variant="body2" noWrap>
           
           <span style={{display:'flex' , alignItems:'center'}}>  <Iconify sx={{width:18}} icon="mdi:address-marker-outline" /> {address} </span>

           
           
         </Typography>


         <Button  href={`mailto:${contactEmail}`}  style={{marginTop:'10px',color:'#FFF'}} color="success" variant="contained" endIcon={ <Iconify sx={{width:18}} color='#FFF' icon="ic:round-mail-outline" />}>
  Contacter
</Button>





          
        </Link>
      </Stack>
    </Card>
  );
}
