import { DialogTitle, DialogContent, DialogActions, DialogContentText } from '@material-ui/core';
import { Title, Button, Dialog } from 'components/form-components';

const ConfirmDialog = ({ title, open, onClose, onSubmit }) => {
  const handleSubmit = (e) => {
    e.preventDefault();

    onSubmit();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>
        <Title>{title}</Title>
      </DialogTitle>
      <form onSubmit={handleSubmit}>
        <DialogContent>
          <DialogContentText>Do you really want to delete this user?</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button type="submit" color="primary" variant="contained">
            Yes
          </Button>
          <Button color="secondary" variant="contained" onClick={onClose}>
            No
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default ConfirmDialog;
