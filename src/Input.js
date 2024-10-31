import React, { useState } from 'react';
import './Input.css';

function Input() {
  const [gender, setGender] = useState('');
  const [age, setAge] = useState('');
  const [priceRange, setPriceRange] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log({ gender, age, priceRange });
  };

  return (
    <div className="input-container">
      <div className="input-box">
        <h1 className="success-message">성공!</h1> {/* 성공 메시지 */}
      
      </div>
    </div>
  );
}

export default Input;
