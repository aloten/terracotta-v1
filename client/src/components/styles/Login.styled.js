import styled from 'styled-components';

export const StyledLogin = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  .paper {
    width: 80%;
    max-width: 400px;
    padding: 1rem;
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

  .login-form {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    gap: 1rem;
  }

  .forgot-acct-link {
    text-align: center;
  }

  .gst-reg-btns {
    display: flex;
    justify-content: space-between;
    gap: 1rem;
  }

  .gst-reg-btns button {
    width: 100%;
    font-size: 1rem;
  }
`;
