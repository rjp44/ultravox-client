import { useState } from 'react';
import Grid from '@mui/joy/Grid';
import Typography from '@mui/joy/Typography';
import Transcript from '../components/Transcript';
import Container from '@mui/material/Container';

import Ultravox from '../components/Ultravox';




export default function Home() {
  const [state, setState] = useState(false);
  const [transcript, setTranscript] = useState([]);
  return (
    <Container sx={{ display: 'flex', width: '100%' }}>
      <Grid container spacing={2} sx={{ flexGrow: 1 }}>
        <Grid item xs={12}>
          <Typography variant="h4">
            Ultravox test page
          </Typography>
        </Grid>
        <Grid item xs={12} sm={6} >
          <Ultravox {...{state, setState, transcript, setTranscript}} />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Transcript sx={{ m: 1 }} transcript={transcript} />
        </Grid>
      </Grid>
    </Container >
  );
}
