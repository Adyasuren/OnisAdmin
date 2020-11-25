import React, { Component } from "react";
import { Field, reduxForm, reset } from "redux-form";
import { connect } from "react-redux";
import Modal from "react-modal";
import {
  AddQpaySettings,
  UpdateQpaySettings,
} from "../../../actions/OnisShop/QpayAction";
import { userList } from "../../../actions/onisUser_action";
import toastr from "toastr";
import "toastr/build/toastr.min.css";
toastr.options = {
  positionClass: "toast-top-center",
  hideDuration: 1000,
  timeOut: 4000,
  closeButton: true,
};

class QpayModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      regno: "",
    };
  }

  componentWillMount() {
  }

  checkSelectedRow = (name) => {
    if (this.props.selectedRow == null) {
      return "";
    } else {
      if (this.props.isNew) {
        return "";
      } else {
        return this.props.selectedRow[name];
      }
    }
  };


  formSubmit = (e) => {
    const { createRecord, resetForm } = this.props;
    e.preventDefault();
    let tmp = {};
    tmp.storeid = Number(e.target.storeid.value);
    tmp.register = e.target.register.value;
    tmp.invoice_code = e.target.invoice_code.value;
    tmp.invoice_receiver_code = e.target.invoice_receiver_code.value;
    tmp.username = e.target.username.value;
    tmp.password = e.target.password.value;
    tmp.name = e.target.name.value;
    tmp.insby = Number(localStorage.getItem("id"));
    if (this.props.isNew) {
      this.props.AddQpaySettings(tmp).then((res) => {
        if (res.success) {
          this.closeModal(true);
          toastr.success(res.message);
        } else {
          toastr.error(res.message);
        }
      });
    } else {
      this.props
        .UpdateQpaySettings(tmp, this.props.selectedRow.id)
        .then((res) => {
          if (res.success) {
            this.closeModal(true);
            toastr.success(res.message);
          } else {
            toastr.error(res.message);
          }
        });
    }
  };

  renderStoreList = () => {
    const { storeList } = this.props;
    let tmp = storeList.map((item, i) => {
      return (
        <option key={i} value={item.id}>
          {`${item.regno} ${item.storenm}`}
        </option>
      );
    });
    return tmp;
  };

  handleChangeStore = (e) => {
    const { storeList } = this.props;
    this.searchRegNo(e.target.value);
  };

  searchRegNo = (value) => {
    const { storeList } = this.props;
    let tmp = storeList.find((store) => store.id == value);
    if (tmp != null) {
      this.refs.regno.value = tmp.regno;
      // this.setState({ regno: tmp.regno })
    }
  };

  closeModal = () => {
    this.props.reset();
    this.setState({ regno: "" });
    this.props.closeModal(true);
  };

  render() {
    return (
      <Modal
        isOpen={this.props.isOpen}
        closeModal={() => this.closeModal()}
        className="animatedpopup animated fadeIn col-md-4 mx-auto"
      >
        <form id="popupform" name="popupform" onSubmit={this.formSubmit}>
          <div className="animated fadeIn ">
            <div className="card">
              <div className="card-header test">
                <strong>&lt;&lt; Qpay бүртгэх </strong>
                <button
                  className="tn btn-sm btn-primary button-ban card-right"
                  onClick={() => this.closeModal()}
                >
                  X
                </button>
              </div>
              <div className="card-block col-md-12 col-lg-12 col-sm-12 tmpresponsive">
                <div className="row">
                  <label htmlFor="company" className="col-md-4">
                    Регистерийн дугаар<span className="red">*</span>
                  </label>
                  <div className="col-md-8">
                    <select
                      name="storeid"
                      style={{ width: "100%" }}
                      className="form-control"
                      // onChange={this.handleChangeStore}
                      required
                      defaultValue={this.checkSelectedRow("storeid")}
                    >
                      <option />
                      {this.renderStoreList()}
                    </select>
                  </div>
                </div>
                <div className="row">
                  <label htmlFor="company" className="col-md-4">
                    Qpay регистр дугаар<span className="red">*</span>
                  </label>
                  <div className="col-md-8">
                    <input
                      name="register"
                      style={{ width: "100%" }}
                      className="form-control"
                      type="text"
                      required
                      defaultValue={this.checkSelectedRow("register")}
                    />
                  </div>
                </div>
                <div className="row">
                  <label htmlFor="company" className="col-md-4">
                    Invoice code<span className="red">*</span>
                  </label>
                  <div className="col-md-8">
                    <input
                      name="invoice_code"
                      style={{ width: "100%" }}
                      className="form-control"
                      type="text"
                      required
                      defaultValue={this.checkSelectedRow("invoicE_CODE")}
                    />
                  </div>
                </div>
                <div className="row">
                  <label htmlFor="company" className="col-md-4">
                    Invoice receiver code<span className="red">*</span>
                  </label>
                  <div className="col-md-8">
                    <input
                      name="invoice_receiver_code"
                      style={{ width: "100%" }}
                      className="form-control"
                      type="text"
                      required
                      defaultValue={this.checkSelectedRow("invoicE_RECEIVER_CODE")}
                    />
                  </div>
                </div>
                <div className="row">
                  <label htmlFor="company" className="col-md-4">
                    Merchant name<span className="red">*</span>
                  </label>
                  <div className="col-md-8">
                    <input
                      name="name"
                      style={{ width: "100%" }}
                      className="form-control"
                      type="text"
                      required
                      defaultValue={this.checkSelectedRow("name")}
                    />
                  </div>
                </div>
                <div className="row">
                  <label htmlFor="company" className="col-md-4">
                    Username<span className="red">*</span>
                  </label>
                  <div className="col-md-8">
                    <input
                      name="username"
                      style={{ width: "100%" }}
                      className="form-control"
                      type="text"
                      required
                      defaultValue={this.checkSelectedRow("username")}
                    />
                  </div>
                </div>
                <div className="row">
                  <label htmlFor="company" className="col-md-4">
                    Password<span className="red">*</span>
                  </label>
                  <div className="col-md-8">
                    <input
                      name="password"
                      style={{ width: "100%" }}
                      className="form-control"
                      type="text"
                      required
                      defaultValue={this.checkSelectedRow("password")}
                    />
                  </div>
                </div>
              </div>
              <div className="card-footer test">
                <div className="card-right">
                  <button
                    type="button"
                    className="btn btn-sm btn-primary button-ban"
                    onClick={() => this.closeModal()}
                  >
                    <i className="fa fa-ban" />
                    Болих
                  </button>
                  <button
                    type="submit"
                    className="btn btn-sm btn-primary button-save"
                  >
                    <i className="fa fa-save" />
                    Хадгалах
                  </button>
                </div>
              </div>
            </div>
          </div>
        </form>
      </Modal>
    );
  }
}
const form = reduxForm({
  form: "QpayModal",
});

function mapStateToProps(state) {
  return {
    storeList: state.OnisShop.rows,
  };
}
export default connect(mapStateToProps, {
  userList,
  AddQpaySettings,
  UpdateQpaySettings,
})(form(QpayModal));
