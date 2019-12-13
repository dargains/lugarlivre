import React from 'react'
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"
import { ThemeProvider } from 'styled-components'
import { lightTheme, darkTheme } from './themes'

// import Header from './components/Header'
import Home from './pages/Home'
import Accept from './pages/Accept'
import Error from './pages/Error'

const App = () => {
  const height = window.innerHeight
  return (
    <ThemeProvider theme={lightTheme}>
      <Router>
        <main className="App" style={{ height }}>
          <Switch>
            <Route path="/accept">
              <Accept />
            </Route>
            <Route path="/error">
              <Error />
            </Route>
            <Route path="/">
              <Home />
            </Route>
          </Switch>
        </main>
      </Router>
    </ThemeProvider>
  );
}

export default App;
