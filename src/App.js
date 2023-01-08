import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import Games from './Games.js';
import Players from './Players.js';
import { BrowserRouter as Router,Routes, Route, Link, useParams } from 'react-router-dom';

function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <Routes>
            <Route exact path='/' element={< Games />}></Route>
            <Route exact path='/players/:nhl_game_id' element={< Players />}></Route>
          </Routes>
        </header>
      </div>
    </Router>
  );
}

export default App;
