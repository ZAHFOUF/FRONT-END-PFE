import React,{useState} from 'react';
import queryString from 'query-string';
import { useSelector } from 'react-redux';
import { Card, Typography , CardContent , Avatar  , Grid , Container   } from '@mui/material';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import { ProgressBar } from '../components/progress/index';
import Iconify from '../components/iconify';
import Phases from '../components/phases-panel';



// material-symbols:star-rate-rounded



export default function ProjectSearch(props) {

  const projects = useSelector((state)=>{
    return state.projects
})


    const qu = window.location.search ;
    const params = queryString.parse(qu)

    const projectFilter = projects.filter((e)=> e.id === Number(params.q)  )

    const project = projectFilter.length > 0 ? projectFilter[0] : null

    const classDesign = props.status === 'Can' ? 'can_case' : 'normal_case'


  return (
    <>
    

    {projectFilter.length === 1  && 

    <>

   

<Container maxWidth="lg">



<Typography variant="h4" sx={{marginBottom: '13px',  marginLeft: '15px'}} component="div">
         {project.name} 
        </Typography>
    

        <Grid container padding={'10px'} spacing={2}>
        <Grid item xs={12} md={8} lg={8}>
    
    <Card sx={{ minWidth: 275 , position:'relative' }} className={classDesign} >
      <CardContent >



        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
           le {project.start_date} a {project.end_date}
        </Typography>
        <Typography pt={1} variant="body2">
          {project.des}
        </Typography>
        <img width={100} style={{marginTop:'15px'}} src={project.org.cover} alt='org' loading='lazy' />
        <Typography pt={1} style={{display:'flex',alignItems:'center'}} variant="body3">
        <Avatar sx={{ bgcolor: 'rgb(76, 175, 80)' ,width:'35px' , height:'35px'}}><AccountBalanceIcon sx={{fontSize:'1.3rem'}}/> </Avatar>  <p style={{paddingLeft:'7px'}}>  {project.budget} </p>
        </Typography>

        <ProgressBar color={'#2ecc71'}  value={project.progress} />
     
      </CardContent>
     
      

     
    </Card>
    
    
  </Grid>

  <Grid item xs={12} md={4} lg={4}>
    <Card  sx={{justifyContent:'center' , height:'100%' , alignContent:'center'}} >

      <CardContent>

      <Typography variant="h5" className='align1' textAlign={'center'}   sx={{marginBottom: '13px',  marginLeft: '15px'}} component="div">
      <Iconify sx={{width:'25px' , height:'25px'}} icon={'material-symbols:star-rate-rounded'} color={'#f1c40f'} />      <span> chef de project</span>  
        </Typography>

        <Avatar    sx={{ width: '100%', height: '100%'   }} alt={project.chef.name} src={project.chef.photo} />

        <Typography variant="p" textAlign={'center'}  sx={{ marginLeft: '15px' , marginTop:'20px'}} component="div">
          {project.chef.name}
        </Typography>


      </CardContent>

    </Card>
    
  </Grid>

  </Grid>

       


        <Typography variant="h4" sx={{marginBottom: '13px',  marginLeft: '15px' , marginTop:'40px'}} component="div">
          Phases Of The Project
        </Typography>

              

          <Phases project={Number(params.q)} access={props.access.phases} />


    




    </Container>





    
    
    
    
    </>




    }

  
    
    
    </>
  );
}


// mdi:bank-circle-outline
