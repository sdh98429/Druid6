import * as React from 'react';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

export default function DirectionStack() {
  return (
    <Box sx={{ flexGrow: 1 }}>
    <Grid container spacing={3}>
      <Grid item xs={6}>
        <Item>    <Stack direction="column" spacing={2}>
            <TextField id="outlined-basic" label="Value1" variant="outlined" />
            <TextField id="outlined-basic" label="Value2" variant="outlined" />
            <TextField id="outlined-basic" label="Value3" variant="outlined" />
            <TextField id="outlined-basic" label="Value4" variant="outlined" />
          </Stack>
          <Item>
            <Button
              variant="contained"
              onClick={() => {
                alert("clicked");
              }}
            >
              시나리오
            </Button>
          </Item></Item>
      </Grid>
      <Grid item xs={6}>
        <Item><Stack direction="column" spacing={2}>
            <Box
              component="img"
              sx={{
                height: 233,
                width: 350,
                maxHeight: { xs: 233, md: 167 },
                maxWidth: { xs: 350, md: 250 },
              }}
              alt="The house from the offer."
              src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&w=350&dpr=2"
            />
            <item>
            <Button
              variant="contained"
              onClick={() => {
                alert("clicked");
              }}
            >
                
              부하테스트 실시
            </Button>
            </item>
          </Stack></Item>
      </Grid>
     
    </Grid>
  </Box>
    
  );
}
