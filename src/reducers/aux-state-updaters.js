export const INITIAL_AUX_STATE = {
  loading: false,
  error: null,
  toastr: {},
};

export const setLoadingUpdater = (state, { payload }) => ({
  ...state,
  loading: payload,
});

export const setErrorUpdater = (state, { payload: error }) => ({
  ...state,
  error,
});

export const toggleToastrUpdater = (state, { payload }) => ({
  ...state,
});
