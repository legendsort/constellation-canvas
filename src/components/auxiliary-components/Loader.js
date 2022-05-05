import { Backdrop, CircularProgress, makeStyles } from '@material-ui/core';
import { useSelector } from 'react-redux';

const useStyles = makeStyles((theme) => ({
  root: {
    color: 'white',
    zIndex: theme.zIndex.drawer + 1,
  },
}));

const Loader = () => {
  const classes = useStyles();
  const { loading } = useSelector((state) => state.aux);

  return (
    <Backdrop open={loading} className={classes.root}>
      <CircularProgress color="inherit" />
    </Backdrop>
  );
};

export default Loader;
