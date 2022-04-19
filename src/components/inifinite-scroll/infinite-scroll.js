import { lazy, useEffect, useRef, useState } from 'react';
import { useIntersectionObserver } from '~/helpers/custom-hooks';
import './infinite-scroll.scss';

const ImageItem = lazy(() => import('~/components/image-item'));

const InfiniteScroll = ({ items=[], isLoading=false, loadMoreItems=()=>{}, onItemClick=()=>{} }) => {
  const loadingRef = useRef();
  const [previousY, setPreviousY] = useState(0);
  const [isIntersecting, intersectionY] = useIntersectionObserver(loadingRef, { threshold: 1.0 });

  useEffect(() => {
    loadMoreItems();
  }, []);

  useEffect(() => {
    if(intersectionY < previousY){
      loadMoreItems();
    }
    setPreviousY(intersectionY);
  },[isIntersecting,intersectionY])

  return (
    <div className="infinite-scroll__container">
      {items.length ?
        <div className="infinite-scroll__item-wrapper">
          {items.map((item, idx) => (
            <ImageItem
              key={`${idx}_${item.id}`}
              imageData={item}
              imageKey={'thumb'}
              imageWidth={200}
              onImageClick={onItemClick}
            />
          ))}
        </div> :
        <span className="infinite-scroll__text--no-results">No results found !!!</span>
      }
      <div
        ref={loadingRef}
        className="infinite-scroll__loader"
      >
        {isLoading ? <span className="infinite-scroll__text--loader">Loading...</span> : null}
      </div>
    </div>
  );
}

export default InfiniteScroll;