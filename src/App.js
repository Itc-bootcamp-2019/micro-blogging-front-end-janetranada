import React from 'react';
import './App.css';
import MainPage from './pages/MainPage.js'
import Navbar from './components/Navbar/';
import { Switch, Route, BrowserRouter as Router } from 'react-router-dom';
import User from './pages/User';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';

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
          <Route path="/login">
            <LoginPage />
          </Route>         
          <Route path="/signup">
            <SignupPage />
          </Route>         
        </Switch>
      </Router>
    </div>
  )
}

export default App;