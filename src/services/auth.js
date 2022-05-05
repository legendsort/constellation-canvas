import { post, patch, get, put, del } from 'services/axios';

export const inviteToAccessToken = async (params) => {
  return await post('auth', params);
};

export const updateUser = async (uuid, data) => {
  return await patch(['users', uuid], data);
};

export const updateOwnProfile = async (data) => {
  return await patch(['users', 'profile'], data);
};

export const inviteUser = async (params) => {
  return await post(['invite', 'user'], params);
};

export const inviteFacilitator = async (params) => {
  return await post(['invite', 'facilitator'], params);
};

export const getUsers = async (params) => {
  return await get('users', params);
};

export const resendCode = async (userUUID) => {
  return await put(['invite', 'resend', userUUID]);
};

export const getInviteCode = async (userUUID) => {
  return await put(['invite', 'invite-code', userUUID]);
};

export const deleteUser = async (uuid) => {
  return await del(['users', 'user', uuid]);
};

export const deleteFacilitator = async (uuid) => {
  return await del(['users', 'facilitator', uuid]);
};
