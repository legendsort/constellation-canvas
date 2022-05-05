import ActionTypes from 'utils/constants/action-types';
import { createAction } from 'redux-actions';
import { setUsers } from './auth';
import { setLoading } from './auxiliary';
import * as API from 'services/boards';
import { toArray } from 'utils';

export const addFigure = createAction(ActionTypes.ADD_FIGURE, (payload) => payload);
export const removeFigure = createAction(ActionTypes.REMOVE_FIGURE, (payload) => payload);
export const setFigure = createAction(ActionTypes.SET_FIGURE, (payload) => payload);
export const setCopiedFigure = createAction(ActionTypes.SET_COPIED_FIGURE, (payload) => payload);
export const setBoard = createAction(ActionTypes.SET_BOARD, (payload) => payload);
export const setCanvasIndex = createAction(ActionTypes.SET_CANVAS_INDEX, (payload) => payload);
export const setFigureHovered = createAction(ActionTypes.SET_FIGURE_HOVERED, (payload) => payload);
export const setSelectedParticipant = createAction(ActionTypes.SET_SELECTED_PARTICIPANT, (payload) => payload);
export const setSelectedFigure = createAction(ActionTypes.SET_SELECTED_FIGURE, (payload) => payload);

export const getBoard = () => (dispatch, getState) => {
  dispatch(setLoading(true));

  const { boardUUID } = getState().auth.profile;
  API.getBoard(boardUUID).then((data) => {
    dispatch(setBoard(data));
    dispatch(setUsers(data.participants));
    dispatch(setLoading(false));
  });
};

export const switchCanvas = (index) => (dispatch, getState) => {
  dispatch(setCanvasIndex(index));
  const state = getState();
  const { profile } = state.auth;
  const { selectedParticipant } = state.board;

  if (selectedParticipant === profile.uuid) {
    API.switchCanvas(profile.boardUUID, index);
  }
};

export const updateBoard = (boardUUID, params) => (dispatch) => {
  API.updateBoard(boardUUID, params).then((data) => {
    dispatch(setBoard(data));
  });
};

export const createFigure = (figures) => (dispatch, getState) => {
  dispatch(setLoading(true));
  const { index: canvas, uuid: boardUUID } = getState().board;
  Promise.all(toArray(figures).map((figure) => API.createFigure({ ...figure, canvas, boardUUID }))).then((createdFigures) => {
    dispatch(addFigure(createdFigures));
    dispatch(setLoading(false));
  });
};

export const updateFigure = (figure) => (dispatch, getState) => {
  const { index: canvas, uuid: boardUUID } = getState().board;
  dispatch(setFigure(figure));
  API.updateFigure(figure.uuid, { ...figure, canvas, boardUUID });
};

export const deleteFigure = (uuids) => (dispatch) => {
  dispatch(setLoading(true));

  Promise.all(toArray(uuids).map((uuid) => API.deleteFigure(uuid))).then(() => {
    dispatch(removeFigure(uuids));
    dispatch(setLoading(false));
  });
};

export const copyCanvasTo = (tarIdx) => (dispatch, getState) => {
  dispatch(setLoading(true));

  let { figures, selectedParticipant, index: srcIdx } = getState().board;
  figures = figures.filter((f) => f.creatorUUID === selectedParticipant);
  const tarFigures = figures.filter((f) => f.canvas === tarIdx);
  const srcFigures = figures.filter((f) => f.canvas === srcIdx);

  Promise.all(tarFigures.map((f) => API.deleteFigure(f.uuid)))
    .then(() => Promise.all(srcFigures.map((f) => API.createFigure({ ...f, canvas: tarIdx }))))
    .then((createdFigures) => {
      dispatch(removeFigure(tarFigures.map((f) => f.uuid)));
      dispatch(addFigure(createdFigures));
      dispatch(setLoading(false));
    });
};
