import { Helmet } from 'react-helmet-async';
// @mui
import { useTheme } from '@mui/material/styles';
import { Grid, Container, Typography } from '@mui/material';
// components
import Iconify from '../components/iconify';

import {
  AppWidgetSummary,

} from '../sections/@dashboard/app';




// ----------------------------------------------------------------------

export default function DashboardAppPage() {
  const theme = useTheme();

  
  return (
    <>
      <Helmet>
        <title> Dashboard | Minimal UI </title>
      </Helmet>

      <Container maxWidth="xl">
        <Typography variant="h4" sx={{ mb: 5 }}>
          Hi, Welcome back
        </Typography>

        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary  title="Projects" total={4} icon={'eos-icons:project'} />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary title="Employees" total={7} color="info" icon={'teenyicons:users-solid'} />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary title="organismes" total={4} color="warning" icon={'mdi:partnership'} />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary title="deliverables" total={2} color="success" icon={'fluent-mdl2:completed'} />
          </Grid>
        
        </Grid>
      </Container>
    </>
  );
}
