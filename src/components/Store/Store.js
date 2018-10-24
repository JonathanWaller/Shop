import React, { Component } from "react";
import axios from "axios";
import { connect } from "react-redux";
import { getStore } from "../../ducks/storeReducer";
import { addToCart } from "../../ducks/cartReducer";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import Splash from "../Splash/Splash";
import Links from "../Links/Links";
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

  render() {
    let storeItems = this.props.storeReducer.items.map(item => {
      return (
        <div className="store_productWrapper" key={item.product_id}>
          <Link to={`/product/${item.product_id}`}>
            <div className="store_productText">
              <h3>{item.product_name}</h3>
              <div>${item.product_price}</div>
              <img src={item.product_img} className="store_productImg" alt="" />
            </div>
          </Link>
          <div className="store_addButtonWrapper">
            <button
              className="store_addButton"
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
          </div>
        </div>
      );
    });
    return (
      <div>
        <Splash />
        <Links />
        {/* <div className="store__linksWrapper">
          <div className="store__links">
            <Link to={"/category/shirt"}>
              <div id="store__link">Shirts</div>
            </Link>
            <Link to={"/category/pants"}>
              <div>Pants</div>
            </Link>
            <Link to={"/category/shoes"}>
              <div>Shoes</div>
            </Link>
            <Link to={"/category/technology"}>
              <div>More</div>
            </Link>
            <Link to="/sale">
              <div>Sale</div>
            </Link>
          </div>
        </div> */}
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
