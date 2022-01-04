import { filter } from '../../asset/properties.js';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import '../../css/FilterGroup.css';

const FilterGroup = ({onInputChange, courseFilter}) => {
  const cores = filter['cores'];
  const modes = filter['modes'];
  const subjects = filter['subjects'];

  return (
    <div className='filter-header'>
      <p className='filter-header__title'>FILTERS</p>
      <ComboBox filterTitle='core' filterArr={cores} onInputChange={onInputChange} courseFilter={courseFilter}/>
      <ComboBox filterTitle='mode' filterArr={modes} onInputChange={onInputChange} courseFilter={courseFilter}/>
      <ComboBox filterTitle='subject' filterArr={subjects} onInputChange={onInputChange} courseFilter={courseFilter}/>
      <CustomTextField filterTitle='title' onInputChange={onInputChange} courseFilter={courseFilter}/>
    </div>
  );
}

const ComboBox = ({filterArr, filterTitle, onInputChange, courseFilter}) => {
  return (
    <div>
      <h6>{filterTitle}</h6>
      <Autocomplete
        className='filter-header__combobox'
        options={filterArr}
        defaultValue={courseFilter.getFilterValue(filterTitle)}
        onInputChange={(event, newInputValue) => {
          onInputChange(event, newInputValue, filterTitle);
        }}
        style={{ width: 250 }}
        renderInput={(params) =>
          <TextField 
            {...params} 
            label={filterTitle} 
            variant="outlined" 
            value='aaaa'/>
        }
      />
    </div>
  );
}

const CustomTextField = ({filterTitle, onInputChange, courseFilter}) => {
  return (
    <div>
      <h6>{filterTitle}</h6>
      <TextField 
        id="outlined-basic" 
        label="Outlined" 
        variant="outlined" 
        className='filter-header__combobox' 
        label={filterTitle} 
        style={{ width: 250 }} 
        type="search" 
        defaultValue={courseFilter.getFilterValue(filterTitle)}
        onChange={(event) => {
          onInputChange(event, event.target.value, filterTitle);
        }} />
    </div>
  );
}

export default FilterGroup;