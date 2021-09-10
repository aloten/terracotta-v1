import React, { useContext, useState, useEffect, Fragment } from 'react';
import BottleContext from '../../context/bottles/BottleContext';
import Spinner from '../layout/Spinner';

import {
  DataGrid,
  GridToolbarContainer,
  GridToolbarExport,
  GridToolbarColumnsButton,
  GridToolbarFilterButton,
  GridToolbarDensitySelector,
} from '@mui/x-data-grid';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';

const Inventory = () => {
  const bottleContext = useContext(BottleContext);
  const { deleteBottle, getBottles, bottles, changeForm, openBottleForm } =
    bottleContext;

  useEffect(() => {
    getBottles();
    // eslint-disable-next-line
  }, []);

  const [selected, setSelected] = useState(null);

  const [actions, setActions] = useState({
    delete: false,
    edit: true,
  });

  useEffect(() => {
    if (selected !== null) {
      if (actions.delete === true) {
        deleteBottle(
          bottles[bottles.findIndex((bottle) => bottle.id === selected)]._id
        );
        setActions({ ...actions, delete: false });
        setSelected(null);
      } else if (actions.edit === true) {
        console.log(bottles);
        const bottle =
          bottles[bottles.findIndex((bottle) => bottle.id === selected)];
        delete bottle.id;
        for (const prop in bottle) {
          changeForm(prop, bottle[prop]);
        }
        openBottleForm();
        setActions({ ...actions, edit: false });
      }
    }
    // eslint-disable-next-line
  }, [actions]);

  const onSelectionModelChange = (model) => {
    setSelected(model[0]);
  };

  const onDelete = () => {
    setActions({ ...actions, delete: true });
  };

  const onEdit = () => {
    setActions({ ...actions, edit: true });
  };

  const CustomToolbar = () => {
    return (
      <GridToolbarContainer>
        <GridToolbarColumnsButton />
        <GridToolbarFilterButton />
        <GridToolbarDensitySelector />
        <GridToolbarExport />
      </GridToolbarContainer>
    );
  };

  // format data for data grid rows
  if (bottles !== null && bottles.length !== 0) {
    bottles.forEach((bottle) => {
      bottle.id = bottle._id;
      delete bottle.user;
    });

    const columns = [
      {
        field: 'id',
        headerName: 'ID',
        hide: true,
      },
      {
        field: 'product',
        headerName: 'Product',
        width: 200,
        renderCell: (params) => (
          <Fragment>
            <IconButton onClick={onEdit}>
              <EditIcon />
            </IconButton>
            <IconButton onClick={onDelete}>
              <DeleteIcon />
            </IconButton>
            {params.value}
          </Fragment>
        ),
      },
      {
        field: 'vintage',
        headerName: 'Vintage',
        width: 120,
      },
      {
        field: 'datePurchased',
        headerName: 'Date Purchased',
        width: 150,
      },
      {
        field: 'dateReceived',
        headerName: 'Date Received',
        width: 150,
      },
      {
        field: 'quantity',
        headerName: 'Quantity',
        width: 120,
      },
      {
        field: 'currency',
        headerName: 'Currency',
        width: 130,
      },
      {
        field: 'price',
        headerName: 'Price',
        width: 110,
      },
      {
        field: 'totalCost',
        headerName: 'Total Cost',
        width: 150,
      },
      {
        field: 'vendor',
        headerName: 'Vendor',
        width: 150,
      },
      {
        field: 'dateAdded',
        headerName: 'Date Added',
        width: 150,
        hide: true,
      },
    ];

    return (
      <Fragment>
        {bottles !== null ? (
          <div
            style={{
              height: 500,
              width: '100%',
              background: 'white',
              marginBottom: '30px',
            }}
          >
            <div style={{ display: 'flex', height: '100%' }}>
              <div style={{ flexGrow: 1 }}>
                <DataGrid
                  rows={bottles}
                  columns={columns}
                  rowHeight={25}
                  components={{
                    Toolbar: CustomToolbar,
                  }}
                  hideFooterSelectedRowCount
                  onSelectionModelChange={onSelectionModelChange}
                />
              </div>
            </div>
          </div>
        ) : (
          <Spinner />
        )}
      </Fragment>
    );
  } else {
    return <h4>Please add a bottle</h4>;
  }
};

export default Inventory;
