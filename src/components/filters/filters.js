import './filters.scss';

const Filters = ({filters, updateFilters, clearFilters, appliedFilters}) => {

  const selectFilter = (category, id) => {
    updateFilters({[category]: id});
  };

  return (
    <div className='filters'>
      <div className='filters__wrapper'>
        {filters.map(({category, categoryLabel, items}) => (
          <div className='filters__category' key={category}>
            <span className='filters__category-label'>{categoryLabel}</span>
            <div className='filters__options'>
              {items.map(({id, label}) => (
                <div className='filters__option-wrapper' key={id}>
                  <input className='filters__input' type='radio' id={id} onChange={() => selectFilter(category, id)} name={category}
                    checked={appliedFilters[category] == id}
                  />
                  <label className='filters__label' htmlFor={id}>{label}</label>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      <button onClick={clearFilters} className="filters__button">Clear Filters</button>
    </div>
  );
};

export default Filters;