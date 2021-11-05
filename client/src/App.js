import { ThemeProvider } from 'styled-components';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import PrivateRoute from './components/routing/PrivateRoute';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Home from './components/pages/Home';
import About from './components/pages/About';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import { Provider } from 'react-redux';
import store from './store';
import { StyledApp } from './components/styles/App.styled';
import GlobalStyles from './components/styles/Global';

const theme = {
  colors: {
    threeTintPrimary: '#dfbfc7',
    twoTintPrimary: '#c08090',
    oneTintPrimary: '#90606c',
    primaryColor: '#800020',
    oneShadePrimary: '#600018',
    twoShadePrimary: '#400010',
    threeShadePrimary: '#30000c',
    triadicGreen: '#208000',
    triadicBlue: '#002080',
    analogousOrange: '#802000',
    analogousPink: '#800060',
    splitComplementsGreen: '#008020',
    splitComplementsBlue: '#006080',
    complementaryColor: '#008060',
    secondaryColor: '#e2725b',
    bgGrey: '#f4f4f4',
  },
};

function App() {
  return (
    <Provider store={store}>
      <Router>
        <ThemeProvider theme={theme}>
          <GlobalStyles />
          <StyledApp>
            <Navbar />
            <div className='main'>
              <Switch>
                <PrivateRoute exact path='/' component={Home} />
                <Route exact path='/about' component={About} />
                <Route exact path='/login' component={Login} />
                <Route exact path='/register' component={Register} />
              </Switch>
            </div>
            <Footer />
          </StyledApp>
        </ThemeProvider>
      </Router>
    </Provider>
  );
}

export default App;
