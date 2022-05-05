import { useEffect, useState } from 'react';
import { DialogTitle, DialogContent, DialogActions } from '@material-ui/core';
import { Title, Button, Label, Dialog } from 'components/form-components';
import { ColorPicker } from 'material-ui-color';

const ShapeColorDialog = ({ open, data = { strokeColor: '#000', fillColor: '#00000000' }, onClose, onSubmit }) => {
  const [strokeColor, setStrokeColor] = useState(data.strokeColor);
  const [fillColor, setFillColor] = useState(data.fillColor);

  useEffect(() => {
    setStrokeColor(data.strokeColor);
    setFillColor(data.fillColor);
  }, [data]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ strokeColor, fillColor });
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>
        <Title>Color Palette</Title>
      </DialogTitle>
      <form onSubmit={handleSubmit}>
        <DialogContent>
          <Label>Stroke Color:</Label>
          <ColorPicker value={strokeColor} onChange={(value) => setStrokeColor(value?.css?.backgroundColor || value)} />
          <Label>Fill Color:</Label>
          <ColorPicker value={fillColor} onChange={(value) => setFillColor(value?.css?.backgroundColor || value)} />
        </DialogContent>
        <DialogActions>
          <Button type="submit" color="primary" variant="contained">
            OK
          </Button>
          <Button type="reset" color="secondary" variant="contained" onClick={onClose}>
            CANCEL
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default ShapeColorDialog;
