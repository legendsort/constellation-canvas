import { styled } from '@material-ui/core/styles';
import TableCell from '@material-ui/core/TableCell';
import MenuItem from '@material-ui/core/MenuItem';

export const StyledTableCell = styled(TableCell)({
  fontSize: 14,
  letterSpacing: 0.49,
  color: 'black',
  padding: 0,
});

export const StyledMenuItem = styled(MenuItem)({
  justifyContent: 'center',
  border: '1px solid #dbdbdb',
  fontSize: 12,
  fontWeight: 500,
  letterSpacing: 0.42,
  color: '#6c6c6e',
  width: 160,
  height: 40,
});
