import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
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
  color: blue;
}

a:hover {
  color: skyblue;
}

input, button {
  font-family: inherit;
}

button {
  border: none;
  background-color: none;
}

ul {
  list-style: none;
}

/* Utility */

/* Input */
input[type='text'],
input[type='number'],
input[type='password'],
input[type='email'],
select, textarea {
  border: none;
  appearance: none;
  background: white;
  padding: 0.75rem;
  border-radius: 4px;
  border: 1px grey solid;
  outline: none;
  font-size: 1rem;
  font-family: inherit;
}

input[type='submit'] {
  -webkit-appearance: none;
}

/* Button */
.btn {
  display: inline-block;
  border: none;
  padding: 0.5rem 1rem;
  font-weight: normal;
  text-align: center;
  cursor: pointer;
  border-radius: 4px;
  font-family: inherit;
}

.btn-primary  {
  color: white;
  background-color: ${(props) => props.theme.colors.primaryColor};
}

.btn-primary:hover  {
  background-color: ${(props) => props.theme.colors.oneTintPrimary};
}

.btn-neutral {
  color: white;
  background-color: grey;
}

.btn-neutral:hover {
  color: black;
  background-color: darkgray
}

.btn-success {
  color: #fff;
  background: #5cb85c;
  border-color: #4cae4c;
}

.btn-success:hover {
  color: #fff;
  background-color: #449d44;
  border-color: #398439;
}

.btn-danger {
  color: #fff;
  background-color: rgb(206, 81, 81);
}

.btn-danger:hover {
  background-color: rgb(207, 37, 37);
}

i {
  cursor: pointer;
}

.icon-danger {
  color: rgb(206, 81, 81)
}

.icon-danger:hover {
  color: rgb(207, 20, 20)
}

.icon-neutral {
  color: gray;
}

.icon-neutral:hover {
  color: darkgray;
}


`;

export default GlobalStyles;
