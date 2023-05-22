import React from 'react';
import { Switch, Route } from 'react-router-dom/cjs/react-router-dom.min';
import './App.css';
import Login from './pages/Login';
import Game from './pages/Game';
import Config from './pages/Config';

export default function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/game" component={ Game } />
        <Route exact path="/" component={ Login } />
        <Route exact path="/config" component={ Config } />
      </Switch>
    </div>
  );
}
