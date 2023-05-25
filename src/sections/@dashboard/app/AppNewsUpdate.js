// @mui
import PropTypes from 'prop-types';
import { Box, Stack, Link, Card, Button, Divider, Typography, CardHeader } from '@mui/material';
import _, { uniqueId } from 'lodash';
import { useState } from 'react';

// utils
import { fToNow } from '../../../utils/formatTime';
// components
import Iconify from '../../../components/iconify';
import Scrollbar from '../../../components/scrollbar';

// ----------------------------------------------------------------------



AppNewsUpdate.propTypes = {
  title: PropTypes.string,
  subheader: PropTypes.string,
  list: PropTypes.array.isRequired,
};

export default function AppNewsUpdate({ title, subheader, list , ...other }) {

  const [limit,setLimit] = useState(5)
  return (
    <Card {...other}>
      <CardHeader  title={title} subheader={subheader} />

      <Scrollbar>
        <Stack spacing={3} sx={{ p: 3, pr: 0 }}>
          {_.take(list, limit).map((e) => (
            <NewsItem key={uniqueId('dev-')} list={e} />
          ))}
        </Stack>
      </Scrollbar>

      <Divider />

      <Box sx={{ p: 2, textAlign: 'right' , display: limit >= list.length ? 'none' : 'block' }}>
        <Button onClick={ ()=> setLimit(limit + 5)} size="small" color="inherit" endIcon={<Iconify icon={'eva:arrow-ios-forward-fill'} />}>
          View all
        </Button>
      </Box>
    </Card>
  );
}

// ----------------------------------------------------------------------



function NewsItem({ list }) {
  const { description , name , filePath , code ,phase } = list;

  return (
    <Stack  component={'a'} target='_blank' href={filePath} direction="row" alignItems="center" spacing={2}>

      <Box sx={{ minWidth: 240, flexGrow: 1 }}>
        <Link color="inherit" variant="subtitle2" underline="hover" noWrap>
          {name}
        </Link>

        <Typography variant="body2" sx={{ color: 'text.secondary' }} noWrap>
          {description}
        </Typography>
      </Box>

      <Typography variant="caption" sx={{ pr: 3, flexShrink: 0, color: 'text.secondary' }}>
       phase CP-{phase}
      </Typography>
    </Stack>
  );
}
