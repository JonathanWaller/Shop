import React, { Component } from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";

class EditCartModal extends Component {
  constructor() {
    super();
    this.state = {
      open: false
    };
  }

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  render() {
    return (
      <div>
        <div onClick={this.handleClickOpen}>Edit Cart</div>
      </div>
    );
  }
}

export default EditCartModal;
