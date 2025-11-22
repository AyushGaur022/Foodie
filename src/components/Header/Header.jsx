import React from "react";
import "./Header.css";
const Header = () => {
  return (
    <div className="header">
      <div className="header-contents">
        <h2>Order your favourite food here</h2>
        <p>
          Choose from our delightful menu featuring an array of dishes crafted
          with the finest ingredients. At Clermy Yep, our dining experience is
          designed to satisfy your taste, one decision at a time.
        </p>
        <button>View Menu</button>
      </div>
    </div>
  );
};

export default Header;
