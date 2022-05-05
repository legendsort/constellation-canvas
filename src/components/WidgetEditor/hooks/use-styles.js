import { makeStyles } from '@material-ui/core';

export default makeStyles((theme) => ({
  root: {
    width: '100%',
    height: '100%',
    position: 'relative',
    overflow: 'hidden',
  },
  figureZoompane: {
    width: '100%',
    height: 'calc(100% - 85px)',
  },
  figureStage: {
    width: '100%',
    height: '100%',
    zIndex: 0,
  },
  buttonArea: {
    width: '100%',
    height: 85,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    [theme.breakpoints.down('sm')]: {
      display: 'none',
    },
  },
  saveButton: {
    height: 45,
    width: 170,
    marginRight: 23,
    borderRadius: 13,
    fontSize: 16,
    fontWeight: 'bold',
  },
  copyButton: {
    height: 45,
    width: 220,
    marginRight: 18,
    borderRadius: 13,
    fontSize: 16,
    fontWeight: 'bold',
    color: theme.palette.contrastText,
    backgroundColor: theme.palette.info.main,
    '&:hover': {
      backgroundColor: theme.palette.info.main,
    },
  },
}));
