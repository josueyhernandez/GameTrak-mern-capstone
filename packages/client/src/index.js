import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import HomePage from 'git pages/HomePage'
import RegisterPage from './pages/RegisterPage'
import './index.css'

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>  
      <Switch>
        <Route exact path='/' component={HomePage} />
        <Route exact path='/register' component={RegisterPage}/>
        { /* Add more routes here */} 
      </Switch>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
)
