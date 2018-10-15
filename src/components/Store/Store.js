import React, { Component } from "react";
import axios from "axios";
import { connect } from "react-redux";
import { getStore } from "../../ducks/storeReducer";
import { addToCart } from "../../ducks/cartReducer";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "./Store.css";
// import axios from "axios";

class Store extends Component {
  notify = () => toast("Item added to cart");
  constructor() {
    super();
    this.state = {};
  }

  componentDidMount() {
    this.props.getStore();
    axios.get("/api/session").then(response => {
      // console.log(response);
    });
  }

  // addHandler = ({ id, name, price, img, qty }) => {
  //   axios.post("/api/items", {
  //     id,
  //     name,
  //     price,
  //     img,
  //     qty
  //   });
  // };

  // goToProduct = () => {
  //   this.props.history.push(
  //     `/product/${this.props.storeReducer.items.product_id}`
  //     // {`/product/${this.props.storeReducer.items.product_id}`}
  //   );
  // };

  render() {
    console.log(this.props);
    console.log(this.props.storeReducer);
    let storeItems = this.props.storeReducer.items.map(item => {
      console.log(item);
      // console.log(item.product_size === null);
      return (
        <div className="store_productWrapper" key={item.product_id}>
          <Link to={`/product/${item.product_id}`}>
            <div className="store_productText">
              <h3>{item.product_name}</h3>
              <div>${item.product_price}</div>
              {item.product_size === null ? null : (
                <div>Size: {item.product_size}</div>
              )}
              <img src={item.product_img} className="store_productImg" alt="" />
            </div>
          </Link>
          <div className="store_addButtonWrapper">
            <button
              className="store_addButton"
              // onClick={() =>
              //   this.addHandler({
              //     id: item.product_id,
              //     name: item.product_name,
              //     price: item.product_price,
              //     img: item.product_img,
              //     qty: 1
              //   })
              // }
              onClick={e => {
                this.props
                  .addToCart(
                    item.product_id,
                    item.product_name,
                    item.product_price,
                    item.product_img,
                    item.product_quantity,
                    item.product_size,
                    item.product_category
                  )
                  .then(() =>
                    toast.success("Added to cart", {
                      position: toast.POSITION.TOP_RIGHT
                    })
                  );
              }}
            >
              Add To Cart
            </button>
            {/* <ToastContainer /> */}
          </div>
          {/* </div> */}
          {/* </Link> */}
        </div>
      );
    });
    return (
      <div>
        <ToastContainer position="top-right" autoClose={5000} />
        <div className="store_wrapper">
          {this.props.storeReducer.isLoading ? (
            <img
              src="https://payload345.cargocollective.com/1/18/582678/9219397/loading-ttcredesign.gif"
              alt=""
            />
          ) : null}

          {storeItems}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => state;

export default connect(
  mapStateToProps,
  { getStore, addToCart }
)(Store);
