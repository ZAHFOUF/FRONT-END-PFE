import React,{useState} from 'react';
import queryString from 'query-string';
import { useSelector } from 'react-redux';
import { Typography } from '@mui/material';





export default function ProjectSearch(props) {

  const projects = useSelector((state)=>{
    return state.projects
})


    const qu = window.location.search ;
    const params = queryString.parse(qu)

    const projectFilter = projects.filter((e)=> e.id === params.q )

    const project = projectFilter.length > 0 ? projectFilter[0] : null

 

  return (
    <>
    

    {projectFilter.length > 0 && 
    <div>

<Typography variant="h4" gutterBottom>
{project.name}
          </Typography>
      
      <p>
        {JSON.stringify(project)}
      </p>


    </div> }

  
    
    
    </>
  );
}


// mdi:bank-circle-outline
