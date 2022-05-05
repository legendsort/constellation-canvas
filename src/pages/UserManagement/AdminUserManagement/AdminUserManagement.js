import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import IconButton from '@material-ui/core/IconButton';
import MenuItem from '@material-ui/core/MenuItem';
import SyncIcon from '@material-ui/icons/SyncOutlined';
import MoreHorizIcon from '@material-ui/icons/MoreHorizOutlined';
import AddBoxIcon from '@material-ui/icons/AddBoxOutlined';
import IndeterminateCheckBoxIcon from '@material-ui/icons/IndeterminateCheckBoxOutlined';

import {
  getUsers,
  toggleUserOpen,
  updateUser,
  getInviteCode,
  resendCode,
  inviteUser,
  inviteFacilitator,
  deleteUser,
  deleteFacilitator,
} from 'actions';

import { UserTableContainer, TableDescription, InviteDialog, InviteButton, EditField, UserActionMenu, ConfirmDialog } from '../components';

import { getUserCount, getDisplayUsers } from '../helpers';

import { USER_ROLES } from 'utils/constants/enums';
import { TABLE_COLUMN_MAP, USER_ACTION_MENU, USER_ACTION_TYPE, INVITE_DIALOG_TITLE } from '../constants';
import { Grid } from '@material-ui/core';
import { SIDEBAR_MAX_WIDTH } from 'utils/constants';

const useStyles = makeStyles((theme) => ({
  root: {
    width: `calc(100vw - ${SIDEBAR_MAX_WIDTH}px)`,
    overflow: 'auto',
    padding: theme.spacing(8, 8, 8, 4),
    [theme.breakpoints.down('sm')]: {
      padding: theme.spacing(4, 4, 4, 2),
      width: `calc(100vw - ${SIDEBAR_MAX_WIDTH}px)`,
    },
  },
  toolbar: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    [theme.breakpoints.up('sm')]: {
      marginBottom: theme.spacing(4),
    },
  },
  tableContainer: {},
  light: {
    backgroundColor: '#f6f6f6 !important',
  },
  white: {
    backgroundColor: 'white !important',
  },
  inviteCell: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  more: {
    borderLeft: '2px solid gray',
    borderBottom: '2px solid gray',
    width: 10,
    height: 10,
    marginLeft: 20,
  },
  tableDesc: {
    order: 1,
    [theme.breakpoints.down('xs')]: {
      order: 2,
    },
  },
  inviteButton: {
    order: 2,
    display: 'flex',
    justifyContent: 'flex-end',
    [theme.breakpoints.down('xs')]: {
      order: 1,
      marginBottom: theme.spacing(2),
      justifyContent: 'center',
    },
  },
}));

