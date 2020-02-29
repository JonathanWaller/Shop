import React, { Component } from "react";
import Splash from "../Splash/Splash";
import StoreSkeleton from '../StoreSkeleton/StoreSkeleton';
import Links from "../Links/Links";
import { connect } from "react-redux";
import { getCategory } from "../../ducks/storeReducer";
import { addToCart } from "../../ducks/cartReducer";
import { Link } from "react-router-dom";

class Category extends Component {
  constructor() {
    super();
    this.state = {
      test: ""
    };
  }

  componentDidMount() {
    this.props.getCategory(this.props.match.params.id);
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.match.params.id !== this.props.match.params.id) {
      this.props.getCategory(this.props.match.params.id);
    }
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
  { getCategory, addToCart }
)(Category);
