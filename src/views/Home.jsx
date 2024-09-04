import Grid from '@mui/joy/Grid';
import Typography from '@mui/joy/Typography';
import Textarea from '@mui/joy/Textarea';
import Button from '@mui/joy/Button';
import Transcript from '../components/Transcript';
import Container from '@mui/material/Container';




export default function Home() {
  return <Container sx={{display: 'flex', width: '100%'}}>
    <Grid container spacing={2} sx={{ flexGrow: 1 }}>
    <Grid item xs={12}>
      <Typography variant="h4">
        Ultravox test page
      </Typography>
    </Grid>
    <Grid item xs={12} sm={6} >
      <Textarea label="prompt" size="lg" minRows={10} variant="outlined" sx={{ width: '100%', m: 1 }} />
      <Button variant="solid">Start</Button>

    </Grid>
    <Grid item xs={12} sm={6}>
        <Transcript sx={{ m: 1 }}/>
    </Grid>
    </Grid>
  </Container>
}
  