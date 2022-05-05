import React, { useMemo, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Menu, MenuItem, Divider } from '@material-ui/core';
import { BOARD_CONTEXTMENU_ITEMS, WIDGET_CONTEXTMENU_ITEMS, CONTEXTMENU_TYPES, GROUP_UUID, GROUP_CONTEXTMENU_ITEMS } from '../constants';
import { getForwardWidget, getBackwardWidget, getMaxDepth, getHoveredFigure } from '../helper';
import { createFigure, deleteFigure, setCopiedFigure, updateFigure, setSelectedFigure } from 'actions';
import { ShapeColorDialog } from '../components';
import { toArray } from 'utils';

const useContextMenu = ({ figures, figureGroup, zoom, stageRef, copiedFigure }) => {
  const dispatch = useDispatch();
  const [contextState, setContextState] = useState({
    uuid: null,
    mouseX: null,
    mouseY: null,
  });
  const [openedShapeColorDlg, showShapeColorDlg] = useState(false);

  const targetFigure = useMemo(() => figures.find((f) => f.uuid === contextState.uuid), [figures, contextState]);
  const menuItems = useMemo(() => {
    if (contextState.uuid === GROUP_UUID) {
      return GROUP_CONTEXTMENU_ITEMS;
    } else if (contextState.uuid) {
      return WIDGET_CONTEXTMENU_ITEMS.filter((item) => !item.widget || targetFigure.type.includes(item.widget));
    } else {
      return BOARD_CONTEXTMENU_ITEMS;
    }
  }, [targetFigure, contextState]);

  const handleContextClick = (e, type) => {
    e.preventDefault();
    const { uuid, mouseX, mouseY } = contextState;
    const uuids = uuid === GROUP_UUID ? figureGroup.map((f) => f.id) : toArray(uuid);
    const maxDepth = getMaxDepth(figures);

    switch (type) {
      case CONTEXTMENU_TYPES.front:
        figures
          .filter((f) => f.uuid === targetFigure.uuid || f.depth > targetFigure.depth)
          .map((f) => ({ ...f, depth: f.uuid === targetFigure.uuid ? maxDepth : f.depth - 1 }))
          .forEach((f) => dispatch(updateFigure(f)));
        break;
      case CONTEXTMENU_TYPES.back:
        figures
          .filter((f) => f.uuid === targetFigure.uuid || f.depth < targetFigure.depth)
          .map((f) => ({ ...f, depth: f.uuid === targetFigure.uuid ? 0 : f.depth + 1 }))
          .forEach((f) => dispatch(updateFigure(f)));
        break;
      case CONTEXTMENU_TYPES.forward:
        const forwardFigure = getForwardWidget(figures, targetFigure.uuid, stageRef);
        if (forwardFigure) {
          dispatch(updateFigure({ ...targetFigure, depth: forwardFigure.depth }));
          dispatch(updateFigure({ ...forwardFigure, depth: targetFigure.depth }));
        }
        break;
      case CONTEXTMENU_TYPES.backward:
        const backwardFigure = getBackwardWidget(figures, targetFigure.uuid, stageRef);
        if (backwardFigure) {
          dispatch(updateFigure({ ...targetFigure, depth: backwardFigure.depth }));
          dispatch(updateFigure({ ...backwardFigure, depth: targetFigure.depth }));
        }
        break;
      case CONTEXTMENU_TYPES.copy:
        dispatch(setCopiedFigure(uuids));
        break;
      case CONTEXTMENU_TYPES.cut:
        dispatch(setCopiedFigure(uuids));
        dispatch(deleteFigure(uuids));
        break;
      case CONTEXTMENU_TYPES.paste:
        const { x: baseX, y: baseY } = stageRef.current.getBoundingClientRect();
        const { minX, minY } = copiedFigure.reduce(
          ({ minX, minY }, figure) => {
            const tx = parseFloat(figure.transform.tx);
            const ty = parseFloat(figure.transform.ty);
            return {
              minX: tx < minX ? tx : minX,
              minY: ty < minY ? ty : minY,
            };
          },
          { minX: Infinity, minY: Infinity }
        );

        const newFigures = copiedFigure.map((figure, idx) => ({
          ...figure,
          depth: maxDepth + idx + 1,
          transform: {
            ...figure.transform,
            tx: `${parseFloat(figure.transform.tx) - minX + (mouseX - baseX) / zoom}px`,
            ty: `${parseFloat(figure.transform.ty) - minY + (mouseY - baseY) / zoom}px`,
          },
        }));
        dispatch(createFigure(newFigures));
        break;
      case CONTEXTMENU_TYPES.delete:
        dispatch(deleteFigure(uuids));
        break;
      case CONTEXTMENU_TYPES.incFontSize:
        dispatch(
          updateFigure({
            ...targetFigure,
            data: { ...targetFigure.data, fontSize: targetFigure.data?.fontSize ? targetFigure.data.fontSize + 3 : 21 },
          })
        );
        break;
      case CONTEXTMENU_TYPES.decFontSize:
        dispatch(
          updateFigure({
            ...targetFigure,
            data: { ...targetFigure.data, fontSize: targetFigure.data?.fontSize ? targetFigure.data.fontSize - 3 : 15 },
          })
        );
        break;
      case CONTEXTMENU_TYPES.colorPalette:
        showShapeColorDlg(true);
        return;
      default:
        break;
    }

    setContextState({
      uuid: null,
      mouseX: null,
      mouseY: null,
    });
  };

  const handleContextMenu = (e) => {
    e.preventDefault();

    const hovered = getHoveredFigure(e, figures, stageRef);
    dispatch(setSelectedFigure(hovered));

    setContextState({
      uuid: hovered,
      mouseX: e.clientX,
      mouseY: e.clientY,
    });
  };

  const applyShapeColor = ({ strokeColor, fillColor }) => {
    dispatch(updateFigure({ ...targetFigure, data: { ...targetFigure.data, strokeColor, fillColor } }));
    showShapeColorDlg(false);
    setContextState({ uuid: null, mouseX: null, mouseY: null });
  };

  const MenuComponent = (
    <>
      <Menu
        keepMounted
        open={contextState.mouseY !== null}
        onClose={handleContextClick}
        anchorReference="anchorPosition"
        anchorPosition={
          contextState.mouseY !== null && contextState.mouseX !== null ? { top: contextState.mouseY, left: contextState.mouseX } : undefined
        }
        transitionDuration={0}
      >
        {menuItems.map((context, index) =>
          context.type === CONTEXTMENU_TYPES.divider ? (
            <Divider key={context.type + index} />
          ) : context.type === CONTEXTMENU_TYPES.paste ? (
            <MenuItem key={context.type} onClick={(e) => handleContextClick(e, context.type)} disabled={!copiedFigure.length}>
              {context.label}
            </MenuItem>
          ) : (
            <MenuItem key={context.type} onClick={(e) => handleContextClick(e, context.type)}>
              {context.label}
            </MenuItem>
          )
        )}
      </Menu>
      <ShapeColorDialog open={openedShapeColorDlg} data={targetFigure?.data} onClose={() => showShapeColorDlg(false)} onSubmit={applyShapeColor} />
    </>
  );

  return {
    contextState,
    setContextState,
    handleContextMenu,
    MenuComponent,
  };
};

export default useContextMenu;
