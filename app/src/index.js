import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import Login from './components/Login';
import Signup from './components/Signup'
import 'bootstrap/dist/css/bootstrap.min.css';
import { CategoryProvider } from './components/CategoryContext';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <CategoryProvider>
  <Router>
    <Routes>    
          <Route path='/' element={<App/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/signup' element={<Signup/>}/>
    </Routes>
  </Router>
</CategoryProvider>
);