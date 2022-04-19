import './search-bar.scss';
import { useState } from 'react';
import Search from '@mui/icons-material/Search';
import { useDebounce } from '~/helpers/custom-hooks';

const SearchBar = ({fetchSearchResults}) => {
  const [searchText, setSearchText] = useState('');
  const handleInputChange = () => {
    if(searchText && searchText.length > 3){
      fetchSearchResults(searchText);
    }
  }

  useDebounce(handleInputChange, 1000, [searchText]);

  return (
    <div className='search-bar__wrapper'>
      <input type='text' className='search-bar__input' id='searchInput' placeholder=' '
        value={searchText}
        onInput={(event) => {
          const text = event.target.value || '';
          setSearchText(text);
        }}
      />
      <label className='search-bar__label' htmlFor='searchInput'>
        <Search className='search-bar__icon'/>
        Search
      </label>
    </div>
  );
};

export default SearchBar;