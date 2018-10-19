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

  handleClose = () => {
    this.setState({ open: false });
  };

  render() {
    console.log(this.props);
    return (
      <div>
        <button onClick={this.handleClickOpen}>Edit</button>
        <Dialog
          className="editCartModal__container"
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
          contentstyle={{
            width: "70vh",
            maxWidth: "100%",
            height: "70vw",
            padding: "30px"
          }}
        >
          <DialogContent>
            <div>
              <img src={this.props.img} style={{ width: 20 }} />
              <div>
                <div>Size:</div>

                {this.props.category === "pants" ? (
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
                ) : this.props.category === "shoes" ? (
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
                ) : this.props.category === "shirt" ? (
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
            </div>
          </DialogContent>
        </Dialog>
      </div>
    );
  }
}

export default EditCartModal;
