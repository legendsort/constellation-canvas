import { USER_ROLES } from 'utils/constants/enums';

export const INITIAL_AUTH_STATE = {
  profile: {
    role: USER_ROLES.unknown,
  },
  accessToken: null,
  users: [],
};

export const setUserInfoUpdater = (state, { payload: { profile, accessToken } }) => ({
  ...state,
  profile: profile || state.profile,
  accessToken: accessToken || state.accessToken,
});

export const setUsersUpdater = (state, { payload: users }) => ({
  ...state,
  users,
});

export const toggleUserOpenUpdater = (state, { payload: { id } }) => ({
  ...state,
  users: state.users.map((user) =>
    user.uuid !== id
      ? user
      : {
          ...user,
          open: !user.open,
        }
  ),
});
