import { Box, makeStyles } from '@material-ui/core';
import Avatar from 'components/Avatar';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: '31px 18px 0px 18px',
    width: 97,
    height: 124,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    flexDirection: 'column',
    borderRadius: 8,
    cursor: 'pointer',
    userSelect: 'none',
    '&:hover': {
      border: 2,
      borderStyle: 'solid',
      borderColor: '#f2a912',
      padding: '29px 16px 0px 16px',
    },
  },
  label: {
    fontSize: 12,
    color: '#a4a4a4',
    textAlign: 'center',
    whiteSpace: 'nowrap',
    marginTop: 8,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  activeSign: {
    backgroundColor: '#e80000',
    width: 10,
    height: 10,
    borderRadius: 999,
    display: 'inline-block',
    marginRight: 3,
  },
  text: {
    height: 15,
  },
}));

export default function Participant({ uuid, name, active, onClick }) {
  const classes = useStyles();
  const handleClick = (e) => {
    e.preventDefault();
    onClick(uuid);
  };

  return (
    <Box className={classes.root} onClick={handleClick}>
      <Avatar displayName={name} boxSize={60} fontSize={24} />
      <Box className={classes.label}>
        {active && <Box className={classes.activeSign} />}
        <Box className={classes.text}>{name}</Box>
      </Box>
    </Box>
  );
}
