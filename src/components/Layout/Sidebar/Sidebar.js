import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { makeStyles } from '@material-ui/core/styles';
import { Box, Typography } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import GroupBox from './GroupBox';
import { GroupAccordion, GroupAccordionSummary, GroupAccordionDetails } from './styled-components';
import { SIDEBAR_ITEMS } from './constants';
import { HEADER_HEIGHT, HEADER_TITLE_HEIGHT, LINKS, MAIN_BORDER, SIDEBAR_ITEM_TYPES, SIDEBAR_MAX_WIDTH, SIDEBAR_MIN_WIDTH } from 'utils/constants';

const useStyles = makeStyles((theme) => ({
  root: {
    display: (props) => (props.open ? 'block' : 'none'),
    width: SIDEBAR_MAX_WIDTH,
    height: `calc(100vh - ${HEADER_HEIGHT}px)`,
    overflowX: 'hidden',
    overflowY: 'auto',
    '&::-webkit-scrollbar': {
      width: '0.6em',
    },
    '&::-webkit-scrollbar-track': {
      '-webkit-box-shadow': 'inset 0 0 6px rgba(0,0,0,0.00)',
    },
    '&::-webkit-scrollbar-thumb': {
      backgroundColor: 'rgba(0,0,0,.1)',
      borderRadius: 4,
    },
    borderRight: MAIN_BORDER,
    [theme.breakpoints.down('sm')]: {
      width: SIDEBAR_MIN_WIDTH,
      height: `calc(100vh - ${HEADER_HEIGHT + HEADER_TITLE_HEIGHT}px)`,
    },
  },
  group: {
    fontSize: 16,
    fontWeight: 'bold',
    letterSpacing: 0.56,
    textTransform: 'uppercase',
    color: '#624ad7',
  },
  expand: {
    backgroundColor: '#eae6fe',
    color: '#624ad7',
    borderRadius: '8px',
  },
}));

export default function Sidebar({ open = false }) {
  const classes = useStyles({ open });
  const { pathname } = useLocation();
  const { profile, users } = useSelector((state) => state.auth);
  const { selectedParticipant } = useSelector((state) => state.board);
  const [items, setItems] = useState(SIDEBAR_ITEMS.filter((item) => item.role.includes(profile.role)).map((item) => ({ ...item, expanded: false })));

  useEffect(() => {
    if (!selectedParticipant || !users.length) {
      return;
    }

    const participant = users.find((u) => u.uuid === selectedParticipant);
    const canvasTitle = profile.uuid !== selectedParticipant ? `${participant.name}'s CANVAS` : 'MY CANVAS';

    setItems(
      items
        .map((item) => ({
          ...item,
          expanded: item.type !== SIDEBAR_ITEM_TYPES.toolbox && pathname === LINKS.board,
        }))
        .map((item) => ({
          ...item,
          title: item.type === SIDEBAR_ITEM_TYPES.canvas ? canvasTitle : item.title,
        }))
    );
    // eslint-disable-next-line
  }, [profile, selectedParticipant, users, pathname]);

  const handleExpandChange = (type, expanded) => {
    setItems(items.map((item) => ({ ...item, expanded: type === item.type ? expanded : item.expanded })));
  };

  return (
    <Box className={classes.root}>
      {items.map((item) =>
        item.component ? (
          <GroupAccordion key={item.title} expanded={item.expanded} onChange={(e, expanded) => handleExpandChange(item.type, expanded)}>
            <GroupAccordionSummary expandIcon={<ExpandMoreIcon className={classes.expand} />}>
              <Typography className={classes.group}>{item.title}</Typography>
            </GroupAccordionSummary>
            <GroupAccordionDetails>
              <item.component />
            </GroupAccordionDetails>
          </GroupAccordion>
        ) : (
          <GroupBox key={item.title} title={item.title} path={item.path} />
        )
      )}
    </Box>
  );
}
