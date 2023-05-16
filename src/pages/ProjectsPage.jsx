/* eslint-disable prefer-arrow-callback */
import React,{forwardRef, useState} from 'react';
import { Button, Grid ,  } from '@mui/material'
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import { useSelector } from 'react-redux';

import Dialog from '@mui/material/Dialog';
import ListItemText from '@mui/material/ListItemText';
import ListItem from '@mui/material/ListItem';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide'

import ProjectsList from '../components/projects/index';
import Iconify from '../components/iconify';

import logo from '../favicon-32x32.png'



export default function LabTabs() {
  const [value, setValue] = useState('1');
  const [open1,setOpen1] = useState(false)

 

  const handleClose1 = () => {
    setOpen1(false);
  };

  const projects = useSelector((state)=>{
      return state.projects
  })


  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const addProject = () => {
    setOpen1(true)
  
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


   

    <Dialog
        fullScreen
        open={open1}
        onClose={handleClose1}
       
      >
        <AppBar sx={{ position: 'relative' }}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose1}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              Sound
            </Typography>
            <Button autoFocus color="inherit" onClick={handleClose1}>
              save
            </Button>
          </Toolbar>
        </AppBar>
        <List>
          <ListItem button>
            <ListItemText primary="Phone ringtone" secondary="Titania" />
          </ListItem>
          <Divider />
          <ListItem button>
            <ListItemText
              primary="Default notification ringtone"
              secondary="Tethys"
            />
          </ListItem>
        </List>
      </Dialog>

      
    </>
    
  );
}

