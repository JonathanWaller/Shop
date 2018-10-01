import React, { Component } from "react";
import axios from "axios";
import { connect } from "react-redux";
import { getStore } from "../../ducks/storeReducer";
import "./Store.css";

class Store extends Component {
  constructor() {
    super();
    this.state = {};
  }

  componentDidMount() {
    this.props.getStore();
  }

  render() {
    console.log(this.props);
    let storeItems = this.props.items.map(item => {
      return (
        <div key={item.product_id}>
          <h3>{item.product_name}</h3>
          <div>${item.product_price}</div>
          <img src={item.product_img} className="store_productImg" />
        </div>
      );
    });
    return (
      <div>
        {this.props.isLoading ? (
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
  { getStore }
)(Store);
