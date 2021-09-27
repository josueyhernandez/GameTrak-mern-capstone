import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import HomePage from 'pages/homepage/HomePage'
import RegisterPage from './pages/RegisterPage'
import CharacterPage from 'pages/CharacterPage/characterpage'
import ItemPage from 'pages/ItemPage/item'
import AttributePage from 'pages/AttributePage/attribute'
import PlacesPage from 'pages/PlacesPage/places'
import SkillsPage from 'pages/SkillsPage/skills'
import './index.css'

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>  
      <Switch>
        <Route exact path='/' component={HomePage} />
        <Route exact path='/register' component={RegisterPage} />
        <Route exact path="/character" component={CharacterPage} />
        <Route exact path="/item" component={ItemPage} />
        <Route exact path="/attributes" component={AttributePage} />
        <Route exact path="/places" component={PlacesPage} />
        <Route exact path="/skills" component={SkillsPage} />
      </Switch>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
)