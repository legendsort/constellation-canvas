import { handleActions } from 'redux-actions';
import ActionTypes from 'utils/constants/action-types';
import * as boardStateUpdaters from './board-state-updaters';

const actionHandler = {
  [ActionTypes.SET_BOARD]: boardStateUpdaters.setBoardUpdater,
  [ActionTypes.SET_CANVAS_INDEX]: boardStateUpdaters.setCanvasIndexUpdater,
  [ActionTypes.SET_COPIED_FIGURE]: boardStateUpdaters.setCopiedFigureUpdater,
  [ActionTypes.ADD_FIGURE]: boardStateUpdaters.addFigureUpdater,
  [ActionTypes.REMOVE_FIGURE]: boardStateUpdaters.removeFigureUpdater,
  [ActionTypes.SET_FIGURE]: boardStateUpdaters.setFigureUpdater,
  [ActionTypes.SET_FIGURE_HOVERED]: boardStateUpdaters.setFigureHoveredUpdater,
  [ActionTypes.SET_SELECTED_PARTICIPANT]: boardStateUpdaters.setSelectedParticipantUpdater,
  [ActionTypes.SET_SELECTED_FIGURE]: boardStateUpdaters.setSelectedFigureUpdater,
};

export default handleActions(actionHandler, boardStateUpdaters.INITIAL_BOARD_STATE);
