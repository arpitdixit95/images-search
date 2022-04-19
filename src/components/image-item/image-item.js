import { useEffect, useRef, useState } from 'react';
import { useIntersectionObserver } from '~/helpers/custom-hooks';
import './image-item.scss';

const ImageItem = ({imageData, imageKey='thumb', imageWidth=200, onImageClick, maxHeight=160 }) => {
  const {color: imageBackground, urls: {[imageKey]: imageUrl}, width, height, alt_description} = imageData;
  const [isInView, setIsInView] = useState(false);
  const [imageHeight, setImageHeight] = useState(Math.min(height/width * imageWidth, maxHeight));
  const imgRef = useRef();
  const [isIntersecting] = useIntersectionObserver(imgRef);


  useEffect(() => {
    if(isIntersecting){
      setIsInView(true);
    }
  }, [isIntersecting])
  useEffect(() => {
    setImageHeight(Math.min(height/width * imageWidth, maxHeight));
  }, [imageWidth]);

  return (
    <div
      ref={imgRef}
      className='image-item__wrapper'
      style={{
        backgroundColor: imageBackground,
        height: maxHeight,
        width: imageWidth,
        margin: 'auto',
        maxWidth: '100%',
      }}
      onClick={() => onImageClick(imageData)}
    >
      {isInView && (
          <img
            className='image-item__image'
            src={imageUrl}
            alt={alt_description}     
          />
      )}
    </div>
  );
};

export default ImageItem;