<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> 281c3aa (rebased)
import React, { useState } from 'react'
import Form from "react-bootstrap/Form"
import Button from "react-bootstrap/Button"
// import { ToastContainer, toast } from "react-toastify" 
import { useApiFetch } from "util/api"
import LoadingSpinner from 'components/LoadingSpinner'
import { FaExclamationCircle } from 'react-icons/fa'
import "./HomePage.css" 
<<<<<<< HEAD
=======
import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
// import { ToastContainer, toast } from "react-toastify"
import { useApiFetch } from "util/api";
import LoadingSpinner from "components/LoadingSpinner";
import { FaExclamationCircle } from "react-icons/fa";
import "../index.css";
import "./HomePage.css";
>>>>>>> fb8ed40 (rebased changes)
=======
>>>>>>> 281c3aa (rebased)

export default function HomePage(props) {
  const { error, isLoading, response } = useApiFetch("/sample");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  function validateForm() {
    return username.length > 0 && password.length > 0;
  }

  function handleSubmit(event) {
    event.preventDefault();
  }

  return (
    <main>
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
            <Form.Group size="lg" controlId="password" class="passWordForm">
              <Form.Label class="password">Password: </Form.Label>
              <Form.Control
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>
<<<<<<< HEAD

<<<<<<< HEAD

=======
>>>>>>> fb8ed40 (rebased changes)
            <Button>SignUp</Button>
            <Button
              block
              size="lg"
              type="submit"
              class="button"
              disabled={!validateForm()}
            >
              Login
            </Button>
=======
>>>>>>> 281c3aa (rebased)
            <Button block size="lg" type="submit" class="button" disabled={!validateForm()}>Login</Button>
<<<<<<< HEAD

=======
>>>>>>> fb8ed40 (rebased changes)
          </Form>
        </div>
      )}
    </main>
  );
}
