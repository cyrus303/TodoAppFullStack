import todoLogo from './assets/todoLogo.png';
import {Routes, Route} from 'react-router-dom';

import './App.css';
import Todo from '../components/Todo';
import Login from '../components/Login';
import Navbar from '../components/Navbar';

function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/todo" element={<Todo />} />
      </Routes>
    </div>
  );
}

export default App;
