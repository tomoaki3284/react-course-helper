import { filter } from '../../asset/properties.js';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import '../../css/FilterGroup.css';

const FilterGroup = ({onInputChange}) => {
  const cores = filter['cores'];
  const modes = filter['modes'];
  const subjects = filter['subjects'];

  const ComboBox = ({filterArr, filterTitle}) => {
    return (
      <div>
        <h6>{filterTitle}</h6>
        <Autocomplete
          className='filter-header__combobox'
          options={filterArr}
          onInputChange={(event, newInputValue) => {
            onInputChange(event, newInputValue, filterTitle);
          }}
          style={{ width: 250 }}
          renderInput={(params) =>
            <TextField {...params} label={filterTitle} variant="outlined" />}
        />
      </div>
    );
  }

  return (
    <div className='filter-header'>
      <p className='filter-header__title'>FILTERS</p>
      <ComboBox filterTitle='core' filterArr={cores} />
      <ComboBox filterTitle='mode' filterArr={modes} />
      <ComboBox filterTitle='subject' filterArr={subjects} />
    </div>
  );
}

export default FilterGroup;