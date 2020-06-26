import React from 'react';
import styled from 'styled-components';
import WarningIcon from '@material-ui/icons/Warning';

const Warning = styled.div`
  background: yellow;
  color: black;
  padding: 10px;
  font-size: 1em;
  border-radius: 10px;
  position: relative;
`;

export default function Alert(props) {
  return (
    <Warning>
      <WarningIcon style={{ position: 'absolute', top: '7px' }} />
      <p style={{ paddingLeft: '30px' }}>{props.children}</p>
    </Warning>
  );
}
