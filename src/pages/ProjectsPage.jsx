/* eslint-disable prefer-arrow-callback */
import React, { forwardRef, useEffect, useState } from 'react';
import { Button, Container, Typography, Grid , Input, InputAdornment, OutlinedInput, TextField, InputLabel, Select, MenuItem, FormControl } from '@mui/material';
import { AccountCircle } from '@mui/icons-material';
import { useForm } from 'react-hook-form';

import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import { useDispatch, useSelector } from 'react-redux';
import { doc , getDoc , setDoc } from "firebase/firestore";
import { db } from '../firebase.setting';
import DialogCreate from '../components/dailog-create';
import ProjectsList from '../components/projects/index';
import Iconify from '../components/iconify';
import { useContextProvider } from '../context/contextProvider';



import logo from '../favicon-32x32.png';
import { filterProjects, loadProjects } from '../store/res/projects';
import { FormCreateProject } from '../components/form-create-project';
import { actionsProjects } from '../store';






export default function LabTabs(props) {
  const [value, setValue] = useState('1');
  const [open1, setOpen1] = useState(false);
  const [project,setProjects] = useState([])
  const dipatch = useDispatch()
 

  const { user , can } = useContextProvider()

 

 


  const handleClose1 = () => {
    setOpen1(false);
  };

  

 

  const projects = useSelector((state) => state.projects);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
 
  const addProject = () => {
    setOpen1(true);
  };

  useEffect(()=>{

    if (can("read-his-project") && !can("read-project")) {

     
      filterProjects((e)=> dipatch(actionsProjects.loadProjects(e.projects)),(e)=> console.log(e),user.id)

      
    }else if (can("read-project")){
      loadProjects((e)=> dipatch(actionsProjects.loadProjects(e.projects)),(e)=> console.log(e))
    }
    
  },[can("read-his-project"),can("read-project")]) 

  
  
  

  return (
    <>
      <Grid  container sx={{ alignItems: 'center', marginTop: '-30px' }} spacing={2}>
        <Grid item sm={4} xs={6}>
          <Grid>
            <h2 style={{ marginLeft: '10px' }}> Projects </h2>
          </Grid>
        </Grid>
        <Grid item sm={8} xs={6}>
          <div style={{ display: 'flex', flexDirection: 'row-reverse' }}>
            {
              can("create-project") &&    <Button
              onClick={addProject}
              sx={{ marginLeft: '20px' }}
              color="secondary"
              variant="contained"
              
              startIcon={<Iconify color="#FFF" icon="material-symbols:create-new-folder-outline" />}
            >
              Create
            </Button>
            }
          
            <Button
              sx={{ color: '#000' }}
              color="info"
              variant="outlined"
              startIcon={<Iconify color="#000" icon="mdi:users" />}
            >
              Share
            </Button>
          </div>
        </Grid>
      </Grid>
      <Box mt={1} sx={{ width: '100%', typography: 'body1' }}>
        <TabContext value={value}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <TabList onChange={handleChange} aria-label="lab API tabs example">
              <Tab label="View All" value="1" />
              <Tab label="In progress" value="2" />
              <Tab label="Completed" value="3" />
              <Tab label="Canceled" value="4" />
            </TabList>
          </Box>
          <TabPanel value="1">
            <ProjectsList setOpen={setOpen1}  projects={projects} type={'all'} />
          </TabPanel>
          <TabPanel value="2">
            <ProjectsList  setOpen={setOpen1} projects={projects} type={'In'} />
          </TabPanel>
          <TabPanel value="3">
            <ProjectsList setOpen={setOpen1} projects={projects} type={'Com'} />
          </TabPanel>
          <TabPanel value="4">
            <ProjectsList  setOpen={setOpen1} projects={projects} type={'Can'} />
          </TabPanel>
        </TabContext>
      </Box>

     
      <DialogCreate childern={ <FormCreateProject setOpen={setOpen1} type={'create'}/>} res={'Project'} open={open1} setOpen={setOpen1}/>
        


   
     
    </>
  );
}
