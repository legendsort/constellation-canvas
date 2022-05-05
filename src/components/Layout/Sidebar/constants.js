import { MyCanvasPanel, ParticipantPanel, ToolBoxPanel } from './Panels';
import { SIDEBAR_ITEM_TYPES, USER_ROLES } from 'utils/constants/enums';
import LINKS from 'utils/constants/links';

export const SIDEBAR_ITEMS = [
  {
    title: 'MY CANVAS',
    type: SIDEBAR_ITEM_TYPES.canvas,
    role: [USER_ROLES.facilitator, USER_ROLES.user],
    component: MyCanvasPanel,
  },
  {
    title: 'TOOLBOX',
    type: SIDEBAR_ITEM_TYPES.toolbox,
    role: [USER_ROLES.facilitator, USER_ROLES.user],
    component: ToolBoxPanel,
  },
  {
    title: 'PARTICIPANT',
    type: SIDEBAR_ITEM_TYPES.participant,
    role: [USER_ROLES.facilitator],
    component: ParticipantPanel,
  },
  {
    title: 'USER MANAGEMENT',
    type: SIDEBAR_ITEM_TYPES.manage,
    role: [USER_ROLES.facilitator, USER_ROLES.admin],
    path: LINKS.userManagement,
  },
];
