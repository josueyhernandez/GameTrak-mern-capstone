<<<<<<< HEAD
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
        <Route exact path='/register' component={RegisterPage} />
        { /* Add more routes here */} 
      </Switch>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
)
=======
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import HomePage from 'pages/homepage/HomePage';
import './index.css';

ReactDOM.render(
	<React.StrictMode>
		<BrowserRouter>
			<Switch>
				<Route exact path='/' component={HomePage} />
				{/* Add more routes here */}
			</Switch>
		</BrowserRouter>
	</React.StrictMode>,
	document.getElementById('root')
);
>>>>>>> 0fe77f8 (Created game file and data file that stores a list of games along with images)
