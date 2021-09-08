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
import Typography from '@material-ui/core/Typography';
import Popper from '@material-ui/core/Popper';

const useStyles = makeStyles((theme) => ({
  container: {
    padding: theme.spacing(3),
  },
  paper: {
    padding: 20,
    height: '70vh',
    width: '35%',
    margin: '20px auto',
  },
  login: {
    background: '#800020',
    color: 'white',
    fontSize: '1rem',
  },
  register: {
    background: '#e2725b',
    color: 'white',
    fontSize: '1rem',
  },
  text: {
    fontWeight: 'bold',
  },
  link: {
    margin: 'auto',
    textAlign: 'center',
    color: 'blue',
  },
  popper: {
    padding: theme.spacing(1),
    width: '20rem',
    background: '#424242',
    color: 'white',
    '& Button': {
      background: '#e0e0e0',
    },
  },
}));

const Login = () => {
  const authContext = useContext(AuthContext);
  const { login, error, isAuthenticated, clearErrors } = authContext;

  const alertContext = useContext(AlertContext);
  const { setAlert, loginAlerts } = alertContext;

  const classes = useStyles();

  const history = useHistory();

  useEffect(() => {
    if (isAuthenticated) {
      history.push('/');
    }

    if (error) {
      setAlert(error, 'login');
      clearErrors();
    }
    // eslint-disable-next-line
  }, [error, isAuthenticated, history]);

  const [user, setUser] = useState({
    email: '',
    password: '',
  });

  const { email, password } = user;

  // popper logic
  const [anchorEl, setAnchorEl] = useState(null);

  const handlePopper = (e) => {
    setAnchorEl(anchorEl ? null : e.currentTarget);
  };
  const open = Boolean(anchorEl);
  const id = open ? 'simple-popper' : undefined;

  const onChange = (e) => setUser({ ...user, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    if (email === '' || password === '') {
      setAlert('Please fill in all fields', 'login');
    } else {
      login({
        email,
        password,
      });
    }
  };

  const clickRegister = () => {
    history.push('/register');
  };

  return (
    <Paper elevation={3} className={classes.paper}>
      <Container className={classes.container} maxWidth='xs'>
        <form onSubmit={onSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Typography className={classes.text} variant='h5' align='center'>
                Log In
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <TextField
                error={loginAlerts.length > 0}
                helperText={loginAlerts.length > 0 ? loginAlerts[0].msg : ''}
                fullWidth
                label='Email'
                name='email'
                value={email}
                variant='outlined'
                onChange={onChange}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                error={loginAlerts.length > 0}
                helperText={loginAlerts.length > 0 ? loginAlerts[0].msg : ''}
                fullWidth
                type='password'
                label='Password'
                name='password'
                value={password}
                variant='outlined'
                onChange={onChange}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                fullWidth
                type='submit'
                variant='contained'
                size='large'
                className={classes.login}
              >
                Log In
              </Button>
            </Grid>
            <Grid item xs={12} className={classes.link}>
              <Button className={classes.link} onClick={handlePopper}>
                <u>Forgot account?</u>
              </Button>
              <Popper id={id} open={open} anchorEl={anchorEl}>
                <Paper className={classes.popper}>
                  <Typography>
                    Sorry! I don't get paid enough to implement this, future
                    updates pending...
                  </Typography>
                  <Button
                    className={classes.popper.btn}
                    size='small'
                    onClick={handlePopper}
                  >
                    Clear
                  </Button>
                </Paper>
              </Popper>
            </Grid>
            <Grid item xs={3} />
            <Grid item xs={6}>
              <Button
                fullWidth
                variant='contained'
                size='large'
                className={classes.register}
                onClick={clickRegister}
              >
                Register
              </Button>
            </Grid>
            <Grid item xs={3} />
          </Grid>
        </form>
      </Container>
    </Paper>
  );
};

export default Login;
