import { useState } from 'react';
import { DialogTitle, DialogContent, DialogActions } from '@material-ui/core';
import { Title, Button, Input, Label, Dialog } from 'components/form-components';

const InviteDialog = ({ title, open, onClose, onSubmit }) => {
  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    onSubmit(email);
  };

  const handleChange = (e) => {
    setEmail(e.target.value);
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>
        <Title>{title}</Title>
      </DialogTitle>
      <form onSubmit={handleSubmit}>
        <DialogContent>
          <Label>Email:</Label>
          <Input type="email" placeholder="Enter Email to send invite code to..." value={email} onChange={handleChange} required autoFocus />
        </DialogContent>
        <DialogActions>
          <Button type="submit" color="primary" variant="contained">
            SUBMIT
          </Button>
          <Button type="reset" color="secondary" variant="contained" onClick={() => setEmail('')}>
            RESET
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default InviteDialog;
