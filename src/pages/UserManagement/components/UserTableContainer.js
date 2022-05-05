import { withStyles } from '@material-ui/core/styles';
import TableContainer from '@material-ui/core/TableContainer';

const UserTableContainer = withStyles({
  root: {
    '& .MuiTableCell-root': {
      color: 'black',
      fontSize: 14,
      letterSpacing: 0.49,
      borderBottom: 'unset',
      padding: '0 10px',
      height: 40,
    },
    '& .MuiTableHead-root': {
      '& .MuiTableCell-root': {
        fontWeight: 'bold',
        textTransform: 'capitalize',
        backgroundColor: 'white',
      },
    },
    '& .MuiTableBody-root': {
      '& .MuiTableRow-root': {
        backgroundColor: '#f6f6f6',
        '&:nth-of-type(even)': {
          backgroundColor: 'white',
        },
      },
    },
  },
})(TableContainer);

export default UserTableContainer;
