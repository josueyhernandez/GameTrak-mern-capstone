import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import HomePage from 'pages/HomePage'
import RegisterPage from './pages/RegisterPage'
import './index.css'

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>  
      <Switch>
        <Route exact path='/' component={HomePage} />
<<<<<<< HEAD
        <Route exact path='/register' component={RegisterPage} />
=======
        <Route exact path='/register' component={RegisterPage}/>
>>>>>>> 222dce1 (added to index)
        { /* Add more routes here */} 
      </Switch>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
)
