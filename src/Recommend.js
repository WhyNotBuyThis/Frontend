import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './Recommend.css';

function Recommend() {
  const location = useLocation();
  const navigate = useNavigate();

  // 목업 데이터
  const mockData = [
    {
      itemName: 'Product_18',
      itemImage: null,
      itemDescription: '건강과 웰니스를 위한 추천 아이템입니다.',
      itemPrice: 50000,
      category: 'HEALTH_WELLNESS',
    },
    {
      itemName: 'Product_10',
      itemImage: null,
      itemDescription: '최신 기술을 경험할 수 있는 디지털 기기입니다.',
      itemPrice: 50000,
      category: 'DIGITAL_TECH',
    },
    {
      itemName: 'Product_6',
      itemImage: null,
      itemDescription: '라이프스타일을 위한 고급스러운 제품입니다.',
      itemPrice: 50000,
      category: 'LIFESTYLE',
    },
  ];

  const { recommendations = mockData } = location.state || {};

  return (
    <div className="recommend-page-container">
      <div className="recommend-box">
        <h2>추천 결과</h2>
        <div className="recommend-items">
          {recommendations.map((item, index) => (
            <div key={index} className="recommend-item">
              <img
                src={item.itemImage || 'https://i.namu.wiki/i/WBo-tbVSFFOCdQeaWV4DNoYs9a_prq-M3LhAB_MMaZGYkiFvnx3_a519EC-fTvKn94jUo1tESEIewEdEs2hlyA.webp'}
                alt={item.itemName}
                className="recommend-item-image"
              />
              <div className="recommend-item-details">
                <div className="recommend-item-header">
                  <p className="recommend-item-name">{item.itemName}</p>
                  <p className="recommend-item-price">{item.itemPrice.toLocaleString()} 원</p>
                </div>
                <p className="recommend-item-description">
                  {item.itemDescription || '설명이 없습니다.'}
                </p>
              </div>
            </div>
          ))}
        </div>
        {/* 돌아가기 버튼 추가 */}
        <button className="recommend-back-button" onClick={() => navigate('/Input')}>
          돌아가기
        </button>
      </div>
    </div>
  );
}

export default Recommend;
