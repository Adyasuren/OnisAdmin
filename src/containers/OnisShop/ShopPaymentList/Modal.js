import React, { Component } from "react";
import { reduxForm } from "redux-form";
import { connect } from "react-redux";
import Modal from "react-modal";
import { GetGroupedMasterList, AddLicense } from "../../../actions/OnisShop/LicenseAction";
import { MasterListTableTitle } from "./TableTitle";
import ShopPaymentApi from "../../../api/OnisShop/ShopPaymentApi";
import toastr from 'toastr'
import 'toastr/build/toastr.min.css'
import moment from 'moment';
toastr.options = {
    positionClass : 'toast-top-center',
    hideDuration: 1000,
    timeOut: 4000,
    closeButton: true
  }


class PaymentModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      regno: "",
      payPrice: 0,
    };
  }

  componentWillMount() {
    // this.props.GetGroupedMasterList();
  }

  formSubmit = (e) => {
    e.preventDefault();
    const {selectedRow} = this.props;
    if(selectedRow) {
      console.log(selectedRow)
      let tmp = {
        STATEMENTID: selectedRow.statementid,
        UPDBY: Number(localStorage.getItem("id")),
        TYPE: Number(e.target.type.value),
        STOREID: Number(e.target.storeid.value),
      }
      ShopPaymentApi.EditPayment(tmp).then((res) => {
        if(res.success) {
          this.closeModal(true);
          toastr.success(res.message);
        } else {
          toastr.error(res.message);
        }
      })
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

  priceFormatter = (value) => {
    if (value === null) {
      return "-";
    } else if (value === 0) {
      return "-";
    } else if (isNaN(value)) {
      return "-";
    } else {
      let tmp = Math.round(value);
      return tmp.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + ' ₮';
    }
  };

  closeModal = (isReload) => {
    this.props.reset();
    this.props.closeModal(isReload);
  };

  getDefaultValues = (property, isnum) => {
      const { selectedRow } = this.props;
    if(selectedRow === null || selectedRow === undefined) {
        return isnum ? 0 : "" 
    } else {
        if(selectedRow[property] === null || selectedRow[property] === undefined) {
            return isnum ? 0 : ""
        }
        return selectedRow[property]
    }
  }

  render() {
    const { groupMasterList, selectedRow } = this.props;
    return (
      <Modal
        isOpen={this.props.isOpen}
        closeModal={() => this.closeModal()}
        className="animatedpopup animated fadeIn col-md-10 mx-auto"
      >
        <form id="popupform" name="popupform" onSubmit={this.formSubmit}>
          <div className="animated fadeIn ">
            <div className="card">
              <div className="card-header test">
                <strong>&lt;&lt; Лиценз бүртгэх </strong>
                <button
                  className="tn btn-sm btn-primary button-ban card-right"
                  onClick={() => this.closeModal()}
                >
                  X
                </button>
              </div>
              <div className="card-block col-md-12 col-lg-12 col-sm-12 tmpresponsive" style={{ display: "flex" }}>
              <div className="col-md-6 col-lg-6 col-sm-6 tmpresponsive">
                <div className="row">
                  <label htmlFor="company" className="col-md-4">
                    Гүйлгээний дугаар<span className="red">*</span>
                  </label>
                  <div className="col-md-8">
                    <input
                      name="statementid"
                      style={{ width: "100%" }}
                      className="form-control"
                      type="text"
                      required
                      value={this.getDefaultValues("statementid")}
                      disabled
                    />
                  </div>
                </div>
                <div className="row">
                  <label htmlFor="company" className="col-md-4">
                  Төлбөрийн хэлбэр<span className="red">*</span>
                  </label>
                  <div className="col-md-8">
                    <input
                      name="paytypename"
                      style={{ width: "100%" }}
                      className="form-control"
                      type="text"
                      value={this.getDefaultValues("paytypename")}
                      disabled
                    />
                  </div>
                </div>
                <div className="row">
                  <label htmlFor="company" className="col-md-4">
                    Дансны дугаар<span className="red">*</span>
                  </label>
                  <div className="col-md-8">
                  <input
                      name="transferaccount"
                      style={{ width: "100%" }}
                      className="form-control"
                      type="text"
                      value={this.getDefaultValues("transferaccount")}
                      disabled
                    />
                  </div>
                </div>
                <div className="row">
                  <label htmlFor="company" className="col-md-4">
                    Гүйлгээний огноо<span className="red">*</span>
                  </label>
                  <div className="col-md-8">
                    <input
                      name="transacdate"
                      type="text"
                      value={moment(this.getDefaultValues("transacdate")).format('YYYY-MM-DD')}
                      style={{ width: "100%" }}
                      className="form-control"
                      disabled
                    />
                  </div>
                </div>
                <div className="row">
                  <label htmlFor="company" className="col-md-4">
                    Төлсөн дүн<span className="red">*</span>
                  </label>
                  <div className="col-md-8">
                    <input
                      name="amount"
                      style={{ width: "100%" }}
                      className="form-control"
                      value={this.getDefaultValues("amount")}
                      type="text"
                      disabled
                    />
                  </div>
                </div>
                <div className="row">
                  <label htmlFor="company" className="col-md-4">
                    Гүйлгээний утга<span className="red">*</span>
                  </label>
                  <div className="col-md-8">
                    <input
                      name="description"
                      style={{ width: "100%" }}
                      className="form-control"
                      type="text"
                      disabled
                      value={this.getDefaultValues("description")}
                    />
                  </div>
                </div>
              </div>
              <div className="col-md-6 col-lg-6 col-sm-6 tmpresponsive">
              <div className="row">
                  <label htmlFor="company" className="col-md-4">
                    Төрөл<span className="red">*</span>
                  </label>
                  <div className="col-md-8">
                  <select
                      name="type"
                      style={{ width: "100%" }}
                      className="form-control"
                      required
                    >
                      <option value="0"></option>
                      <option value="1">Лиценз</option>
                      <option value="2">Мобиком</option>
                      
                    </select>
                  </div>
                </div>
              <div className="row">
                  <label htmlFor="company" className="col-md-4">
                    Дэлгүүр<span className="red">*</span>
                  </label>
                  <div className="col-md-8">
                  <select
                      name="storeid"
                      style={{ width: "100%" }}
                      className="form-control"
                      required
                    >
                      <option value="0">- Сонгох -</option>
                      {this.renderStoreList()}
                    </select>
                  </div>
                </div>
                <div className="row">
                  <label htmlFor="company" className="col-md-4">
                    Дэлгүүрийн нэр<span className="red">*</span>
                  </label>
                  <div className="col-md-8">
                    <input
                      name="storename"
                      style={{ width: "100%" }}
                      className="form-control"
                      type="text"
                      disabled
                      value={this.getDefaultValues("storename")}
                    />
                  </div>
                </div>
                <div className="row">
                  <label htmlFor="company" className="col-md-4">
                    РД<span className="red">*</span>
                  </label>
                  <div className="col-md-8">
                    <input
                      name="storeregno"
                      style={{ width: "100%" }}
                      className="form-control"
                      type="text"
                      disabled
                      value={this.getDefaultValues("storeregno")}
                    />
                  </div>
                </div>
                <div className="row">
                  <label htmlFor="company" className="col-md-4">
                    Утасны дугаар<span className="red">*</span>
                  </label>
                  <div className="col-md-8">
                    <input
                      name="phoneno"
                      style={{ width: "100%" }}
                      className="form-control"
                      type="text"
                      disabled
                      value={this.getDefaultValues("phoneno")}
                    />
                  </div>
                </div>
                <div className="row">
                  <label htmlFor="company" className="col-md-4">
                    Бүртгэсэн огноо<span className="red">*</span>
                  </label>
                  <div className="col-md-8">
                    <input
                      name="insertdate"
                      style={{ width: "100%" }}
                      className="form-control"
                      type="text"
                      disabled
                      value={this.getDefaultValues("insertdate")}
                    />
                  </div>
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
  form: "ShopLicenseModal",
});

function mapStateToProps(state) {
  return {
    groupMasterList: state.shopLicense.groupMasterList,
    storeList: state.OnisShop.rows,
  };
}
export default connect(mapStateToProps, {
  GetGroupedMasterList, AddLicense
})(form(PaymentModal));
