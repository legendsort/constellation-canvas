import styled from 'styled-components';

export default styled.input`
  margin-bottom: 19px;
  padding: 12px 9px 12px 9px;
  border-radius: 5px;
  box-shadow: inset 0 1px 3px 0 rgba(0, 0, 0, 0.12);
  border: solid 1px #d5d5d5;

  &::-webkit-input-placeholder {
    font-style: italic;
    font-size: 14px;
    font-weight: 300;
    letter-spacing: 0.76px;
    color: #cacaca;
  }

  &:focus {
    outline: none;
  }
`;
