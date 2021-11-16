import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  addBottle,
  updateBottle,
  changeFormProp,
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
  changeFormProp,
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
    const form = e.target;

    if (form.producer.value === '') {
      return;
    }
    for (const input of form) {
      if (input.name) {
        changeFormProp(input.name, input.value);
      }
    }
    if (bottleForm._id) {
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
        <FormBottleDetails onSubmit={onSubmit} handleClose={handleClose} />
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
  changeFormProp,
  closeBottleForm,
  clearForm,
  loadCellarStats,
})(FormDialog);
