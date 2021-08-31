import React, { useEffect, useState } from "react"
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import { ChevronLeft } from 'react-feather';
import Range from "./components/Range"

export default function App() {

  const [normalRange, setNormalRange] = useState({})
  const [normalRangeIsLoading, setNormalRangeIsLoading] = useState(true)
  const [fixedRange, setFixedRange] = useState([])
  const [fixedRangeIsLoading, setFixedRangeIsLoading] = useState(true)

  useEffect(() => {
    fetch('https://demo2384452.mockable.io/normal')
      .then(response => response.json())
      .then(data => {
        setNormalRange(data)
        setNormalRangeIsLoading(false)
      });

    fetch('https://demo2384452.mockable.io/fixed')
      .then(response => response.json())
      .then(data => {
        setFixedRange(data)
        setFixedRangeIsLoading(false)
      });
  }, [])

  return (
    <Router>
      <Switch>
        <Route exact path="/exercise1">
          <div>
            <Link to="/" className="btn" ><ChevronLeft size={16} />Return</Link>
            <h1 className="title">Normal Range</h1>
            {!normalRangeIsLoading && (
              Object.entries(normalRange).length > 0
                ? <Range min={normalRange.min} max={normalRange.max} />
                : <p>Provide min / max props</p>
            )}
          </div>
        </Route>
        <Route exact path="/exercise2">
          <div>
            <Link to="/" className="btn" ><ChevronLeft size={16} />Return</Link>
            <h1 className="title">Fixed values range</h1>
            {!fixedRangeIsLoading && (
              fixedRange.length > 0
                ? <Range prices={fixedRange} />
                : <p>Provide array of prices</p>
            )}
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