import BaseWidget from './BaseWidget';
import { makeStyles } from '@material-ui/core';
import { useEffect, useMemo, useRef, useState } from 'react';
import { TEXT_WIDGET_DEFAULT_PROPS, WIDGET_GROUPS } from '../constants';
import useDynamicSize from '../hooks/use-dynamic-size';
import { getImgUrl } from '../helper';
import clsx from 'clsx';

const useStyles = makeStyles({
  root: {
    width: (props) => props.width,
    height: (props) => props.height,
    backgroundImage: ({ group, type }) => `url(${getImgUrl(group, type)})`,
    padding: ({ type, width, height }) => {
      const {
        padding: { top, right, bottom, left },
      } = TEXT_WIDGET_DEFAULT_PROPS[type];
      return `${height * top}px ${width * right}px ${height * bottom}px ${width * left}px`;
    },
    backgroundSize: '100% 100%',
  },
  textarea: {
    fontSize: ({ fontSize }) => fontSize || 18,
    border: 0,
    resize: 'none',
    overflow: 'auto',
    backgroundColor: 'transparent',
    outline: 'none',
    padding: 0,
    width: ({ sx }) => `${100 * Math.abs(sx)}%`,
    height: ({ sy }) => `${100 * Math.abs(sy)}%`,
    transformOrigin: '0 0',
    transform: ({ sx, sy }) => `scale(${1 / sx}, ${1 / sy})`,
    userSelect: 'all',
    '&:disabled': {
      color: '#000000',
      userSelect: 'none',
    },
    '&::-webkit-scrollbar': {
      width: '0.2em',
    },
    '&::-webkit-scrollbar-track': {
      '-webkit-box-shadow': 'inset 0 0 6px rgba(0,0,0,0.00)',
    },
    '&::-webkit-scrollbar-thumb': {
      backgroundColor: 'rgba(0,0,0,.1)',
      borderRadius: 4,
    },
  },
});

const TextWidget = (props) => {
  const {
    uuid,
    data,
    type,
    group,
    transform: { sx, sy },
    onTransformStart,
    onTransformEnd,
  } = props;
  const moveableRef = useRef();
  const { width, height } = useDynamicSize(group, type, moveableRef);
  const classes = useStyles({ type, group, width, height, sx, sy, fontSize: data.fontSize });
  const { draggable, scalable, rotatable, keepRatio } = useMemo(() => WIDGET_GROUPS.find((g) => g.type === group), [group]);
  const wrapperRef = useRef();
  const textRef = useRef();
  const [editable, setEditable] = useState(false);
  const [text, setText] = useState(data.text);

  useEffect(() => setText(data.text), [data]);

  const handleTextChange = (e) => {
    setText(e.target.value);
  };

  const handleDoubleClick = (e) => {
    e.preventDefault();
    setTimeout(() => textRef.current.focus());
    setEditable(true);
    onTransformStart(uuid);
  };

  const handleFocusOut = () => {
    setEditable(false);
    onTransformEnd(uuid, { data: { text } });
  };

  return (
    <BaseWidget
      {...props}
      draggable={draggable}
      scalable={scalable}
      rotatable={rotatable}
      keepRatio={keepRatio}
      target={wrapperRef}
      ref={moveableRef}
    >
      <div ref={wrapperRef} className={clsx(classes.root, 'widget')} id={uuid} onDoubleClick={handleDoubleClick}>
        <textarea value={text} className={classes.textarea} onChange={handleTextChange} ref={textRef} disabled={!editable} onBlur={handleFocusOut} />
      </div>
    </BaseWidget>
  );
};

export default TextWidget;
