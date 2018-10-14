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
      price: null
    };
  }

  componentDidMount() {
    // console.log("eagle has landed");
    // let {cart_id, product_id, product_img, product_name, product_price, quantity} = this.props.cartReducer.cart
    this.props.getCart().then(response => {
      console.log(response);
      this.setState({ cart: this.props.cartReducer.cart });
      // console.log(response);
    });

    // this.props.cartReducer.total +=
    // axios.get("/api/session").then(response => {
    //   console.log(response);
    //   this.setState({ cart: response.data.cart, total: response.data.total });
    // });
  }

  // handleCheckout = () => {
  //   axios.delete("/api/cart").then(() => {
  //     this.props.getCart();
  //   });
  //   this.props.history.push("/confirmation");
  // };

  // toggleLiked = async ind => {
  //   await Promise.all([
  //     this.props.getProperties(),
  //     this.props.getReviews(),
  //     this.props.getAvgRating(),
  //     this.props.getFavorites(this.props.user.userid)
  //   ]);
  // };

  // editHandler = async id => {
  //   await Promise.all([
  //     axios.put(`/api/property/${id}`, {
  //       property_title: this.state.title,
  //       // property_location: this.state.location,
  //       beds: this.state.beds,
  //       baths: this.state.baths,
  //       description: this.state.description,
  //       amen_1: this.state.amen1,
  //       amen_2: this.state.amen2,
  //       amen_3: this.state.amen3,
  //       price: this.state.rate,
  //       // firebaseImg: this.state.firebaseImg
  //       image_url: this.state.firebaseImg
  //     }),
  //     this.props.getProperties(),
  //     this.props.history.replace(`/property/${this.props.property.id}`)
  //   ]);
  // };

  removeFromCart = async id => {
    await Promise.all([
      this.props.removeFromCart(id),
      this.props.getCart().then(() => {
        this.setState({ cart: this.props.cartReducer.cart });
      })
    ]);
  };

  // removeFromCart = id => {
  //   this.props.removeFromCart(id).then(response => {
  //     this.props.getCart().then(() => {
  //       this.setState({ cart: this.props.cartReducer.cart });
  //     });
  //   });
  // };

  handleCheckout = id => {
    this.props.emptyCart(id);
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

    let myCart = this.state.cart.map(item => {
      // let myCart = this.props.cartReducer.cart.map(item => {
      return (
        <div key={item.cart_id} className="cart_listItem">
          <img src={item.product_img} className="cart_itemImg" alt="" />
          <div>
            <div>{item.product_name}</div>
            {item.product_size === null ? null : (
              <div>Size: {item.product_size}</div>
            )}
            {/* <form>
              Size:
              <input type="number" name="size" min="30" max="36" />
            </form> */}
            <select>
              <option>30</option>
              <option>32</option>
              <option>34</option>
            </select>
            <div>Qty: {item.quantity}</div>
            <button onClick={() => this.removeFromCart(item.cart_id)}>
              Remove
            </button>
            {/* <button onClick={() => this.props.removeFromCart(item.cart_id)}>
              Remove
            </button> */}
            <button>Edit</button>
          </div>
          <div>${item.product_price}</div>
        </div>
      );
    });
    let total = this.props.cartReducer.cart.reduce(
      (total, elem) => (total += elem.product_price * elem.quantity),
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
