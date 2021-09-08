import React, { useState, useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import AlertContext from '../../context/alert/AlertContext';
import AuthContext from '../../context/auth/AuthContext';

import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles((theme) => ({
  container: {
    padding: theme.spacing(3),
  },
  paper: {
    padding: 20,
    height: '70vh',
    width: '40%',
    margin: '20px auto',
  },
  btn: {
    background: '#800020',
    color: 'white',
    fontSize: '1rem',
  },
}));

const Login = () => {
  const authContext = useContext(AuthContext);
  const { login, error, isAuthenticated, clearErrors } = authContext;

  const alertContext = useContext(AlertContext);
  const { setAlert, alerts } = alertContext;

  const classes = useStyles();

  const history = useHistory();

  useEffect(() => {
    if (isAuthenticated) {
      history.push('/');
    }

    if (error) {
      setAlert(error, 'danger');
      clearErrors();
    }
    // eslint-disable-next-line
  }, [error, isAuthenticated, history]);

  const [user, setUser] = useState({
    email: '',
    password: '',
  });

  const { email, password } = user;

  const onChange = (e) => setUser({ ...user, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();

    if (email === '' || password === '') {
      setAlert('Please fill in all fields', 'danger');
    } else {
      login({
        email,
        password,
      });
    }
  };

  return (
    <Paper elevation={3} className={classes.paper}>
      <Container className={classes.container} maxWidth='xs'>
        <form onSubmit={onSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                error={alerts.length > 0}
                helperText={
                  alerts.length > 0 ? alerts[alerts.length - 1].msg : ''
                }
                fullWidth
                label='Email'
                name='email'
                value={email}
                variant='outlined'
                onChange={onChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                type='password'
                label='Password'
                name='password'
                value={password}
                variant='outlined'
                onChange={onChange}
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                fullWidth
                type='submit'
                variant='contained'
                size='large'
                className={classes.btn}
              >
                Log In
              </Button>
            </Grid>
          </Grid>
        </form>
      </Container>
    </Paper>
  );
};

export default Login;
