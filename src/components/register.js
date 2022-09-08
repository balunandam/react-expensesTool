import React, { useState } from 'react';
import '../index.css';
import { useNavigate } from 'react-router-dom';
import { Row, Col, Button } from 'react-bootstrap';
import ErrorMessages from './errorMessage';

var db = openDatabase('user', '1.0', 'My WebSQL Database', 2 * 1024 * 1024);

function Register() {
  const navigate = useNavigate();
  const [errorMessages, setErrorMessages] = useState({});

  let passwordMatch = '';
  const errors = {
    uname: 'invalid username',
    pass: 'invalid password',
    repass: 'Password should match',
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    var { uname, pass, emailid, repass } = document.forms[0];

    if (pass.value !== repass.value) {
      renderErrorMessage(errors.repass);
    } else {
      db.transaction(function (tx) {
        tx.executeSql(
          'CREATE TABLE IF NOT EXISTS people (id integer primary key, uname text, pass text, email text)'
        );
      });
      db.transaction(function (tx) {
        tx.executeSql(
          'INSERT INTO people (uname, pass, email) VALUES (?,?,?)',
          [uname.value, pass.value, emailid.value]
        );
      });
      navigate('/login');
    }
  };

  const renderErrorMessage = (name) =>
    name === errorMessages.name && (
      <div className="error">{errorMessages.message}</div>
    );
  const renderForm = (
    <div className="form">
      <form onSubmit={handleSubmit}>
        <div className="input-container">
          <label>Username </label>
          <input type="text" name="uname" required />
          {renderErrorMessage('uname')}
        </div>
        <div className="input-container">
          <label>Email Id </label>
          <input type="text" name="emailid" required />
          {renderErrorMessage('emailid')}
        </div>
        <div className="input-container">
          <label>Enter Password </label>
          <input type="password" name="pass" required />
          {renderErrorMessage('pass')}
        </div>
        <div className="input-container">
          <label>Re - enter Password </label>
          <input type="password" name="repass" required />
          {renderErrorMessage('repass')}
        </div>
        <Row>
          <Col>
            <div className="button-container">
              <Button variant="success" type="submit">
                Register
              </Button>
            </div>
          </Col>
          <Col>
            <div className="button-container">
              <Button
                variant="warning"
                onClick={() => {
                  navigate('/login');
                }}
              >
                Login
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
        <div className="title">Register</div>
        {renderForm}
      </div>
    </div>
  );
}

export default Register;
