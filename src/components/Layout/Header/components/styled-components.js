import styledComponent from 'styled-components';
import { styled } from '@material-ui/core/styles';
import { Box } from '@material-ui/core';

export const StyledLabel = styled(Box)(({ theme }) => ({
  display: 'flex',
  width: '120px',
}));

export const StyledInput = styledComponent.input`
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
