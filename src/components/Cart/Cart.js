import React, { Component } from "react";
import { connect } from "react-redux";
import { getCart, removeFromCart, emptyCart } from "../../ducks/cartReducer";
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
      toggleSelect: false
    };
  }

  componentDidMount() {
    // let {cart_id, product_id, product_img, product_name, product_price, quantity} = this.props.cartReducer.cart
    this.props.getCart().then(response => {
      // console.log(response);
      this.setState({ cart: this.props.cartReducer.cart });
      // console.log(response);
    });

    // this.props.cartReducer.total +=
    // axios.get("/api/session").then(response => {
    //   console.log(response);
    //   this.setState({ cart: response.data.cart, total: response.data.total });
    // });
  }

  pantSizeHandler = (cartId, e, i) => {
    console.log(e.target.value);
    axios.put(`/api/size/${cartId}`, {
      product_size: e.target.value
    });
    // let name = e.target.name;
    // let newPantSize = this.state.pantSize.slice();
    // newPantSize[i][name] = +e.target.value;
    // this.setState({
    //   pantSize: newPantSize
    // });
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

  handleToggle = () => {
    this.setState({ toggleSelect: !this.state.toggleSelect });
  };

  render() {
    console.log("STATE: ", this.state);
    // console.log(this.props);
    let testNum = "30";
    let newNum = testNum.slice();
    // console.log(newNum);

    let myCart = this.state.cart.map((item, i) => {
      console.log(item);
      return (
        <div key={item.cart_id} className="cart_listItem">
          <img src={item.product_img} className="cart_itemImg" alt="" />
          <div>
            <div>{item.product_name}</div>
            {!this.state.toggleSelect ? (
              <div className="cart_sizeEditWrapper">
                <div>Size: {item.product_size}</div>
                <button onClick={() => this.handleToggle()}>Edit</button>
              </div>
            ) : (
              <p>No thanks</p>
              // <div>
              //   {item.product_category === "pants" ? (
              //     <select
              //       name="size"
              //       value={this.state.size}
              //       onChange={e => this.inputHandler(e)}
              //     >
              //       <option value="30x30">30x30</option>
              //       <option value="32x30">32x30</option>
              //       <option value="32x32">32x32</option>
              //       <option value="34x32">34x32</option>
              //       <option value="34x34">34x34</option>
              //     </select>
              //   ) : this.state.category === "shoes" ? (
              //     <select
              //       name="size"
              //       value={this.state.size}
              //       onChange={e => this.inputHandler(e)}
              //     >
              //       <option value="9.5">9.5</option>
              //       <option value="10">10</option>
              //       <option value="10.5">10.5</option>
              //       <option value="11">11</option>
              //       <option value="11.5">11.5</option>
              //       <option value="12">12</option>
              //     </select>
              //   ) : this.state.category === "shirt" ? (
              //     <select
              //       name="size"
              //       value={this.state.size}
              //       onChange={e => this.inputHandler(e)}
              //     >
              //       <option value="S">S</option>
              //       <option value="M">M</option>
              //       <option value="L">L</option>
              //       <option value="XL">XL</option>
              //     </select>
              //   ) : null}
              // </div>

              // <div>
              //   <div>Size:</div>
              //   <select
              //     name="pants"
              //     onChange={e => this.pantSizeHandler(item.cart_id, e, i)}
              //   >
              //     <option value="30x30">30x30</option>
              //     <option value="32x30">32x30</option>
              //     <option value="32x32">32x32</option>
              //     <option value="34x32">34x32</option>
              //     <option value="34x34">34x34</option>
              //   </select>
              //   <button onClick={() => this.handleToggle()}>Cancel</button>
              // </div>
            )}

            <div>Qty: {item.product_quantity}</div>

            <div>
              <div>Qty:</div>
              <select
                name="qty"
                value={this.state.cart[i].product_quantity}
                onChange={e => this.quantityHandler(item.cart_id, e, i)}
              >
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
              </select>
            </div>
            {/* <div>Qty: {item.quantity}</div> */}
            <button onClick={() => this.removeFromCart(item.cart_id)}>
              Remove
            </button>
            <button>Edit</button>
          </div>
          <div>${item.product_price}</div>
        </div>
      );
    });
    let total = this.props.cartReducer.cart.reduce(
      (total, elem) => (total += elem.product_price * elem.product_quantity),
      0
    );
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
                    <h1 id="cart_textColor" className="cart_summary">
                      Summary
                    </h1>
                    <h3 id="cart_textColor" className="cart_totalItems">
                      Total Items: {this.props.cartReducer.cart.length}
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
