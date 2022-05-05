import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

export default withStyles((theme) => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: 221,
    height: 35,
    backgroundColor: theme.palette.primary.main,
    borderRadius: 9999,
    color: 'white',
    fontWeight: 'bold',
    fontSize: 14,
    letterSpacing: '0.49px',
  },
}))(Typography);
