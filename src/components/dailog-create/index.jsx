import React,{ useState} from 'react'
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
import { Button } from '@mui/material';





export default function DialogCreate ({res,open,setOpen,childern  , type}){

    const handleClose = ()=>{
        setOpen(false)
   }

  

   const headline = type === 'edit' ? 'Edit' : 'Create'


    return(  
        <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        
        >
        <AppBar sx={{ position: 'relative' }}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              {headline} A New {res}
            </Typography>
         
          </Toolbar>
        </AppBar>
         {childern}
        </Dialog>

    )

   

}

