import React, { Component } from "react";
import Splash from "../Splash/Splash";
import axios from "axios";
import { connect } from "react-redux";
import { getCategory } from "../../ducks/storeReducer";

class Category extends Component {
  constructor() {
    super();
    this.state = {};
  }

  componentDidMount() {
    this.props.getCategory(this.props.match.params.id).then(response => {
      console.log(response);
    });
  }

  render() {
    console.log(this.props);
    return (
      <div>
        <Splash />
        <p>hello from category</p>
      </div>
    );
  }
}

const mapStateToProps = state => state;

export default connect(
  mapStateToProps,
  { getCategory }
)(Category);
// export default Category;
