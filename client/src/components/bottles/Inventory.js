import React, { useState, useEffect, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  deleteBottle,
  getBottles,
  changeFormProp,
  openBottleForm,
} from '../../actions/bottleActions';

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

// import currencies from '../../data/currencies';

const Inventory = ({
  bottleState: { bottles },
  deleteBottle,
  getBottles,
  changeFormProp,
  openBottleForm,
}) => {
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
        const bottle =
          bottles[bottles.findIndex((bottle) => bottle.id === selected)];
        delete bottle.id;
        delete bottle.dateReceivedStr;
        delete bottle.datePurchasedStr;
        delete bottle.dateAddedStr;
        for (const prop in bottle) {
          changeFormProp(prop, bottle[prop]);
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
      if (bottle.dateReceived) {
        const year = bottle.dateReceived.slice(0, 4);
        const month = bottle.dateReceived.slice(5, 7);
        const day = bottle.dateReceived.slice(8, 10);
        bottle.dateReceivedStr = month + '/' + day + '/' + year;
      }
      if (bottle.datePurchased) {
        const year = bottle.datePurchased.slice(0, 4);
        const month = bottle.datePurchased.slice(5, 7);
        const day = bottle.datePurchased.slice(8, 10);
        bottle.datePurchasedStr = month + '/' + day + '/' + year;
      }
      if (bottle.dateAdded) {
        const year = bottle.dateAdded.slice(0, 4);
        const month = bottle.dateAdded.slice(5, 7);
        const day = bottle.dateAdded.slice(8, 10);
        bottle.dateAddedStr = month + '/' + day + '/' + year;
      }
    });
  }

  const columns = [
    {
      field: 'id',
      headerName: 'ID',
      hide: true,
    },
    {
      field: 'product',
      headerName: 'Product',
      width: 300,
      headerAlign: 'center',
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
      headerName: 'Vin.',
      description: 'Vintage',
      width: 120,
    },
    {
      field: 'quantity',
      headerName: '#',
      description: 'Quantity',
      width: 85,
    },
    {
      field: 'currency',
      headerName: 'Currency',
      width: 100,
    },
    {
      field: 'price',
      headerName: 'Price',
      width: 110,
      renderCell: (params) => <Fragment>{params.value}</Fragment>,
    },
    {
      field: 'totalCost',
      headerName: 'Total Cost',
      width: 150,
    },
    {
      field: 'datePurchasedStr',
      headerName: 'Date Purchased',
      width: 150,
    },
    {
      field: 'dateReceivedStr',
      headerName: 'Date Received',
      width: 150,
    },
    {
      field: 'vendor',
      headerName: 'Vendor',
      width: 150,
    },
    {
      field: 'dateAddedStr',
      headerName: 'Date Added',
      width: 150,
      hide: true,
    },
  ];

  return (
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
            rows={bottles ? bottles : []}
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
  );
};

Inventory.propTypes = {
  bottleState: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  bottleState: state.bottleState,
});

export default connect(mapStateToProps, {
  deleteBottle,
  getBottles,
  changeFormProp,
  openBottleForm,
})(Inventory);
