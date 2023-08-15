import { useState } from 'react'
import './App.css'
import Cart from './component/Cart/Cart';
import Header from './component/Layout/Header';
import Meals from './component/Meals/Meals';
import CartProvider from './store/CartProvider';

function App() {
  // cart modal창의 유무 관리
  const [cartInShow, setCartInShow] = useState(false);

  // cart modal 보이게하는 함수
  const showCartHandler = () => {
    setCartInShow(true)
  }

  // cart modal 안보이게하는 함수
  const hideCartHandler = () => {
    setCartInShow(false)
  }

  return (
    // CartProvider 태그 안에서 cart-context의 내용을 전부 갱신/삭제/추가할 수 있음
    <CartProvider>
      {cartInShow && <Cart onClose={hideCartHandler} />}
      {/* cartInShow가 ture일 때만 modal이 보임 */}
      <Header onShowCart={showCartHandler} />
      <main>
        <Meals />
      </main>
    </CartProvider>
  )
}

export default App