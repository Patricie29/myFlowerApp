import NavBar from "./components/Layout/NavBar"
import AllFlowers from './components/Flowers/AllFlowers'
import ShoppingCart from "./components/ShoppingCart/ShoppingCart"
import CartProvider from "./store/CartProvider"
import Checkout from './components/ShoppingCart/Checkout'


import Footer from "./components/Layout/Footer"

import { useState } from 'react'


const App = () => {

  const [showCart, setShowCart] = useState(false)
  const [showCheckout, setShowCheckOut] = useState(false)

  return <CartProvider>
    <div className="neco">

      <NavBar setShowCart={setShowCart} />
      {showCart && <ShoppingCart setShowCart={setShowCart} setShowCheckOut={setShowCheckOut} />}
      {showCheckout && <Checkout setShowCheckOut={setShowCheckOut} showCheckout={showCheckout} />}

      <AllFlowers />
      <Footer />
    </div>

  </CartProvider>
}



export default App