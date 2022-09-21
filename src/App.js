import logo from './logo.svg';
import Register from './components/Register';
import Login from './components/Login';
import Home from './components/Home';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />}> </Route>
        <Route path='/register' element={<Register />}></Route>
        <Route path='/login' element={<Login />}></Route>
      </Routes>
    </>
  );
}

export default App;
