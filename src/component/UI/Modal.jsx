// modal 팝업창
import React from 'react'
import ReactDOM from 'react-dom';
import classes from './Modal.module.css'

// modal 뒤 까만 반투명
const Backdrop = (props) => {
  return <div className={classes.backdrop} onClick={props.onClose}></div>
}

// 실제 modal(가운데 하얀 사각 영역)
const ModalOverlay = (props) => {
  return (
    <div className={classes.modal}>
      <div>{props.children}</div>
    </div>
  )
};

// portal을 출력할 위치를 가져옴
const portalElement = document.getElementById('overlay');

const Modal = (props) => {
  return (
    <div>
      {/* 
        {ReactDOM.createPortal(<Backdrop onClose={props.onClose} />, portalElement)}
        {ReactDOM.createPortal(<ModalOverlay>{props.children}</ModalOverlay>, portalElement)}
      */}
      {ReactDOM.createPortal(<Backdrop onClose={props.onClose} />, portalElement)}
      {ReactDOM.createPortal(<ModalOverlay>{props.children}</ModalOverlay>, portalElement)}
    </div>
  )
}

export default Modal;
// createPortal(child(자식요소), container(포탈이름))
