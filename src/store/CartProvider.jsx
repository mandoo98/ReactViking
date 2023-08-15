import React, { useReducer } from 'react'
import CartContext from "./cart-context";
//CartContext -> cart-context.js 안의 4가지 데이터(초기화)

// reducer 함수 정의
const cartReducer = (state, action) => {
  if(action.type === "ADD") {
    const updatedTotalAmount = state.totalAmount + action.item.price * action.item.amount;
    // 기존의 totalAmount + 내가 가져온 item의 가격 * 내가 보낸 아이템의 양

    // * 검사
    // state.item - 기존 배열 / Array.findIndex() - 제일 먼저 나오는 조건에 맞는 아이템의 인덱스(순서) 반환
    // item의 id와 액션으로 찾아온 item의 id
    const existingCartItemIndex = state.items.findIndex(
      (item) => item.id === action.item.id
    ); //숫자만 리턴
    const existingCartItem = state.items[existingCartItemIndex]; // item 자체를 리턴
    // console.log("기존에 동일한 아이템이 있는가?: ", existingCartItem);

    let updatedItems;
    // 추가한 아이템이 기존에 있는 아이템일 경우
    if(existingCartItem){
      const updatedItem = {
        ...existingCartItem,
        amount: existingCartItem.amount + action.item.amount,
      };
      updatedItems = [...state.items]; // 기존의 객체를 새 배열로
      updatedItems[existingCartItemIndex] = updatedItem; // 값을 더해준 기존 아이템 업데이트
    } else {
      // 추가한 아이템이 기존에 없는 아이템일 경우
      updatedItems = state.items.concat(action.item);
    }
    return {
      items: updatedItems,
      totalAmount: updatedTotalAmount,
    };
  }

  if(action.type === "REMOVE"){
    const existingCartItemIndex = state.items.findIndex(
      (item) => item.id === action.id
    );
    const existingCartItem = state.items[existingCartItemIndex];
    // 기존 아이템이 없을 경우는 undefined

    // console.log("기존에 동일한 아이템이 있는가?: ", existingCartItem);

    const updatedTotalAmount = state.totalAmount - existingCartItem.price;

    let updatedItems;
    // 추가한 아이템이 기존에 있는 아이템일 경우
    if(existingCartItem.amount === 1){
      // 1인 상태에서 빼주면 완전히 사라져야함.
      updatedItems = state.items.filter((item) => item.id !== action.id);
    } else {
      const updatedItem = {
        ...existingCartItem,
        amount: existingCartItem.amount - 1,
      };
      updatedItems = [...state.items]; // 기존의 객체를 새 배열로
      updatedItems[existingCartItemIndex] = updatedItem; // 뺀 값으로 업데이트
    }
    return {
      items: updatedItems,
      totalAmount: updatedTotalAmount,
    };
  }

  /* 
    switch(action.type) {
      case "ADD":
        return {
          items: state.items.concat(action.item),
          totalAmount: state.items.totalAmount + action.item.price * action.item.amount,
        }
    }
    return defaultCartState;
  */
};

// reducer 초기화 정의
const defaultCartState = {
  // 아래 두 개의 상태 관리(addItemToCartHandler로 상태관리)
  items: [], // 아이템이 들어있는 배열
  totalAmount: 0, // 총액
};

// 2
const CartProvider = (props) => {
  // useReducer 호출(선언)
  // dispatchCartAction은 cartReducer 함수에 action으로 보내는 역할을 함
  const [cartState, dispatchCartAction] = useReducer(cartReducer, defaultCartState);

  // 2-1
  const addItemToCartHandler = (item) => {
    // dispatchCartAction으로 요소들을 객체 형식으로 보냄(타입과 현재 아이템)
    // dispatchCartAction은 cartReducer 함수에 action으로 보내는 역할을 함
    dispatchCartAction({type: "ADD", item: item});
  };
  const removeItemToFromCartHandler = (id) => {
    dispatchCartAction({type: "REMOVE", id: id});
  };

  // 1
  // 업데이트 될 객체 - 다이나믹하게 변하는 부분(계속 변하는 부분)
  // items, totalAmount 두 개를 저장하는 것이 목적임. 나머지는 함수 정의.
  const cartContext = {
    items: cartState.items, // 아이템이 들어있는 배열
    totalAmount: cartState.totalAmount, // 총 갯수
    addItem: addItemToCartHandler,
    removeItem: removeItemToFromCartHandler,
  };

  return (
    // 1-1
    <CartContext.Provider value={cartContext}>
      {props.children}
    </CartContext.Provider>
  )
}

export default CartProvider