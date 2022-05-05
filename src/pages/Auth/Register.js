import { Box } from '@material-ui/core';
import { Title, Input, Button, Label } from 'components/form-components';
import { PROJECT_TITLE } from 'utils/constants/ui';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { inviteToAccessToken } from 'actions/auth';
import useStyles from './use-styles';

const Login = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [inviteCode, setInviteCode] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(inviteToAccessToken({ inviteCode }));
  };

  const handleReset = (e) => {
    e.preventDefault();
    setInviteCode('');
  };

  return (
    <Box className={classes.root}>
      <form className={classes.rectangle} onSubmit={handleSubmit}>
        <Title className={classes.title}>{PROJECT_TITLE}</Title>

        <Label>Participant Code:</Label>
        <Input placeholder="Enter participant code..." value={inviteCode} onChange={(e) => setInviteCode(e.target.value)} required autoFocus />

        <Box className={classes.buttonWrapper}>
          <Button type="submit" color="primary" variant="contained">
            SUBMIT
          </Button>
          <Button color="secondary" variant="contained" style={{ marginLeft: 16 }} onClick={handleReset}>
            RESET
          </Button>
        </Box>
      </form>
      <Box className={classes.copyright}>Copyright © 2021 Magnitude Educational Inc.</Box>
    </Box>
  );
};

export default Login;
