
import React, { useState } from 'react'
import Form from "react-bootstrap/Form"
import Button from "react-bootstrap/Button"
// import { ToastContainer, toast } from "react-toastify" 
import { useApiFetch } from "util/api"
import LoadingSpinner from 'components/LoadingSpinner'
import { FaExclamationCircle } from 'react-icons/fa'
import "./HomePage.css" 
import { useProvideUser } from 'hooks/globalStates'
import image from "./profile.jpg";

export default function HomePage(props) {
  const axios = require('axios');
  const { error, isLoading, response } = useApiFetch("/sample");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginStatus, setLoginStatus] = useState(0);
  const { state, userReducer} = useProvideUser()
  function validateForm() {
    return username.length > 0 && password.length > 0;
  }
  async function loginBackend() {
    await axios
      .post("/api/users/login", {
        username,
        password,
      })
      .then(function (res) {
        if (res.data.valid === true) {
          userReducer(state,{type: "CHANGE_USER", info: res.data.user})
          setLoginStatus(2);

        } else {
          setLoginStatus(1);
        }
      })
      .catch(function (err) {
        console.log(err);
      });
  }
  function handleSubmit(event) {
    loginBackend();
    event.preventDefault();
  }
  async function testButton(){
    
     console.log(state)
  }

  return (
    <main>
      <h1>
        <img src={image} alt="image"></img>
      </h1>
      <h1>Welcome to GameTrak</h1>
      {error && <h3 style={{ color: "red" }}>Error Loading Data: {error}</h3>}
      {isLoading && <LoadingSpinner></LoadingSpinner>}
      {!error && response && (
        <div className="login">
          <Form onSubmit={handleSubmit}>
            <Form.Group size="lg" controlId="username">
              <Form.Label>Username: </Form.Label>
              <Form.Control
                autoFocus
                type="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </Form.Group>
            <Form.Group size="lg" controlId="password" className="passWordForm">
              <Form.Label className="password">Password: </Form.Label>
              <Form.Control
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>

            <Button
              block
              size="lg"
              type="submit"
              className="button"
              onClick={() => window.location.replace("/register")}
              variant="primary"
            >
              SignUp
            </Button>
            <Button
              block
              size="lg"
              type="submit"
              className="button"
              disabled={!validateForm()}
            >
              Login
            </Button>
            {loginStatus === 2 && <div>LOGIN SUCCESS</div>}
            {loginStatus === 1 && <div>LOGIN FAILED</div>}
            <Button onClick = {testButton}>t</Button>
          </Form>
        </div>
      )}
    </main>
  );
}
