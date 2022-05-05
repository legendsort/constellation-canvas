import { Snackbar } from '@material-ui/core';
import { Alert, AlertTitle } from '@material-ui/lab';
import { setError } from 'actions';
import { useDispatch, useSelector } from 'react-redux';

const Notifier = () => {
  const dispatch = useDispatch();
  const { error } = useSelector((state) => state.aux);
  const errorMsg = error?.data?.message || error?.data?.info;

  const handleToastyClose = () => {
    dispatch(setError(null));
  };

  return (
    <Snackbar
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'right',
      }}
      open={!!error}
      autoHideDuration={6000}
      onClose={handleToastyClose}
    >
      <Alert variant="filled" elevation={6} severity="error" onClose={handleToastyClose}>
        <AlertTitle>{error?.statusText}</AlertTitle>
        {Array.isArray(errorMsg) ? (
          <ul>
            {errorMsg.map((msg, idx) => (
              <li key={idx}>{msg}</li>
            ))}
          </ul>
        ) : (
          errorMsg
        )}
      </Alert>
    </Snackbar>
  );
};

export default Notifier;
