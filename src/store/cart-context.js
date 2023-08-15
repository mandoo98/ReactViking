import React from 'react';

// context를 만듦, context 안에 데이터가 있음(초기화)
const CartContext = React.createContext({
  items: [], // 아이템이 들어있는 배열
  totalAmount: 0, //총액
  addItem: (item) => {},
  removeItem: (id) => {}
});
// 장바구니 항목 초기값

export default CartContext;