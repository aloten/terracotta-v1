import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
@import url('https://fonts.googleapis.com/css?family=Roboto');

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

html, body {
  width: 100%;
  height: 100%;
}

body {
  font-family: 'Roboto', Arial, Helvetica, sans-serif;
  font-size: 1rem;
  line-height: 1.6;
  background-color: #fff;
  color: #333;
}

#root {
  height: 100%;
  width: 100%;
}

a {
  text-decoration: none;
}

ul {
  list-style: none;
}
`;

export default GlobalStyles;
