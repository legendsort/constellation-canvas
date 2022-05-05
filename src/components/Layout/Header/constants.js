import { HEADER_TYPES, USER_ROLES } from 'utils/constants';
import { TopicHeader, TitleHeader } from './components';

export const HEADER_MAP = {
  [HEADER_TYPES.topic]: TopicHeader,
  [HEADER_TYPES.title]: TitleHeader,
  [HEADER_TYPES.none]: null,
};

export const HEADER_TITLE_MAP = {
  [USER_ROLES.admin]: 'ADMINISTRATION CONTROL PANEL',
  [USER_ROLES.facilitator]: 'FACILITATOR CONTROL PANEL',
};
