import { Container , Typography } from '@mui/material';
import React from 'react';
import SvgColor from '../svg-color/SvgColor';



export function AdblockStop () {

    
    

    return(


        <Container className='center-childs' maxWidth={'100%'}>

            <Typography textAlign={'center'} variant='h3'>

             Adblock Detected ! 

            </Typography>

           <img style={{width: '228px' , margin: '20px'}} src='/assets/icons/error.svg' alt='error' width={'50%'} />



            <Typography textAlign={'center'} variant='h6' >

            We noticed that you have an adblocker enabled.

To continue enjoying our software and supporting our content, we kindly ask you to disable your adblocker for this site.

Ads play a crucial role in maintaining the quality and availability of free content on the web. By disabling your adblocker, you help us generate revenue to sustain our operations and provide you with valuable information.

If you're unsure how to disable your adblocker, please refer to the instructions specific to the adblocker you're using or search for guides online. Once you've disabled it, refresh the page to access the full content.

Thank you for your understanding and support!


</Typography>

        </Container>
        
    )



}