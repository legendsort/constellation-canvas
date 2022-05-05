import { Accordion, AccordionSummary, AccordionDetails } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { MAIN_BORDER } from 'utils/constants/ui';

export const GroupAccordion = withStyles({
  root: {
    boxShadow: 'none',
    borderBottom: MAIN_BORDER,
    '&:before': {
      display: 'none',
    },
    '&$expanded': {
      margin: 'auto',
    },
  },
  expanded: {},
})(Accordion);

export const GroupAccordionSummary = withStyles((theme) => ({
  root: {
    border: 'none',
    paddingLeft: theme.spacing(5),
    minHeight: theme.spacing(7.5),
    '&$expanded': {
      minHeight: theme.spacing(7.5),
    },
    [theme.breakpoints.down('sm')]: {
      paddingLeft: theme.spacing(2),
    },
  },
  content: {
    '&$expanded': {
      margin: '12px 0',
    },
  },
  expanded: {},
}))(AccordionSummary);

export const GroupAccordionDetails = withStyles({
  root: {
    padding: 0,
    display: 'block',
  },
})(AccordionDetails);
