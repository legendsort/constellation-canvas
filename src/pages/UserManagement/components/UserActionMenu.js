import { withStyles } from '@material-ui/core/styles';
import Menu from '@material-ui/core/Menu';

const UserActionMenu = withStyles({
  list: (props) => ({
    padding: 0,
    border: '1px solid #dbdbdb',
    '& .MuiMenuItem-root': {
      width: 160,
      height: 40,
      justifyContent: 'center',
      color: '#6c6c6e',
      fontSize: 12,
      fontWeight: 500,
      letterSpacing: 0.42,
      '&:not(:last-child)': {
        borderBottom: '1px solid #dbdbdb',
      },
    },
  }),
})(Menu);

export default UserActionMenu;
