import React from 'react';
import { Container, Grid } from '@mui/material';
import { LoginForm } from 'components/LoginForm';

export const Login: React.FC = () => {
  return (
    <Container maxWidth="xl" sx={{ pt: 5 }}>
      <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justifyContent="center"
        sx={{ minHeight: '100vh' }}>
        <Grid item xs={3}>
          <LoginForm />
        </Grid>
      </Grid>
    </Container>
  );
};