export default function AdminUserManagement(props) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { users } = useSelector((state) => state.auth);
  const [inviteDialogOpen, setInviteDialogOpen] = useState(false);
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
  const [menuState, setMenuState] = useState({
    id: null,
    role: null,
    anchorEl: null,
  });

  const displayUsers = getDisplayUsers(users);

  useEffect(() => dispatch(getUsers()), [dispatch]);

  const handleInviteDialogOpen = () => {
    setInviteDialogOpen(true);
  };

  const handleInviteDialogClose = () => {
    setTimeout(handleMenuClose, 200);
    setInviteDialogOpen(false);
  };

  const handleSubmit = (email) => {
    if (menuState.role === USER_ROLES.facilitator) {
      dispatch(inviteUser(email, users.find((user) => user.uuid === menuState.id).boardUUID));
    } else {
      dispatch(inviteFacilitator(email));
    }

    handleInviteDialogClose();
  };

  const handleConfirmDialogOpen = () => {
    setConfirmDialogOpen(true);
  };

  const handleConfirmDialogClose = () => {
    setTimeout(handleMenuClose, 200);
    setConfirmDialogOpen(false);
  };

  const handleConfirm = () => {
    if (menuState.role === USER_ROLES.facilitator) {
      dispatch(deleteFacilitator(menuState.id));
    } else {
      dispatch(deleteUser(menuState.id));
    }
    handleConfirmDialogClose();
  };

  const handleUserDataChange = (id, type, value) => {
    dispatch(updateUser(id, { [type]: value }));
  };

  const handleSync = (id) => {
    dispatch(getInviteCode(id));
  };

  const handleMenuOpen = (e, id, role) => {
    setMenuState({
      id,
      role,
      anchorEl: e.currentTarget,
    });
  };

  const handleMenuClose = () => {
    setMenuState({
      id: null,
      role: null,
      anchorEl: null,
    });
  };

  const handleMenuClick = (type) => {
    if (type === USER_ACTION_TYPE.invite) {
      setMenuState({
        ...menuState,
        anchorEl: null,
      });
      setInviteDialogOpen(true);
    } else if (type === USER_ACTION_TYPE.resend) {
      dispatch(resendCode(menuState.id));
      handleMenuClose();
    } else if (type === USER_ACTION_TYPE.delete) {
      handleConfirmDialogOpen();
      setMenuState({
        ...menuState,
        anchorEl: null,
      });
    }
  };

  return (
    <Box className={classes.root}>
      <Grid container className={classes.toolbar}>
        <Grid item xs={12} sm={6} className={classes.tableDesc}>
          <TableDescription>
            {getUserCount(users, USER_ROLES.facilitator)} Facilitators, {getUserCount(users, USER_ROLES.user)} Users total
          </TableDescription>
        </Grid>
        <Grid item xs={12} sm={6} className={classes.inviteButton}>
          <InviteButton onClick={handleInviteDialogOpen}>Invite Facilitator</InviteButton>
        </Grid>
      </Grid>

      <UserTableContainer className={classes.tableContainer}>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell />
              {TABLE_COLUMN_MAP.map((column, index) => (
                <TableCell key={index} minwidth={column.width}>
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody className={classes.tableBody}>
            {displayUsers.map((user) => (
              <TableRow key={user.uuid} className={user.role === USER_ROLES.user ? classes.white : classes.light}>
                <TableCell>
                  {user.role === USER_ROLES.facilitator && (
                    <IconButton size="small" onClick={(e) => dispatch(toggleUserOpen(user.uuid))}>
                      {user.open ? <IndeterminateCheckBoxIcon /> : <AddBoxIcon />}
                    </IconButton>
                  )}
                  {user.role === USER_ROLES.user && <Box className={classes.more}></Box>}
                </TableCell>
                <TableCell>
                  <EditField value={user.email} handleChange={(value) => handleUserDataChange(user.uuid, 'email', value)} />
                </TableCell>
                <TableCell>
                  <EditField value={user.name} handleChange={(value) => handleUserDataChange(user.uuid, 'name', value)} />
                </TableCell>
                <TableCell>
                  <Box className={classes.inviteCell}>
                    {user.inviteCode}
                    <IconButton onClick={(e) => handleSync(user.uuid)}>
                      <SyncIcon fontSize="small" />
                    </IconButton>
                  </Box>
                </TableCell>
                <TableCell>
                  <IconButton onClick={(e) => handleMenuOpen(e, user.uuid, user.role)}>
                    <MoreHorizIcon fontSize="small" />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </UserTableContainer>

      <UserActionMenu anchorEl={menuState.anchorEl} keepMounted open={Boolean(menuState.anchorEl)} onClose={handleMenuClose}>
        {USER_ACTION_MENU.filter((item) => item.role.includes(menuState.role)).map((item, index) => (
          <MenuItem key={index} onClick={(e) => handleMenuClick(item.type)}>
            {item.label}
          </MenuItem>
        ))}
      </UserActionMenu>

      <InviteDialog
        open={inviteDialogOpen}
        onClose={handleInviteDialogClose}
        onSubmit={handleSubmit}
        title={INVITE_DIALOG_TITLE[menuState.role ? USER_ROLES.user : USER_ROLES.facilitator]}
      />

      <ConfirmDialog open={confirmDialogOpen} onClose={handleConfirmDialogClose} onSubmit={handleConfirm} title="Warning" />
    </Box>
  );
}
