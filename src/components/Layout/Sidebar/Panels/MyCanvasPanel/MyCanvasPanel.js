import { makeStyles } from '@material-ui/core/styles';
import { Box, Link } from '@material-ui/core';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import { useDispatch, useSelector } from 'react-redux';
import { switchCanvas } from 'actions';
import clsx from 'clsx';
import { useHistory } from 'react-router';
import { CANVAS_STATES, LINKS } from 'utils/constants';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  link: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingLeft: theme.spacing(5),
    paddingRight: theme.spacing(2),
    height: 40,
    fontSize: 14,
    fontWeight: 'bold',
    letterSpacing: 0.49,
    color: '#6c6c6e',
    cursor: 'pointer',
    '&:hover': {
      backgroundColor: '#dab6fe',
      textDecoration: 'unset',
    },
    '&.active': {
      backgroundColor: '#eae6fe',
      textDecoration: 'unset',
    },
    [theme.breakpoints.down('sm')]: {
      paddingLeft: theme.spacing(2),
    },
  },
  text: {
    fontSize: 14,
    fontWeight: 'bold',
    letterSpacing: 0.49,
    color: '#6c6c6e',
  },
}));

export default function MyCanvasPanel() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();
  const index = useSelector((state) => state.board.index);

  const handleClick = (e, idx) => {
    e.preventDefault();

    history.push(LINKS.board);
    dispatch(switchCanvas(idx));
  };

  return (
    <Box className={classes.root}>
      {Object.values(CANVAS_STATES).map((canvasState, idx) => (
        <Link
          className={clsx(classes.link, { active: idx === index && history.location.pathname === LINKS.board })}
          key={canvasState}
          onClick={(e) => handleClick(e, idx)}
        >
          {canvasState}
          <ChevronRightIcon />
        </Link>
      ))}
    </Box>
  );
}
