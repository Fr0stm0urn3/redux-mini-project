import { ChevronDown, ChevronUp } from "../icons"
import { useDispatch } from "react-redux"
import {
  removeItem,
  increase,
  decrease,
  calculateTotals,
} from "../features/cart/cartSlice"

const CartItem = ({ item }) => {
  const dispatch = useDispatch()

  return (
    <article className="cart-item">
      <img src={item.img} alt={item.title} />
      <div>
        <h4>{item.title}</h4>
        <h4 className="item-price">${item.price}</h4>
        <p>${item.price}</p>
        <button className="remove-btn" onClick={() => dispatch(removeItem(item.id))}>
          remove
        </button>
      </div>
      <div>
        <button
          className="amount-btn"
          onClick={() => {
            dispatch(increase(item.id))
          }}
        >
          <ChevronUp />
        </button>
        <p className="amount">{item.amount}</p>
        <button
          className="amount-btn"
          onClick={() => {
            if (item.amount === 1) {
              dispatch(removeItem(item.id))
              return
            }

            dispatch(decrease(item.id))
          }}
        >
          <ChevronDown />
        </button>
      </div>
    </article>
  )
}

export default CartItem
