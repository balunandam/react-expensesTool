import React, { useEffect } from 'react';
require('../index.css');

function ErrorMessages(props) {
  const [errorMessage, setErrorMessage] = React.useState('');
  useEffect(() => {
    setErrorMessage(props.error);
  }, [props]);
  return (
    <div>{errorMessage && <div className="error"> {errorMessage} </div>}</div>
  );
}

export default ErrorMessages;
