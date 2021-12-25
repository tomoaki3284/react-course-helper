import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import FilterGroup from './FilterGroup';

import '../../css/FilterButton.css';

const FilterButton = ({onInputChange}) => {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (value) => {
    setOpen(false);
  };

  return(
    <div>
      <Button className='filter-button' variant="outlined" onClick={handleClickOpen}>
          <img className='filter-button-img' alt=''/>
      </Button>
      <Dialog className='filter-dialog' onClose={handleClose} open={open}>
        <FilterGroup onInputChange={onInputChange}/>
      </Dialog>
    </div>
  );
}

export default FilterButton;