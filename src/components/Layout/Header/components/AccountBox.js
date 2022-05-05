import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';

import { Avatar } from 'components/';
import { useSelector } from 'react-redux';
import { useState } from 'react';
import { Menu, MenuItem } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  info: {
    display: 'flex',
    flexDirection: 'column',
    textAlign: 'right',
    marginLeft: 14,
    fontWeight: 500,
    [theme.breakpoints.down('sm')]: {
      display: 'none',
    },
  },
  username: {
    color: '#a4a4a4',
    fontSize: 15,
    textTransform: 'capitalize',
  },
  logout: {
    color: '#624ad7',
    fontSize: 13,
    cursor: 'pointer',
  },
}));

export default function AccountBox() {
  const classes = useStyles();
  const { profile } = useSelector((state) => state.auth);
  const [menuAnchorEl, setMenuAnchorEl] = useState(null);

  const handleLogout = (e) => {
    e.preventDefault();
    localStorage.clear();
    window.location.reload();
  };

  const handleAvatarClick = (e) => {
    e.preventDefault();
    setMenuAnchorEl(e.currentTarget);
  };

  const handleClose = (e) => {
    setMenuAnchorEl(null);
  };

  return (
    <Box className={classes.root}>
      <Avatar displayName={profile.name} onClick={handleAvatarClick} />
      <Box className={classes.info}>
        <Typography className={classes.username}>{profile.name}</Typography>
        <Link className={classes.logout} onClick={handleLogout}>
          Log out
        </Link>
      </Box>
      <Menu
        anchorEl={menuAnchorEl}
        anchorOrigin={{ horizontal: 'left', vertical: 'bottom' }}
        getContentAnchorEl={null}
        keepMounted
        open={Boolean(menuAnchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={handleLogout}>Log out</MenuItem>
      </Menu>
    </Box>
  );
}

AccountBox.defaultProps = {
  displayName: '',
};

AccountBox.propTypes = {
  displayName: PropTypes.string,
};
