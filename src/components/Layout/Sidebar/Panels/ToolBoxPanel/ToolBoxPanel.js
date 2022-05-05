import Box from '@material-ui/core/Box';

import WidgetGroup from './WidgetGroup';

import { WIDGET_GROUPS } from 'components/WidgetEditor/constants';

export default function ToolboxPanel() {
  return (
    <Box>
      {WIDGET_GROUPS.map(({ type, label, count, imageType }) => (
        <WidgetGroup key={type} type={type} imageType={imageType} label={label} count={count} />
      ))}
    </Box>
  );
}
