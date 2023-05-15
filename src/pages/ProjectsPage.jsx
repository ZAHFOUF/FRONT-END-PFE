import React,{useState} from 'react';
import { Button, Grid ,  } from '@mui/material'
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import { useSelector } from 'react-redux';



import ProjectsList from '../components/projects/index';
import Iconify from '../components/iconify';

import logo from '../favicon-32x32.png'





export default function LabTabs() {
  const [value, setValue] = useState('1');

  const projects = useSelector((state)=>{
      return state.projects
  })


  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const addProject = () => {
    console.log("ok");
  
  }

  return (
    <>

   

    


    <Grid container sx={{alignItems:'center' , marginTop:'-30px'}} spacing={2}>
  <Grid item sm={4}  xs={8}>
    <Grid> <h2 style={{marginLeft:'10px'}}> Projects </h2> </Grid>
  </Grid>
  <Grid item sm={8} xs={4}>
    <div style={{display:'flex' , flexDirection:'row-reverse'}}>  
     

    <Button onClick={addProject} sx={{ marginLeft:'20px'}} color='secondary' variant="contained" startIcon={ <Iconify color='#FFF' icon='material-symbols:create-new-folder-outline'  />}>
 Create
</Button>

<Button sx={{color:'#000' }}  color='info' variant="outlined" startIcon={ <Iconify color='#000' icon='mdi:users'  />}>
 Share
</Button>




</div>
  </Grid>
  
 
</Grid>

    

   

    

<Box mt={1} sx={{ width: '100%', typography: 'body1'  }}>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <TabList onChange={handleChange} aria-label="lab API tabs example">
            <Tab label="View All" value="1" />
            <Tab label="In progress" value="2" />
            <Tab label="Completed" value="3" />
            <Tab label="Canceled" value="4" />
          </TabList>
        </Box>
        <TabPanel value="1"> <ProjectsList projects={projects} type={'all'}/> </TabPanel>
        <TabPanel value="2">  <ProjectsList projects={projects} type={'In'}/> </TabPanel>
        <TabPanel value="3">  <ProjectsList projects={projects} type={'Com'}/> </TabPanel>
        <TabPanel value="4"> <ProjectsList projects={projects} type={'Can'}/> </TabPanel>
      </TabContext>
    </Box>
    </>
    
  );
}

