import React, { Component } from "react";
import axios from "axios";
import { connect } from "react-redux";
import { getStore } from "../../ducks/storeReducer";
import { addToCart } from "../../ducks/cartReducer";
import "./Store.css";

class Store extends Component {
  constructor() {
    super();
    this.state = {};
  }

  componentDidMount() {
    this.props.getStore();
  }

  addHandler = (id, name, price, img) => {
    axios.post("/api/items", { id, name, price, img });
  };

  render() {
    console.log(this.props);
    let storeItems = this.props.storeReducer.items.map(item => {
      return (
        <div key={item.product_id}>
          <h3>{item.product_name}</h3>
          <div>${item.product_price}</div>
          <img src={item.product_img} className="store_productImg" />
          <div>
            <button
              //   onClick={() =>
              //     this.addHandler(
              //       item.product_id,
              //       item.product_name,
              //       item.product_price,
              //       item.product_img
              //     )
              //   }
              onClick={() =>
                this.props.addToCart(
                  item.product_id,
                  item.product_name,
                  item.product_price,
                  item.product_img
                )
              }
            >
              Add To Cart
            </button>
          </div>
        </div>
      );
    });
    return (
      <div>
        {this.props.storeReducer.isLoading ? (
          <img src="https://payload345.cargocollective.com/1/18/582678/9219397/loading-ttcredesign.gif" />
        ) : null}
        <p>Heyyy from the STORE</p>
        {storeItems}
      </div>
    );
  }
}

const mapStateToProps = state => state;

export default connect(
  mapStateToProps,
  { getStore, addToCart }
)(Store);
