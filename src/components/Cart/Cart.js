import React, { Component } from "react";
import { connect } from "react-redux";
import { getCart, removeFromCart, emptyCart } from "../../ducks/cartReducer";
// import ReactModal from "react-modal";
import EditCartModal from "./EditCartModal/EditCartModal";
import "./Cart.css";
import axios from "axios";

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
    console.log("HOWDY");
    this.props.getCart().then(response => {
      // console.log(response);
      this.setState({ cart: this.props.cartReducer.cart });
      // console.log(response);
    });
  }

  getMyCart = () => {
    console.log("YAHOOOOO");
    this.props.getCart().then(response => {
      console.log(response);
      this.setState({ cart: this.props.cartReducer.cart });
    });
    // this.forceUpdate();
  };

  pantSizeHandler = (cartId, e, i) => {
    console.log(e.target.value);
    axios.put(`/api/size/${cartId}`, {
      product_size: e.target.value
    });
  };

  quantityHandler = (cartId, e, i) => {
    console.log(e.target.value);
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
    console.log("STATE: ", this.state);
    console.log(this.props);

    let myCart = this.state.cart.map((item, i) => {
      // console.log(item);
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
    console.log(totalItems);
    // console.log("MYTOTAL: ", total);
    return (
      <div>
        {this.props.cartReducer.isLoading ? (
          <img
            src="https://payload345.cargocollective.com/1/18/582678/9219397/loading-ttcredesign.gif"
            alt=""
          />
        ) : null}
        {!this.props.cartReducer.cart.length ? (
          "No Items in Cart"
        ) : (
          <div className="cart_totalWrapper">
            <div className="cart_wrapper">
              <div className="cart_leftPanel">
                <div className="cart_cartItems">
                  <h1 className="cart_title">Your Cart ({totalItems})</h1>
                  {myCart}
                </div>
              </div>
              {/* <button onClick={this.handleCheckout}>Checkout</button> */}
              <div className="cart_rightPanel">
                <div className="cart_rightInnerDiv">
                  <div className="cart_rightBody">
                    <h1 id="cart_textColor" className="cart_summary">
                      Summary
                    </h1>
                    <h3 id="cart_textColor" className="cart_totalItems">
                      Total Items: {totalItems}
                    </h3>
                    <div id="cart_textColor" className="cart_totalPrice">
                      Total: ${total}
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
        )}
      </div>
    );
  }
}

const mapStateToProps = state => state;

export default connect(
  mapStateToProps,
  { getCart, removeFromCart, emptyCart }
)(Cart);
