import { useState, memo, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, makeStyles } from '@material-ui/core';
import { updateBoard } from 'actions/boards';
import { styled } from '@material-ui/core/styles';
import styledComponent from 'styled-components';

const StyledLabel = styled(Box)(({ theme }) => ({
  display: 'flex',
  width: '120px',
}));

const StyledInput = styledComponent.input`
  ::-webkit-input-placeholder {
    font-style: italic;
    font-size: 22px;
    font-weight: 300;
    letter-spacing: 0.76px;
    color: #cacaca;
  }
  :focus {
    outline: none;
  }
  font-size: 22px;
  font-weight: 300;
  height: 23px;
  width: 100%;
  border: none;
`;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row',
    color: '#6c6c6e',
    fontSize: '26px',
    fontWeight: 'bold',
    fontFamily: 'sans-serif',
  },
}));

const TopicHeader = () => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const { uuid, name } = useSelector((state) => state.board);
  const [topic, setTopic] = useState(name);

  useEffect(() => setTopic(name), [name]);

  const handleChange = (e) => {
    setTopic(e.target.value);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      dispatch(updateBoard(uuid, { name: topic }));
    }
  };

  return (
    <Box className={classes.root}>
      <StyledLabel>TOPIC:</StyledLabel>
      <StyledInput placeholder="Type the topic for the canvas…" value={topic} onChange={handleChange} onKeyDown={handleKeyDown} />
    </Box>
  );
};

export default memo(TopicHeader);
