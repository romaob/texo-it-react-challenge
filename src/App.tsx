import React from 'react';
import './App.css';
import Dashboard from './pages/Dashboard';
import ListPage from './pages/ListPage';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/list" element={<ListPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
