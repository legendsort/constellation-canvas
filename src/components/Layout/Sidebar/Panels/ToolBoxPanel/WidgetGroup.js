import { makeStyles } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import Widget from './Widget';
import { StyledAccordion, StyledAccordionSummary, StyledAccordionDetails } from './styled-components';

const useStyles = makeStyles((theme) => ({
  label: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#6c6c6e',
  },
}));

const WidgetGroup = ({ type, label, count, imageType }) => {
  const classes = useStyles();

  return (
    <StyledAccordion>
      <StyledAccordionSummary expandIcon={<ExpandMoreIcon />}>
        <Typography className={classes.label}>{label}</Typography>
      </StyledAccordionSummary>
      <StyledAccordionDetails>
        <Grid container>
          {Array.from({ length: count }).map((v, idx) => (
            <Grid item key={`${type}${idx}`} container justifyContent="center" alignItems="center" xs={6}>
              <Widget group={type} type={`${type}${idx + 1}`} imageType={imageType} />
            </Grid>
          ))}
        </Grid>
      </StyledAccordionDetails>
    </StyledAccordion>
  );
};

export default WidgetGroup;
