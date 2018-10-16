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

  //   componentDidMount() {
  //     this.props.getProduct(this.props.match.params.id).then(response => {
  //       console.log(response);
  //     });
  //   }

  componentDidMount() {
    const { product } = this.props.productReducer;
    this.props.getProduct(this.props.match.params.id).then(response => {
      console.log(response);
      this.setState({
        id: this.props.productReducer.product[0].product_id,
        name: this.props.productReducer.product[0].product_name,
        price: this.props.productReducer.product[0].product_price,
        img: this.props.productReducer.product[0].product_img,
        description: this.props.productReducer.product[0].product_description,
        size: this.props.productReducer.product[0].product_size,
        category: this.props.productReducer.product[0].product_category
      });
    });
  }

  sizeHandler = (id, e) => {
    this.setState({ size: +e.target.value });
    //   axios.put(`/api/size/${id}`, {
    //     product_size: +e.target.value
    //   });
  };

  qtyHandler = (id, e) => {
    this.setState({ qty: +e.target.value });
    //   axios.put(`/api/size/${id}`, {
    //     product_size: +e.target.value
    //   });
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
    console.log(this.state);
    let { product } = this.props.productReducer;
    let { id, name, price, img, qty, description, size, category } = this.state;
    // let myProduct = product.map(elem => {
    //   return (
    //     <div key={elem.product_id}>
    //       <div>{elem.product_name}</div>
    //       <div>${elem.product_price}</div>
    //       <img
    //         src={elem.product_img}
    //         alt={elem.product_name}
    //         style={{ height: 50, width: 50 }}
    //       />
    //       <div>{elem.product_description}</div>
    //       <button
    //         onClick={() =>
    //           this.props.addToCart(
    //             elem.product_id,
    //             elem.product_name,
    //             elem.product_price,
    //             elem.product_img,
    //             1
    //           )
    //         }
    //       >
    //         Add to Cart
    //       </button>
    //     </div>
    //   );
    // });
    return (
      <div className="product_wrapper">
        {!this.props.productReducer.product.length ? (
          <img src="https://payload345.cargocollective.com/1/18/582678/9219397/loading-ttcredesign.gif" />
        ) : null}
        {/* {myProduct} */}
        {/* <div className="product_innerWrapper"> */}
        <div className="product_leftPanel">
          <img className="product_image" src={img} style={{ height: 450 }} />
        </div>
        <div className="product_rightPanel">
          <div className="product_name">{name}</div>
          <div>{description}</div>
          {/* <div>Size: {size}</div> */}
          <div>
            <div>Size:</div>
            <select
              name="shoes"
              value={this.state.size}
              onChange={e => this.sizeHandler(this.state.id, e)}
            >
              <option value="9.5">9.5</option>
              <option value="10">10</option>
              <option value="10.5">10.5</option>
              <option value="11">11</option>
              <option value="11.5">11.5</option>
              <option value="12">12</option>
            </select>
          </div>
          <div>
            <div>Qty:</div>
            <select
              name="qty"
              value={this.state.qty}
              onChange={e => this.qtyHandler(this.state.id, e)}
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
