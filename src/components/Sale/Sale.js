import React, { Component } from "react";
import Splash from "../Splash/Splash";
import Links from "../Links/Links";
import axios from "axios";
import { connect } from "react-redux";
import { getSale } from "../../ducks/storeReducer";
import { addToCart } from "../../ducks/cartReducer";
import { Link } from "react-router-dom";

class Sale extends Component {
  constructor() {
    super();
    this.state = {};
  }

  componentDidMount() {
    this.props.getSale().then(response => {
      console.log(response);
    });
  }

  render() {
    console.log(this.props);
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
  { getSale, addToCart }
)(Sale);
