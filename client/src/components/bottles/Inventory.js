import React, { useContext, useEffect, Fragment } from 'react';
import BottleContext from '../../context/bottles/BottleContext';
import Spinner from '../layout/Spinner';

import {
  DataGrid,
  GridToolbarContainer,
  GridToolbarExport,
} from '@mui/x-data-grid';

const Inventory = () => {
  const bottleContext = useContext(BottleContext);
  const { getBottles, bottles } = bottleContext;

  useEffect(() => {
    getBottles();
    // eslint-disable-next-line
  }, []);

  function CustomToolbar() {
    return (
      <GridToolbarContainer>
        <GridToolbarExport />
      </GridToolbarContainer>
    );
  }

  if (bottles !== null && bottles.length !== 0) {
    bottles.forEach((bottle) => {
      bottle.id = bottle._id;
      bottle.countryName = bottle.country.name;
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
      },
      {
        field: 'vintage',
        headerName: 'Vintage',
        width: 90,
      },
      {
        field: 'varietal',
        headerName: 'Varietal',
        width: 150,
      },
      {
        field: 'style',
        headerName: 'Style',
        width: 150,
      },
      {
        field: 'sugar',
        headerName: 'Sugar',
        width: 150,
      },
      {
        field: 'bubbles',
        headerName: 'Bubbles',
        width: 150,
      },
      {
        field: 'region',
        headerName: 'Region',
        width: 150,
      },
      {
        field: 'countryName',
        headerName: 'Country',
        width: 150,
      },
      {
        field: 'criticsScore',
        headerName: 'Critic Scores',
        width: 150,
      },
      {
        field: 'size',
        headerName: 'Size',
        width: 100,
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
        width: 150,
      },
      {
        field: 'currency',
        headerName: 'Currency',
        width: 90,
      },
      {
        field: 'price',
        headerName: 'Price',
        width: 100,
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
        field: 'location',
        headerName: 'Location',
        width: 150,
      },
      {
        field: 'notes',
        headerName: 'Notes',
        width: 150,
      },
      {
        field: 'alcoholPct',
        headerName: 'Alc %',
        width: 100,
      },
      {
        field: 'opened',
        headerName: 'Opened',
        width: 100,
      },
      {
        field: 'dateAdded',
        headerName: 'Date Added',
        width: 150,
      },
    ];

    return (
      <Fragment>
        {bottles !== null ? (
          <div style={{ height: 500, width: '100%' }}>
            <div style={{ display: 'flex', height: '100%' }}>
              <div style={{ flexGrow: 1 }}>
                <DataGrid
                  rows={bottles}
                  columns={columns}
                  rowHeight={25}
                  components={{
                    Toolbar: CustomToolbar,
                  }}
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
