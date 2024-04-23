import CartContainer from "./components/CartContainer"
import Navbar from "./components/Navbar"
import { useSelector, useDispatch } from "react-redux"
import { useEffect } from "react"
import { calculateTotals } from "./features/cart/cartSlice"
import Modal from "./components/Modal"

const App = () => {
  const cartItems = useSelector((state) => state.cart.cartItems)
  const isOpen = useSelector((state) => state.modal.isOpen)
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(calculateTotals())
  }, [cartItems])

  return (
    <main>
      {isOpen && <Modal />}
      <Navbar />
      <CartContainer />
    </main>
  )
}

export default App
