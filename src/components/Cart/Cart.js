import React, { Component } from "react";
import axios from "axios";
import { connect } from "react-redux";
import { getCart, removeFromCart, emptyCart } from "../../ducks/cartReducer";

import EditCartModal from "./EditCartModal/EditCartModal";
import CartSkeleton from './CartSkeleton';

import "./Cart.css";

class Cart extends Component {
  constructor() {
    super();
    this.state = {
      cart: [],
      total: 0,
      id: null,
      img: "",
      name: "",
      qty: null,
      price: null,
      size: null,
      category: "",
      defaultQty: 1,
      shirtSize: "M",
      pantSize: "30",
      shoeSize: 10,
      modalOpen: false,
      modalSize: null,
      modalQty: null
    };
  }

  componentDidMount() {
    this.props.getCart().then(response => {
      this.setState({ cart: this.props.cartReducer.cart });
    });
  }

  getMyCart = () => {
    this.props.getCart().then(response => {
      this.setState({ cart: this.props.cartReducer.cart });
    });
  };

  pantSizeHandler = (cartId, e, i) => {
    axios.put(`/api/size/${cartId}`, {
      product_size: e.target.value
    });
  };

  quantityHandler = (cartId, e, i) => {
    axios.put(`/api/quantity/${cartId}`, {
      product_quantity: +e.target.value
    });
  };

  removeFromCart = async id => {
    await Promise.all([
      this.props.removeFromCart(id),
      this.props.getCart().then(() => {
        this.setState({ cart: this.props.cartReducer.cart });
      })
    ]);
  };

  handleCheckout = id => {
    this.props.emptyCart(id);
    this.props.history.push("/confirmation");
  };

  render() {
    let needsSize = ["shoes", "shirt", "pants"];

    let myCart = this.state.cart.map((item, i) => {
      return (
        <div key={item.cart_id} className="cart_listItem">
          <img src={item.product_img} className="cart_itemImg" alt="" />
          <div>
            <div>{item.product_name}</div>

            <div className="cart_sizeEditWrapper">
              {needsSize.includes(item.product_category) ? (
                <div>Size: {item.product_size}</div>
              ) : null}
            </div>

            <div>Qty: {item.product_quantity}</div>
            <div className="quickWrapper">
              <button onClick={() => this.removeFromCart(item.cart_id)}>
                Remove
              </button>
              <EditCartModal
                cartId={item.cart_id}
                qty={item.product_quantity}
                size={item.product_size}
                category={item.product_category}
                productId={item.product_id}
                img={item.product_img}
                name={item.product_name}
                price={item.product_price}
                getMyCart={this.getMyCart}
              />
            </div>
          </div>
          <div>${item.product_price}</div>
        </div>
      );
    });
    let total = this.props.cartReducer.cart.reduce(
      (total, elem) => (total += elem.product_price * elem.product_quantity),
      0
    );

    let totalItems = this.props.cartReducer.cart.reduce(
      (total, elem) => (total += elem.product_quantity),
      0
    );
    
    return (
      <div>
        {
          this.props.cartReducer.isLoading 
          ? 
            <div
              className='cart_totalWrapper'
            >
              <CartSkeleton />
            </div>
         : 
         !this.props.cartReducer.cart.length
            ?
            <div className="cart__noItems">No Items in Cart</div>
            :
            <div className="cart_totalWrapper">
              <div className="cart_wrapper">
                
                <div className="cart_leftPanel">
                  <div className="cart_cartItems">
                    <h1 className="cart_title">Your Cart ({totalItems})</h1>
                    {myCart}
                  </div>
                </div>

                <div className="cart_rightPanel">
                  <div className="cart_rightInnerDiv">
                    <div className="cart_rightBody">
                      <h1 id="cart_textColor" className="cart_summary">
                        Summary
                      </h1>
                      <h3 id="cart_textColor" className="cart_totalItems">
                        <div>Total Items:</div>
                        <div>{totalItems}</div>
                      </h3>
                      <div id="cart_textColor" className="cart_totalPrice">
                        <div>Total:</div>
                        <div>${total}</div>
                      </div>
                      <button
                        onClick={() =>
                          this.handleCheckout(
                            this.props.cartReducer.cart[0].session_id
                          )
                        }
                        className="cart_checkoutButton"
                      >
                        Checkout
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
         }
      </div>
    );
  }
}

const mapStateToProps = state => state;

export default connect(
  mapStateToProps,
  { getCart, removeFromCart, emptyCart }
)(Cart);
