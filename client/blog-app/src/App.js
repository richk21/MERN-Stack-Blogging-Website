import './App.css';
import Header from './components/Header';
import Login from './components/Login';
import Post from './components/Post';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Register from './components/Register';
import Layout from './components/Layout';
import IndexPage from './components/IndexPage';

function App() {
  return (
    <Router>
      <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;700&display=swap" rel="stylesheet"/>
    <Routes>
      <Route path='/' element={<Layout/>}>
        <Route index element={<IndexPage/>}/>
        <Route path={'/Login'} element={<Login/>}/>
        <Route path={'/Register'} element={<Register/>}/>
      </Route>
    </Routes>
    </Router>
  );
}

export default App;
