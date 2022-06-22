import Home from './pages/Home';
import Login from './pages/Login';
import Admin from './pages/Admin';
import {
  Route,
  BrowserRouter as Router,
  Routes
} from 'react-router-dom';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/admin" element={<Admin/>} />
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Home/>} />
      </Routes>
    </Router>
  );
}

export default App;
