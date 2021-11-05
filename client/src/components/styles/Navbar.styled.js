import styled from 'styled-components';

export const StyledNavbar = styled.nav`
  /* .hide-sm {
    display: none;
  } */

  display: block;
  text-align: center;
  color: white;
  background-color: ${(props) => props.theme.colors.primaryColor};

  .nav-links {
    display: none;
    text-align: center;
    justify-content: center;
  }

  .nav-links.active {
    display: block;
  }

  .hamburger-toggle {
    position: absolute;
    top: 0.75rem;
    right: 1rem;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 2rem;
    height: 1.5rem;
  }

  .hamburger-toggle .bar {
    height: 3px;
    width: 100%;
    background-color: white;
    border-radius: 10px;
  }

  .nav-link {
    display: inline-block;
    height: 100%;
    width: 100%;
    padding: 0.5rem;
    color: white;
    border-top: 1px solid ${(props) => props.theme.colors.bgGrey};
  }

  .nav-link:hover,
  .nav-link:focus {
    background-color: #500020;
    color: white;
  }

  @media (min-width: 700px) {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.7rem 2rem;
    width: 100%;
    margin-bottom: 0;

    .hamburger-toggle {
      display: none;
    }

    .nav-links {
      display: flex;
    }

    .nav-link {
      border: none;
      padding: 0.45rem;
      margin: 0 0.25rem;
    }

    .nav-link:hover {
      background-color: transparent;
      color: ${(props) => props.theme.colors.threeShadePrimary};
    }
  }
`;
