import CartContainer from "./components/CartContainer"
import Navbar from "./components/Navbar"
import { useSelector, useDispatch } from "react-redux"
import { useEffect } from "react"
import { calculateTotals, fetchCartItems } from "./features/cart/cartSlice"
import Modal from "./components/Modal"

const App = () => {
  const { cartItems, isLoading } = useSelector((state) => state.cart)
  const isOpen = useSelector((state) => state.modal.isOpen)
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(calculateTotals())
  }, [cartItems])

  useEffect(() => {
    dispatch(fetchCartItems())
  }, [])

  if (isLoading) {
    return (
      <div className="loading">
        <h1>Loading...</h1>
      </div>
    )
  }

  return (
    <main>
      {isOpen && <Modal />}
      <Navbar />
      <CartContainer />
    </main>
  )
}

export default App
