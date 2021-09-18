import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles((theme) => ({
  item: {
    height: '100%',
    padding: '5px',
    textAlign: 'center',
  },
  title: {
    color: '#575757',
  },
  number: {
    color: 'black',
  },
}));

const Dashboard = ({ bottleState: { cellarStats } }) => {
  const classes = useStyles();

  const {
    wineInCellar,
    winePending,
    wineConsumed,
    winePurchased,
    readyToDrink,
    totalValue,
  } = cellarStats;

  return (
    <Grid container spacing={2} className={classes.container}>
      <Grid item xs={6} lg={4}>
        <Paper className={classes.item}>
          <span className={classes.title}>Wine in cellar</span> <br />
          <h3 className={classes.number}>{wineInCellar}</h3>
        </Paper>
      </Grid>
      <Grid item xs={6} lg={4}>
        <Paper className={classes.item}>
          <span className={classes.title}> Wine pending delivery</span> <br />
          <h3 className={classes.number}>{winePending}</h3>
        </Paper>
      </Grid>
      <Grid item xs={6} lg={4}>
        <Paper className={classes.item}>
          <span className={classes.title}> Wine consumed</span> <br />
          <h3 className={classes.number}>{wineConsumed}</h3>
        </Paper>
      </Grid>
      <Grid item xs={6} lg={4}>
        <Paper className={classes.item}>
          <span className={classes.title}> Wine purchased</span> <br />
          <h3 className={classes.number}>{winePurchased}</h3>
        </Paper>
      </Grid>
      <Grid item xs={6} lg={4}>
        <Paper className={classes.item}>
          <span className={classes.title}> Wine ready to drink</span> <br />
          <h3 className={classes.number}>{readyToDrink}</h3>
        </Paper>
      </Grid>
      <Grid item xs={6} lg={4}>
        <Paper className={classes.item}>
          <span className={classes.title}> Total estimated value</span>
          <br />
          <h3 className={classes.number}>{totalValue}</h3>
        </Paper>
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
