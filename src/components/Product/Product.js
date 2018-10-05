import React, { Component } from "react";
import { connect } from "react-redux";
import { getProduct } from "../../ducks/productReducer";
import { addToCart } from "../../ducks/cartReducer";

import axios from "axios";
//import './Product.css';

class Product extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.props.getProduct(this.props.match.params.id).then(response => {
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

  render() {
    console.log(this.props);
    let { product } = this.props.productReducer;
    let myProduct = product.map(elem => {
      return (
        <div key={elem.product_id}>
          <div>{elem.product_name}</div>
          <div>${elem.product_price}</div>
          <img
            src={elem.product_img}
            alt={elem.product_name}
            style={{ height: 50, width: 50 }}
          />
          <div>{elem.product_description}</div>
          <button
            onClick={() =>
              this.props.addToCart(
                elem.product_id,
                elem.product_name,
                elem.product_price,
                elem.product_img,
                1
              )
            }
          >
            Add to Cart
          </button>
        </div>
      );
    });
    return <div className="">{myProduct}</div>;
  }
}

const mapStateToProps = state => state;

export default connect(
  mapStateToProps,
  { getProduct, addToCart }
)(Product);
