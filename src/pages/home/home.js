import React, { useEffect, useRef, useState } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import SearchBar from '~/components/search-bar';
import FilterButton from '~/components/filter-button';
import Filters from '~/components/filters';
import * as HomeActions from '~/actions/home';
import './home.scss';
import InfiniteScroll from '~/components/inifinite-scroll';
import FullscreenModal from '~/components/fullscreen-modal';
import { defaultFilters, searchModeFilters } from '~/helpers/constants';
import { useDebounce } from '~/helpers/custom-hooks';

const HomePage = ({ Home, HomeActions }) => {
  const [areFiltersVisible, setFiltersVisibility] = useState(false);
  const [isSearchMode, setSearchMode] = useState(false);
  const [modalData, setModalData] = useState({});
  const [isModalVisible, setModalVisibility] = useState(false);
  const [appliedFilters, applyFilters] = useState({});
  const [searchTerm, setSearchTerm] = useState('');
  const mainRef = useRef();
  const { items: imageItems=[], isLoading=false, page} = Home;
  
  const fetchNextPageImages = () => {
    if(isSearchMode){
      HomeActions.getPaginatedSearchResults(searchTerm, appliedFilters, isLoading ? page+1 : page);
    } else {
      HomeActions.getDefaultCollectionData(isLoading ? page+1 : page, appliedFilters);
    }
  };
  const onFilterClick = (filterItem) => {
    const updatedFilters = {...appliedFilters, ...filterItem};
    applyFilters(updatedFilters);
    if(isSearchMode){
      HomeActions.getPaginatedSearchResults(searchTerm, updatedFilters, 1);
    } else {
      HomeActions.getDefaultCollectionData(1, updatedFilters);
    }
  };
  const onClearFilters = () => {
    applyFilters({});
    areFiltersVisible(false);
    if(isSearchMode){
      HomeActions.getPaginatedSearchResults(searchTerm, {}, 1);
    } else {
      HomeActions.getDefaultCollectionData(1, {});
    }
  };
  const onImageItemClick = (item) => {
    setModalData({
      type: 'image-preview',
      data: item,
    })
    setModalVisibility(true);
  };
  const handleSearchInputChange = (searchTerm) => {
    if(!isSearchMode) {
      applyFilters({});
    }
    setSearchMode(true);
    setSearchTerm(searchTerm);
    HomeActions.getPaginatedSearchResults(searchTerm, appliedFilters, 1);
  }

  return (
    <div className='home__page' ref={mainRef}>
      <div className='home__top-wrapper'>
        <SearchBar
          fetchSearchResults={handleSearchInputChange}
        />
        <FilterButton handleFilterClick={() => setFiltersVisibility(true)}/>
      </div>
      { areFiltersVisible ?
        <Filters
          filters={isSearchMode ? searchModeFilters : defaultFilters}
          updateFilters={onFilterClick}
          clearFilters={onClearFilters}
          appliedFilters={appliedFilters}
        />
      : null }
      <div className='home__items'>
        <InfiniteScroll
          items={imageItems}
          loadMoreItems={fetchNextPageImages}
          isLoading={isLoading}
          onItemClick={onImageItemClick}
        />
      </div>
      <FullscreenModal
        showModal={isModalVisible}
        closeModal={() => setModalVisibility(false)}
        parent={mainRef.current}
        modalData={modalData}
      />
    </div>
  );
};

export default connect(
  ({Home}) => ({Home}),
  (dispatch) => ({
    HomeActions: bindActionCreators(HomeActions, dispatch)
  })
)(HomePage);