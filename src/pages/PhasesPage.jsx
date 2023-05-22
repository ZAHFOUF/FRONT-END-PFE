import { Typography } from '@mui/material';
import React from 'react';
import Phases from '../components/phases-panel';




export default function PhasesPage (props){


    return(
        <>

           <Typography variant='h4'>
              Phase Of the Project
           </Typography>

           <Phases access={props.access} />
        
        
        
        </>
        
    )
}