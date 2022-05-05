import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router';
import { Box } from '@material-ui/core';
import { inviteToAccessToken } from 'actions/auth';
import useStyles from './use-styles';

const Invite = () => {
  const { inviteCode } = useParams();
  const classes = useStyles();
  const dispatch = useDispatch();

  // eslint-disable-next-line
  useEffect(() => dispatch(inviteToAccessToken({ inviteCode })), []);

  return <Box className={classes.root}></Box>;
};

export default Invite;
