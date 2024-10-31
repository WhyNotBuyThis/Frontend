import React, { useState } from 'react';
import './Input.css';

function Input() {
  const [gender, setGender] = useState('');
  const [age, setAge] = useState('');
  const [priceRange, setPriceRange] = useState('');

  const handlePriceChange = (e) => {
    const value = e.target.value.replace(/[^0-9]/g, ''); // 숫자만 남기기
    setPriceRange(value);
  };

  const formatCurrency = (value) => {
    if (!value) return '';
    return Number(value).toLocaleString() + ' 원';
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log({ gender, age, priceRange });
  };

  return (
    <div className="input-page-container">
      <div className="input-box1">
        <h2>정보를 줄래?</h2>
        <form onSubmit={handleSubmit}>
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
            <option value="10대 초반">10대 초반</option>
            <option value="10대 중반">10대 중반</option>
            <option value="10대 후반">10대 후반</option>
            <option value="20대 초반">20대 초반</option>
            <option value="20대 중반">20대 중반</option>
            <option value="20대 후반">20대 후반</option>
            <option value="30대 초반">30대 초반</option>
            <option value="30대 중반">30대 중반</option>
            <option value="30대 후반">30대 후반</option>
            <option value="40대 이상">40대 이상</option>
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
