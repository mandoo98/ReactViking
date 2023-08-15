import React from 'react'
import classes from './Header.module.css';
import mealsImg from '../../assert/mainImg.jpg';
// punblic에 놓고 일반 웹페이지에서 이미지 쓰듯이 사용할수도 있음
import HeaderCartButton from './HeaderCartButton';

const Header = (props) => {
  return (
    <>
      <header className={classes.header}>
        <h1>React Viking</h1>
        {/* onClick: props.이름 */}
        <HeaderCartButton onClick={props.onShowCart} />
      </header>
      <div className={classes["main-image"]}>
        {/* 클래스 이름에 '-'가 포함되어 있으면 .를 사용할 수 없음 */}
        <img src={mealsImg} alt="meals" />
      </div>
    </>
  )
}

export default Header;