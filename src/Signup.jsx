import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Signup.css';

function Signup() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState(''); // 오류 메시지 상태

  // 회원가입 버튼 클릭 시 실행되는 함수
  const handleSignup = async (event) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      setError('비밀번호가 일치하지 않습니다. 다시 확인해주세요.');
      return;
    }

    try {
      const response = await fetch('/user/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          userEmail: email,
          userPw: password
        })
      });

      if (response.ok) {
        setError('');
        navigate('/'); // 회원가입 성공 시 로그인 페이지로 이동
      } else {
        const data = await response.json();
        setError(data.message || '회원가입에 실패했습니다. 다시 시도해주세요.');
      }
    } catch (error) {
      setError('서버와의 통신에 문제가 발생했습니다. 다시 시도해주세요.');
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>회원가입</h2>
        <form onSubmit={handleSignup}>
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
          <input
            type="password"
            placeholder="비밀번호 확인"
            className="input-box"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          {error && <p className="error-message">{error}</p>} {/* 오류 메시지 표시 */}
          <button type="submit" className="login-btn">회원가입 완료</button>
        </form>
        <button className="signup-btn" onClick={() => navigate('/')}>로그인으로 이동</button>
      </div>
    </div>
  );
}

export default Signup;
