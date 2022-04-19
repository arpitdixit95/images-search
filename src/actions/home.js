import { DEFAULT_COLLECTION_ID, PER_PAGE } from "~/helpers/constants";

export const GET_COLLECTION_DATA = "GET_COLLECTION_DATA";
export const GET_SEARCH_RESULTS = "GET_SEARCH_RESULTS";

export const getDefaultCollectionData = (page=1, filters) => (dispatch, getState, { api }) => {
  const url = `/collections/${DEFAULT_COLLECTION_ID}/photos`
  const payload = {
    id: DEFAULT_COLLECTION_ID,
    page,
    per_page: PER_PAGE,
    ...filters,
  }
  return dispatch({
    type: GET_COLLECTION_DATA,
    payload: { page },
    promise: api.get(url, payload),
  });
};

export const getPaginatedSearchResults = (searchTerm, filters, page=1) => (dispatch, getState, { api }) => {
  const url = `/search/photos`
  const payload = {
    query: searchTerm,
    page,
    per_page: PER_PAGE,
    ...filters,
  }
  return dispatch({
    type: GET_SEARCH_RESULTS,
    payload: { page },
    promise: api.get(url, payload),
  });
};

// export const payoutRequestPOST = (url, clickParams, actionType, meta, formData) => (dispatch, getState, { api }) => {
//   return dispatch({
//     type: PAYOUT_REQUEST_POST,
//     payload: { actionType },
//     promise: api.post(newUrl, { ...requestBody }),
//     meta: {
//       onSuccess: (res) => {
//         if (res.success) {
//           const { filterSection, actionType: type } = payout;
//           const formattedUrl = getUrl(filterSection[0].actions[0].action.url);
//           dispatch({
//             type: PAYOUT_REQUEST_GET,
//             payload: type,
//             promise: api.get(formattedUrl, { ...getPayoutRequest(payout) }),
//           });
//         }
//       },
//     },
//   });
// };