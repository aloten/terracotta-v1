import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  addBottle,
  updateBottle,
  closeBottleForm,
  clearForm,
  loadCellarStats,
} from '../../../actions/bottleActions';
import FormBottleDetails from './FormBottleDetails';

const StyledFormDialog = styled.div`
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgb(0, 0, 0);
  background-color: rgba(0, 0, 0, 0.5);

  .dialog-content {
    position: relative;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    background-color: ${(props) => props.theme.colors.bgGrey};
    padding: 1rem;
    width: 100%;
    height: 100%;
    overflow: scroll;
    border-radius: 5px;
  }

  .dialog-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .dialog-footer {
    display: flex;
    justify-content: flex-end;
    gap: 1rem;
  }

  .close-btn {
    display: inline-block;
    height: 100%;
    color: darkgray;
    font-size: 2rem;
    line-height: 1;
    font-weight: bold;
  }

  .close-btn:hover {
    color: gray;
    cursor: pointer;
  }

  @media (min-width: 768px) {
    .dialog-content {
      width: 75%;
      height: 75%;
    }
  }
`;

const FormDialog = ({
  bottleState: { bottleForm },
  addBottle,
  updateBottle,
  closeBottleForm,
  clearForm,
  loadCellarStats,
}) => {
  const handleClose = () => {
    closeBottleForm();
    clearForm();
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (bottleForm.product === '') {
      return;
      // TODO setAlert();
    } else if (bottleForm._id) {
      updateBottle(bottleForm).then(() => {
        loadCellarStats();
      });
    } else {
      addBottle(bottleForm).then(() => {
        loadCellarStats();
      });
    }
    handleClose();
  };

  return (
    <StyledFormDialog>
      <div className='dialog-content'>
        <div className='dialog-header'>
          <h3>Edit purchase details</h3>
          <span onClick={handleClose} className='close-btn'>
            &times;
          </span>
        </div>
        <FormBottleDetails />
        <div className='dialog-footer'>
          <button onClick={handleClose} className='btn btn-danger'>
            Cancel
          </button>
          <button onClick={onSubmit} className='btn btn-success'>
            Save
          </button>
        </div>
      </div>
    </StyledFormDialog>
  );
};

FormDialog.propTypes = {
  bottleState: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  bottleState: state.bottleState,
});

export default connect(mapStateToProps, {
  addBottle,
  updateBottle,
  closeBottleForm,
  clearForm,
  loadCellarStats,
})(FormDialog);
