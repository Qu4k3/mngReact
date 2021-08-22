import React from "react"
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import { ChevronLeft } from 'react-feather';
import Range from "./components/Range"

export default function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/exercise1">
          <div>
            <Link to="/" className="btn" ><ChevronLeft size={16} />Return</Link>
            <h1>Normal Range</h1>
            <Range />
          </div>
        </Route>
        <Route exact path="/exercise2">
          <div>
            <Link to="/" className="btn" ><ChevronLeft size={16} />Return</Link>
            <h1>Fixed values range</h1>
            <Range />
          </div>
        </Route>
        <Route exact path="/">
          <Home />
        </Route>
      </Switch>
    </Router>
  )
}

function Home() {
  return (
    <div>
      <h1 className="title">{'<'}Range {'/>'}</h1>
      <div className="menu">
        <Link to="/exercise1" className="btn">Exercise 1</Link>
        <Link to="/exercise2" className="btn">Exercise 2</Link>
      </div>
    </div>
  );
}