import React, { useState, useRef } from 'react';
import classes from './Checkout.module.css';

// 입력양식 유효성 검사
const isEmpty = (value) => value.trim() === ""; // 내용이 비어있는지 확인
const isElevenChar = (value) => value.trim().length === 11; // 11 글자인지

const Checkout = (props) => {
  // 들어갈 내용들 정의(오브젝트 형태)
  const [formInputsValidity, setFormInputsValidity] = useState({
    name: true,
    address: true,
    tel: true
  });

  const nameInputRef = useRef();
  const addressInputRef = useRef();
  const telInputRef = useRef();

  // 입력한 데이터를 백엔드에 넘겨주는 함수
  const confirmHandler = (e) => {
    e.preventDefault();

    // 입력값을 받아오는 변수 정의
    const enteredName = nameInputRef.current.value;
    const enteredAddress = addressInputRef.current.value;
    const enteredTel = telInputRef.current.value;

    // 각 input이 비어있지 않음을 확인
    const enteredNameValid = !isEmpty(enteredName);
    const enteredAddressValid = !isEmpty(enteredAddress);
    const enteredTelValid = !isEmpty(enteredTel) && isElevenChar(enteredTel) && Number(enteredTel);

    // 하나라도 비어있는 input이 있으면 false
    const formIsValid = enteredNameValid && enteredAddressValid && enteredTelValid; // formIsValid = true

    setFormInputsValidity({
      name: enteredNameValid,
      address: enteredAddressValid,
      tel: enteredTelValid
    })

    // 검증
    if(!formIsValid) {return}

    // 검증 후 데이터를 Cart.jsx로 넘겨줌
    props.onConfirm({
      name: enteredName,
      address: enteredAddress,
      tel: enteredTel
    })
  }

  const addressControlClass = `${classes.control} ${formInputsValidity.address? "" : classes.invalid}`;
  const telControlClass = `${classes.control} ${formInputsValidity.tel? "" : classes.invalid}`;

  return (
    <form className={classes.form} onSubmit={confirmHandler}>
      {/* order 버튼을 누르면 나타나게 함 */}
      <div className={`${classes.control} ${formInputsValidity.name? "" : classes.invalid}`}>
        <label htmlFor="name">이름</label>
        <input type="text" id='name' ref={nameInputRef} />
        {/* 이름을 안적었을 때 나타나게. formInputsValidity가 false일 때 */}
        {!formInputsValidity.name && <p>이름을 입력해주세요</p>}
      </div>
      
      <div className={addressControlClass}>
        <label htmlFor="address">주소</label>
        <input type="text" id='address' ref={addressInputRef} />
        {!formInputsValidity.name && <p>주소를 입력해주세요</p>}
      </div>

      <div className={telControlClass}>
        <label htmlFor="tel">핸드폰 번호(숫자만 11자리 입력하세요)</label>
        <input type="text" id='tel' ref={telInputRef} />
        {!formInputsValidity.name && <p>핸드폰 번호를 입력해주세요(숫자만 11자리)</p>}
      </div>

      <div className={classes.action}>
        <button className={classes["button-outline"]} onClick={props.onClick}>Cancel</button>
        {/* 입력 시 백엔드에 데이터를 넘기는 버튼. form에 onSubmit에서 작동 */}
        <button className={classes.button}>Confirm</button>
      </div>
    </form>
  );
};

export default Checkout;