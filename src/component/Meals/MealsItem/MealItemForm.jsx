import React, { useRef } from 'react'
import Input from '../../UI/Input';
import classes from './MealItemForm.module.css';

const MealItemForm = (props) => {
  // ref를 통해서 입력된 값을 받아옴(특정 DOM을 선택할 때 사용)
  const amountInputRef = useRef();

  const submitHandler = (e) => {
    e.preventDefault();
    const enteredAmount = amountInputRef.current.value; // string
    // const enteredAmountNumber = Number(enteredAmount); // number
    const enteredAmountNumber = +enteredAmount; // number(숫자열로 변경)

    // console.log(typeof enteredAmountNumber);
    // 수량을 onAddToCart의 인자값으로 받아 MealItem에 넘겨줌
    props.onAddToCart(enteredAmountNumber);

    /* 
      // 유효성 검사
      // 공백이 있는가
      if (enteredAmount.trim().length === 0 || enteredAmount < 1 || enteredAmount > 5){
        return;
      }
    */
  };

  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <Input 
        label="Amount"
        propsRef={amountInputRef} //props
        input={{
          id: "amount_" + props.id,
          type: "number",
          min: "1",
          max: "5",
          defaultValue: "1",
          step: "1"
        }}
      />
      {/* <input
        type="number"
        min="1"
        max="5"
        defaultValue="1"
        step="1"
        id={props.id}
      /> */}
      <button>+ Add</button>
    </form>
  )
}

export default MealItemForm;