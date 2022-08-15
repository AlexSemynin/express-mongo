import { Grid, Paper } from '@mui/material';
import { Container } from '@mui/system';
import React from 'react';
import urlJoin from 'url-join';
import { Header } from './components/Header/Header';


export const App = () => {
  return(
    <>
      <header>
        <Header/>
      </header>
      <main>
      </main>
      <footer>

      </footer>
    </>
  )
}


{/* <Paper style={{ backgroundImage: `url(${urlJoin(window.location.origin, '/static', '/headerMount.jpg')})`, backgroundRepeat: 'round'}}>
  <Container fixed>
    <Grid container>
      <Grid item>alo</Grid>
    </Grid>
  </Container>
</Paper> */}