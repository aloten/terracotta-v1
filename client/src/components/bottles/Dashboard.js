import React from 'react';

import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';

const Dashboard = () => {
  return (
    <Grid container spacing={1}>
      <Grid item xs={4}>
        <Paper> Wine in cellar</Paper>
      </Grid>
      <Grid item xs={4}>
        <Paper> Wine pending delivery</Paper>
      </Grid>
      <Grid item xs={4}>
        <Paper>Wine consumed</Paper>
      </Grid>
      <Grid item xs={4}>
        <Paper>Wine purchased</Paper>
      </Grid>
      <Grid item xs={3}>
        <Paper>Wine ready to drink</Paper>
      </Grid>
      <Grid item xs={3}>
        <Paper>Total estimated value</Paper>
      </Grid>
      <Grid item xs={2}>
        <Paper>Estimated return</Paper>
      </Grid>
    </Grid>
  );
};

export default Dashboard;
