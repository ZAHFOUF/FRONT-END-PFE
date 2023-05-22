/* eslint-disable prefer-template */
/* eslint-disable react/jsx-key */
import React, { useEffect, useState } from 'react';
import { Button, Container, Typography, Grid , Input, InputAdornment, OutlinedInput, TextField, InputLabel, Select, MenuItem, FormControl } from '@mui/material';
import { AccountCircle } from '@mui/icons-material';
import { useForm } from 'react-hook-form';
import axiosClient from '../../api/axios';
import { Toast } from '../aleart';









export const FormCreateProject = ({type , project , setOpen}) => {

    const { register, handleSubmit } = useForm();


    const [chef,setChef] = useState(type === 'create' ? ' s' : project.chef.name)
    const [chefs,setChefs] = useState([])
    const [org,setOrg] = useState(type === 'create' ? 'IAM' : project.org.name)

    const handleChange2 = (event, newValue) => {
        setChef(event.target.value)
     };
   
     const handleChange3 = (event, newValue) => {
       setOrg(event.target.value)
    };

   const Send = (data)=>{
        if (type === 'edit') {
        
            setOpen(false)
            Toast.fire({icon : "success" ,  title:"Project Edited !" })
            console.log('edit',data);
        }else{
            setOpen(false)
            Toast.fire({icon : "success" ,  title:"Project Created !" })
            console.log('create',data);
        }
   }

   useEffect(()=>{
         
        axiosClient.get("/api/users").then((e)=>{
             const users  = e.data.data

            const chefs =   users.filter((e)=> e.role[0].name === 'chef_projet')

            setChefs(chefs)


        })

        



   },[])

   



    return(

        <Grid container onSubmit={handleSubmit((data)=> Send(data))}    component='form' spacing={4}>
    
        <Grid item sm={6} xs={12} md={6} >
      
        <div style={{padding:'20px'}}>
      
      
      <TextField {...register('name',{value: type === 'create' ? ' ' : project.name})} required fullWidth   id="outlined fullWidth" autoFocus label="Nom de Project" variant="outlined" />
      
      <TextField
      required
          id="outlined-multiline-static"
          {...register('des' ,{ value: type === 'create' ? ' ' : project.des } )}
          label="Description"
          multiline
         fullWidth
          style={{marginTop:'20px'}}
          rows={4}
          placeholder='Ce project ...'
        />
      
        
      
      <OutlinedInput
      {...register('budget' ,{ value: type === 'create' ? 1000 : project.budget })}
      required
                  placeholder='10000'
                  style={{marginTop:'20px'}}
                  fullWidth
                  id="outlined-adornment-weight outlined-number fullWidth"
                  type='number'
                  endAdornment={<InputAdornment position="end">DH</InputAdornment>}
                  aria-describedby="outlined-weight-helper-text"
                  inputProps={{
                    'aria-label': 'weight',
                  }}
                />
      
      <FormControl  sx={{mt:5}} fullWidth>
      <InputLabel id="demo-simple-select-autowidth-label"> Organisme </InputLabel>
      <Select
      {...register('org' )}

      value={org}
      
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
          
          <MenuItem value={'IAM'}> IAM </MenuItem>
          <MenuItem value={'IBM'}> IBM </MenuItem>
        </Select>
      
      </FormControl>
      
                
      
      </div>
      
        </Grid>
      
        <Grid item sm={6} xs={12} md={6} >
      
      <div style={{padding:'20px'}}>
      
      
      
      <Typography  style={{marginLeft : '0px'}} sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
                    Start in
                  </Typography>
      
      <Input  {...register('startDate' , { value: type === 'create' ? ' ' : project.startDate })} required type='date' fullWidth   />
      
      <Typography style={{marginLeft : '0px'}} sx={{ ml: 2, flex: 1 , mt:4 }} variant="h6" component="div">
                    Start end
                  </Typography>
      
      <Input  {...register('startEnd' , { value: type === 'create' ? ' ' : project.startEnd })} required type='date' fullWidth   />
      
      <FormControl  sx={{mt:5}} fullWidth>
      <InputLabel id="demo-simple-select-autowidth-label"> Chef de Project </InputLabel>
      <Select
       {...register('chef' )}
      required
          id="demo-simple-select"
          value={chef}
          fullWidth
          onChange={handleChange2}
          startAdornment={
            <InputAdornment position="start">
              <AccountCircle />
            </InputAdornment>
          }
        >
         {chefs.map((e)=> <MenuItem value={e.id}> {e.nom + ' ' + e.prenom } </MenuItem> )}
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