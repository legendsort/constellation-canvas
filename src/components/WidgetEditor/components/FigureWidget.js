import { useRef, useMemo } from 'react';
import { makeStyles } from '@material-ui/core';
import { WIDGET_GROUPS } from '../constants';
import { getImgUrl } from '../helper';
import BaseWidget from './BaseWidget';
import useDynamicSize from '../hooks/use-dynamic-size';
import clsx from 'clsx';

const useStyles = makeStyles({
  root: {
    width: (props) => props.width || 0,
    height: (props) => props.height || 0,
    backgroundImage: ({ group, type }) => `url(${getImgUrl(group, type, 3)})`,
    backgroundSize: '100% 100%',
  },
});

const FigureWidget = (props) => {
  const { type, group } = props;
  const figureRef = useRef();
  const moveableRef = useRef();
  const { draggable, scalable, rotatable, keepRatio } = useMemo(() => WIDGET_GROUPS.find((g) => g.type === group), [group]);
  const { width, height } = useDynamicSize(group, type, moveableRef);
  const classes = useStyles({ type, group, width, height });

  return (
    <BaseWidget {...props} draggable={draggable} scalable={scalable} rotatable={rotatable} keepRatio={keepRatio} target={figureRef} ref={moveableRef}>
      <div ref={figureRef} className={clsx(classes.root, 'widget')} id={props.uuid} />
    </BaseWidget>
  );
};

export default FigureWidget;
