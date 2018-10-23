import React, { Component } from "react";
import { connect } from "react-redux";
import { getProduct } from "../../ducks/productReducer";
import { addToCart } from "../../ducks/cartReducer";

import "./Product.css";

import axios from "axios";
//import './Product.css';

class Product extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: null,
      name: "",
      price: null,
      img: "",
      qty: null,
      description: "",
      size: "",
      category: ""
    };
  }

  componentDidMount() {
    this.props.getProduct(this.props.match.params.id).then(response => {
      // console.log(response);
      this.setState({
        id: this.props.productReducer.product[0].product_id,
        name: this.props.productReducer.product[0].product_name,
        price: this.props.productReducer.product[0].product_price,
        img: this.props.productReducer.product[0].product_img,
        description: this.props.productReducer.product[0].product_description,
        size: this.props.productReducer.product[0].product_size,
        category: this.props.productReducer.product[0].product_category,
        qty: this.props.productReducer.product[0].product_quantity
      });
    });
  }

  inputHandler = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

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
    // console.log(this.props);
    let needsSize = ["shoes", "shirt", "pants"];
    console.log(this.state);
    let { id, name, price, img, qty, description, size, category } = this.state;
    return (
      <div className="product_wrapper">
        {!this.props.productReducer.product.length ? (
          <img
            src="https://payload345.cargocollective.com/1/18/582678/9219397/loading-ttcredesign.gif"
            alt="loading"
          />
        ) : null}
        {/* {myProduct} */}
        {/* <div className="product_innerWrapper"> */}
        <div className="product_leftPanel">
          <img
            className="product_image"
            src={img}
            style={{ height: 400 }}
            alt="product"
          />
        </div>
        <div className="product_rightPanel">
          <div className="product_name">{name}</div>
          <div>{description}</div>
          {/* <div>Size: {size}</div> */}
          <div>
            {/* {this.state.category === "pants" ||
            this.state.category === "shoes" ||
            this.state.category === "shirt" ? (
              <div>Size:</div>
            ) : null} */}
            {needsSize.includes(this.state.category) ? <div>Size:</div> : null}

            {this.state.category === "pants" ? (
              <select
                name="size"
                value={this.state.size}
                onChange={e => this.inputHandler(e)}
              >
                <option value="30x30">30x30</option>
                <option value="32x30">32x30</option>
                <option value="32x32">32x32</option>
                <option value="34x32">34x32</option>
                <option value="34x34">34x34</option>
              </select>
            ) : this.state.category === "shoes" ? (
              <select
                name="size"
                value={this.state.size}
                onChange={e => this.inputHandler(e)}
              >
                <option value="9.5">9.5</option>
                <option value="10">10</option>
                <option value="10.5">10.5</option>
                <option value="11">11</option>
                <option value="11.5">11.5</option>
                <option value="12">12</option>
              </select>
            ) : this.state.category === "shirt" ? (
              <select
                name="size"
                value={this.state.size}
                onChange={e => this.inputHandler(e)}
              >
                <option value="S">S</option>
                <option value="M">M</option>
                <option value="L">L</option>
                <option value="XL">XL</option>
              </select>
            ) : null}
          </div>

          <div>
            <div>Qty:</div>
            <select
              name="qty"
              value={this.state.qty}
              onChange={e => this.inputHandler(e)}
            >
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
            </select>
          </div>
          <div>${price}</div>
          <button
            onClick={() =>
              this.props.addToCart(id, name, price, img, qty, size, category)
            }
          >
            Add to Cart
          </button>
        </div>
        {/* </div> */}
      </div>
    );
  }
}

const mapStateToProps = state => state;

export default connect(
  mapStateToProps,
  { getProduct, addToCart }
)(Product);
