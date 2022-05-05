import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

const TableDescription = withStyles({
  root: {
    fontSize: 16,
    fontWeight: 500,
    fontStyle: 'italic',
    letterSpacing: 0.56,
    color: '#6c6c6e',
  },
})(Typography);

export default TableDescription;
