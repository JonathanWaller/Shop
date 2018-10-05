import React, { Component } from "react";
import axios from "axios";
import { connect } from "react-redux";
import { getStore } from "../../ducks/storeReducer";
import { addToCart } from "../../ducks/cartReducer";
import { Link } from "react-router-dom";
import "./Store.css";
// import axios from "axios";

class Store extends Component {
  constructor() {
    super();
    this.state = {};
  }

  componentDidMount() {
    this.props.getStore();
    axios.get("/api/session").then(response => {
      console.log(response);
    });
  }

  addHandler = ({ id, name, price, img, qty }) => {
    axios.post("/api/items", {
      id,
      name,
      price,
      img,
      qty
    });
  };

  goToProduct = () => {};

  render() {
    console.log(this.props);
    let storeItems = this.props.storeReducer.items.map(item => {
      return (
        <Link to={`/product/${item.product_id}`} key={item.product_id}>
          <div className="store_productWrapper" onClick={this.goToProduct}>
            <h3>{item.product_name}</h3>
            <div>${item.product_price}</div>
            <img src={item.product_img} className="store_productImg" alt="" />
            <div>
              <button
                // onClick={() =>
                //   this.addHandler({
                //     id: item.product_id,
                //     name: item.product_name,
                //     price: item.product_price,
                //     img: item.product_img,
                //     qty: 1
                //   })
                // }
                onClick={() =>
                  this.props.addToCart(
                    item.product_id,
                    item.product_name,
                    item.product_price,
                    item.product_img,
                    1
                  )
                }
              >
                Add To Cart
              </button>
            </div>
          </div>
        </Link>
      );
    });
    return (
      <div className="store_wrapper">
        {this.props.storeReducer.isLoading ? (
          <img
            src="https://payload345.cargocollective.com/1/18/582678/9219397/loading-ttcredesign.gif"
            alt=""
          />
        ) : null}

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
