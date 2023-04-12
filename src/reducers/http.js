export const loading = (state = { state: 'LOADED', error: undefined }, action) => {
  switch (action.type) {
    case 'HTTP_LOADING':
      return Object.assign({}, state, { state: 'HTTP_LOADING', error: undefined });
    case 'HTTP_LOADED':
      return Object.assign({}, state, { state: 'HTTP_LOADED', error: undefined });
    case 'HTTP_ERROR':
      return Object.assign({}, state, { state: 'HTTP_ERROR', error: action.error });
    default:
      return state;
  }
};
