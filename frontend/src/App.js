import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from "./screens/Login"
import Dashboard from "./screens/Dashboard"
import CreateSubAdmin from "./screens/subAdmin"
import Profile from './screens/Profile'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/createsubadmin" element={<CreateSubAdmin />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </Router>
  );
}

export default App;

