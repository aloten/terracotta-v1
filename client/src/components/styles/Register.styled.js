import styled from 'styled-components';

export const StyledRegister = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  .paper {
    width: 80%;
    max-width: 400px;
    padding: 1.5rem;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    gap: 1rem;
    background-color: white;
    box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.2), 0 5px 5px 0 rgba(0, 0, 0, 0.24);
    border-radius: 3px;
  }

  .title {
    text-align: center;
  }

  .register-form {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    gap: 1rem;
  }

  .login-link {
    text-align: center;
  }
`;
