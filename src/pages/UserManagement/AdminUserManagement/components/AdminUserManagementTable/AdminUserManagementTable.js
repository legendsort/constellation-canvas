import { Fragment, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TableContainer from '@material-ui/core/TableContainer';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import Menu from '@material-ui/core/Menu';

import { StyledTableCell, StyledMenuItem } from './styled-components';
import Row from './Row';

import { USER_ACTIONS, USER_ROLES } from 'utils/constants/enums';

const useStyles = makeStyles((theme) => ({
  menu: {
    '& > * > *': {
      padding: 0,
    },
  },
}));

export default function AdminUserManagementTable(props) {
  const classes = useStyles();
  const { users, toggleOpen } = props;

  const [menuState, setMenuState] = useState({
    anchorEl: null,
    role: USER_ROLES.all,
  });

  const handleClose = () => {
    setMenuState({
      anchorEl: null,
      role: USER_ROLES.all,
    });
  };

  const handleOpenActionMenu = (e, role) => {
    setMenuState({
      anchorEl: e.currentTarget,
      role: role,
    });
  };

  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <StyledTableCell />
            <StyledTableCell style={{ fontWeight: 'bold' }}>Email</StyledTableCell>
            <StyledTableCell style={{ fontWeight: 'bold' }}>Screen Name</StyledTableCell>
            <StyledTableCell style={{ fontWeight: 'bold' }}>Invite Code</StyledTableCell>
            <StyledTableCell style={{ fontWeight: 'bold' }}>Type</StyledTableCell>
            <StyledTableCell style={{ fontWeight: 'bold' }}>Date (Y-M-D)</StyledTableCell>
            <StyledTableCell style={{ fontWeight: 'bold' }}>Actions</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map((user) => (
            <Fragment key={user.email}>
              <Row
                key={user.email}
                row={user}
                toggleOpen={(open) => toggleOpen(user.email, open)}
                handleOpenActionMenu={(e) => handleOpenActionMenu(e, user.role)}
              />
              {user.users.length !== 0 &&
                user.open &&
                user.users.map((u) => <Row key={u.email} row={u} handleOpenActionMenu={(e) => handleOpenActionMenu(e, u.role)} />)}
            </Fragment>
          ))}
        </TableBody>
      </Table>
      <Menu
        className={classes.menu}
        anchorEl={menuState.anchorEl}
        keepMounted
        open={Boolean(menuState.anchorEl)}
        onClose={handleClose}
        transitionDuration={0}
      >
        {USER_ACTIONS.filter((action) => action.role === USER_ROLES.all || action.role === menuState.role).map((action) => (
          <StyledMenuItem key={action.title} onClick={handleClose}>
            {action.title}
          </StyledMenuItem>
        ))}
      </Menu>
    </TableContainer>
  );
}
