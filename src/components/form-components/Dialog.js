import { withStyles } from '@material-ui/core/styles';
import MuiDialog from '@material-ui/core/Dialog';

export default withStyles({
  paper: {
    borderRadius: 15,
    padding: '20px 45px',
    '& .MuiDialogTitle-root': {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    '& .MuiDialogContent-root': {
      display: 'flex',
      flexDirection: 'column',
      padding: '10px 0 20px 0',
      fontSize: 12,
      fontWeight: 500,
      letterSpacing: 0.42,
      color: '#717171',
      '& > :not(:first-child)': {
        marginTop: 5,
      },
    },
    '& .MuiDialogActions-root': {
      justifyContent: 'center',
    },
    '& .MuiDialogActions-spacing': {
      '& > :not(:first-child)': {
        marginLeft: 16,
      },
    },
  },
})(MuiDialog);
