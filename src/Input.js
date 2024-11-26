import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // React Router의 useNavigate 훅
import './Input.css';

function Input() {
  const [gender, setGender] = useState('');
  const [age, setAge] = useState('');
  const [priceRange, setPriceRange] = useState('');
  const [gift, setGift] = useState(''); // 추가된 선물 목적
  const navigate = useNavigate(); // 페이지 이동을 위한 useNavigate 훅

  const handlePriceChange = (e) => {
    const value = e.target.value.replace(/[^0-9]/g, ''); // 숫자만 남기기
    setPriceRange(value);
  };

  const formatCurrency = (value) => {
    if (!value) return '';
    return Number(value).toLocaleString() + ' 원';
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // 서버로 보낼 Request Body 생성
    const requestBody = {
      age: age, // 나이
      gender: gender === '남성' ? 'MALE' : 'FEMALE', // 성별
      itemPrice: parseInt(priceRange, 10), // 가격대 숫자로 변환
      gift: gift, // 선물 목적
    };

    try {
      // 로컬 스토리지에서 Authorization 토큰 가져오기
      const authToken = localStorage.getItem('authToken');

      // 백엔드에 요청 보내기
      const response = await fetch('http://localhost:8080/recommend', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${authToken}`, // Authorization 헤더 추가
        },
        body: JSON.stringify(requestBody),
      });

      if (!response.ok) {
        throw new Error('백엔드 요청 실패!');
      }

      const data = await response.json(); // 응답 데이터
      navigate('/recommend', { state: { recommendations: data } }); // Recommend로 데이터 전달
    } catch (error) {
      console.error('Error fetching recommendations:', error);
    }
  };

  return (
    <div className="input-page-container">
      <div className="input-box1">
        <h2>정보를 줄래?</h2>
        <form onSubmit={handleSubmit}>
          <label className="input-label">선물 목적</label>
          <select
            className="input-age-select"
            value={gift}
            onChange={(e) => setGift(e.target.value)}
          >
            <option value="">선물 목적을 알려주세요</option>
            <option value="APPRECIATION">친구생일</option>
            <option value="ANNIVERSARY">커플기념일</option>
            <option value="BIRTHDAY">가족 생일</option>
            <option value="HOUSEWARMING">집들이</option>
            <option value="CONGRATULATIONS">시험합격</option>
            <option value="JOB_CELEBRATION">입사축하</option>
            <option value="CONFESSION">고백</option>
          </select>

          <label className="input-label">성별</label>
          <div className="input-gender-options">
            <label className="input-gender-label">
              <input
                type="radio"
                value="남성"
                checked={gender === '남성'}
                onChange={(e) => setGender(e.target.value)}
                className="input-radio"
              />
              남성
            </label>
            <label className="input-gender-label">
              <input
                type="radio"
                value="여성"
                checked={gender === '여성'}
                onChange={(e) => setGender(e.target.value)}
                className="input-radio"
              />
              여성
            </label>
          </div>

          <label className="input-label">나이</label>
          <select
            className="input-age-select"
            value={age}
            onChange={(e) => setAge(e.target.value)}
          >
            <option value="">나이를 선택하세요</option>
            <option value="EARLY_TEENS">10대 초반</option>
            <option value="MID_TEENS">10대 중반</option>
            <option value="LATE_TEENS">10대 후반</option>
            <option value="EARLY_TWENTIES">20대 초반</option>
            <option value="MID_TWENTIES">20대 중반</option>
            <option value="LATE_TWENTIES">20대 후반</option>
            <option value="EARLY_THIRTIES">30대 초반</option>
            <option value="MID_THIRTIES">30대 중반</option>
            <option value="LATE_THIRTIES">30대 후반</option>
            <option value="FORTIES_AND_ABOVE">40대 이상</option>
          </select>

          <label className="input-label">가격대</label>
          <input
            type="text"
            placeholder="가격대를 입력하세요"
            className="input-price-input"
            value={formatCurrency(priceRange)}
            onChange={handlePriceChange}
          />

          <button type="submit" className="input-submit-btn">추천 받기</button>
        </form>
      </div>
    </div>
  );
}

export default Input;
