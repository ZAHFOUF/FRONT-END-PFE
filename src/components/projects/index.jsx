import PropTypes from 'prop-types';
// @mui
import { Grid } from '@mui/material';
import Projectcart from './projectCard';

// ----------------------------------------------------------------------

ProjectsList.propTypes = {
  projects: PropTypes.array.isRequired,
  type:PropTypes.string.isRequired
};

export default function ProjectsList({ projects, type , ...other }) {

 let  projectFilter = projects.filter((e)=> e.status === type )

 if (type === 'all') {
    projectFilter = projects
 }
  return (
    <Grid container spacing={3} {...other}>
      {projectFilter.map((project) => (
        <Grid key={project.id} item xs={12} sm={6} md={4}>
          <Projectcart project={project} />
        </Grid>
      ))}
    </Grid>
  );
}
