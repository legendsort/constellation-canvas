import ActionTypes from 'utils/constants/action-types';
import { handleActions } from 'redux-actions';
import * as authStateUpdaters from './auth-state-updaters';

const actionHandler = {
  [ActionTypes.SET_USER_INFO]: authStateUpdaters.setUserInfoUpdater,
  [ActionTypes.SET_USERS]: authStateUpdaters.setUsersUpdater,
  [ActionTypes.TOGGLE_USER_OPEN]: authStateUpdaters.toggleUserOpenUpdater,
};

export default handleActions(actionHandler, authStateUpdaters.INITIAL_AUTH_STATE);
