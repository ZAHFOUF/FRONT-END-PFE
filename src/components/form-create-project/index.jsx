/* eslint-disable prefer-template */
/* eslint-disable react/jsx-key */
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import { Button, Container, Typography, Grid , Input, InputAdornment, OutlinedInput, TextField, InputLabel, Select, MenuItem, FormControl } from '@mui/material';
import { AccountCircle } from '@mui/icons-material';
import { useForm } from 'react-hook-form';
import axiosClient from '../../api/axios';
import { Toast } from '../aleart';
import { addProject, editProject } from '../../store/res/projects';
import { actionsProjects } from '../../store';










export const FormCreateProject = ({type , project , setOpen}) => {

    const { register, handleSubmit } = useForm();
    const dispatch = useDispatch()
    console.log(project);


    const [chef,setChef] = useState(type === 'create' ? ' ' : project.chef.name)
    const [status,setStatus] =useState(type === 'create' ? ' ' : project.status)
    const [chefs,setChefs] = useState([])
    const [org,setOrg] = useState(type === 'create' ? 'IAM' : project.org.name)

    const [orgs,setOrgs] = useState([])

    const handleChange2 = (event, newValue) => {
        setChef(event.target.value)
     };
   
     const handleChange3 = (event, newValue) => {
       setOrg(event.target.value)
    };

    const handleChange4 = (event, newValue) => {
      setStatus(event.target.value)
   };

   const Send = (data)=>{
        if (type === 'edit') {
          data.progress= project.progress
        console.log(data);
          editProject((e)=>{ dispatch(actionsProjects.upProjects({id:project.id,data:e.project}));  setOpen(false) ;Toast.fire({icon : "success" ,  title:"Project Created !" }) },(e)=>{console.log(e); Toast.fire({icon : "error" ,  title:'error in database !' })},data,project.id)

        }else{

          data.progress= 0
          data.status = 'In'
          console.log(data);
            addProject((e)=>{ dispatch(actionsProjects.addProjects(e.project));  setOpen(false) ;Toast.fire({icon : "success" ,  title:"Project Created !" }) },(e)=> Toast.fire({icon : "error" ,  title:'error in database !' }),data)
           
            
            
        }
   }

   useEffect(()=>{
         
        axiosClient.get("/api/users").then((e)=>{
             const users  = e.data.data

            const chefs =   users.filter((e)=> e.role[0].name === 'chef_projet')

            setChefs(chefs)


        })

        axiosClient.get("/api/organisations").then((e)=>{
          const data  = e.data.organisations

     

         setOrgs(data)


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
          
          {orgs.map((e)=> <MenuItem value={e.id}> {e.name} </MenuItem> )}
        </Select>
      
      </FormControl>
      
                
      
      </div>
      
        </Grid>
      
        <Grid item sm={6} xs={12} md={6} >
      
      <div style={{padding:'20px'}}>
      
      
      
      <Typography  style={{marginLeft : '0px'}} sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
                    Start in
                  </Typography>
      
      <Input  {...register('start_date' , { value: type === 'create' ? ' ' : project.start_date })} required type='date' fullWidth   />
      
      <Typography style={{marginLeft : '0px'}} sx={{ ml: 2, flex: 1 , mt:4 }} variant="h6" component="div">
                    Start end
                  </Typography>
      
      <Input  {...register('end_date' , { value: type === 'create' ? ' ' : project.end_date })} required type='date' fullWidth   />
      
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
      

      <FormControl  sx={{mt:5}} fullWidth>
      <InputLabel id="demo-simple-select-autowidth-label"> Status </InputLabel>
      <Select
       {...register('status' )}
      required
          id="demo-simple-select"
          value={status}
          fullWidth
          onChange={handleChange4}
          startAdornment={
            <InputAdornment position="start">
              <AccountCircle />
            </InputAdornment>
          }
        >
        <MenuItem value={'In'}>In progress</MenuItem>
        <MenuItem value={'Com'}>Completed</MenuItem>
        <MenuItem value={'Can'}>Canceled</MenuItem>
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