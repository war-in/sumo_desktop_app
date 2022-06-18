import React from "react";
import './App.css';
import Navbar from "./components/Navbar/Navbar";
import {
  BrowserRouter,
} from "react-router-dom";
import { Route, Routes} from 'react-router';

export function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" />
      </Routes>
    </BrowserRouter>
  )
}