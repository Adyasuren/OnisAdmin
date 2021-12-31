import React, { Component } from "react";
import { Field, reduxForm, reset } from "redux-form";
import { connect } from "react-redux";
import Modal from "react-modal";
import {
  GetAllWindowList,
  AddMaster,
} from "../../../actions/OnisShop/LicenseAction";
import toastr from "toastr";
import "toastr/build/toastr.min.css";
import swal from "sweetalert";
import { key } from "../../../../package.json";
import CurrencyInput from "react-currency-input";
toastr.options = {
  positionClass: "toast-top-center",
  hideDuration: 1000,
  timeOut: 4000,
  closeButton: true,
};

class MasterModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      regno: "",
    };
  }

  componentWillMount() {
    this.props.GetAllWindowList();
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
    e.preventDefault();
    const { isNew, selectedRow } = this.props;
    if (e.target.price.value == "") {
      toastr.error("Цонхны үнэ оруулна уу.");
      return;
    } else if (Number(e.target.price.value.replace(",", "")) > 1000000) {
      toastr.error("Цонхны үнэ 1,000,000 -с их байж болохгүй.");
      return;
    } else {
      let values = this.refs.window.value.split(".");
      let tmp = {
        id: isNew ? 0 : selectedRow.id,
        name: values[1],
        menuid: Number(values[0]),
        unit: Number(this.refs.unit.value),
        term: Number(this.refs.term.value),
        price: Number(e.target.price.value.replace(",", "")),
        isenable: Number(this.refs.isenable.value),
        changeby: Number(this.refs.changeby.value),
        changebyname: this.refs.changebyname.value,
        key: key,
      };

      swal(`Хадгалахдаа итгэлтэй байна уу ?`, {
        buttons: ["Үгүй", "Тийм"],
      }).then((value) => {
        if (value) {
          this.saveMaster(tmp);
        }
      });
    }
  };

  saveMaster = (body) => {
    this.props.AddMaster(body).then((res) => {
      if (res.success) {
        toastr.success(res.message);
        this.closeModal(true);
      } else {
        toastr.error(res.message);
      }
    });
  };

  renderWindowList = () => {
    const { windowList } = this.props;
    let tmp = windowList.map((item, i) => (
      <option value={`${item.id}.${item.name}`}>{item.name}</option>
    ));

    return tmp;
  };

  closeModal = (isReload) => {
    this.props.reset();
    this.props.closeModal(isReload);
  };

  render() {
    const { isNew } = this.props;
    var currentdate = new Date();
    var logname = localStorage.getItem("logname");
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
                <strong>&lt;&lt; Үнэ бүртгэх </strong>
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
                    Модулын нэр<span className="red">*</span>
                  </label>
                  <div className="col-md-8">
                    <select
                      name="window"
                      ref="window"
                      style={{ width: "100%" }}
                      className="form-control"
                      required
                      disabled={!isNew}
                      defaultValue={`${this.checkSelectedRow("menuid")}.${this.checkSelectedRow("name")}`}
                    >
                      {this.renderWindowList()}
                    </select>
                  </div>
                </div>
                <div className="row">
                  <label htmlFor="company" className="col-md-4">
                    Хугацаа<span className="red">*</span>
                  </label>
                  <div className="col-md-8">
                    <select
                      name="term"
                      ref="term"
                      style={{ width: "100%" }}
                      className="form-control"
                      required
                      defaultValue={this.checkSelectedRow("term")}
                      // disabled
                    >
                      <option value="1">Жил</option>
                      <option value="101">Үнэгүй</option>
                    </select>
                  </div>
                </div>
                <div className="row">
                  <label htmlFor="company" className="col-md-4">
                    Нэгж<span className="red">*</span>
                  </label>
                  <div className="col-md-8">
                    <select
                      name="unit"
                      ref="unit"
                      style={{ width: "100%" }}
                      className="form-control"
                      required
                      disabled={!isNew}
                      defaultValue={this.checkSelectedRow("unit")}
                    >
                      <option value={1}>1</option>
                      <option value={2}>2</option>
                      <option value={3}>3</option>
                      <option value={4}>4</option>
                      <option value={5}>5</option>
                      <option value={6}>6</option>
                      <option value={7}>7</option>
                      <option value={8}>8</option>
                      <option value={9}>9</option>
                      <option value={10}>10</option>
                    </select>
                  </div>
                </div>
                <div className="row">
                  <label htmlFor="company" className="col-md-4">
                    Үнэ<span className="red">*</span>
                  </label>
                  <div className="col-md-8">
                    <CurrencyInput
                      precision="0"
                      maxLength={9}
                      name="price"
                      ref="price"
                      style={{ width: "100%" }}
                      disabled={!isNew}
                      required
                      value={this.checkSelectedRow("price")}
                      className="form-control"
                    />
                    {/* <input
                      name="price"
                      ref="price"
                      pattern="[0-9]*"
                      style={{ width: "100%" }}
                      className="form-control"
                      type="number"
                      required
                      disabled={!isNew}
                      defaultValue={this.checkSelectedRow("price")}
                    /> */}
                  </div>
                </div>
                <div className="row">
                  <label htmlFor="company" className="col-md-4">
                    Төлөв<span className="red">*</span>
                  </label>
                  <div className="col-md-8">
                    <select
                      name="isenable"
                      ref="isenable"
                      style={{ width: "100%" }}
                      className="form-control"
                      required
                      defaultValue={this.checkSelectedRow("isenable")}
                    >
                      <option value={1}>Идэвхтэй</option>
                      <option value={2}>Идэвхгүй</option>
                    </select>
                  </div>
                </div>
                <div className="row">
                  <label htmlFor="company" className="col-md-4">
                    Бүртгэсэн огноо<span className="red">*</span>
                  </label>
                  <div className="col-md-8">
                    <input
                      name="changeby"
                      ref="changeby"
                      style={{ width: "100%" }}
                      className="form-control"
                      type="text"
                      placeholder={
                        isNew
                          ? currentdate.toLocaleDateString() +
                            " " +
                            currentdate.getHours() +
                            ":" +
                            currentdate.getMinutes() +
                            ":" +
                            currentdate.getSeconds()
                          : this.checkSelectedRow("insby")
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
                      name="changebyname"
                      ref="changebyname"
                      style={{ width: "100%" }}
                      className="form-control"
                      type="text"
                      value={
                        isNew ? logname : this.checkSelectedRow("insbyname")
                      }
                      disabled
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
  form: "MasterModal",
});

function mapStateToProps(state) {
  return {
    windowList: state.shopLicense.windowList,
  };
}
export default connect(mapStateToProps, {
  GetAllWindowList,
  AddMaster,
})(form(MasterModal));
