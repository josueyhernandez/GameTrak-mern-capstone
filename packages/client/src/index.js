import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import HomePage from 'pages/homepage/HomePage'
import RegisterPage from './pages/RegisterPage'
import GamesPage from 'pages/game/game'
import CharacterPage from 'pages/CharacterPage/characterpage'
import ItemPage from 'pages/ItemPage/item'
import AttributePage from 'pages/AttributePage/attribute'
import PlacesPage from 'pages/PlacesPage/places'
import SkillsPage from 'pages/SkillsPage/skills'
import CreatePage from 'pages/CreateCharacter/create'
import './index.css'
import ProvideUser from "./hooks/globalStates"
ReactDOM.render(
  <React.StrictMode>
    <ProvideUser>
      <BrowserRouter>
        <Switch>
          <Route exact path='/' component={HomePage} />
          <Route exact path='/games' component={GamesPage} />
          <Route exact path='/register' component={RegisterPage} />
          <Route exact path="/character" component={CharacterPage} />
          <Route exact path="/item" component={ItemPage} />
          <Route exact path="/attributes" component={AttributePage} />
          <Route exact path="/places" component={PlacesPage} />
          <Route exact path="/skills" component={SkillsPage} />
          <Route exact path="/create" component={CreatePage} />
        </Switch>
      </BrowserRouter>
    </ProvideUser>
  </React.StrictMode>,
  document.getElementById('root')
)