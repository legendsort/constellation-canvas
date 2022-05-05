import { makeStyles } from '@material-ui/core';

export default makeStyles((theme) => ({
  root: {
    display: 'flex',
    width: '100vw',
    height: '100vh',
    overflow: 'auto',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.palette.primary.main,
  },
  rectangle: {
    display: 'flex',
    justifyContent: 'flex-start',
    flexDirection: 'column',
    width: 360,
    padding: theme.spacing(4, 6, 4, 6),
    borderRadius: '15px',
    backgroundColor: '#fff',
    [theme.breakpoints.down('sm')]: {
      padding: theme.spacing(4, 3, 4, 3),
      width: 312,
    },
  },
  title: {
    margin: '0 23px 38px',
  },
  buttonWrapper: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 18,
  },
  copyright: {
    position: 'absolute',
    top: 'calc(100vh - 28px)',
    fontSize: '13px',
    letterSpacing: '0.45px',
    textAlign: 'center',
    color: '#fff',
  },
}));
