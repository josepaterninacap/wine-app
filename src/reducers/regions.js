export const regions = (state = [], action) => {
  switch (action.type) {
    case 'SET_REGIONS':
      return [...action.regions];
    default:
      return state;
  }
};
