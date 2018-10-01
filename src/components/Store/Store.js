import React, { Component } from "react";
import axios from "axios";
import { connect } from "react-redux";
import { getStore } from "../../ducks/storeReducer";

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
        </div>
      );
    });
    return (
      <div>
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
