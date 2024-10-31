import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './Login';
import Input from './Input';
import Signup from './Signup'; // 회원가입 페이지 import

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/input" element={<Input />} />
        <Route path="/signup" element={<Signup />} /> {/* 회원가입 경로 추가 */}
      </Routes>
    </Router>
  );
}

export default App;