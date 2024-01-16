import {Routes, Route} from 'react-router-dom';

import './App.css';
import Todo from '../components/Todo';
import Login from '../components/Login';
import Navbar from '../components/Navbar';
import ProtectedRoute from '../components/ProtectedRoute';

function App() {
  return (
    <div className="App">
      <Navbar />
      <div className="route-container">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route element={<ProtectedRoute />}>
            <Route path="/todo" element={<Todo />} />
          </Route>
        </Routes>
      </div>
    </div>
  );
}

export default App;
