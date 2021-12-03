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
import countries from '../../../data/countries.json';

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
      max-width: 768px;
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

  const nameToIso = (name) => {
    for (const country of countries) {
      if (country.name === name) {
        return country.code;
      }
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const form = e.target;

    if (form.producer.value === '') {
      return;
    }
    const newBottle = bottleForm;
    for (const input of form) {
      if (input.name) {
        // Convert country name back to 2-digit ISO code, awkward fix due to awkward autcomplete options vs UI
        if (input.name === 'country') {
          newBottle[input.name] = nameToIso(input.value);
        } else {
          newBottle[input.name] = input.value;
        }
      }
    }
    if (newBottle._id) {
      updateBottle(newBottle).then(() => {
        loadCellarStats();
      });
    } else {
      addBottle(newBottle).then(() => {
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
          <span onClick={handleClose} className='close-btn icon-danger'>
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
