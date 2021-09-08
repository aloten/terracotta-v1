import { Fragment } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import AuthState from './context/auth/AuthState';
import BottleState from './context/bottles/BottleState';
import AlertState from './context/alert/AlertState';
import PrivateRoute from './components/routing/PrivateRoute';
import Navbar from './components/layout/Navbar';
import Home from './components/pages/Home';
import About from './components/pages/About';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
// import Alerts from './components/layout/Alerts';

function App() {
  return (
    <AuthState>
      <BottleState>
        <AlertState>
          <Router>
            <Fragment>
              <Navbar />
              <div className='container'>
                {/* <Alerts /> */}
                <Switch>
                  <PrivateRoute exact path='/' component={Home} />
                  <Route exact path='/about' component={About} />
                  <Route exact path='/login' component={Login} />
                  <Route exact path='/register' component={Register} />
                </Switch>
              </div>
            </Fragment>
          </Router>
        </AlertState>
      </BottleState>
    </AuthState>
  );
}

export default App;
