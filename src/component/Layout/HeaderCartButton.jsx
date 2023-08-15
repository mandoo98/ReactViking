import React, { useContext, useEffect, useState } from 'react'
import CartIcon from '../Cart/CartIcon';
import classes from './HeaderCartButton.module.css';
import CartContext from '../../store/cart-context';

// useEffect(): 어떤 일이 발생할 때마다 실행되는 React hook

const HeaderCartButton = (props) => {
  const cartCtx = useContext(CartContext);
  // const numberOfCartItems = cartCtx.items.length; // = 아이템 숫자를 의미 -> 아이템 안의 amount를 합해줘야함.
  const [btnIsHigh, setBtnIsHigh] = useState(false); // 버튼 상태(애니메이션 적용 여부)
  const {items} = cartCtx; // 구조분해

  // Context에 배열이 바뀔 때 적용
  useEffect(() => {
    // 항목이 없을 때
    if(items.length === 0){
      return;
    }
    setBtnIsHigh(true);

    const timer = setTimeout(() => {
      setBtnIsHigh(false);
    }, 300);

    // 사이드이펙트 정리, 클린업 함수(눈에 보이지는 않지만, 코드적으로 데이터를 깔끔하게 정리함)
    return () => {
      clearTimeout(timer);
    };
  }, [items]);

  // 아이템에 변화가 있을 때만 bump 클래스가 들어감
  const btnClass = `${classes.button} ${btnIsHigh ? classes.bump : ""}`;

  const numberOfCartItems = items.reduce((sum, item) => {
    return (sum += item.amount);
  }, 0);
  // 위에서 구조분해 했기 때문에 cartCtx.items라고 안써도 됨
  // 배열.reduce((합해진 값, value) => {합해진 값 + value}, 합해진 값의 초기값);

  return (
    <button className={btnClass} onClick={props.onClick}>
      <span className={classes.icon}><CartIcon /></span>
      <span>Your Cart</span>
      <span className={classes.badge}>{numberOfCartItems}</span>
    </button>
  );
};

export default HeaderCartButton;