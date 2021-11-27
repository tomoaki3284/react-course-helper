import { filter } from '../../asset/properties.js';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import '../../css/FilterGroup.css';

const FilterGroup = (props) => {
  return (
    <div className='filter-header'>
      <p className='filter-header__title'>Filters</p>
      <ComboBox filterTitle='core' filterArr={props.cores} onInputChange={props.onInputChange} parent={props.parent}/>
      <ComboBox filterTitle='mode' filterArr={props.modes} onInputChange={props.onInputChange} parent={props.parent}/>
      <ComboBox filterTitle='subject' filterArr={props.subjects} onInputChange={props.onInputChange} parent={props.parent}/>
    </div>
  );
}

const ComboBox = ({filterTitle, filterArr, onInputChange, parent}) => {
  return (
    <div>
      <h6>{filterTitle}</h6>
      <Autocomplete
        className='filter-header__combobox'
        options={filterArr}
        onInputChange={(event, newInputValue) => {
          onInputChange(parent, event, newInputValue, filterTitle);
        }}
        style={{ width: 250 }}
        renderInput={(params) =>
          <TextField {...params} label={filterTitle} variant="outlined" />}
      />
    </div>
  );
}

FilterGroup.defaultProps = {
  'cores': filter['cores'],
  'modes': filter['modes'],
  'subjects': filter['subjects'],
}

export default FilterGroup;