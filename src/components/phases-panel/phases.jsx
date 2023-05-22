/* eslint-disable no-constant-condition */
import { Grid, Typography , MenuItem , Divider , Box ,Stack , Popover , TableContainer , Table , TableHead , TableRow , TableCell ,TableBody , Paper, AvatarGroup, Avatar, Button, IconButton, Fab, DialogContent, DialogTitle, Dialog } from '@mui/material';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Iconify from '../iconify/Iconify';
import DialogCreate from '../dailog-create';
import { FormCreatePhase } from '../form-create-phase';
import DialogDelete from '../dialog-delete';
import { actionsPhases } from '../../store';
import { Toast } from '../aleart';



export default function Phases ({ project , access }) {

    const phases = useSelector((state)=> state.phases)
    const [open,setOpen] = useState(null)
    const [team,setTeam] = useState([])
    const [phasePoint,setPhasePoint] = useState()
    const [phase,setPhase] = useState()
    const [status,setStatus] = useState()
    const [open1,setOpen1] = useState(false)
    const [open2,setOpen2] = useState(false)
    const [open3,setOpen3] = useState(false)
    const [type,setType] = useState(false)
    const dispatch = useDispatch()
    
    

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

   

   

    const showteam = (event,team)=>{
        setTeam(team)
        setOpen(event.currentTarget)

    }


    const handleOpenMenu = (event,phase) => {
        console.log(status);
        setOpen1(event.target)
        setPhasePoint(phase.code)
        setStatus(phase.status)
        setPhase(phase)

      };

      const handleCloseMenu = () => {
         setOpen1(null);
      };

      const handelRemove = (i)=> {
       
        
    
        dispatch(actionsPhases.removePhases({id:i}))
    
        setOpen3(true)
    
        Toast.fire({icon:"info" , title:"Phase Deleted !"})
        
    
    
    }

    const handelDel = ()=>{
        setOpen1(null)
        setOpen3(true)
    }

  

      const fabStyle = {
        position: 'fixed',
        bottom: 16,
        right: 40,
      };

      
 


    return (
         <>

<DialogDelete res={'Phase'} open={open3} setOpen={setOpen3} handelDelete={()=> handelRemove(phasePoint)} />


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
                 <Stack mt={2} key={e.id} direction='row' alignItems={'center'} spacing={2}>
                    <Avatar alt={e.nom} src={e.photo} />

                    <Typography variant='body2' sx={{ color: 'text.secondary' }} >
                        {e.nom}
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
                {row.code}
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

                        <Avatar alt={e.name} src={e.photo} />

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
          status ===  'Revision' &&   <MenuItem sx={{color:'#2ed573'}}>
          <Iconify  icon={'ion:checkmark-done-circle'} color='#2ed573' sx={{ mr: 2 } } />
              Done
         </MenuItem>
      }

      
{
          status ===  'Ongoing' &&   <MenuItem sx={{color:'#ffa502'}}>
          <Iconify  icon={'mdi:eye'} color='#ffa502' sx={{ mr: 2 } } />
          review
         </MenuItem>
      }

      {
        status === 'Ongoing'  &&   <MenuItem sx={{color:'#2ed573'}}>
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



      <DialogCreate  childern={<FormCreatePhase setOpen={setOpen2} type={type} phase={phase} />} res={'Phase'} open={open2} setOpen={setOpen2}/>




         
         
         </>
    )





}