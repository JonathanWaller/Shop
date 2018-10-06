import React, { Component } from "react";
import { connect } from "react-redux";
import { getCart, removeFromCart } from "../../ducks/cartReducer";
import "./Cart.css";
import axios from "axios";

class Cart extends Component {
  constructor() {
    super();
    this.state = {
      cart: [],
      total: 0
    };
  }

  componentDidMount() {
    this.props.getCart();
    // this.props.cartReducer.total +=
    // axios.get("/api/session").then(response => {
    //   console.log(response);
    //   this.setState({ cart: response.data.cart, total: response.data.total });
    // });
  }

  handleCheckout = () => {
    this.props.history.push("/confirmation");
  };

  // handleCheckout = () => {
  //   axios.post("/api/logout");
  //   axios.get("/api/session").then(response => {
  //     this.setState({ cart: response.data });
  //   });
  // };

  render() {
    console.log("STATE: ", this.state);
    console.log(this.props);

    // let myCart =
    //   this.state.cart.length &&
    //   this.state.cart.map(elem => {
    //     return (
    //       <div key={elem.id}>
    //         <div>{elem.name}</div>
    //         <div>${elem.price}</div>
    //         <img src={elem.img} style={{ height: 45, width: 45 }} />
    //       </div>
    //     );
    //   });

    let myCart = this.props.cartReducer.cart.map(item => {
      return (
        <div key={item.cart_id} className="cart_listItem">
          <img src={item.product_img} className="cart_itemImg" alt="" />
          <div>
            <div>{item.product_name}</div>
            <div>Qty: {item.quantity}</div>
            <button onClick={() => this.props.removeFromCart(item.cart_id)}>
              Remove
            </button>
            <button>Update Qty</button>
          </div>
          <div>${item.product_price}</div>
        </div>
      );
    });
    let total = this.props.cartReducer.cart.reduce(
      (total, elem) => (total += elem.product_price * elem.quantity),
      0
    );
    console.log("MYTOTAL: ", total);
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
                  <h1 className="cart_title">
                    Your Cart ({this.props.cartReducer.cart.length})
                  </h1>
                  {myCart}
                </div>
              </div>
              {/* <button onClick={this.handleCheckout}>Checkout</button> */}
              <div className="cart_rightPanel">
                <div className="cart_rightInnerDiv">
                  <div className="cart_rightBody">
                    <h1 id="cart_textColor">Summary</h1>
                    <h3 id="cart_textColor">
                      Total Items: {this.props.cartReducer.cart.length}
                    </h3>
                    <div id="cart_textColor">
                      Total:$
                      {total}
                    </div>
                    <button onClick={this.handleCheckout}>Checkout</button>
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
  { getCart, removeFromCart }
)(Cart);
