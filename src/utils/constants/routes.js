import CanvasBoard from 'pages/CanvasBoard';
import UserManagement from 'pages/UserManagement';
import { Register, ScreenName, Invite } from 'pages/Auth';

import { HEADER_TYPES, USER_ROLES } from './enums';
import LINKS from './links';

export const ROUTES = [
  {
    path: LINKS.invite,
    component: Invite,
    settings: {
      sidebar: false,
      header: HEADER_TYPES.none,
    },
    validate: ({ role }) => role === USER_ROLES.unknown,
    authRequired: false,
  },
  {
    path: LINKS.board,
    component: CanvasBoard,
    settings: {
      sidebar: true,
      header: HEADER_TYPES.topic,
    },
    validate: ({ role, name }) => [USER_ROLES.user, USER_ROLES.facilitator].includes(role) && name,
    authRequired: true,
  },
  {
    path: LINKS.userManagement,
    component: UserManagement,
    settings: {
      sidebar: true,
      header: HEADER_TYPES.title,
    },
    validate: ({ name, role }) => [USER_ROLES.admin, USER_ROLES.facilitator].includes(role) && name,
    authRequired: true,
  },
  {
    path: LINKS.register,
    component: Register,
    settings: {
      sidebar: false,
      header: HEADER_TYPES.none,
    },
    validate: (profile) => profile.role === USER_ROLES.unknown,
    authRequired: false,
  },
  {
    path: LINKS.screenName,
    component: ScreenName,
    settings: {
      sidebar: false,
      header: HEADER_TYPES.none,
    },
    validate: ({ name, role }) => role !== USER_ROLES.unknown && !name,
    authRequired: true,
  },
];

export default ROUTES;
