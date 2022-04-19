import { useState, useEffect, useCallback} from 'react';

export const useIntersectionObserver = (ref, options) => {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const [intersectionY, setIntersectionY] = useState(0);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      setIsIntersecting(entry.isIntersecting);
      setIntersectionY(entry.boundingClientRect.y)
    }, options);

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if(observer && ref.current){
        observer.unobserve(ref.current);
      }
    };
  }, []);

  return [isIntersecting, intersectionY];
};

export const useDebounce = (callbackFunction, delay, dependencies ) => {
  const callback = useCallback(callbackFunction, dependencies)
  useEffect(() => {
    const handler = setTimeout(() => {
      callback()
    }, delay)
    return () => {
      clearTimeout(handler)
    }
  }, [callback])
};