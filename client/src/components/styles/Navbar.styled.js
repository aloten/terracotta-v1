import styled from 'styled-components';

export const StyledNavbar = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.7rem 2rem;
  /* z-index: 1; */
  width: 100%;
  margin-bottom: 0;
  background-color: ${(props) => props.theme.colors.primaryColor};

  ul {
    display: flex;
  }

  a {
    color: #fff;
    padding: 0.45rem;
    margin: 0 0.25rem;
  }

  a:hover {
    color: var(--secondary-color);
  }
`;
