import React from 'react';
import './App.css';
import Dashboard from './pages/Dashboard';
import ListPage from './pages/ListPage';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ROUTES } from './values/routes';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path={ROUTES.DASHBOARD.path} element={<Dashboard />} />
          <Route path={ROUTES.LIST.path} element={<ListPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
