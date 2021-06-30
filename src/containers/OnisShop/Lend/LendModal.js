import React, { Component } from "react";
import { Field, reduxForm, reset } from "redux-form";
import { connect } from "react-redux";
import Modal from "react-modal";
import {
  AddLendSettings,
  UpdateLendSettings
} from "../../../actions/OnisShop/LendActions";
import { userList } from "../../../actions/onisUser_action";
import toastr from "toastr";
import "toastr/build/toastr.min.css";
toastr.options = {
  positionClass: "toast-top-center",
  hideDuration: 1000,
  timeOut: 4000,
  closeButton: true,
};

class LendModal extends Component {
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
    const { createRecord, resetForm, storeList } = this.props;
    e.preventDefault();
    let tmp = {};
    let storeData = this.props.storeList.find(i => i.regno == e.target.storeid.value);
    if(storeData) {
      tmp.storeid = storeData.id;
      tmp.regno = e.target.storeid.value;
      tmp.token = e.target.token.value;
      tmp.phoneno = e.target.phoneno.value;
      tmp.userregno = e.target.userregno.value;
      tmp.userphoneno = e.target.userphoneno.value;
      tmp.insby = Number(localStorage.getItem("id"));
      tmp.insbyname = localStorage.getItem("logname")
      if (this.props.isNew) {
        this.props.AddLendSettings(tmp).then((res) => {
          if (res.success) {
            this.closeModal(true);
            toastr.success(res.message);
          } else {
            toastr.error(res.message);
          }
        });
      } else {
        this.props
          .UpdateLendSettings(tmp, this.props.selectedRow.id)
          .then((res) => {
            if (res.success) {
              this.closeModal(true);
              toastr.success(res.message);
            } else {
              toastr.error(res.message);
            }
          });
      }
    } else {
      toastr.error("Уучлаарай таны сонгосон дэлгүүр бүртгэлгүй байна.");
    }
  };

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

  handleChangeStore = (e) => {
    this.searchRegNo(e.target.value);
  };

  searchRegNo = (value) => {
    const { storeList } = this.props;
    let tmp = storeList.find((store) => store.regno == value);
    if (tmp != null) {
      this.refs.storenm.value = tmp.storenm;
      this.refs.phoneno.value = tmp.phoneno;
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
                <strong>&lt;&lt; SuperUp/Lend бүртгэх </strong>
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
                    Татвар төлөгчийн дугаар<span className="red">*</span>
                  </label>
                  <div className="col-md-8">
                  <input type="text" list="data" name="storeid" defaultValue={this.checkSelectedRow("regno")} ref="storeid" className="form-control" style={{ width: "100%" }} autoComplete="off" onChange={this.handleChangeStore}/>
                  <datalist id="data">
                    {this.renderStoreList()}
                  </datalist>
                  </div>
                </div>
                <div className="row">
                  <label htmlFor="company" className="col-md-4">
                    РД<span className="red">*</span>
                  </label>
                  <div className="col-md-8">
                    <input
                      name="storenm"
                      ref="storenm"
                      style={{ width: "100%" }}
                      className="form-control"
                      type="text"
                      required
                      disabled
                      defaultValue={this.checkSelectedRow("regno")}
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
                      ref="phoneno"
                      style={{ width: "100%" }}
                      className="form-control"
                      type="text"
                      required
                      disabled
                      defaultValue={this.checkSelectedRow("phoneno")}
                    />
                  </div>
                </div>
                <div className="row">
                  <label htmlFor="company" className="col-md-4">
                    Мерчантын РД<span className="red">*</span>
                  </label>
                  <div className="col-md-8">
                    <input
                      name="userregno"
                      ref="userregno"
                      style={{ width: "100%" }}
                      className="form-control"
                      type="text"
                      required
                      defaultValue={this.checkSelectedRow("userregno")}
                    />
                  </div>
                </div>
                <div className="row">
                  <label htmlFor="company" className="col-md-4">
                    Мерчантын утас<span className="red">*</span>
                  </label>
                  <div className="col-md-8">
                    <input
                      name="userphoneno"
                      ref="userphoneno"
                      style={{ width: "100%" }}
                      className="form-control"
                      type="text"
                      required
                      defaultValue={this.checkSelectedRow("userphoneno")}
                    />
                  </div>
                </div>
                <div className="row">
                  <label htmlFor="company" className="col-md-4">
                    Token<span className="red">*</span>
                  </label>
                  <div className="col-md-8">
                    <input
                      name="token"
                      style={{ width: "100%" }}
                      className="form-control"
                      type="text"
                      required
                      defaultValue={this.checkSelectedRow("token")}
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
  form: "LendModal",
});

function mapStateToProps(state) {
  return {
    storeList: state.OnisShop.rows,
  };
}
export default connect(mapStateToProps, {
  userList,
  AddLendSettings,
  UpdateLendSettings
})(form(LendModal));
