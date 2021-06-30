import React, { Component } from "react";
import { reduxForm } from "redux-form";
import { connect } from "react-redux";
import Modal from "react-modal";
import TableFok from "../../components/TableFok";
import licenseApi from "../../api/licenseApi";
import { SmsTableTitle } from "./SmsTableTitle";
import toastr from "toastr";
import "toastr/build/toastr.min.css";
import CurrencyInput from "react-currency-input";
import swal from "sweetalert";

toastr.options = {
  positionClass: "toast-top-center",
  hideDuration: 1000,
  timeOut: 4000,
  closeButton: true,
};

class SmsModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedUser: {},
      smsqty: 0,
      payprice: 0,
      log: [],
    };
  }

  componentWillMount() {}

  formSubmit = (e) => {
    e.preventDefault();
    const { selectedUser, smsqty, payprice } = this.state;
    if (payprice.replaceAll(",", "")) {
      if (Number(payprice.replaceAll(",", "")) >= 200) {
        if (selectedUser) {
          swal(`Хадгалахдаа итгэлтэй байна уу ?`, {
            buttons: ["Үгүй", "Тийм"],
          }).then((value) => {
            if (value) {
              let body = {
                userid: Number(selectedUser.userid),
                amount: Number(payprice.replaceAll(",", "")),
                smsqty: Number(smsqty),
                username: selectedUser.username,
                insby: Number(localStorage.getItem("id")),
              };
              licenseApi.AddSmsQty(body).then((res) => {
                if (res.success) {
                  toastr.success("Амжилттай");
                  this.closeModal(res.success);
                } else {
                  toastr.error(res.message);
                }
              });
            }
          });
        } else {
          toastr.error("Хэрэглэгч сонгоно уу.");
        }
      } else {
        toastr.error("200 - с дээш дүнгээр сунгах боломжтой");
      }
    } else {
      toastr.error("Дүн оруулна уу");
    }
  };

  renderStoreList = () => {
    const { onisUserList } = this.props;
    let tmp = onisUserList.map((item, i) => {
      return (
        <option key={i} value={item.username}>
          {`${item.storename} ${item.regnum}`}
        </option>
      );
    });
    return tmp;
  };

  closeModal = (isReload) => {
    this.props.reset();
    this.props.closeModal(isReload);
  };

  storeChange = (e) => {
    const { onisUserList } = this.props;
    if (e.target.value) {
      this.setState({ log: [] });
      let value = onisUserList.find((a) => a.username == e.target.value);
      if (value) {
        this.setState({ selectedUser: value });
        licenseApi.GetAddSmsLog(value.userid).then((res) => {
          if (res.success) {
            res.value.map((item, i) => {
              item.rank = i;
            });
            this.setState({ log: res.value });
          }
        });
      } else {
        this.setState({ selectedUser: {} });
      }
    } else {
      this.setState({ selectedUser: {} });
    }
  };

  payPriceChange = (formatted, value) => {
    this.setState({ payprice: formatted, smsqty: (value / 20).toFixed(0) });
  };

  render() {
    const { selectedUser, smsqty, payprice, log } = this.state;
    var currentdate = new Date();
    return (
      <Modal
        isOpen={this.props.isOpen}
        closeModal={() => this.closeModal()}
        className="animated fadeIn col-md-8 col-lg-8 col-sm-8 mx-auto"
      >
        <form
          id="popupform"
          name="popupform"
          onSubmit={(e) => e.preventDefault()}
        >
          <div className="animated fadeIn ">
            <div className="card">
              <div className="card-header test">
                <strong>&lt;&lt; Мессеж эрх нэмэх </strong>
                <button
                  className="tn btn-sm btn-primary button-ban card-right"
                  onClick={() => this.closeModal()}
                >
                  X
                </button>
              </div>
              <div
                className="card-block col-md-12 col-lg-12 col-sm-12 tmpresponsive"
                style={{ display: "flex" }}
              >
                <div className="col-md-5 col-lg-5 col-sm-5 tmpresponsive">
                  <div className="row">
                    <label htmlFor="company" className="col-md-4">
                      Нэвтрэх дугаар<span className="red">*</span>
                    </label>
                    <div className="col-md-8">
                      <input
                        type="text"
                        list="custom-datalist"
                        name="storeid"
                        className="form-control"
                        style={{ width: "100%" }}
                        autoComplete="off"
                        onChange={this.storeChange}
                      />
                      <datalist id="custom-datalist">
                        {this.renderStoreList()}
                      </datalist>
                    </div>
                  </div>
                  <div className="row">
                    <label htmlFor="company" className="col-md-4">
                      Дэлгүүрийн нэр<span className="red">*</span>
                    </label>
                    <div className="col-md-8">
                      <input
                        name="storenm"
                        style={{ width: "100%" }}
                        className="form-control"
                        type="text"
                        value={selectedUser.storename}
                        required
                        disabled
                      />
                    </div>
                  </div>
                  <div className="row">
                    <label htmlFor="company" className="col-md-4">
                      Регистрийн дугаар<span className="red">*</span>
                    </label>
                    <div className="col-md-8">
                      <input
                        name="storenm"
                        style={{ width: "100%" }}
                        className="form-control"
                        type="text"
                        value={selectedUser.regnum}
                        required
                        disabled
                      />
                    </div>
                  </div>
                  <div className="row">
                    <label htmlFor="company" className="col-md-4">
                      Төлсөн дүн<span className="red">*</span>
                    </label>
                    <div className="col-md-8">
                      <CurrencyInput
                        precision="0"
                        maxLength={9}
                        name="payprice"
                        ref="payprice"
                        style={{ width: "100%" }}
                        className="form-control"
                        autoComplete="off"
                        //allowNegative
                        value={payprice}
                        onChange={this.payPriceChange}
                      />
                    </div>
                  </div>
                  <div className="row">
                    <label htmlFor="company" className="col-md-4">
                      Мессежний тоо<span className="red">*</span>
                    </label>
                    <div className="col-md-8">
                      <input
                        name="storenm"
                        style={{ width: "100%" }}
                        className="form-control"
                        type="text"
                        required
                        disabled
                        value={smsqty}
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
                        value={
                          currentdate.toLocaleDateString() +
                          " " +
                          currentdate.getHours() +
                          ":" +
                          currentdate.getMinutes() +
                          ":" +
                          currentdate.getSeconds()
                        }
                        disabled="disabled"
                      />
                    </div>
                  </div>
                  <div className="row">
                    <label htmlFor="company" className="col-md-4">
                      Бүртгэсэн хэрэглэгч<span className="red">*</span>
                    </label>
                    <div className="col-md-8">
                      <input
                        name="logname"
                        style={{ width: "100%" }}
                        className="form-control"
                        type="text"
                        value={localStorage.getItem("logname")}
                        disabled
                      />
                    </div>
                  </div>
                </div>
                <div className="col-md-7 col-lg-7 col-sm-7 tmpresponsive">
                  <TableFok data={log} title={SmsTableTitle} />
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
                    onClick={this.formSubmit}
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
  form: "SmsModal",
});

function mapStateToProps(state) {
  return {
    onisUserList: state.saleList.onisuserlist,
  };
}
export default connect(mapStateToProps, {})(form(SmsModal));
