import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  addBottle,
  updateBottle,
  closeBottleForm,
  clearForm,
} from '../../../actions/bottleActions';
import FormBottleDetails from './FormBottleDetails';

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

const FormDialog = ({
  bottleState: { bottleForm, bottleFormOpen },
  addBottle,
  updateBottle,
  closeBottleForm,
  clearForm,
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
      updateBottle(bottleForm);
      handleClose();
    } else {
      addBottle(bottleForm);
      handleClose();
    }
  };

  return (
    <div>
      <Dialog open={bottleFormOpen} onClose={handleClose}>
        <DialogTitle>Edit Bottle</DialogTitle>
        <DialogContent>
          <FormBottleDetails />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color='secondary'>
            Cancel
          </Button>
          <Button onClick={onSubmit} color='primary'>
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
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
})(FormDialog);
