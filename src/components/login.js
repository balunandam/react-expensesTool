import React, { useEffect, useState } from 'react';
import '../index.css';
import { useNavigate } from 'react-router-dom';
import { Row, Col, Button } from 'react-bootstrap';
var db = openDatabase('user', '1.0', 'My WebSQL Database', 2 * 1024 * 1024);

function Login() {
  const navigate = useNavigate();
  let uname;
  let pass;
  let userDatas = [];
  const [errorMessages, setErrorMessages] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const errors = {
    uname: 'invalid username',
    pass: 'invalid password',
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    uname = document.forms[0].uname;
    pass = document.forms[0].pass;
    db.transaction(function (tx) {
      tx.executeSql(
        'SELECT uname, pass FROM people',
        [],
        function (tx, results) {
          if (results.rows.length > 0) {
            for (var i = 0; i < results.rows.length; i++) {
              userDatas.push(results.rows.item(i));
            }
            if (userDatas.find((user) => user.uname === uname.value)) {
              if (userDatas.find((user) => user.pass === pass.value)) {
                setIsSubmitted(true);
                navigate(`/home/${uname.value}`);
              } else {
                setErrorMessages({ name: 'pass', message: errors.pass });
              }
            }
          }
        }
      );
    });
  };

  const renderErrorMessage = (name) => {
    if (name === errorMessages.name) {
      return <div className="error">{errorMessages.message}</div>;
    }
    return null;
  };

  const renderForm = (
    <div className="form">
      <form onSubmit={handleSubmit}>
        <div className="input-container">
          <label>Username </label>
          <input type="text" name="uname" required />
          {renderErrorMessage('uname')}
        </div>
        <div className="input-container">
          <label>Password </label>
          <input type="password" name="pass" required />
          {renderErrorMessage('pass')}
        </div>
        <Row>
          <Col>
            <div className="button-container">
              <Button variant="success" type="submit">
                Login
              </Button>
            </div>
          </Col>
          <Col>
            <div className="button-container">
              <Button
                variant="warning"
                onClick={() => {
                  navigate('/register');
                }}
              >
                Register
              </Button>
            </div>
          </Col>
        </Row>
      </form>
    </div>
  );

  return (
    <div className="app">
      <div className="login-form">
        <div className="title">Sign In</div>
        {isSubmitted ? <div>User is successfully logged in</div> : renderForm}
      </div>
    </div>
  );
}

export default Login;
