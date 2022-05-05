import { createAction } from 'redux-actions';
import ActionTypes from 'utils/constants/action-types';
import * as API from 'services/auth';
import { setLoading } from './auxiliary';
import { USER_ROLES } from 'utils/constants/enums';
import axios, { setupAxiosInterceptorsRequest } from 'services/axios';

export const inviteToAccessToken = (params) => (dispatch) => {
  dispatch(setLoading(true));

  API.inviteToAccessToken(params).then(({ data, accessToken }) => {
    localStorage.setItem('accessToken', accessToken);
    localStorage.setItem('profile', JSON.stringify(data));
    setupAxiosInterceptorsRequest(axios, accessToken);

    dispatch(setUserInfo(accessToken, data));
    dispatch(setLoading(false));
  });
};

export const updateUser = (userUUID, params) => (dispatch, getState) => {
  dispatch(setLoading(true));

  const {
    users,
    profile: { uuid: currentUser },
  } = getState().auth;
  API.updateUser(userUUID, params).then((data) => {
    if (userUUID === currentUser) {
      localStorage.setItem('profile', JSON.stringify(data));
      dispatch(setUserInfo(null, data));
    }

    dispatch(setUsers(users.map((u) => (u.uuid === userUUID ? data : u))));
    dispatch(setLoading(false));
  });
};

export const updateOwnProfile = (params) => (dispatch) => {
  dispatch(setLoading(true));

  API.updateOwnProfile(params).then((data) => {
    localStorage.setItem('profile', JSON.stringify(data));
    dispatch(setUserInfo(null, data));
    dispatch(setLoading(false));
  });
};

export const inviteUser = (email, boardUUID) => (dispatch, getState) => {
  dispatch(setLoading(true));

  const { users } = getState().auth;
  API.inviteUser({ email, boardUUID }).then((data) => {
    dispatch(setUsers([...users, data]));
    dispatch(setLoading(false));
  });
};

export const inviteFacilitator = (email) => (dispatch, getState) => {
  dispatch(setLoading(true));

  const { users } = getState().auth;
  API.inviteFacilitator({ email }).then((data) => {
    dispatch(setUsers([...users, data]));
    dispatch(setLoading(false));
  });
};

export const getUsers = () => (dispatch, getState) => {
  dispatch(setLoading(true));

  const { boardUUID, uuid } = getState().auth.profile;
  API.getUsers({ boardUUID }).then(({ results }) => {
    const users = results.filter((u) => u.uuid !== uuid && (u.role === USER_ROLES.user || u.role === USER_ROLES.facilitator));
    dispatch(setUsers(users.map((user) => ({ ...user, open: false }))));
    dispatch(setLoading(false));
  });
};

export const resendCode = (userUUID) => (dispatch) => {
  API.resendCode(userUUID);
};

export const getInviteCode = (userUUID) => (dispatch, getState) => {
  dispatch(setLoading(true));

  const users = getState().auth.users;
  API.getInviteCode(userUUID).then((data) => {
    dispatch(setUsers(users.map((u) => (u.uuid === userUUID ? data : u))));
    dispatch(setLoading(false));
  });
};

export const deleteUser = (userUUID) => (dispatch, getState) => {
  dispatch(setLoading(true));

  const users = getState().auth.users;
  API.deleteUser(userUUID).then(() => {
    dispatch(setUsers(users.filter((u) => u.uuid !== userUUID)));
    dispatch(setLoading(false));
  });
};

export const deleteFacilitator = (facilitatorUUID) => (dispatch, getState) => {
  dispatch(setLoading(true));

  const users = getState().auth.users;
  API.deleteFacilitator(facilitatorUUID).then(({ deletedUsersUUIDs }) => {
    dispatch(setUsers(users.filter((u) => !deletedUsersUUIDs.includes(u.uuid))));
    dispatch(setLoading(false));
  });
};

export const setUserInfo = createAction(ActionTypes.SET_USER_INFO, (accessToken, profile) => ({ profile, accessToken }));
export const setUsers = createAction(ActionTypes.SET_USERS, (payload) => payload);
export const toggleUserOpen = createAction(ActionTypes.TOGGLE_USER_OPEN, (id) => ({ id }));
