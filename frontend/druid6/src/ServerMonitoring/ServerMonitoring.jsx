import './ServerMonitoring.css';
import { Grid } from '@mui/material';
// import { flexbox } from '@mui/system';
import Box from '@mui/material/Box';


export default function ServerMonitoring() {
  return (
    <div className='container'>
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <h1 className='header'>Server Workload</h1>
        <h1 className='header'>13:44</h1>
      </Box>
      <Grid container spacing={3}>
        <Grid item xs={4}>
          <div className='grid-item'></div>
        </Grid>
        <Grid item xs={4}>
          <div className='grid-item'>
            <h2 className='grid-item-h2'>CPU</h2>
          </div>
        </Grid>
        <Grid item xs={4}>
          <div className='grid-item'></div>
        </Grid>
        <Grid item xs={4}>
          <div className='grid-item'></div>
        </Grid>
        <Grid item xs={8}>
          <div className='grid-item'></div>
        </Grid>
      </Grid>
    </div>
  )
}
