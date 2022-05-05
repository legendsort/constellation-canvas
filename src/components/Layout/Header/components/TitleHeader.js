import { memo } from 'react';
import { useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { HEADER_TITLE_MAP } from '../constants';

const useStyles = makeStyles((theme) => ({
  root: {
    color: '#624ad7',
    fontSize: 20,
    fontWeight: 'bold',
    [theme.breakpoints.down('sm')]: {
      textAlign: 'center',
    },
  },
}));

const TitleHeader = () => {
  const classes = useStyles();
  const role = useSelector((state) => state.auth.profile.role);

  return (
    <Typography className={classes.root} variant="h1" component="h1">
      {HEADER_TITLE_MAP[role]}
    </Typography>
  );
};

export default memo(TitleHeader);
