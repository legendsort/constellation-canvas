import { useMemo, useRef } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { DragPreviewImage, useDrag } from 'react-dnd';

import { WIDGET_IMG_BASE_URL, TRANSPARENT_IMAGE } from 'utils/constants/ui';
import { WIDGET_DESCRIPTIONS } from 'components/WidgetEditor/constants';
import { DND_ITEM_TYPES } from 'utils/constants';

const useStyles = makeStyles((theme) => ({
  root: {
    width: 97,
    height: 127,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    padding: 8,
    marginBottom: 30,
    '&:hover': {
      border: 2,
      borderStyle: 'solid',
      borderColor: '#f2a912',
      padding: 6,
    },
  },
  img: {
    maxWidth: '100%',
    maxHeight: '80%',
    backgroundColor: 'transparent',
  },
  desc: {
    fontSize: '12px',
    letterSpacing: '0.42px',
    color: '#9f9f9f',
    marginTop: 24,
  },
}));

const Widget = ({ group, type, imageType }) => {
  const classes = useStyles();
  const description = useMemo(() => WIDGET_DESCRIPTIONS?.[type], [type]);
  const imgSrc = `${WIDGET_IMG_BASE_URL}${group}/${type}.${imageType}`;
  const ref = useRef();

  const [, drag, preview] = useDrag(() => ({
    type: DND_ITEM_TYPES.widget,
    item: (monitor) => {
      const { x: originX, y: originY } = ref.current.getBoundingClientRect();
      const { x: clientX, y: clientY } = monitor.getInitialClientOffset();

      return {
        offsetX: clientX - originX,
        offsetY: clientY - originY,
        group,
        type,
        imageType,
      };
    },
  }));

  return (
    <>
      <DragPreviewImage connect={preview} src={TRANSPARENT_IMAGE} />
      <div
        ref={(el) => {
          drag(el);
          ref.current = el;
        }}
        className={classes.root}
      >
        <img draggable={false} className={classes.img} src={imgSrc} alt={type} />
        {description && (
          <div className={classes.desc} id="widget-desc">
            {description}
          </div>
        )}
      </div>
    </>
  );
};

export default Widget;
