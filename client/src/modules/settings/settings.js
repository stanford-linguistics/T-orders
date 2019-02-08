import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';

// constants
export const SET_OPTIMIZATION_METHOD = 'settings/SET_OPTIMIZATION_METHOD';
export const SET_DELETE_EXPIRED_TORDERS = 'settings/SET_DELETE_EXPIRED_TORDERS';

const persistConfig = {
  key: 'settings',
  storage: storage,
  whitelist: ['deleteExpiredTorders']
};

const initialState = {
  preferredOptimization: 'simplex',
  deleteExpiredTorders: false
};

// reducer
const SettingsReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_OPTIMIZATION_METHOD:
      return {
        ...state,
        preferredOptimization: action.payload
      };
    case SET_DELETE_EXPIRED_TORDERS:
      return {
        ...state,
        deleteExpiredTorders: action.payload
      };

    default:
      return state;
  }
};

export default persistReducer(persistConfig, SettingsReducer);

// actions
export const setOptimizationMethod = preferredOptimization => {
  return dispatch => {
    dispatch({
      type: SET_OPTIMIZATION_METHOD,
      payload: preferredOptimization
    });
  };
};

export const setDeleteExpiredTorders = shouldDelete => {
  return dispatch => {
    dispatch({
      type: SET_DELETE_EXPIRED_TORDERS,
      payload: shouldDelete
    });
  };
};
