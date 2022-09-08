import React, { useEffect, useState } from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';
import '../index.css';
import { useParams } from 'react-router-dom';
import { FaEdit } from 'react-icons/fa';
import { HiEye } from 'react-icons/hi';
import { AiFillDelete } from 'react-icons/ai';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
var db = openDatabase('user', '1.0', 'My WebSQL Database', 2 * 1024 * 1024);
const contentStyle = {
  maxWidth: '600px',
  width: '90%',
};
function HomePage() {
  const { username } = useParams();
  const [validated, setValidated] = useState(false);
  const [expensesList, setExpensesList] = useState([]);
  const columns = [
    {
      Header: 'SNO',
      accessor: 'id',
    },
    {
      Header: 'User Id',
      accessor: 'id',
    },
    {
      Header: 'Purpose',
      accessor: 'purpose',
    },
    {
      Header: 'Amount',
      accessor: 'amount',
    },
    {
      Header: 'Date',
      accessor: 'date',
    },
    {
      Header: 'Type',
      accessor: 'type',
    },
    {
      Header: 'Action',
      accessor: 'action',
    },
  ];
  useEffect(() => {
    db.transaction(function (tx) {
      tx.executeSql(
        `SELECT * FROM expenses_${username}`,
        [],
        function (tx, results) {
          let expenses = [];
          if (results.rows.length > 0) {
            for (var i = 0; i < results.rows.length; i++) {
              expenses.push(results.rows.item(i));
            }
            setExpensesList(expenses);
          }
        }
      );
    });
  }, []);
  const viewHanlder = (event) => {
    debugger;
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    debugger;
    const form = event.currentTarget;
    const formBasicInputpurpose =
      event.target.elements.formBasicInputpurpose.value;
    const formBasicDate = event.target.elements.formBasicDate.value;
    const formBasicInput = event.target.elements.formBasicInput.value;
    const formDropdown =
      event.target.elements.formDropdown.value === '1' ? 'Credited' : 'Debited';
    if (form.checkValidity() === false) {
      event.stopPropagation();
    }
    if (
      formBasicDate &&
      formBasicInput &&
      formDropdown &&
      formBasicInputpurpose
    ) {
      db.transaction(function (tx) {
        tx.executeSql(
          `CREATE TABLE IF NOT EXISTS expenses_${username} (id integer primary key, purpose text, date text, amount text, type text)`
        );
      });
      db.transaction(function (tx) {
        tx.executeSql(
          `INSERT INTO expenses_${username} (purpose, date, amount, type) VALUES (?,?,?,?)`,
          [formBasicInputpurpose, formBasicDate, formBasicInput, formDropdown]
        );
      });
      db.transaction(function (tx) {
        tx.executeSql(
          `SELECT * FROM expenses_${username}`,
          [],
          function (tx, results) {
            let expenses = [];
            if (results.rows.length > 0) {
              for (var i = 0; i < results.rows.length; i++) {
                expenses.push(results.rows.item(i));
              }
              setExpensesList(expenses);
            }
          }
        );
      });
    }
    setValidated(true);
  };
  const deleteExpenses = () => {
    db.transaction(function (tx) {
      tx.executeSql(`DROP TABLE expenses_${username}`);
    });
    setExpensesList([]);
  };
  const deleteSingleExpense = (event) => {
    debugger;
    db.transaction(function (tx) {
      tx.executeSql(`DELETE FROM expenses_${username} WHERE id=${event}`);
      tx.executeSql(
        `SELECT * FROM expenses_${username}`,
        [],
        function (tx, results) {
          let expenses = [];
          if (results.rows.length > 0) {
            for (var i = 0; i < results.rows.length; i++) {
              expenses.push(results.rows.item(i));
            }
            setExpensesList(expenses);
          } else {
            setExpensesList([]);
          }
        }
      );
    });
  };
  const editExpense = (event) => {
    debugger;
    <Popup
      trigger={<button className="button"> Open Modal </button>}
      modal
      contentStyle={contentStyle}
    >
      {(close) => (
        <div className="modal">
          <a className="close" onClick={close}>
            &times;
          </a>
          <div className="header"> Modal Title </div>
          <div className="content">
            {' '}
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque, a
            nostrum. Dolorem, repellat quidem ut, minima sint vel eveniet
            quibusdam voluptates delectus doloremque, explicabo tempore dicta
            adipisci fugit amet dignissimos?
            <br />
            Lorem ipsum dolor sit amet, consectetur adipisicing elit.
            Consequatur sit commodi beatae optio voluptatum sed eius cumque,
            delectus saepe repudiandae explicabo nemo nam libero ad, doloribus,
            voluptas rem alias. Vitae?
          </div>
          <div className="actions">
            <Popup
              trigger={<button className="button"> Menu Demo </button>}
              position="top center"
              closeOnDocumentClick
              contentStyle={{ padding: '0px', border: 'none' }}
            >
              <div className="menu">
                <div className="menu-item"> Menu item 1</div>
                <div className="menu-item"> Menu item 2</div>
                <div className="menu-item"> Menu item 3</div>
                <Popup
                  trigger={<div className="menu-item"> sup Menu </div>}
                  position="right top"
                  on="hover"
                  closeOnDocumentClick
                  mouseLeaveDelay={300}
                  mouseEnterDelay={0}
                  contentStyle={{ padding: '0px', border: 'none' }}
                  arrow={false}
                >
                  <div className="menu">
                    <div className="menu-item"> item 1</div>
                    <div className="menu-item"> item 2</div>
                    <div className="menu-item"> item 3</div>
                  </div>
                </Popup>
                <div className="menu-item"> Menu item 4</div>
              </div>
            </Popup>
            <button
              className="button"
              onClick={() => {
                console.log('modal closed ');
                close();
              }}
            >
              close modal
            </button>
          </div>
        </div>
      )}
    </Popup>;
  };
  return (
    <Form
      noValidate
      validated={validated}
      className="home-padding"
      onSubmit={handleSubmit}
    >
      <Row>
        <Col>
          <Form.Group className="mb-3" controlId="formBasicInputpurpose">
            <Form.Label>Purpose</Form.Label>
            <Form.Control type="text" placeholder="Enter purpose" />
            <Form.Text className="text-muted">
              Enter purpose of Credited/Debited.
            </Form.Text>
          </Form.Group>
        </Col>
        <Col>
          <Form.Group className="mb-3" controlId="formBasicDate">
            <Form.Label>Date</Form.Label>
            <Form.Control type="date" placeholder="Enter date" />
            <Form.Text className="text-muted">
              Please enter date of Credited/Debited.
            </Form.Text>
          </Form.Group>
        </Col>
        <Col>
          <Form.Group className="mb-3" controlId="formBasicInput">
            <Form.Label>Amount</Form.Label>
            <Form.Control type="text" placeholder="Enter amount" />
            <Form.Text className="text-muted">Please enter amount.</Form.Text>
          </Form.Group>
        </Col>
        <Col>
          <Form.Group className="mb-3" controlId="formDropdown">
            <Form.Label>Type</Form.Label>
            <Form.Control required as="select" type="select">
              <option value="">Select type</option>
              <option value="1">Credited</option>
              <option value="2">Debited</option>
            </Form.Control>
            <Form.Text className="text-muted">
              Please select the type of input.
            </Form.Text>
          </Form.Group>
        </Col>
        <Col>
          <Button variant="primary" type="submit" className="btn-margin">
            Submit
          </Button>
        </Col>
      </Row>
      <hr />
      <Row>
        <div className="d-flex justify-content-center">
          <h2>Welcome {username}, your monthly expenses</h2>
        </div>
      </Row>
      <Row>
        <table border="1" id="customers">
          <thead>
            <tr>
              {columns.map((data, i) => {
                return <th key={'uniqueid_' + i}>{data.Header}</th>;
              })}
            </tr>
          </thead>
          <tbody>
            {expensesList.map((data, i) => {
              return (
                <tr key={'unique_' + i}>
                  <td>{i}</td>
                  <td>{data.id}</td>
                  <td>{data.purpose}</td>
                  <td>{data.amount}</td>
                  <td>{data.date}</td>
                  <td>{data.type}</td>
                  <td>
                    <Row>
                      <div className="col-1"></div>
                      <div className="col-2">
                        <HiEye
                          onClick={() => editExpense(data.id)}
                          size="20"
                          color="seagreen"
                        />
                      </div>
                      <div className="col-2">
                        <Popup trigger={<FaEdit />} position="right center">
                          <div>GeeksforGeeks</div>
                          <button>Click here</button>
                        </Popup>
                      </div>
                      <div className="col-2">
                        <AiFillDelete
                          onClick={() => deleteSingleExpense(data.id)}
                          title="Delete"
                        />
                      </div>
                    </Row>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </Row>
      <br />
      <Row>
        <div className="d-flex justify-content-end">
          <Button className="danger" onClick={deleteExpenses}>
            Delete expenses
          </Button>
        </div>
      </Row>
    </Form>
  );
}

export default HomePage;
