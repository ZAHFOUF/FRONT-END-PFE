import PropTypes from 'prop-types';
import { useState } from 'react';

// @mui
import { Grid } from '@mui/material';
import Projectcart from './projectCard';
import DialogCreate from '../dailog-create';
import { FormCreateProject } from '../form-create-project';

// ----------------------------------------------------------------------

ProjectsList.propTypes = {
  projects: PropTypes.array.isRequired,
  type:PropTypes.string.isRequired
};



export default function ProjectsList({ projects, access , setOpen , type , ...other }) {

  const [edit,setEdit] = useState(false)
  const [project,setProject] = useState({})

  const handelEdit =(pro)=>{
        setEdit(true)
        
  }

 let  projectFilter = projects.filter((e)=> e.status === type )

 if (type === 'all') {
    projectFilter = projects
 }
  return (
    <Grid container spacing={3} {...other}>
      {projectFilter.map((project) => (
        <Grid key={project.id} item xs={12} sm={6} md={4}>
          <Projectcart access={access} edit={edit} setEdit={handelEdit} project={project} setProject={setProject} />
        </Grid>
      ))}


<DialogCreate childern={<FormCreateProject type={'edit'} setOpen={setEdit} project={project} />} setsubmitEdit  type={'edit'} res={'Project'}  open={edit} setOpen={setEdit}  />

    </Grid>
  );
}
