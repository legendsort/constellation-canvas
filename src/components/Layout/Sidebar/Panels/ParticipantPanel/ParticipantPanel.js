import { Grid, makeStyles } from '@material-ui/core';
import { setSelectedParticipant } from 'actions';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { LINKS, USER_ROLES } from 'utils/constants';
import Participant from './Participant';

const useStyles = makeStyles({
  root: {},
  item: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default function ParticipantPanel() {
  const participants = useSelector((state) => state.auth.users).sort((a, b) => {
    if (a.role === USER_ROLES.facilitator) {
      return -1;
    } else if (b.role === USER_ROLES.facilitator) {
      return 1;
    }
    return 0;
  });
  const selectedParticipant = useSelector((state) => state.board.selectedParticipant);
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();

  const handleParcipantClick = (uuid) => {
    history.push(LINKS.board);
    dispatch(setSelectedParticipant(uuid));
  };

  return (
    <Grid container className={classes.root}>
      {participants.map(({ uuid, name }) => (
        <Grid container item xs={6} key={uuid} justifyContent="center" alignItems="center">
          <Participant uuid={uuid} name={name} active={uuid === selectedParticipant} onClick={handleParcipantClick} />
        </Grid>
      ))}
    </Grid>
  );
}
