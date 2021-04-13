import React from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import RouterMain from './routes/RouterMain';




function App() {
  return (
    <>
    <Router>
        <Switch>
          <Route path="/">
            <RouterMain />
          </Route>      
        </Switch>
      </Router>
    </>
  );
}

export default App;
