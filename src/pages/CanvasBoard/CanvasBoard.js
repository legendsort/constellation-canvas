import React, { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { WidgetEditor } from 'components';
import { getBoard, setSelectedParticipant } from 'actions';
import { setupSocket } from 'services/websocket';
import { removeFigure, setBoard, setCanvasIndex, setFigure } from 'actions';
import { USER_ROLES } from 'utils/constants';

export default function CanvasBoard() {
  const { index, figures, copiedFigure, selectedParticipant } = useSelector((state) => state.board);
  const dispatch = useDispatch();
  const { accessToken, profile } = useSelector((state) => state.auth);
  const socket = useMemo(() => accessToken && setupSocket(accessToken), [accessToken]);
  const filteredFigures = useMemo(
    () => figures.filter((f) => f.canvas === index && selectedParticipant === f.creatorUUID),
    [index, figures, selectedParticipant]
  );

  // eslint-disable-next-line
  useEffect(() => dispatch(getBoard()), []);

  // eslint-disable-next-line
  useEffect(() => selectedParticipant || dispatch(setSelectedParticipant(profile.uuid)), [profile, selectedParticipant]);

  useEffect(() => {
    if (socket) {
      socket.removeAllListeners();
      socket.on('figuresCU', (figure) => figure.creatorUUID !== profile.uuid && dispatch(setFigure(figure)));
      socket.on('figuresD', (figure) => figure.creatorUUID !== profile.uuid && dispatch(removeFigure(figure.uuid)));
      socket.on('board', (board) => profile.role !== USER_ROLES.facilitator && dispatch(setBoard(board)));
      socket.on(
        'canvas',
        (user) => profile.role === USER_ROLES.facilitator && user.uuid === selectedParticipant && dispatch(setCanvasIndex(user.currentCanvas))
      );
    }
    // eslint-disable-next-line
  }, [socket, profile, selectedParticipant]);

  return <WidgetEditor figures={filteredFigures} copiedFigure={copiedFigure} index={index} editable={selectedParticipant === profile.uuid} />;
}
