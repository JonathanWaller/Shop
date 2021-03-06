import React, { Component } from "react";
import axios from "axios";
import { connect } from "react-redux";
import { getStore } from "../../ducks/storeReducer";
import { addToCart } from "../../ducks/cartReducer";
import { Link } from "react-router-dom";
import Splash from "../Splash/Splash";
import StoreSkeleton from '../StoreSkeleton/StoreSkeleton';
import Links from "../Links/Links";
import "./Store.css";

class Store extends Component {
  constructor() {
    super();
    this.state = {};
  }

  componentDidMount() {
    this.props.getStore();
    axios.get("/api/session");
  }

  render() {
    let storeItems = this.props.storeReducer.items.map(item => {
      return (
        <div className="store_productWrapper" key={item.product_id}>
          <Link to={`/product/${item.product_id}`}>
            <div className="store_productText">
              <img src={item.product_img} className="store_productImg" alt="" />
              <h3>{item.product_name}</h3>
              <div>${item.product_price}</div>
            </div>
          </Link>
          <div className="store_addButtonWrapper">
            <button
              className="store_addButton"
              onClick={e => {
                this.props.addToCart(
                  item.product_id,
                  item.product_name,
                  item.product_price,
                  item.product_img,
                  item.product_quantity,
                  item.product_size,
                  item.product_category
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
        <div className="store_wrapper">
          {this.props.storeReducer.isLoading ? (
            <StoreSkeleton />
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
