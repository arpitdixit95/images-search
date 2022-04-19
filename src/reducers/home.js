import { handle } from 'redux-pack';
import * as homeActionTypes from '~/actions/home';

const initialState = {
  isLoading: false,
  items: [],
  page: 1,
};

export default ( state=initialState, action={}) => {
  const { type='', payload={} } = action;
  switch(type){
    case homeActionTypes.GET_COLLECTION_DATA: {
      return handle(state, action, {
        start: (previousState) => ({
          ...previousState,
          isLoading: true,
          page: action.payload && action.payload.page ? action.payload.page : 1,
        }),
        success: (previousState) => {
          let page = previousState.page
          if(payload && payload.length){
            page= page+1;
          }
          return {
            ...previousState,
            page,
            items: previousState.page == 1 ? payload : [...previousState.items, ...payload],
          }
        },
        failure: (previousState) => ({
          ...previousState,
        }),
        finish: (previousState) => ({
          ...previousState,
          isLoading: false,
        }),
      });
    }case homeActionTypes.GET_SEARCH_RESULTS: {
      return handle(state, action, {
        start: (previousState) => ({
          ...previousState,
          isLoading: true,
          page: action.payload && action.payload.page ? action.payload.page : 1,
        }),
        success: (previousState) => {
          let page = previousState.page
          if(payload && payload.results && payload.results.length){
            page= page+1;
          }
          return {
            ...previousState,
            page,
            items: previousState.page == 1 ? payload.results : [...previousState.items, ...payload.results],
          }
        },
        failure: (previousState) => ({
          ...previousState,
        }),
        finish: (previousState) => ({
          ...previousState,
          isLoading: false,
        }),
      });
    }
    default: {
      return state;
    }
  }
}