import React, { Component } from "react";
import { connect } from "react-redux";
import { getCart, removeFromCart } from "../../ducks/cartReducer";
import "./Cart.css";

class Cart extends Component {
  constructor() {
    super();
    this.state = {};
  }

  componentDidMount() {
    this.props.getCart();
  }

  render() {
    console.log(this.props);
    let myCart = this.props.cartReducer.cart.map(item => {
      return (
        <div key={item.cart_id}>
          <div>{item.product_name}</div>
          <div>${item.product_price}</div>
          <img src={item.product_img} className="cart_itemImg" />
          <div>
            <button onClick={() => this.props.removeFromCart(item.cart_id)}>
              Remove
            </button>
          </div>
        </div>
      );
    });
    return (
      <div>
        <p>hey from Cart</p>
        {myCart}
      </div>
    );
  }
}

const mapStateToProps = state => state;

export default connect(
  mapStateToProps,
  { getCart, removeFromCart }
)(Cart);