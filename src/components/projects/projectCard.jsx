import React,{ useState } from 'react';
import { Link } from 'react-router-dom';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import Typography from '@mui/material/Typography';
import { Avatar , TableCell , IconButton , MenuItem ,Popover , Grow } from '@mui/material';
import Iconify from '../iconify/Iconify'
import '../../theme/css/index.css'

const bull = (
  <Box
    component="span"
    sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
  >
    •
  </Box>
);


export default function Projectcart(props) {
  const [open, setOpen] = useState(null);


  const handleOpenMenu = (event,id) => {
    setOpen(event.target)
  };

  const handleCloseMenu = () => {
    setOpen(null);
  };






  return (
    <Grow in={Boolean(true)}> 


<Card sx={{ minWidth: 275 , position:'relative' }} >
      <CardContent >


      <TableCell align="right" className='op1'>
      <IconButton size="large" color="inherit" onClick={(event)=> handleOpenMenu(event,props.project.id)}>
      <Iconify icon={'eva:more-vertical-fill'} />
      </IconButton>
      </TableCell>



      <Popover
        open={Boolean(open)}
        anchorEl={open}
        onClose={handleCloseMenu}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'left' }}
        PaperProps={{
          sx: {
            p: 1,
            width: 140,
            '& .MuiMenuItem-root': {
              px: 1,
              typography: 'body2',
              borderRadius: 0.75,
            },
          },
        }}
      > 

     <MenuItem sx={{color:'#f1c40f'}}>
        <Iconify  icon={'mdi:pin-outline'} sx={{ mr: 2 } } />
        pin
      </MenuItem>

     <MenuItem >
        <Iconify  icon={'eva:edit-fill'} sx={{ mr: 2 }} />
        Edit
      </MenuItem>
     

  <MenuItem  sx={{ color: 'error.main' }}>
        <Iconify  icon={'eva:trash-2-outline'} sx={{ mr: 2 }} />
        Delete
      </MenuItem>
       

      
      </Popover>


        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
           le {props.project.startDate} a {props.project.startEnd}
        </Typography>
        <Typography variant="h5" component="div">
         {props.project.name}
        </Typography>
        <Typography pt={1} variant="body2">
          {props.project.des.slice(0,90)} ...
        </Typography>
        <img width={100} style={{marginTop:'15px'}} src={props.project.org} alt='org' loading='lazy' />
        <Typography pt={1} style={{display:'flex',alignItems:'center'}} variant="body3">
        <Avatar sx={{ bgcolor: 'rgb(76, 175, 80)' ,width:'35px' , height:'35px'}}><AccountBalanceIcon sx={{fontSize:'1.3rem'}}/> </Avatar>  <p style={{paddingLeft:'7px'}}>  {props.project.budget} </p>
        </Typography>
     
      </CardContent>
      <CardActions  sx={{marginLeft:'11px' , paddingTop:'5px' , paddingBottom:'20px'}}>
       <Link to={`/projects/search?q=${props.project.id}`}>  <Button size="small">  Learn More</Button> </Link>
      </CardActions>

     
    </Card>

    </Grow>
  
  );
}


// mdi:bank-circle-outline
