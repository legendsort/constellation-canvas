import ActionTypes from 'utils/constants/action-types';
import { createAction } from 'redux-actions';

export const setLoading = createAction(ActionTypes.SET_LOADING, (payload) => payload);
export const setError = createAction(ActionTypes.SET_ERROR, (payload) => payload);
export const toggleNotification = createAction(ActionTypes.TOGGLE_NOTIFICATION, (payload) => payload);
