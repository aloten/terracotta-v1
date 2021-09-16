import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';

const Dashboard = ({ bottleState: { cellarStats } }) => {
  const {
    wineInCellar,
    winePending,
    wineConsumed,
    winePurchased,
    readyToDrink,
    totalValue,
  } = cellarStats;

  return (
    <Grid container spacing={1}>
      <Grid item xs={4}>
        <Paper> Wine in cellar: {wineInCellar}</Paper>
      </Grid>
      <Grid item xs={4}>
        <Paper> Wine pending delivery: {winePending}</Paper>
      </Grid>
      <Grid item xs={4}>
        <Paper>Wine consumed: {wineConsumed}</Paper>
      </Grid>
      <Grid item xs={4}>
        <Paper>Wine purchased: {winePurchased}</Paper>
      </Grid>
      <Grid item xs={4}>
        <Paper>Wine ready to drink: {readyToDrink}</Paper>
      </Grid>
      <Grid item xs={4}>
        <Paper>Total estimated value: {totalValue}</Paper>
      </Grid>
    </Grid>
  );
};

Dashboard.propTypes = {
  bottleState: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  bottleState: state.bottleState,
});

export default connect(mapStateToProps)(Dashboard);
