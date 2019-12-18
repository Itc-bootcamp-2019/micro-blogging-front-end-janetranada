import React from 'react';
import './App.css';
import MainPage from './pages/MainPage.js'
import Navbar from './components/Navbar.js';
import { Switch, Route, BrowserRouter as Router } from 'react-router-dom';
import User from './pages/User';

function App() {

  return (
    <div className="App">
      <Router>
        <Navbar />
        <Switch>
          <Route exact path="/">
            <MainPage />
          </Route>
          <Route path="/user">
            <User />
          </Route>
         
        </Switch>
      </Router>
    </div>
  )
}

export default App;