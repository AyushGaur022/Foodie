import React, { useContext } from "react";
import "./Cart.css";
import { StoreContext } from "../../Context/StoreContext";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const { cartItems, food_list, removeFromCart } = useContext(StoreContext);

  const totalAmount = food_list.reduce((acc, item) => {
    const quantity = cartItems[item._id] || 0;
    return acc + item.price * quantity;
  }, 0);

  const deliveryFee = totalAmount > 0 ? 100 : 0;
  const grandTotal = totalAmount + deliveryFee;
  const navigate = useNavigate();
  const subtotal = totalAmount;
  const delivery = deliveryFee;
  const total = grandTotal;

  return (
    <div className="cart-container">
      <h2>Cart</h2>
      <div className="cart-table-wrapper">
        <table className="cart-table">
          <thead>
            <tr>
              <th>Image</th>
              <th>Title</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Total</th>
              <th>Remove</th>
            </tr>
          </thead>
          <tbody>
            {food_list.map((item) => {
              const quantity = cartItems[item._id] || 0;
              if (!quantity) return null;
              return (
                <tr key={item._id}>
                  <td>
                    <img src={item.image} alt={item.name} />
                  </td>
                  <td>{item.name}</td>
                  <td>₹{item.price}</td>
                  <td>{quantity}</td>
                  <td>₹{item.price * quantity}</td>
                  <td>
                    <button
                      className="remove-btn"
                      onClick={() => removeFromCart(item._id)}
                    >
                      x
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="cart-footer">
        <div className="cart-totals">
          <h3>Cart Totals</h3>
          <div className="total-row">
            <p>Subtotal</p>
            <p>₹{totalAmount}</p>
          </div>
          <div className="total-row">
            <p>Delivery Fee</p>
            <p>₹{deliveryFee}</p>
          </div>
          <div className="total-row total-bold">
            <p>Total</p>
            <p>₹{grandTotal}</p>
          </div>
          {totalAmount>0 && <button
            className="checkout-btn"
            onClick={() =>
              navigate("/order", {
                state: {
                  subtotal,
                  delivery,
                  total,
                },
              })
            }
          >
            PROCEED TO CHECKOUT
          </button>}
          
        </div>

        <div className="promo-section">
          <p>If you have a promo code, Enter it here</p>
          <div className="promo-input-wrapper">
            <input type="text" placeholder="promo code" />
            <button>Submit</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
