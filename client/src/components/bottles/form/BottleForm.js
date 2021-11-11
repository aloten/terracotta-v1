import React from 'react';
import AddBottleBySearch from './AddBottleBySearch';
import FormDialog from './FormDialog';
import styled from 'styled-components';

const StyledBottleForm = styled.div`
  z-index: 1;
`;

const BottleForm = () => {
  return (
    <StyledBottleForm>
      <AddBottleBySearch />
      <FormDialog />
    </StyledBottleForm>
  );
};

export default BottleForm;
