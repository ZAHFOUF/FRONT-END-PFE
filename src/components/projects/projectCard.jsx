/* eslint-disable import/order */
import React,{ useState } from 'react';
import { Link } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import Typography from '@mui/material/Typography';
import { Avatar , AvatarGroup , TableCell , IconButton , MenuItem ,Popover , Grow, Badge, Stack } from '@mui/material';
import Iconify from '../iconify/Iconify'
import '../../theme/css/index.css'
import { ProgressBar } from '../progress/index';
import DialogDelete from '../dialog-delete';
import { useDispatch } from 'react-redux';
import { actionsProjects } from '../../store';
import { Toast } from '../aleart';
import { deleteProject } from '../../store/res/projects';
import { id } from 'date-fns/locale';




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
  const [open2, setOpen2] = useState(false);
  const dispatch = useDispatch()


  const handleOpenMenu = (event,id) => {
    setOpen(event.target)
  };

  const handleCloseMenu = () => {
    setOpen(null);
  };

  const handelEdit = (e)=> {
      props.setProject(props.project)
      props.setEdit()


  }

  const handelRemove = (i)=> {
  
    
    deleteProject((e)=>{ dispatch(actionsProjects.removeProjects({id:i})) ; setOpen2(false) ; Toast.fire({icon:"info" , title:"Project Deleted !"}) },(e)=> console.log(e),i)
   




}

  const handelDelete = ()=>{
   
    setOpen(null)

    setOpen2(true)

  }

  const classDesign = props.project.status === 'Can' ? 'can_case' : 'normal_case'


  const StyledBadge = styled(Badge)(({ theme }) => ({
    '& .MuiBadge-badge': {
      backgroundColor: '#44b700',
      color: '#44b700',
      boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
      '&::after': {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        borderRadius: '50%',
        animation: 'ripple 1.2s infinite ease-in-out',
        border: '1px solid currentColor',
        content: '""',
      },
    },
    '@keyframes ripple': {
      '0%': {
        transform: 'scale(.8)',
        opacity: 1,
      },
      '100%': {
        transform: 'scale(2.4)',
        opacity: 0,
      },
    },
  }));




  return (
    <>
        <DialogDelete res={'Project'} open={open2} setOpen={setOpen2} handelDelete={()=> handelRemove(props.project.id)} />

        <Grow in={Boolean(true)}> 


<Card sx={{ minWidth: 275 , position:'relative' }} className={classDesign} >
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

      {
        props.access.U &&  <MenuItem  onClick={handelEdit}>
             <Iconify  icon={'eva:edit-fill'} sx={{ mr: 2 }} />
             Edit
           </MenuItem>
      }

   
     

     {
       props.access.D && <MenuItem onClick={()=> handelDelete(props.project.id)}  sx={{ color: 'error.main' }}>
       <Iconify  icon={'eva:trash-2-outline'} sx={{ mr: 2 }} />
       Delete
     </MenuItem>
     }

  
       

      
      </Popover>


        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
           le {props.project.start_date} a {props.project.end_date}
        </Typography>
        <Typography variant="h5" component="div">
         {props.project.name}
        </Typography>
        <Typography pt={1} variant="body2">
          {props.project.des.slice(0,90)} ...
        </Typography>
        <img width={100} style={{marginTop:'15px'}} src={props.project.org.cover} alt='org' loading='lazy' />
        <Typography pt={1} style={{display:'flex',alignItems:'center'}} variant="body3">
        <Avatar sx={{ bgcolor: 'rgb(76, 175, 80)' ,width:'35px' , height:'35px'}}><AccountBalanceIcon sx={{fontSize:'1.3rem'}}/> </Avatar>  <p style={{paddingLeft:'7px'}}>  {props.project.budget} DH </p>
        </Typography>

        <ProgressBar color={'#2ecc71'}  value={props.project.progress} />
     
      </CardContent>
      <Stack padding={'10px'} justifyContent={'space-between'}  spacing={4}  direction={'row'}>

      <CardActions  sx={{  paddingTop:'5px' , paddingBottom:'20px'}}>
       <Link to={`/projects/search?q=${props.project.id}`}>  <Button size="small">  Learn More</Button> </Link>
      </CardActions>

      <AvatarGroup max={1}>
      <Avatar alt="Remy Sharp" src={props.project.chef.photo} />
  <Avatar alt="Travis Howard" src="/static/images/avatar/2.jpg" />
  <Avatar alt="Cindy Baker" src="/static/images/avatar/3.jpg" />
  <Avatar alt="Agnes Walker" src="/static/images/avatar/4.jpg" />
  <Avatar alt="Trevor Henderson" src="/static/images/avatar/5.jpg" />
</AvatarGroup>
     
     
       
    

      </Stack>
     
      

     
    </Card>


    </Grow>

    
    
    </>
   




  
  );
}


// mdi:bank-circle-outline
