import Navbar from './components/Navbar';
import Home from './components/LandingPage/Home';
import About from './components/LandingPage/About';
import OurTeam from './components/LandingPage/OurTeam';
import Contact from './components/LandingPage/Contact';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Create from './components/LandingPage/Create';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <div className="content">
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route exact path="/about">
              <About />
            </Route>
            <Route exact path="/ourteam">
              <OurTeam />
            </Route>
            <Route exact path="/contact">
              <Contact />
            </Route>
            <Route path="/create">
              <Create />
            </Route>
          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;
