import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import HomePage from 'pages/homepage/HomePage'
import RegisterPage from './pages/RegisterPage'
import GamesPage from 'pages/game/game'
import './index.css'
import ProvideUser from "./hooks/globalStates"
ReactDOM.render(
  <React.StrictMode>
    <ProvideUser>
      <BrowserRouter>
        <Switch>
          <Route exact path='/' component={HomePage} />
          <Route exact path='/register' component={RegisterPage} />
          <Route exact path='/games' component={GamesPage} />
          { /* Add more routes here */}
        </Switch>
      </BrowserRouter>
    </ProvideUser>
  </React.StrictMode>,
  document.getElementById('root')
)
