import { withStyles } from '@material-ui/core/styles';
import MuiButton from '@material-ui/core/Button';
import PersonAddIcon from '@material-ui/icons/PersonAddOutlined';

const Button = withStyles({
  root: {
    backgroundColor: '#4a95d7',
    color: 'white',
    borderRadius: 9999,
    padding: '10px 30px',
    fontSize: 14,
    fontWeight: 500,
    letterSpacing: 0.49,
    textTransform: 'capitalize',

    '&:hover': {
      backgroundColor: '#4a95d7',
    },
    '&:active': {
      backgroundColor: '#4a95d7',
    },
  },
})(MuiButton);

const InviteButton = (props) => {
  return (
    <Button startIcon={<PersonAddIcon fontSize="small" />} {...props}>
      {props.children}
    </Button>
  );
};

export default InviteButton;
