import { makeStyles } from '@material-ui/core/styles';
import TableRow from '@material-ui/core/TableRow';
import IconButton from '@material-ui/core/IconButton';
import AddBoxIcon from '@material-ui/icons/AddBoxOutlined';
import IndeterminateCheckBoxIcon from '@material-ui/icons/IndeterminateCheckBoxOutlined';
import BorderColorIcon from '@material-ui/icons/BorderColorOutlined';
import SyncIcon from '@material-ui/icons/SyncOutlined';
import MoreHorizIcon from '@material-ui/icons/MoreHorizOutlined';

import { StyledTableCell } from './styled-components';

import { USER_ROLES } from 'utils/constants/enums';

const useStyles = makeStyles((theme) => ({
  root: (props) => ({
    '& > *': {
      borderBottom: 'unset',
    },
    '& *': {
      color: 'black',
    },
    backgroundColor: props.role === USER_ROLES.user ? 'white' : '#f6f6f6',
  }),
  more: {
    borderLeft: '2px solid gray',
    borderBottom: '2px solid gray',
    width: 10,
    height: 10,
    marginLeft: 20,
  },
}));

export default function Row(props) {
  const { row, toggleOpen, handleOpenActionMenu } = props;
  const classes = useStyles({ role: row.role });

  return (
    <TableRow className={classes.root}>
      <StyledTableCell>
        {row.role === USER_ROLES.facilitator && (
          <IconButton aria-label="expand row" size="small" onClick={() => toggleOpen(!row.open)}>
            {row.open ? <IndeterminateCheckBoxIcon /> : <AddBoxIcon />}
          </IconButton>
        )}
        {row.role === USER_ROLES.user && <div className={classes.more}></div>}
      </StyledTableCell>
      <StyledTableCell>
        {row.email}
        <IconButton>
          <BorderColorIcon fontSize="small" />
        </IconButton>
      </StyledTableCell>
      <StyledTableCell>
        {row.screenName}
        <IconButton>
          <BorderColorIcon fontSize="small" />
        </IconButton>
      </StyledTableCell>
      <StyledTableCell>
        {row.inviteCode}
        <IconButton>
          <SyncIcon fontSize="small" />
        </IconButton>
      </StyledTableCell>
      <StyledTableCell style={{ textTransform: 'uppercase' }}>{row.type}</StyledTableCell>
      <StyledTableCell>{row.date}</StyledTableCell>
      <StyledTableCell>
        <IconButton onClick={handleOpenActionMenu}>
          <MoreHorizIcon fontSize="small" />
        </IconButton>
      </StyledTableCell>
    </TableRow>
  );
}
