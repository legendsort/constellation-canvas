import { keyMirror } from 'utils';

import AdminUserManagement from './AdminUserManagement';
import FacilitatorUserManagement from './FacilitatorUserManagement';

import { USER_ROLES } from 'utils/constants/enums';

export const USER_MANAGEMENT_MAP = {
  [USER_ROLES.admin]: AdminUserManagement,
  [USER_ROLES.facilitator]: FacilitatorUserManagement,
};

export const TABLE_COLUMN_MAP = [
  {
    label: 'Email',
    width: 200,
  },
  {
    label: 'Screen Name',
    width: 200,
  },
  {
    label: 'Invite Code',
    width: 150,
  },
  {
    label: 'Actions',
    width: 50,
  },
];

export const USER_ACTION_TYPE = keyMirror({
  invite: null,
  resend: null,
  delete: null,
});

export const USER_ACTION_MENU = [
  {
    label: 'Invite User',
    role: [USER_ROLES.facilitator],
    type: USER_ACTION_TYPE.invite,
  },
  {
    label: 'Resend Code',
    role: [USER_ROLES.facilitator, USER_ROLES.user],
    type: USER_ACTION_TYPE.resend,
  },
  {
    label: 'Delete Facilitator',
    role: [USER_ROLES.facilitator],
    type: USER_ACTION_TYPE.delete,
  },
  {
    label: 'Delete User',
    role: [USER_ROLES.user],
    type: USER_ACTION_TYPE.delete,
  },
];

export const INVITE_DIALOG_TITLE = {
  [USER_ROLES.facilitator]: 'Invite Facilitator',
  [USER_ROLES.user]: 'Invite User',
};
