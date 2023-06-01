import { Typography } from '@mui/material';
import React from 'react';
import Phases from '../components/phases-panel';




export default function PhasesPage (props){


    return(
        <>

        

           <Phases access={props.access} />
        
        
        
        </>
        
    )
}