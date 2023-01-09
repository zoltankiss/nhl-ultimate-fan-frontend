import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import Games from './Games.js';
import Players from './Players.js';
import BackgroundProcesses from './BackgroundProcesses.js';
import { BrowserRouter as Router,Routes, Route, Link, useParams } from 'react-router-dom';

function App() {
  return (
    <Router>
      <div className="App">
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <a className="navbar-brand" href="/">NHL ULTIMATE FAN</a>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div className="navbar-nav">
            <a className="nav-item nav-link" href="https://nhlultimatefanviewer.herokuapp.com/background_processes">Background Processes</a>
          </div>
        </div>
      </nav>
        <header className="App-header">
          <Routes>
            <Route exact path='/' element={< Games />}></Route>
            <Route exact path='/players/:nhl_game_id' element={< Players />}></Route>
            <Route exact path='/background_processes' element={< BackgroundProcesses />}></Route>
          </Routes>
        </header>
      </div>
    </Router>
  );
}

export default App;
