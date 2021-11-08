import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { register, loadUser, clearErrors } from '../../actions/authActions';
import { setAlert, removeAlert } from '../../actions/alertActions';

import { useHistory } from 'react-router-dom';
import { Link } from 'react-router-dom';

import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
  container: {
    padding: theme.spacing(3),
  },
  paper: {
    padding: 20,
    height: '75vh',
    width: '35%',
    margin: '20px auto',
  },
  grid: {
    marginTop: '5%',
  },
  register: {
    background: '#800020',
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

const Register = ({
  authState: { error, isAuthenticated },
  register,
  loadUser,
  clearErrors,
  alertState: { registerAlerts },
  setAlert,
  removeAlert,
}) => {
  const classes = useStyles();

  const history = useHistory();

  useEffect(() => {
    if (isAuthenticated) {
      history.push('/');
    }
    if (typeof error === 'object') {
      // setAlert(error.msg, 'register');
      // clearErrors();
    } else {
      setAlert(error, 'register').then((id, timeout) => {
        removeAlert(id, timeout);
      });
      clearErrors();
    }

    //eslint-disable-next-line
  }, [error, isAuthenticated, history]);

  const [user, setUser] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    password2: '',
  });

  const { firstName, lastName, email, password, password2 } = user;

  const onChange = (e) => setUser({ ...user, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    if (
      firstName === '' ||
      lastName === '' ||
      email === '' ||
      password === '' ||
      password2 === ''
    ) {
      setAlert('Please fill in all fields', 'register').then((id, timeout) => {
        removeAlert(id, timeout);
      });
    } else if (password !== password2) {
      setAlert('Passwords must match', 'register').then((id, timeout) => {
        removeAlert(id, timeout);
      });
    } else {
      register({
        firstName,
        lastName,
        email,
        password,
      }).then(() => {
        loadUser();
      });
    }
  };

  return (
    <Paper elevation={3} className={classes.paper}>
      <Container className={classes.container} maxWidth='xs'>
        <form onSubmit={onSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography className={classes.text} variant='h5' align='center'>
                Register
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <TextField
                error={
                  registerAlerts.length > 0 &&
                  registerAlerts[0].msg === 'First Name is required'
                }
                helperText={
                  registerAlerts.length > 0 &&
                  registerAlerts[0].msg === 'First Name is required'
                    ? registerAlerts[0].msg
                    : ''
                }
                fullWidth
                label='First Name'
                name='firstName'
                value={firstName}
                variant='outlined'
                onChange={onChange}
                required
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                error={
                  registerAlerts.length > 0 &&
                  registerAlerts[0].msg === 'Last Name is required'
                }
                helperText={
                  registerAlerts.length > 0 &&
                  registerAlerts[0].msg === 'Last Name is required'
                    ? registerAlerts[0].msg
                    : ''
                }
                fullWidth
                label='Last Name'
                name='lastName'
                value={lastName}
                variant='outlined'
                onChange={onChange}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                error={
                  registerAlerts.length > 0 &&
                  (registerAlerts[0].msg === 'Please include a valid email' ||
                    registerAlerts[0].msg === 'User already exists')
                }
                helperText={
                  registerAlerts.length > 0 &&
                  (registerAlerts[0].msg === 'Please include a valid email' ||
                    registerAlerts[0].msg === 'User already exists')
                    ? registerAlerts[0].msg
                    : ''
                }
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
                error={
                  registerAlerts.length > 0 &&
                  (registerAlerts[0].msg ===
                    'Please enter a password with 6 or more characters' ||
                    registerAlerts[0].msg === 'Passwords must match')
                }
                helperText={
                  registerAlerts.length > 0 &&
                  (registerAlerts[0].msg ===
                    'Please enter a password with 6 or more characters' ||
                    registerAlerts[0].msg === 'Passwords must match')
                    ? registerAlerts[0].msg
                    : ''
                }
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
              <TextField
                error={
                  registerAlerts.length > 0 &&
                  (registerAlerts[0].msg ===
                    'Please enter a password with 6 or more characters' ||
                    registerAlerts[0].msg === 'Passwords must match')
                }
                helperText={
                  registerAlerts.length > 0 &&
                  (registerAlerts[0].msg ===
                    'Please enter a password with 6 or more characters' ||
                    registerAlerts[0].msg === 'Passwords must match')
                    ? registerAlerts[0].msg
                    : ''
                }
                fullWidth
                type='password'
                label='Confirm Password'
                name='password2'
                value={password2}
                variant='outlined'
                onChange={onChange}
                required
              />
            </Grid>
          </Grid>
          <Grid container className={classes.grid} spacing={2}>
            <Grid item xs={12}>
              <Button
                fullWidth
                type='submit'
                variant='contained'
                size='large'
                className={classes.register}
              >
                Register
              </Button>
            </Grid>
            <Grid item xs={10} className={classes.link}>
              <Link className={classes.link} to='/login'>
                Already have an account?
              </Link>
            </Grid>
          </Grid>
        </form>
      </Container>
    </Paper>
  );
};

Register.propTypes = {
  authState: PropTypes.object.isRequired,
  alertState: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  authState: state.authState,
  alertState: state.alertState,
});

export default connect(mapStateToProps, {
  register,
  loadUser,
  clearErrors,
  setAlert,
  removeAlert,
})(Register);
