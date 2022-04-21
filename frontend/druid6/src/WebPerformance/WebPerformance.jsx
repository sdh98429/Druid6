import * as React from 'react';
import { styled } from '@mui/material/styles';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';

import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

const StyledTabs = styled((props) => (
  <Tabs
    {...props}
    TabIndicatorProps={{ children: <span className="MuiTabs-indicatorSpan" /> }}
  />
))({
  '& .MuiTabs-indicator': {
    display: 'flex',
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },
  '& .MuiTabs-indicatorSpan': {
    maxWidth: 40,
    width: '100%',
    backgroundColor: '#635ee7',
  },
});

const StyledTab = styled((props) => <Tab disableRipple {...props} />)(
  ({ theme }) => ({
    textTransform: 'none',
    fontWeight: theme.typography.fontWeightRegular,
    fontSize: theme.typography.pxToRem(15),
    marginRight: theme.spacing(1),
    color: 'rgba(255, 255, 255, 0.7)',
    '&.Mui-selected': {
      color: '#fff',
    },
    '&.Mui-focusVisible': {
      backgroundColor: 'rgba(100, 95, 228, 0.32)',
    },
  }),
);

export default function WebPerformance() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Item>
              <h2>GTmetrix Grade</h2>
              <Grid container>
                <Grid item xs={4}>A</Grid>
                <Grid item xs={4}>Performance</Grid>
                <Grid item xs={4}>Structure</Grid>
              </Grid>
            </Item>
          </Grid>
          <Grid item xs={6}>
            <Item>
              <h2>Web Vitals</h2>
              <Grid container>
                <Grid item xs={4}>LCP</Grid>
                <Grid item xs={4}>TBT</Grid>
                <Grid item xs={4}>CLS</Grid>
              </Grid>
            </Item>
          </Grid>
        </Grid>
      </Box>
      <Box sx={{ bgcolor: '#2e1534' }}>
        <StyledTabs
          value={value}
          onChange={handleChange}
          aria-label="styled tabs example"
        >
          <StyledTab label="Summary" />
          <StyledTab label="Performance" />
          <StyledTab label="Structure" />
          <StyledTab label="Waterfall" />
          <StyledTab label="Video" />
          <StyledTab label="History" />
        </StyledTabs>
        <Box sx={{ p: 3 }} />
      </Box>
    </Box>
  );
}
