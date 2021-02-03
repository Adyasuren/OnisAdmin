import React, { Component } from "react";
import { reduxForm } from "redux-form";
import { connect } from "react-redux";
import Modal from "react-modal";
import { GetGroupedMasterList, AddLicense } from "../../../actions/OnisShop/LicenseAction";
import { MasterListTableTitle } from "./TableTitle";
import ShopPaymentApi from "../../../api/OnisShop/ShopPaymentApi";
import toastr from 'toastr'
import 'toastr/build/toastr.min.css'
import swal from 'sweetalert';
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
      dropData: [],
      selectedValue: {},
      selectedType: 0
    };
  }

  componentDidMount() {
  }

  formSubmit = (e) => {
    e.preventDefault();
    const {selectedRow, storeList} = this.props;
    const { dropData, selectedType } = this.state;
    if(selectedRow) {
      if(e.target.storeid.value) {
        if(selectedType != "0") {
          let storeid = dropData.find(item => item.regno == e.target.storeid.value);
          if(storeid) {
            let qustText = e.target.type.value == "1" ? "Та хэрэглэгчийн лиценз сунгах гэж байна." : "Та мобикомын диллерийн данс цэнэглэх гэж байна.";
            swal(`${qustText} Хадгалах уу ?`, {
              buttons: ["Үгүй", "Тийм"],
            }).then(value => {
              if(value) {
                let tmp = {
                  STATEMENTID: selectedRow.statementid,
                  UPDBY: Number(localStorage.getItem("id")),
                  TYPE: Number(selectedType),
                  STOREID: storeid.storeid,
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
            });
          } else {
            toastr.error("Зөв РД сонгоно уу.")
          }
          
        } else {
          toastr.error("Төрөл сонгоно уу.")
        }
      } else {
        toastr.error("Дэлгүүр сонгоно уу.")
      }
    }
  };

  renderStoreList = () => {
    const { storeList } = this.props;
    const { dropData } = this.state;
    let tmp = dropData.map((item, i) => {
      return (
        <option key={i} value={item.regno}>
          {`${item.storenm}`}
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

  storeChange = (e) => {
    const { dropData } = this.state;
    let res = dropData.find(item => item.regno == e.target.value)
    if(res) {
      console.log(res)
      this.setState({ selectedValue: res })
    } else {
      this.setState({ selectedValue: {} })
    }
  }

  onChangeType = (e) => {
    const { storeList, dealerList } = this.props;
    if(e.target.value == 2) {
      this.setState({ dropData: dealerList })
    } else if (e.target.value == 1) {
      this.setState({ dropData: storeList })
    } else {
      this.setState({ dropData: [] })
    }
    this.setState({ selectedType: e.target.value })
  }

  render() {
    const { selectedValue, selectedType } = this.state;
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
                      onChange={this.onChangeType}
                    >
                      <option value="0"></option>
                      <option value="1">Лиценз</option>
                      <option value="2">Мобиком</option>
                      
                    </select>
                  </div>
                </div>
              <div className="row">
                  <label htmlFor="company" className="col-md-4">
                    { selectedType == 2 ? "Диллерийн РД" : "Дэлгүүрийн РД" }<span className="red">*</span>
                  </label>
                  <div className="col-md-8">
                  <input type="text" list="data" name="storeid" className="form-control" style={{ width: "100%" }} autoComplete="off" onChange={this.storeChange}/>
                  <datalist id="data">
                    {this.renderStoreList()}
                  </datalist>
                  {/* <select
                      name="storeid"
                      style={{ width: "100%" }}
                      className="form-control"
                      required
                    >
                      <option value="0">- Сонгох -</option>
                      {this.renderStoreList()}
                    </select> */}
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
                      value={selectedValue.storenm}
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
                      value={selectedValue.regno}
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
                      value={selectedValue.phoneno}
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
    dealerList: state.shopMobicom.dealerList,
  };
}
export default connect(mapStateToProps, {
  GetGroupedMasterList, AddLicense
})(form(PaymentModal));
