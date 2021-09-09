import React, { useContext } from 'react';
import BottleContext from '../../../context/bottles/BottleContext';
import FormBottleDetails from './FormBottleDetails';

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

const FormDialog = () => {
  const bottleContext = useContext(BottleContext);
  const { addBottle, bottleForm, bottleFormOpen, closeBottleForm, clearForm } =
    bottleContext;

  const handleClose = () => {
    closeBottleForm();
    clearForm();
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (bottleForm.product === '') {
      // setAlert();
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

export default FormDialog;
