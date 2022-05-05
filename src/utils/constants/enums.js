import { keyMirror } from 'utils';

export const USER_ROLES = keyMirror({
  admin: null,
  facilitator: null,
  user: null,
  unknown: null,
});

export const HEADER_TYPES = keyMirror({
  topic: null,
  title: null,
  none: null,
});

export const SIDEBAR_ITEM_TYPES = keyMirror({
  canvas: null,
  toolbox: null,
  participant: null,
  manage: null,
});

export const CANVAS_STATES = {
  current: 'Current State',
  future1: 'Future State 1',
  future2: 'Future State 2',
};

export const USER_ACTION_TYPES = {
  invite: 'invite',
  resend: 'resend',
  delete: 'delete',
};

export const USER_ACTIONS = [
  {
    title: 'Invite User',
    role: USER_ROLES.facilitator,
    type: USER_ACTION_TYPES.invite,
  },
  {
    title: 'Resend Code',
    role: USER_ROLES.all,
  },
  {
    title: 'Delete Facilitator',
    role: USER_ROLES.facilitator,
  },
  {
    title: 'Delete User',
    role: USER_ROLES.user,
  },
];

export const DND_ITEM_TYPES = keyMirror({
  widget: null,
});
