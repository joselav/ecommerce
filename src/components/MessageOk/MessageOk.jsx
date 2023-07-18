import React from 'react';
import { Alert, AlertTitle } from '@mui/material';

const MessageOk = ({clientID}) => {
  return (
    <div style={{width:469, marginLeft:59}}>
        <Alert severity="success">Su código de referencia es; <br/> {clientID}.</Alert>
    </div>
  )
}

export default MessageOk