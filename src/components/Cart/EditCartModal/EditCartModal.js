import React, { Component } from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import axios from "axios";
import { connect } from "react-redux";
import { getCart } from "../../../ducks/cartReducer";

class EditCartModal extends Component {
  constructor() {
    super();
    this.state = {
      open: false,
      size: null,
      qty: null
    };
  }

  componentDidMount() {
    // console.log("HELLLOOOOOOO");
    this.setState({ size: this.props.size, qty: this.props.qty });
  }

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  inputHandler = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = id => {
    axios.put(`/api/size/${id}`, {
      product_size: this.state.size
    });
    axios
      .put(`/api/quantity/${id}`, {
        product_quantity: this.state.qty
      })
      .then(() => {
        this.props.getMyCart();
        this.handleClose();
      });
    // this.handleClose();
  };

  // handleSubmit = async id => {
  //   await Promise.all([
  //     axios.put(`/api/size/${id}`, {
  //       product_size: this.state.size
  //     }),
  //     axios.put(`/api/quantity/${id}`, {
  //       product_quantity: this.state.qty
  //     }),
  //     this.props.getMyCart()
  //   ]);
  // };

  render() {
    // console.log(this.props);
    // console.log("STATE: ", this.state);
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
              <img src={this.props.img} style={{ width: 20 }} alt="img" />
              <div>
                <div>Size:</div>

                {this.props.category === "pants" ? (
                  <select
                    name="size"
                    // value={this.state.size}
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
              <button onClick={() => this.handleSubmit(this.props.cartId)}>
                Confirm
              </button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    );
  }
}

const mapStateToProps = state => state;

export default connect(
  mapStateToProps,
  { getCart }
)(EditCartModal);

// export default EditCartModal;
