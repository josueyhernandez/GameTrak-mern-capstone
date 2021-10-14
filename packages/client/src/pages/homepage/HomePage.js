import React, { useEffect, useState } from 'react'
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
  const { state, dispatch, userReducer, } = useProvideUser()
  const colorScheme = useProvideStyle();
  const [userValid, setUserValid] = useState(false)
  const [passValid, setPassValid] = useState(false)

  document.body.setAttribute("id", colorScheme.getStyle())

  function validateForm() {
    return username.length > 0 && password.length > 0;
  }
  async function loggedIn() {
   
    if (state.username && state.token) {
      await axios
        .post('/api/auth', {
          token: state.token
        })
        .then((res) => {
         
          if (res.data) {
            window.location.replace("/games")
          } else {
            dispatch({
              type: 'LOGOUT',
              info: "TEST",
              token: state.token
            })
          }
        })
        .catch((err) => {
        })
    }
  }
  useEffect(loggedIn, [state])
  async function loginBackend() {
    //if (input 1.value === "" || input2.value === ""  ) { toast.error, return and exit function} else {the stuff you already have}
    await axios
      .post("/api/users/login", {
        username,
        password,
      })
      .then(function (res) {
        if (res.data.valid === true) {
          dispatch({
            type: 'CHANGE_USER',
            info: res.data.user,
            token: res.data.token
          })
          toast.success("Login Successful!")
          window.location.replace("/games")
        } else {
          toast.error("Invalid Information")
          setLoginStatus(1);
        }
      })
      .catch(function (err) {
      });
  }
  function handleSubmit(event) {
    event.preventDefault();
    loginBackend();
  }


  function setColor(color) {
    colorScheme.setNewStyle(color.target.value)
    document.body.id = colorScheme.getStyle()
  }
  return (
    <main>
      <h1>
        <img id="homepage-image" src={image} alt="image"></img>
      </h1>
      <h1 id="title">Welcome to GameTrak</h1>
      {error && <h3 style={{ color: "red" }}>Error Loading Data: {error}</h3>}
      {isLoading && <LoadingSpinner></LoadingSpinner>}
      {!error && response && (
        <div className="login">
          <Form validated = {userValid} onSubmit={(event) => handleSubmit(event)}>
            <Form.Group size="lg" controlId="username">
              <Form.Label>Username: </Form.Label>
              <Form.Control
                autoFocus
                required
                type="text"
                value={username}

                onChange={(e) => {
                  setUsername(e.target.value)
                if(e.target.value){
                  setUserValid(true)
                }else{
                  setUserValid(false)
                }
                }}
              />
              {!userValid && <Form.Control.Feedback data-validity = {userValid} type="invalid">
              <div id = "feed">Enter a username</div>
              </Form.Control.Feedback>}
            </Form.Group>
            <Form.Group size="lg" controlId="password" className="passWordForm">
              <Form.Label className="password">Password: </Form.Label>
              <Form.Control
                required
                type="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value)
                  if(e.target.value){
                    setPassValid(true)
                  }else{
                    setPassValid(false)
                  }
                }}
              />
              {!passValid && <Form.Control.Feedback data-validity = {passValid} type="invalid">
                <div id = "feed">Enter a password</div>
              </Form.Control.Feedback>}
              <br/>
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
          <label for="color" id="bottom">Please select a color:</label>
          <select id="color" onChange={setColor}>
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
