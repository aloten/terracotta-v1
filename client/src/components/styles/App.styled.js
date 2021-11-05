import styled from 'styled-components';

export const StyledApp = styled.div`
  min-height: 100%;
  display: grid;
  grid-template-rows: auto 1fr auto;
  grid-template-columns: 100%;

  .main {
    padding: 1rem;
    background-color: ${(props) => props.theme.colors.bgGrey};
  }

  .footer {
    padding: 1rem;
    text-align: center;
  }
`;
