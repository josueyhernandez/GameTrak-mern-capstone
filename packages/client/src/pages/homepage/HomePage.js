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
import { useProvideStyle } from 'hooks/useStyle';
import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
const axios = require('axios');

export default function HomePage(props) {
  const { error, isLoading, response } = useApiFetch("/sample");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginStatus, setLoginStatus] = useState(0);
  const { state,dispatch, userReducer,} = useProvideUser()
  const colorScheme = useProvideStyle();

  document.body.setAttribute("id", colorScheme.getStyle())

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
        console.log(res.data)
        if (res.data.valid === true) {
          dispatch({
            type: 'CHANGE_USER',
            info: res.data.user,
            token: res.data.token
          })
          toast.success("Login Successful!")
          
          window.location.replace("/games")
          console.log(state)
          setLoginStatus(2);
          
        } else {
          toast.error("Invalid Information")
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

  function setColor(color){
    console.log(color.target.value)
    colorScheme.setNewStyle(color.target.value)
    document.body.id = colorScheme.getStyle()
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
            <Button
              block
              size="lg"
              type="submit"
              className="button"
              disabled={!validateForm()}
            >
              Login
            </Button>
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
            </Form.Group>
            {/* {loginStatus === 2 && <div>LOGIN SUCCESS</div>}
            {loginStatus === 1 && <div>LOGIN FAILED</div>} */}
            {/* <Button onClick = {testButton}>t</Button> */}
          </Form>
          <select name="color" onChange={setColor}>
            <option value="green">Green and Purple</option>
            <option value="red">Red and Blue</option>
            <option value="blue">Blue and Yellow</option>
          </select>
        </div>
      )}
      <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
    </main>
  );
}
