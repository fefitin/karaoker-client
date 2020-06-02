import React from 'react';
import Status from './Status';

const Error = ({ text }) => {
  return <Status text={text} className="error"></Status>;
}

export default Error;