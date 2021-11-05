import styled from 'styled-components';

export const StyledLogin = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid black;

  .paper {
    height: 60%;
    width: 70%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    background-color: white;
  }

  .login-form {
    border: 1px solid salmon;
    display: flex;
    flex-direction: column;
  }
`;
