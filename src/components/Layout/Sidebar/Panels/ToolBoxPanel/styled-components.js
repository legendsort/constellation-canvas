import { Accordion, AccordionSummary, AccordionDetails } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { MAIN_BORDER } from 'utils/constants/ui';

export const StyledAccordion = withStyles({
  root: {
    boxShadow: 'none',
    borderBottom: MAIN_BORDER,
    '&:first-child': {
      borderTop: MAIN_BORDER,
    },
    '&:last-child': {
      borderBottom: 0,
    },
    '&:before': {
      display: 'none',
    },
    '&$expanded': {
      margin: 'auto',
    },
  },
  expanded: {},
})(Accordion);

export const StyledAccordionSummary = withStyles((theme) => ({
  root: {
    border: 'none',
    paddingLeft: theme.spacing(5),
    minHeight: theme.spacing(5),
    '&$expanded': {
      minHeight: theme.spacing(5),
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

export const StyledAccordionDetails = withStyles({
  root: {
    padding: 0,
    marginTop: 24,
    display: 'block',
  },
})(AccordionDetails);
