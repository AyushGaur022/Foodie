import React, { useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./PlaceOrder.css";
import { StoreContext } from "../../Context/StoreContext";

const PlaceOrder = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { setCartItems, user } = useContext(StoreContext);

  const { subtotal = 0, delivery = 0, total = 0 } = location.state || {};
  const handleSubmit = () => {
    // e.preventDefault()
    setCartItems({});
    navigate("/");
  };
  return (
    <>
      {user ? (
        <form className="place-order" onSubmit={handleSubmit}>
          <div className="place-order-left">
            <p className="title">Delivery Information</p>
            <div className="multi-fields">
              <input type="text" placeholder="First Name" required />
              <input type="text" placeholder="Last Name" required/>
            </div>
            <input type="text" placeholder="Email address" required />
            <input type="text" placeholder="Street" />
            <div className="multi-fields">
              <input type="text" placeholder="City" />
              <input type="text" placeholder="State" />
            </div>
            <div className="multi-fields">
              <input type="text" placeholder="Zip code" />
              <input type="text" placeholder="Country" />
            </div>
            <input type="text" placeholder="Phone" />
          </div>

          <div className="place-order-right">
            <div className="cart-total">
              <div className="cart-total-details">
                <p>Subtotal</p>
                <p>₹{subtotal}</p>
              </div>
              <hr />
              <div className="cart-total-details">
                <p>Delivery Fee</p>
                <p>₹{delivery}</p>
              </div>
              <hr />
              <div className="cart-total-details">
                <p>Total</p>
                <p>₹{total}</p>
              </div>
              <hr />
                
              <button type="button">
                PROCESS TO CHECKOUT
              </button>
            </div>
          </div>
        </form>
      ) : (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            height: "30vh",
            justifyContent: "center",
          }}
        >
          
          <h1 style={{ color: "orangered" }}>Please Login To CHECKOUT....</h1>
        </div>
      )}
    </>
  );
};

export default PlaceOrder;
