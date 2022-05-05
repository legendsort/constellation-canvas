import _ from 'lodash';
import { USER_ROLES } from 'utils/constants/enums';

export function getUserCount(users, role) {
  return users.filter((user) => user.role === role).length;
}

export function getDisplayUsers(users) {
  const boards = _.groupBy(users, (user) => user.boardUUID);

  let displayUsers = [];
  _.sortBy(Object.keys(boards)).forEach((key) => {
    const board = _.groupBy(boards[key], (user) => user.role);

    displayUsers = displayUsers.concat(board[USER_ROLES.facilitator]);

    if (board[USER_ROLES.facilitator][0].open) {
      displayUsers = displayUsers.concat(_.sortBy(board[USER_ROLES.user], (user) => user.email));
    }
  });

  return displayUsers;
}
