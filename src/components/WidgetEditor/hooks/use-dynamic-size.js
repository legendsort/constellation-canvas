import { useState, useEffect } from 'react';
import { WIDGET_GROUPS } from '../constants';
import { getImgUrl } from '../helper';

const useDynamicSize = (group, type, ref) => {
  const [dim, setDim] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const img = new Image();
    img.addEventListener('load', () => {
      let { width, height } = img;
      const area = width * height;
      const { defaultArea } = WIDGET_GROUPS.find((g) => g.type === group);
      const scale = Math.sqrt(defaultArea / area);
      setDim({ width: width * scale, height: height * scale });
      setTimeout(() => ref.current?.updateRect());
    });
    img.src = getImgUrl(group, type, 3);
    // eslint-disable-next-line
  }, []);

  return dim;
};

export default useDynamicSize;
