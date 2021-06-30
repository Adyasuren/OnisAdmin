import React, { Component } from "react";
import { Field, reduxForm, reset } from "redux-form";
import { connect } from "react-redux";
import Modal from "react-modal";
import {
  AddNonVatProduct,
} from "../../../actions/OnisShop/NonVatProductAction";
import toastr from "toastr";
import "toastr/build/toastr.min.css";
toastr.options = {
  positionClass: "toast-top-center",
  hideDuration: 1000,
  timeOut: 4000,
  closeButton: true,
};

class NonVatModal extends Component {
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

  dateDiff = (sdate, edate) => {
    const diffInMs = new Date(edate) - new Date(sdate);
    const days = diffInMs / (1000 * 60 * 60 * 24);
    if(days < 0) {
      toastr.error("Уучлаарай дуусах огноо эхлэх огнооноос байна байж болохгүй.");
      return false;
    }
    return true
  }


  formSubmit = (e) => {
    const { createRecord, resetForm, selectedRow } = this.props;
    e.preventDefault();
    if(this.dateDiff(e.target.startymd.value, e.target.endymd.value)) {
      let tmp = {};
      tmp.id = this.props.isNew ? 0 : selectedRow.id;
      tmp.barcode = e.target.barcode.value;
      tmp.name = e.target.name.value;
      tmp.vat = Number(2);
      tmp.startymd = e.target.startymd.value;
      tmp.endymd = e.target.endymd.value;
      tmp.status = Number(e.target.status.value);
      tmp.insbyname = this.refs.insby.value;
      this.props.AddNonVatProduct(tmp).then((res) => {
        if (res.success) {
          this.closeModal(true);
          toastr.success(res.message);
        } else {
          toastr.error(res.message);
        }
      });
    }
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

  closeModal = (isReload) => {
    this.props.reset();
    this.setState({ regno: "" });
    this.props.closeModal(isReload);
  };
  
dateChange = (e) => {
    let sdate, edate;
    if(e.target.name == "endymd") {
      sdate = this.refs.startymd.value
      edate = e.target.value
    } else {
      sdate = e.target.value
      edate = this.refs.endymd.value
    }
    this.dateDiff(sdate, edate)
  }

  renderStoreList = () => {
    const { storeList } = this.props;
    let tmp = storeList.map((item, i) => {
      return (
        <option key={i} value={item.regno}>
          {`${item.regno} ${item.storenm}`}
        </option>
      );
    });
    return tmp;
  };

  render() {
    var currentdate = new Date();
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
                <strong>&lt;&lt; Бараа бүртгэх </strong>
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
                    Бар код<span className="red">*</span>
                  </label>
                  <div className="col-md-8">
                    <input
                      name="barcode"
                      style={{ width: "100%" }}
                      className="form-control"
                      type="text"
                      required
                      defaultValue={this.checkSelectedRow("barcode")}
                    />
                  </div>
                </div>
                <div className="row">
                  <label htmlFor="company" className="col-md-4">
                    Барааны нэр<span className="red">*</span>
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
                  НӨАТ<span className="red">*</span>
                  </label>
                  <div className="col-md-8">
                    <select
                      name="vat"
                      ref="vat"
                      style={{ width: "100%" }}
                      className="form-control"
                      disabled
                      defaultValue={"2"}
                    >
                      <option value="1">Тийм</option>
                      <option value="2">Үгүй</option>
                    </select>
                  </div>
                </div>
                <div className="row">
                <label htmlFor="company" className="col-md-4">
                  Эхлэх огноо<span className="red">*</span>
                </label>
                <div className="col-md-8">
                  <input type={"date"} name="startymd"
                    ref="startymd"
                    type="date"
                    style={{ width: "100%" }}
                    onChange={this.dateChange}
                    className="form-control"
                    defaultValue={this.checkSelectedRow("startymd") == null ? null : this.checkSelectedRow("startymd").substring(0,10)}
                    required/>
                </div>
              </div>
              <div className="row">
                <label htmlFor="company" className="col-md-4">
                  Дуусах огноо<span className="red">*</span>
                </label>
                <div className="col-md-8">
                  <input type={"date"} name="endymd"
                    ref="endymd"
                    type="date"
                    style={{ width: "100%" }}
                    onChange={this.dateChange}
                    className="form-control"
                    defaultValue={this.checkSelectedRow("endymd") == null ? null : this.checkSelectedRow("endymd").substring(0,10)}
                    required/>
                </div>
              </div>
                {/* <div className="row">
                  <label htmlFor="company" className="col-md-4">
                    Дэлгүүр<span className="red">*</span>
                  </label>
                  <div className="col-md-8">
                  <input type="text" list="data" name="storeid" className="form-control" required style={{ width: "100%" }} autoComplete="off" onChange={this.storeChange}/>
                  <datalist id="data">
                    {this.renderStoreList()}
                  </datalist>
                  </div>
                </div> */}
                <div className="row">
                  <label htmlFor="company" className="col-md-4">
                  Төлөв<span className="red">*</span>
                  </label>
                  <div className="col-md-8">
                    <select
                      name="status"
                      ref="status"
                      style={{ width: "100%" }}
                      className="form-control"
                      required
                      defaultValue={this.checkSelectedRow("status")}
                    >
                      <option value="2">Хүсэлт</option>
                      <option value="1">Батлагдсан</option>
                    </select>
                  </div>
                </div>
                <div className="row">
                <label htmlFor="company" className="col-md-4">
                  Бүртгэсэн хэрэглэгч<span className="red">*</span>
                </label>
                <div className="col-md-8">
                    <input
                        name="insby"
                        ref="insby"
                        className="form-control"
                        style={{ width: "100%" }}
                        type="text"
                        value={localStorage.getItem("logname")}
                        placeholder={localStorage.getItem("logname")}
                        disabled="disabled"
                    />
                </div>
              </div>
              <div className="row">
                <label htmlFor="company" className="col-md-4">
                  Бүртгэсэн огноо<span className="red">*</span>
                </label>
                <div className="col-md-8">
                    <input
                        name="updymd"
                        ref="updymd"
                        className="form-control"
                        style={{ width: "100%" }}
                        type="text"
                        placeholder={
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
  AddNonVatProduct,
})(form(NonVatModal));
