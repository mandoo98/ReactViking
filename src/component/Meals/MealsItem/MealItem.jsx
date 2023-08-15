import React, { useContext } from 'react'
import classes from "./MealItem.module.css";
import MealItemForm from "./MealItemForm";
import CartContext from '../../../store/cart-context';

const MealItem = (props) => {
  const cartCtx = useContext(CartContext);
  const price = `$${props.price.toFixed(2)}`;
  // toFixed(n): 소수점 n번째 자리까지만 출력(반올림). 첫 번째 자리까지만 있으면 두 번째 자리는 0으로 출력.

  // 함수 정의
  // context에 전달하는 함수(amount : 수량)
  //  인자값은 MealItemForm에서 value를 받아옴

  const addToCartHandler = (amount) => {
    console.log("수량은?: ", amount);

    // 여기서 addItem을 가져와서 작동시킴
    cartCtx.addItem({
      id: props.id,
      name: props.name,
      amount: amount, //amount로 받아와서
      price: props.price
    });
  };

  return (
    <li className={classes.meal}>
      <div>
        <h3>{props.name}</h3>
        <div className={classes.description}>{props.description}</div>
        <div className={classes.price}>{price}</div>
      </div>
      <div>
        {/* mealItem에서 mealItemForm으로 보냄(props) */}
        <MealItemForm id={props.id} onAddToCart={addToCartHandler} />
      </div>
    </li>
  );
};

export default MealItem;