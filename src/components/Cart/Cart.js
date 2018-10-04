import React, { Component } from "react";
import { connect } from "react-redux";
import { getCart, removeFromCart } from "../../ducks/cartReducer";
import "./Cart.css";
import axios from "axios";

class Cart extends Component {
  constructor() {
    super();
    this.state = {};
  }

  componentDidMount() {
    // this.props.getCart();
    axios.get("/api/session").then(response => {
      console.log(response);
    });
  }

  handleCheckout = () => {
    axios.post("/api/logout");
  };

  render() {
    console.log(this.props);
    let myCart = this.props.cartReducer.cart.map(item => {
      return (
        <div key={item.cart_id}>
          <div>{item.product_name}</div>
          <div>${item.product_price}</div>
          <img src={item.product_img} className="cart_itemImg" alt="" />
          <div>
            <div>Qty: {item.quantity}</div>
            <button>Update Qty</button>
          </div>
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
        {this.props.cartReducer.isLoading ? (
          <img
            src="https://payload345.cargocollective.com/1/18/582678/9219397/loading-ttcredesign.gif"
            alt=""
          />
        ) : null}
        {myCart}
        <button onClick={this.handleCheckout}>Checkout</button>
      </div>
    );
  }
}

const mapStateToProps = state => state;

export default connect(
  mapStateToProps,
  { getCart, removeFromCart }
)(Cart);
