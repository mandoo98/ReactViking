// modal 팝업 안에 들어갈 내용
import React, { useContext, useState } from 'react'
import classes from './Cart.module.css';
import Modal from '../UI/Modal';
import CartContext from '../../store/cart-context';
import Checkout from './Checkout';

const Cart = (props) => {
  const [isCheckout, setIsCheckout] = useState(false); //주문시 주소 보이게/안보이게
  const cartCtx = useContext(CartContext);
  const hasItems = cartCtx.items.length > 0; // 장바구니에 항목이 있을 경우
  const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;

  const cartItemRemoveHandler = (id) => {
    cartCtx.removeItem(id);
  };
  const cartItemAddHandler = (item) => {
    cartCtx.addItem({...item, amount: 1});
  }

  // 계속 변화하는 값
  const cartItem = (
    <ul className={classes["cart-items"]}>
      {/* li를 map으로 돌림 */}
      {cartCtx.items.map((item) => (
        <li key={item.id}>
          <div>
            <h2>{item.name}</h2>
            <div>
              <span className={classes.price}>{`$${item.price.toFixed(2)}`}</span>
              <span className={classes.amount}>x {item.amount}</span>
            </div>
          </div>
          <div className={classes.btns}>
            <button onClick={() => cartItemRemoveHandler(item.id)}>-</button>
            <button onClick={() => cartItemAddHandler(item)}>+</button>
          </div>
        </li>
      ))}
    </ul>
  );

  // orderHandler 함수 정의
  // order 버튼을 클릭하면 setIsCheckout이 발동되어 input창이 보이도록 함
  const orderHandler = () => {setIsCheckout(true);};

  // submitOrderHandler 함수 정의
  // 입력한 데이터를 firebase에 보내는 함수
  const submitOrderHandler = (userData) => {
    // Cart.jsx에서 props로 input에 입력한 값을 받아옴
    console.log("userData: ", userData);
  };

  // 버튼 부분을 가져와서 상수로
  const modalActions = (
    <div className={classes.action}>
      <button className={classes["button-outline"]} onClick={props.onClose}>Close</button>
      {/* hasItems가 true일 때만 Order 버튼이 보이게 */}
      {hasItems && (
        <button className={classes.button} onClick={orderHandler}>Order</button>
      )}
    </div>
  )

  return (
    // modal 안에 모든 내용을 집어넣음
    <Modal onClose={props.onClose}>
      <div>
        {cartItem}
        <div className={classes.total}>
          <span>Total Amount</span>
          <span>{totalAmount}</span>
        </div>

        {/* Order 버튼을 클릭했을 때만 나타나게 */}
        {isCheckout && (
          <Checkout onClick={props.onClose} onConfirm={submitOrderHandler} />
        )}
        {!isCheckout && modalActions}
      </div>
    </Modal>
  );
};

export default Cart;