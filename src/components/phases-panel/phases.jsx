/* eslint-disable no-var */
/* eslint-disable prefer-template */
/* eslint-disable import/no-unresolved */
/* eslint-disable arrow-body-style */
/* eslint-disable no-constant-condition */

import { deletePhase, editPhaseField, loadPhases } from 'src/store/res/phases';
import { Grid, Typography , MenuItem , Divider , Box ,Stack , Popover , TableContainer , Table , TableHead , TableRow , TableCell ,TableBody , Paper, AvatarGroup, Avatar, Button, IconButton, Fab, DialogContent, DialogTitle, Dialog, FormControl, TextField } from '@mui/material';
import React, { useEffect, useState } from 'react';
import _ from 'lodash';
import { useForm } from 'react-hook-form';
import { faker } from '@faker-js/faker';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import DialogActions from '@mui/material/DialogActions';
import CloseIcon from '@mui/icons-material/Close';
import Iconify from '../iconify/Iconify';
import DialogCreate from '../dailog-create';
import { FormCreatePhase } from '../form-create-phase';
import DialogDelete from '../dialog-delete';
import { actionsDeliverables, actionsPhases } from '../../store';
import { Toast } from '../aleart';


import {
  AppTasks,
  AppNewsUpdate,
  AppOrderTimeline,
  AppCurrentVisits,
  AppWebsiteVisits,
  AppTrafficBySite,
  AppWidgetSummary,
  AppCurrentSubject,
  AppConversionRates,
} from '../../sections/@dashboard/app';
import { addDel } from '../../store/res/deliverables';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(3),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(10),
  },
}));

function BootstrapDialogTitle(props) {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
}

BootstrapDialogTitle.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func.isRequired,
};



