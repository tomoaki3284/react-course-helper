import { filter } from '../../asset/properties.js';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import '../../css/FilterGroup.css';

const FilterGroup = ({onInputChange}) => {
  const cores = filter['cores'];
  const modes = filter['modes'];
  const subjects = filter['subjects'];

  return (
    <div className='filter-header'>
      <p className='filter-header__title'>FILTERS</p>
      <ComboBox filterTitle='core' filterArr={cores} onInputChange={onInputChange} />
      <ComboBox filterTitle='mode' filterArr={modes} onInputChange={onInputChange} />
      <ComboBox filterTitle='subject' filterArr={subjects} onInputChange={onInputChange} />
    </div>
  );
}

const ComboBox = ({filterArr, filterTitle, onInputChange}) => {
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

export default FilterGroup;