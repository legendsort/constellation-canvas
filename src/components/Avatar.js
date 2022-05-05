import { makeStyles } from '@material-ui/core/styles';
import ButtonBase from '@material-ui/core/ButtonBase';
import { generateAvatarName, generateAvatarColor, noop } from 'utils/helpers';

const useStyles = makeStyles({
  root: (props) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: props.boxSize,
    height: props.boxSize,
    borderRadius: 9999,
    backgroundColor: props.backgroundColor,
    color: 'white',
    fontSize: props.fontSize,
    textTransform: 'uppercase',
  }),
});

const Avatar = ({ displayName, boxSize = 50, fontSize = 16, onClick = noop }) => {
  const classes = useStyles({ boxSize, fontSize, backgroundColor: generateAvatarColor(displayName) });

  return (
    <ButtonBase className={classes.root} onClick={onClick}>
      {generateAvatarName(displayName)}
    </ButtonBase>
  );
};

export default Avatar;
