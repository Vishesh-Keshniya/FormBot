import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import MainPage from './Components/Main-page/Mainpage';
import LoginPage from './Components/Login-page/LoginPage';
import Sign from './Components/Sign-page/Sign'; 
import Dashboard from './Components/Dashboard/Dashboard';
import Workspace from './Components/Workspace/Workspace';
import Response from './Components/Workspace/Response'; 
import Settings from './Components/Dashboard/Settings';
import ShareModal from './Components/Dashboard/ShareModal';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<MainPage />} />

          <Route path="/login" element={<LoginPage />} />

          <Route path="/signup" element={<Sign />} />

          <Route path="/dashboard" element={<PrivateRoute />}>
            <Route path="/dashboard" element={<Dashboard />} />
          </Route>

          <Route path="/workspace" element={<Workspace />} />

          <Route path="/response" element={<Response />} />

          <Route path="/settings" element={<Settings />} />

          <Route path="/share" element={<ShareModal />} />
        </Routes>
      </div>
    </Router>
  );
}

const PrivateRoute = () => {
  if (!localStorage.getItem('jwtToken')) {
   
    return <Navigate to="/login" />;
  }
  return <Dashboard />;
};

export default App;
