import React, { useState } from 'react'
import {
  Container,
  Row,
  Col,
  InputGroup,
  Form,
  Button,
  ToastBody,
} from "react-bootstrap"
import { useProvideAuth } from 'hooks/useAuth'
//import { LandingHeader, LoadingSpinner } from 'components'
//import { setAuthToken } from 'utils/axiosConfig'
//import AvatarPicker from 'components/AvatarPicker/AvatarPicker'
import { toast } from 'react-toastify'
import useRouter from 'hooks/useRouter'


const initialState = {
    username: '',
    email: '',
    password: '',
    isSubmitting: false,
    errorMessage: null,
}


export default function RegisterPage() {
    const [data, setData] = useState(initialState)
    const auth = useProvideAuth()
    const router = useRouter()


    const handleInputChange = (event) => {
      console.log(event)
        setData({
            ...data,
            [event.target.name] : event.target.value,
        })
        console.log(data)
    }

    const handleSignup = async (event) => {
      const form = event.currentTarget
      event.preventDefault()

      console.log(data.password === document.getElementById("confirm").value)
      if (!(data.password === document.getElementById("confirm").value)) {
        toast.error("Passwords do not match")
      } else {
        setData({
          ...data,
          isSubmitting: true,
          errorMassage: null,
        })
        try {
          //const res = await auth.signup(data.username, data.email, data.password) [Do not delete]
          setData({
            ...data,
            isSubmitting: true,
            errorMessage: null,
          })
          router.push("/")
        } catch (error) {
          toast.error(error.message)
          setData({
            ...data,
            isSubmitting: false,
            errorMessage: error.message
          })
        }
      }

    }

    return (
        <div className="register">
          <Form onSubmit={handleSignup}>
            <Form.Group size="lg" controlId="username">
            <Form.Label>Username: </Form.Label>
            <Form.Control 
              autoFocus
              type = "username"
              name = "username"
              value= {data.username}
              onChange = {handleInputChange}
            />
            </Form.Group>
            <Form.Group size="lg" controlId="password" class="passWordForm">
              <Form.Label class="password">Password: </Form.Label>
              <Form.Control
                type="password"
                name = "password"
                value={data.password}
                onChange = {handleInputChange}
              />
            </Form.Group>
            <Form.Group size="lg" class="passWordForm">
              <Form.Label class="confirm">Confirm Password: </Form.Label>
              <Form.Control
                type="password"
                id="confirm"
              />
            </Form.Group>
            <Form.Group size="lg" controlId="email" class="emailForm">
              <Form.Label class="confirm">Email: </Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={data.email}
                onChange = {handleInputChange}
              />
            </Form.Group>
            <Button block size="lg" type="submit" class="button">Register</Button>
          </Form>
        </div>
    )
}