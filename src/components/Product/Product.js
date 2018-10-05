import React, { Component } from "react";
import { connect } from "react-redux";
import { getProduct } from "../../ducks/productReducer";
import { addToCart } from "../../ducks/cartReducer";

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
      description: ""
    };
  }

  //   componentDidMount() {
  //     this.props.getProduct(this.props.match.params.id).then(response => {
  //       console.log(response);
  //     });
  //   }

  componentDidMount() {
    this.props.getProduct(this.props.match.params.id).then(() => {
      //   console.log(response);
      this.setState({
        id: this.props.productReducer.product[0].product_id,
        name: this.props.productReducer.product[0].product_name,
        price: this.props.productReducer.product[0].product_price,
        img: this.props.productReducer.product[0].product_img,
        description: this.props.productReducer.product[0].product_description
      });
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
    console.log(this.state);
    let { product } = this.props.productReducer;
    let { id, name, price, img, qty, description } = this.state;
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
      <div className="">
        {!this.props.productReducer.product.length ? (
          <img src="https://payload345.cargocollective.com/1/18/582678/9219397/loading-ttcredesign.gif" />
        ) : null}
        {/* {myProduct} */}
        <div>{name}</div>
        <div>${price}</div>
        <img src={img} style={{ height: 50, width: 50 }} />
        <div>{description}</div>
        <button onClick={() => this.props.addToCart(id, name, price, img, 1)}>
          Add to Cart
        </button>
      </div>
    );
  }
}

const mapStateToProps = state => state;

export default connect(
  mapStateToProps,
  { getProduct, addToCart }
)(Product);
