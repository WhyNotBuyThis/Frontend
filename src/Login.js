import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';

import leftLogo from './img/leftLogo.png';
import rightLogo1 from './img/rightLogo1.png';
import rightLogo2 from './img/rightLogo2.png';
import kakaotalkLogo from './img/kakaotalkLogo.png';

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(''); // 오류 메시지 상태

  // 로그인 버튼 클릭 시 실행되는 함수
  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch('http://localhost:8000/user/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          userEmail: email,
          userPw: password
        })
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setError('');
        navigate('/input'); // 로그인 성공 시 Input 페이지로 이동
      } else {
        setError(data.message || '로그인에 실패했습니다. 다시 시도해주세요.');
      }
    } catch (error) {
      setError('서버와의 통신에 문제가 발생했습니다. 다시 시도해주세요.');
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <div className="logo-box">
          <img src={leftLogo} alt="left logo" className="left-logo" />
          <img src={rightLogo1} alt="right logo 1" className="right-logo1" />
          <img src={rightLogo2} alt="right logo 2" className="right-logo2" />
        </div>
        <h2>맞춤형 선물 추천 서비스</h2>
        <form onSubmit={handleLogin}>
          <input
            type="text"
            placeholder="이메일"
            className="input-box"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="비밀번호"
            className="input-box"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {error && <p className="error-message">{error}</p>} {/* 오류 메시지 표시 */}
          <button type="submit" className="login-btn">로그인</button>
        </form>
        <p className="forgot-password">비밀번호를 잊어버리셨나요?</p>

        <div className="social-login">
          <button className="kakao-login">
            <img src={kakaotalkLogo} alt="kakao logo" className="kakao-logo" />
            <span className="kakao-login-text">카카오 로그인</span>
          </button>
        </div>
        <button className="signup-btn" onClick={() => navigate('/signup')}>회원가입</button>
      </div>
    </div>
  );
}

export default Login;
