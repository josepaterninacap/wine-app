import * as WinesService from '../services/Wines';

export const setHttpLoading = () => {
  return {
    type: 'HTTP_LOADING',
  };
};

export const setHttpLoaded = () => {
  return {
    type: 'HTTP_LOADED',
  };
};

export const setHttpError = error => {
  return {
    type: 'HTTP_ERROR',
    error,
  };
};

export const setRegions = regions => {
  return {
    type: 'SET_REGIONS',
    regions,
  };
};

export const fetchRegions = () => {
  return dispatch => {
    dispatch(setHttpLoading());
    dispatch(setRegions([]));
    return WinesService.fetchRegions().then(
      data => {
        dispatch(setHttpLoaded());
        dispatch(setRegions(data));
        return data;
      },
      err => {
        dispatch(setHttpError(`error while fetching regions : ${err.message}`));
      }
    );
  };
};

export const setWines = wines => {
  return {
    type: 'SET_WINES',
    wines,
  };
};

export const fetchWinesFrom = region => {
  return dispatch => {
    dispatch(setHttpLoading());
    dispatch(setWines([]));
    return WinesService.fetchWinesFrom(region).then(
      data => {
        dispatch(setHttpLoaded());
        dispatch(setWines(data));
        return data;
      },
      err => {
        dispatch(setHttpError(`error while fetching wines from ${region} : ${err.message}`));
      }
    );
  };
};

export const setCurrentWine = wine => {
  return {
    type: 'SET_CURRENT_WINE',
    wine,
  };
};

export const fetchCurrentWine = id => {
  return dispatch => {
    dispatch(setHttpLoading());
    dispatch(setCurrentWine(null));
    return WinesService.fetchWine(id).then(
      data => {
        dispatch(setHttpLoaded());
        dispatch(setCurrentWine(data));
        return data;
      },
      err => {
        dispatch(setHttpError(`error while fetching wine with id ${id} : ${err.message}`));
      }
    );
  };
};

export const setCurrentWineComments = comments => {
  return {
    type: 'SET_CURRENT_COMMENTS',
    comments,
  };
};

export const fetchCurrentWineComments = id => {
  return dispatch => {
    dispatch(setHttpLoading());
    dispatch(setCurrentWineComments([]));
    return WinesService.fetchComments(id).then(
      data => {
        dispatch(setHttpLoaded());
        dispatch(setCurrentWineComments(data));
        return data;
      },
      err => {
        dispatch(setHttpError(`error while fetching wine comments with id ${id} : ${err.message}`));
      }
    );
  };
};

export const setCurrentWineLiked = liked => {
  return {
    type: 'SET_CURRENT_LIKED',
    liked,
  };
};

export const fetchCurrentWineLiked = id => {
  return dispatch => {
    dispatch(setHttpLoading());
    dispatch(setCurrentWineLiked(false));
    return WinesService.fetchLiked(id).then(
      data => {
        dispatch(setHttpLoaded());
        dispatch(setCurrentWineLiked(data.like));
        return data;
      },
      err => {
        dispatch(setHttpError(`error while fetching wine liked with id ${id} : ${err.message}`));
      }
    );
  };
};

export const likeWine = id => {
  return dispatch => {
    dispatch(setHttpLoading());
    dispatch(setCurrentWineLiked(true));
    return WinesService.likeWine(id).then(
      data => {
        dispatch(setHttpLoaded());
        return dispatch(fetchCurrentWineLiked(id));
      },
      err => {
        dispatch(setHttpError(`error while liking wine with id ${id} : ${err.message}`));
      }
    );
  };
};

export const unlikeWine = id => {
  return dispatch => {
    dispatch(setHttpLoading());
    dispatch(setCurrentWineLiked(false));
    return WinesService.unlikeWine(id).then(
      data => {
        dispatch(setHttpLoaded());
        return dispatch(fetchCurrentWineLiked(id));
      },
      err => {
        dispatch(setHttpError(`error while liking wine with id ${id} : ${err.message}`));
      }
    );
  };
};

export const commentWine = (id, content) => {
  return dispatch => {
    dispatch(setHttpLoading());
    return WinesService.commentWine(id, content).then(
      data => {
        dispatch(setHttpLoaded());
        return dispatch(fetchCurrentWineComments(id));
      },
      err => {
        dispatch(setHttpError(`error while commenting wine with id ${id} : ${err.message}`));
      }
    );
  };
};