export default function Phases ({ project , access }) {
  const dispatch = useDispatch()
  const { register, handleSubmit } = useForm();

  

    const phases = useSelector((state)=> state.phases)
    const deliverables = useSelector((state)=> state.deliverables)

    const extractDeliverables = (phases) => {
      return _.flatMap(phases, (phase) => {
        // eslint-disable-next-line arrow-body-style
        return _.map(phase.deliverables, (deliverable) => {
          return {
            phase: phase.code,
            ...deliverable,
          };
        });
      });
    };

    
    const [open,setOpen] = useState(null)
    const [team,setTeam] = useState([])
    const [phasePoint,setPhasePoint] = useState()
    const [type,setType] = useState(false)
    const [phase,setPhase] = useState()
    const [status,setStatus] = useState()
    const [open1,setOpen1] = useState(false)
    const [open2,setOpen2] = useState(false)
    const [open3,setOpen3] = useState(false)
    const [open4,setOpen4] = useState(false)
    const [del,setDel] = useState([])
   
    
    

    function DetectStatus({ status }){
        const ic = status ===  'Ongoing'  ? {cover : 'mdi:progress-clock' , color: '#3498db' } : status === 'Revision'  ? { cover:'mdi:eye' , color:'#f39c12' } : { cover: 'ion:checkmark-done-circle' , color:'#2ecc71'}

        return(
            <Iconify sx={{'margin-right' : '10px'}} icon={ic.cover} color={ic.color} />
        )
    }

    const handelCreate = ()=>{
          setType('create')
          setOpen2(true)
    }

    const handelEdit = ()=>{
      setType('edit')
      setOpen2(true)
  }


    const handleClose = ()=>{
        setOpen(null)
    }

    const handelModel = ()=>{
       setOpen4(false)
    }

    

   

   

    const showteam = (event,team)=>{
      console.log(team);
        setTeam(team)
       setOpen(event.currentTarget)

    }


    const handleOpenMenu = (event,phase) => {
        console.log(phase);
        setOpen1(event.target)
        setPhasePoint(phase.code)
        setStatus(phase.status)
        setPhase(phase)

      };

      const handleCloseMenu = () => {
         setOpen1(null);
      };

      const handelRemove = (i)=> {

        console.log(i);
       
        

        deletePhase((e)=>{ dispatch(actionsPhases.removePhases({id:i})) ; setOpen3(false) ;  Toast.fire({icon:"info" , title:"Phase Deleted !"})},(e)=>{Toast.fire({icon:"error" , title:"Error In the server !"})},i)
    
       
    
       
    
       
        
    
    
    }

    const handelDel = ()=>{
        setOpen1(null)
        setOpen3(true)
    }

    const handelClick4 = ()=>{
      
      setOpen4(true)
  }

  

      const fabStyle = {
        position: 'fixed',
        bottom: 16,
        right: 40,
      };

      const  handelStatus = (st) =>{
          var ph = {...phase , status:st}

          editPhaseField((e)=>{dispatch(actionsPhases.upPhasess({data:ph})) ; setOpen1(null) ; Toast.fire({icon:st !== 'Done' ? "info" : 'success' , title:`Phase Right Now ${st}`})} ,
           (e)=>{Toast.fire({icon:"error" , title:`Error Try Again Or contact us !`})},{edit:"status",value:st},ph.code)

          
          
     
        
      }


      useEffect(()=>{

        loadPhases((e)=>{dispatch(actionsPhases.loadPhases(e.phases));dispatch(actionsDeliverables.loaddeliverables(extractDeliverables(e.phases))) ; console.log(extractDeliverables(e.phases));},(e)=>console.log(e),project)
        

       

   
     },[])

     const SendD = (data)=>{
        addDel((e)=>{dispatch(actionsDeliverables.adddeliverables(data));setOpen4(false);Toast.fire({icon:"success" , text:"Deliverable added !"}) },
        (e)=>{console.log(e);Toast.fire({icon:"error" , text:"Could Be an instrnal error !"})},data)
     }
      
 


    return (
         <>

<DialogDelete res={'Phase'} open={open3} setOpen={setOpen3} handelDelete={()=> handelRemove(phasePoint)} />


<Dialog open={open4} onClose={handelModel}>

        <DialogTitle>  Add Deliverables </DialogTitle>
        
        <form onSubmit={handleSubmit((data)=> SendD(data))}>
        <DialogContent dividers>

        <TextField
            autoFocus
            margin="dense"
            id="name"
            {...register("name")}
            label="Name"
            type="text"
            fullWidth
            variant="standard"
            required
          />
           <TextField
           
            margin="dense"
            id="name"
            style={{marginTop:'20px'}}
            label="Decription"
            {...register("description")}
            type="text"
            fullWidth
            variant="standard"
            required
          />

         <TextField
            {...register("phase")}
            margin="dense"
            id="name"
            style={{marginTop:'20px'}}
            label="Phase Code (number)"
            type="number"
            fullWidth
            variant="standard"
            required
          />

          
         <TextField
           {...register("filePath")}
            margin="dense"
            id="name"
            style={{marginTop:'20px'}}
            label="Path"
            type="text"
            fullWidth
            variant="standard"
            required
          />

          <Typography style={{marginTop:'20px'}} variant='body2' >
             <b>NB : </b> Right Now we have just extrnal document upload files comming soon ...
          </Typography>

          </DialogContent>

          <DialogActions >
          <Button onClick={handelModel}>Cancel</Button>
          <Button type='submit'> add </Button>
        </DialogActions>

        </form>
     
       

       
         

      </Dialog>

{
  access.C && <Fab onClick={handelCreate} color="primary" sx={fabStyle} aria-label="add">
  <Iconify icon='ri:add-fill' color='#FFF' />
</Fab>
}



<Popover
        open={Boolean(open)}
        anchorEl={open}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        transformOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        PaperProps={{
          sx: {
            p: 0,
            mt: 1.5,
            ml: 0.75,
            width: 180,
            '& .MuiMenuItem-root': {
              typography: 'body2',
              borderRadius: 0.75,
            },
          },
        }}
      >

        <Stack sx={{ p: 1  }}>
        <Box sx={{ my: 1.5, px: 2.5 , marginTop:'0px' , paddingLeft:'10px'}}>

           {
             team.map((e)=>(
                 <Stack mt={2} key={e[0] ? e[0].id : e.id} direction='row' alignItems={'center'} spacing={2}>
                    <Avatar alt={e[0] ? e[0].nom : e.nom} src={e[0] ? e[0].photo : e.photo} />

                    <Typography variant='body2' sx={{ color: 'text.secondary' }} >
                        {e[0] ? e[0].nom : e.nom + ' ' } {e[0] ? e[0].prenom : e.prenom}
                    </Typography>

                 </Stack>
             ))
           }
          
          </Box>
        </Stack>
        <Divider sx={{ borderStyle: 'dashed' }} />
        {
          access.C &&     

          <MenuItem  sx={{ m: 1 }}>
          
          <Typography display={'flex'} alignContent={'center'} variant='subtitle2' sx={{ color: 'text.blue' }} >
                      <Iconify sx={{marginRight : '8px'}} icon='zondicons:add-solid' color='text.blue' />   Add To the Team
                      </Typography>
          </MenuItem>
        }

      
      </Popover>


         

            <TableContainer className='phases-style' style={{marginTop:'30px'}} component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
          <TableCell align="left"> code </TableCell>
            <TableCell align="left"> Name </TableCell>
            <TableCell align="left"> budget </TableCell>
            <TableCell align="left">Start Date</TableCell>
            <TableCell align="left">  Start End </TableCell>
            <TableCell align="left"> Status </TableCell>
            <TableCell align="left"> Team </TableCell>
            {
              access.DU && <TableCell align="left">   </TableCell>
            }
            
          </TableRow>
        </TableHead>
        <TableBody >
          {phases.map((row) => (
            <TableRow
              key={row.code}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell  align="left" scope="row">
              CP-{row.code}
              </TableCell>
              <TableCell  align="left" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="left" scope="row">
                {row.budgetPercentage} %
              </TableCell>
              <TableCell align="left">{row.startDate}</TableCell>
              <TableCell align="left">{row.endDate}</TableCell>
              <TableCell align="left"> <DetectStatus status={row.status} /> {row.status}</TableCell>
              <TableCell onClick={(e)=> showteam(e,row.assignedEmployees) } style={{cursor:'pointer'}}  align="left"> 

              <AvatarGroup  max={1}>
                {
                    row.assignedEmployees.map((e) => (

                      

                        <Avatar alt={e[0] ? e[0].nom : e.nom } src={e[0] ? e[0].photo : e.photo} />

                    ))
                }
               

              </AvatarGroup>
              
               </TableCell>
               {
                access.DU &&   <TableCell align="left">
                <IconButton size="large" color="inherit" onClick={(event)=> handleOpenMenu(event,row)}>
                <Iconify icon={'eva:more-vertical-fill'} />
                </IconButton>
                </TableCell>
          
               }
             

            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>

         
      <Popover
        open={Boolean(open1)}
        anchorEl={open1}
        onClose={handleCloseMenu}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        transformOrigin={{ vertical: 'bottom', horizontal: 'left' }}
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

      {
          status ===  'Revision' &&   <MenuItem onClick={()=> handelStatus('Done')}   sx={{color:'#2ed573'}}>
          <Iconify icon={'ion:checkmark-done-circle'} color='#2ed573' sx={{ mr: 2 } } />
              Done
         </MenuItem>
      }

      
{
          status ===  'Ongoing' &&   <MenuItem onClick={()=> handelStatus('Revision')} sx={{color:'#ffa502'}}>
          <Iconify  icon={'mdi:eye'} color='#ffa502' sx={{ mr: 2 } } />
          review
         </MenuItem>
      }

      {
        status === 'Ongoing'  &&   <MenuItem onClick={()=> handelStatus('Done')} sx={{color:'#2ed573'}}>
        <Iconify  icon={'ion:checkmark-done-circle'} color='#2ed573' sx={{ mr: 2 } } />
            Done
       </MenuItem>
      }

    
   

   

     <MenuItem  onClick={handelEdit}>
        <Iconify  icon={'eva:edit-fill'} sx={{ mr: 2 }} />
        Edit
      </MenuItem>
     

     {
       <MenuItem onClick={handelDel} sx={{ color: 'error.main' }}>
       <Iconify  icon={'eva:trash-2-outline'} sx={{ mr: 2 }} />
       Delete
     </MenuItem>
     }

  
       

      
      </Popover>



      <DialogCreate  childern={<FormCreatePhase project={project} setOpen={setOpen2} type={type} phase={phase} />}  res={'Phase'} open={open2} setOpen={setOpen2}/>


    
     <Grid mt={3} container spacing={2}>
  <Grid item xs={12} md={6} lg={8}>
  <AppNewsUpdate
    title={<span className='align-child'>Deliverables <Iconify icon="icon-park-outline:delivery" color="#3867d6" /> <Iconify onClick={handelClick4} className='icon-right' icon='ph:plus-circle-bold' color='#1dd1a1'/> </span>}
    list={deliverables}
  />
</Grid>

<Grid item xs={12} md={6} lg={4}>
  <AppOrderTimeline
    title={<span className='align-child'> Ultimate results <Iconify onClick={handelModel} width='24px' height='24px' sx={{marginLeft:'6px'}} icon="fluent-emoji:newspaper" /></span>}
    list={[...Array(5)].map((_, index) => ({
      id: faker.datatype.uuid(),
      title: [
        'Phase CP-100',
        'Phase CP-201 ',
        'Phase CP-204',
        'Phase CP-206',
        'Phase CP-203',
      ][index],
      type: `order${index + 1}`,
      time: faker.date.past(),
    }))}
  />
</Grid>

</Grid>






         
         
         </>
    )





}