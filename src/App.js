import './App.css';
import NavBar from './navigation/navBar';
import Login from './components/login';
import HomePage from './components/home';
import Register from './components/register';
import { Routes, Route } from 'react-router-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import About from './components/about';

function App() {
  return (
    <Router>
      <NavBar></NavBar>
      <Routes>
        <Route path="/" element={<Login />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/home" element={<HomePage />}></Route>
        <Route path="/register" element={<Register />}></Route>
        <Route path="/about" element={<About />}></Route>
        <Route path="/home/:username" element={<HomePage />} />
      </Routes>
    </Router>
  );
}

export default App;
