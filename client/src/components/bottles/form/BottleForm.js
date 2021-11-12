import React from 'react';
import { connect } from 'react-redux';
import AddBottleBySearch from './AddBottleBySearch';
import FormDialog from './FormDialog';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const StyledBottleForm = styled.div`
  z-index: 1;
`;

const BottleForm = ({ bottleState: { bottleFormOpen } }) => {
  return (
    <StyledBottleForm>
      <AddBottleBySearch />
      {bottleFormOpen && <FormDialog />}
    </StyledBottleForm>
  );
};

BottleForm.propTypes = {
  bottleState: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  bottleState: state.bottleState,
});

export default connect(mapStateToProps)(BottleForm);
