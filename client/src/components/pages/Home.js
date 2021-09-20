import React, { Fragment } from 'react';
import BottleForm from '../bottles/form/BottleForm';
import Inventory from '../bottles/Inventory';
import Dashboard from '../bottles/Dashboard';

import Grid from '@material-ui/core/Grid';

const Home = () => {
  return (
    <Fragment>
      <Grid container spacing={2} alignItems='center'>
        <Grid item xs={12} sm={6}>
          <Dashboard />
        </Grid>
        <Grid item xs={12} sm={6} container>
          <Grid item xs />
          <Grid item xs={8}>
            <BottleForm />
          </Grid>
          <Grid item xs />
        </Grid>
        <Grid item xs={12}>
          <Inventory />
        </Grid>
      </Grid>
    </Fragment>
  );
};

export default Home;
