import FilterAlt from '@mui/icons-material/FilterAlt';
import './filter-button.scss';

const FilterButton = ({ handleFilterClick=()=>{} }) => {

  return (
    <button
      className='filter-button__btn'
      onClick={handleFilterClick}
      aria-label={"Show Filters"}
    >
      <span className='filter-button__text'>Filters</span>
      <span className='filter-button__icon'><FilterAlt/></span>
    </button>
  );
};

export default FilterButton;