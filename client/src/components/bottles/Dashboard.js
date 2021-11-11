import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const StyledDashboard = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;

  .box {
    padding: 0.5rem;
    border-radius: 3px;
    box-shadow: 0 0 2px 0 rgba(0, 0, 0, 0.2), 0 1px 1px 0 rgba(0, 0, 0, 0.24);
    text-align: center;
    background-color: white;
  }

  @media (min-width: 768px) {
    grid-template-columns: repeat(3, 1fr);
  }

  @media (min-width: 1100px) {
    grid-template-columns: repeat(6, 1fr);
  }
`;

const Dashboard = ({ bottleState: { cellarStats } }) => {
  const {
    wineInCellar,
    winePending,
    wineConsumed,
    winePurchased,
    readyToDrink,
    totalValue,
  } = cellarStats;

  return (
    <StyledDashboard>
      <div className='box'>
        <span className='title'>Wine in cellar</span> <br />
        <h3 className='number'>{wineInCellar}</h3>
      </div>
      <div className='box'>
        <span className='title'>Wine pending delivery</span>
        <br />
        <h3 className='number'>{winePending}</h3>
      </div>
      <div className='box'>
        <span className='title'>Wine consumed</span>
        <br />
        <h3 className='number'>{wineConsumed}</h3>
      </div>
      <div className='box'>
        <span className='title'>Wine Purchased</span>
        <br />
        <h3 className='number'>{winePurchased}</h3>
      </div>
      <div className='box'>
        <span className='title'>Wine ready to drink</span>
        <br />
        <h3 className='number'>{readyToDrink}</h3>
      </div>
      <div className='box'>
        <span className='title'>Total estimated value</span>
        <br />
        <h3 className='number'>
          {' '}
          ${totalValue.toLocaleString(undefined, { maximumFractionDigits: 2 })}
        </h3>
      </div>
    </StyledDashboard>
  );
};

Dashboard.propTypes = {
  bottleState: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  bottleState: state.bottleState,
});

export default connect(mapStateToProps)(Dashboard);
