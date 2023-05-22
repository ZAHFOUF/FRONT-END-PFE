/* eslint-disable array-callback-return */
/* eslint-disable prefer-template */
/* eslint-disable react/jsx-key */
import React, { useEffect, useState } from 'react';
import { Button , Chip , Box, Container, Typography, Grid , Input, InputAdornment, OutlinedInput, TextField, InputLabel, Select, MenuItem, FormControl, useTheme } from '@mui/material';
import { useDispatch } from 'react-redux';
import { AccountCircle } from '@mui/icons-material';
import { useForm } from 'react-hook-form';
import axiosClient from '../../api/axios';
import { Toast } from '../aleart';
import { actionsPhases } from '../../store';




const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

function getStyles(name, personName, theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}



export const FormCreatePhase = ({type , phase , setOpen}) => {

    const { register, handleSubmit } = useForm();
    const [names,setNames] = useState([])
    const theme = useTheme();
    const dispatch = useDispatch()
    const handleChange4 = (event) => {
      const {
        target: { value },
      } = event;
      setPersonName(
        // On autofill we get a stringified value.
        typeof value === 'string' ? value.split(',') : value,
      );
    };

    const [personName, setPersonName] = useState( []);

   
   


  



    const [status,setStatus] = useState(type === 'create' ? 'Ongoing' : phase.status)

    const handleChange = (event, newValue) => {
        setPersonName(event.target.value)
     };
   
     const handleChange3 = (event, newValue) => {
       setStatus(event.target.value)
    };

   const Send = (data)=>{
        if (type === 'edit') {
          const send = data
          send.code = "CRP-005"
          

          send.assignedEmployees.map((e,i)=>{
           send.assignedEmployees[i] = JSON.parse( send.assignedEmployees[i])
          })
          console.log('edit',data);
            setOpen(false)
            Toast.fire({icon : "success" ,  title:"phase Edited !" })
           
        }else{
          const send = data
          send.code = "CRP-005"
          

          send.assignedEmployees.map((e,i)=>{
           send.assignedEmployees[i] = JSON.parse( send.assignedEmployees[i])
          })
          dispatch(actionsPhases.addPhases(send))
            setOpen(false)
            Toast.fire({icon : "success" ,  title:"phase Created !" })
            

             

             
        }
   }

   useEffect(()=>{

   
      axiosClient.get("/api/users").then((e)=>{
        const users  = e.data.data

    

       setNames(users)

       if (type === 'edit') {

        const team = []
  
        phase.assignedEmployees.map((e,i)=>{
            team.push(JSON.stringify( phase.assignedEmployees[i]))
        })
  
        setPersonName(team)
        
      }
      
    },[])

      


        

        



})

   



    return(



        <Grid container onSubmit={handleSubmit((data)=> Send(data))}    component='form' spacing={4}>
    
        <Grid item sm={6} xs={12} md={6} >
      
        <div style={{padding:'20px'}}>
      
      
      <TextField {...register('name',{value: type === 'create' ? ' ' : phase.name})} required fullWidth   id="outlined fullWidth" autoFocus label="Nom de phase" variant="outlined" />
      
      <TextField
      required
          id="outlined-multiline-static"
          {...register('description' ,{ value: type === 'create' ? ' ' : phase.description } )}
          label="Description"
          multiline
         fullWidth
          style={{marginTop:'20px'}}
          rows={4}
          placeholder='Ce phase ...'
        />
      
        
      
      <OutlinedInput
      {...register('budgetPercentage' ,{ value: type === 'create' ? 10 : phase.budgetPercentage })}
      required
                  placeholder='10000'
                  style={{marginTop:'20px'}}
                  fullWidth
                  id="outlined-adornment-weight outlined-number fullWidth"
                  type='number'
                  endAdornment={<InputAdornment position="end">%</InputAdornment>}
                  aria-describedby="outlined-weight-helper-text"
                  inputProps={{
                    'aria-label': 'weight',
                  }}
                />
      
      <FormControl  sx={{mt:5}} fullWidth>
      <InputLabel id="demo-simple-select-autowidth-label"> Status </InputLabel>
      <Select
      {...register('status' )}

      value={status}
      
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          
          fullWidth
          required
         
          onChange={handleChange3}
          startAdornment={
            <InputAdornment position="start">
              <AccountCircle />
            </InputAdornment>
          }
        >
          
          <MenuItem value={'Ongoing'}> Ongoing </MenuItem>
          <MenuItem value={'Revision'}> Revision </MenuItem>
          <MenuItem value={'Done'}> Done </MenuItem>
        </Select>
      
      </FormControl>
      
                
      
      </div>
      
        </Grid>
      
        <Grid item sm={6} xs={12} md={6} >
      
      <div style={{padding:'20px'}}>
      
      
      
      <Typography  style={{marginLeft : '0px'}} sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
                    Start in
                  </Typography>
      
      <Input  {...register('startDate' , { value: type === 'create' ? ' ' : phase.startDate })} required type='date' fullWidth   />
      
      <Typography style={{marginLeft : '0px'}} sx={{ ml: 2, flex: 1 , mt:4 }} variant="h6" component="div">
                    Start end
                  </Typography>
      
      <Input  {...register(' endDate' , { value: type === 'create' ? ' ' : phase.endDate })} required type='date' fullWidth   />
      
    
      
      <FormControl  sx={{ m: 1, width: 300 , marginTop:'40px' }}>
        <InputLabel id="demo-multiple-chip-label"> Team </InputLabel>
        <Select
          {...register("assignedEmployees")}
          labelId="demo-multiple-chip-label"
          id="demo-multiple-chip"
          multiple
          value={personName}
          onChange={handleChange4}
          input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
          renderValue={(selected) => (
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
              {selected.map((value) => (
                <Chip key={JSON.parse(value).id} label={JSON.parse(value).nom} />
              ))}
            </Box>
          )}
          MenuProps={MenuProps}
        >
          {names.map((e) => (
            <MenuItem
              key={e.id}
              value={JSON.stringify({nom:e.nom + ' ' + e.prenom , photo : e.photo , id:e.id})}
              style={getStyles(e.nom + ' ' + e.prenom, e.nom , theme)}
            >
              {e.nom + ' ' + e.prenom}
            </MenuItem>
          ))}
        </Select>
      </FormControl>


      </div>
      
      </Grid>
      
        
      
        
      
      <Button  type="submit" className='button-create-dialog'  style={{backgroundColor:'#2ecc71' , color:'#FFF'}} color="inherit" >
                    save
                  </Button>
      
                 
      </Grid>

    )

       
 
    
         
            
    }