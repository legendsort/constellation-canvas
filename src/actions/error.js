import { setError, setLoading } from './auxiliary';

export const handleError = (error) => (dispatch) => {
  dispatch(setLoading(false));
  dispatch(setError(error));
};
