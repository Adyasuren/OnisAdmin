import React, { Component } from "react";
import { reduxForm } from "redux-form";
import { connect } from "react-redux";
import Modal from "react-modal";
import MobicomApi from "../../../../api/OnisShop/MobicomApi"
import toastr from 'toastr'
import 'toastr/build/toastr.min.css'
toastr.options = {
    positionClass : 'toast-top-center',
    hideDuration: 1000,
    timeOut: 4000,
    closeButton: true
  }

class DillerModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }

  formSubmit = (e) => {
    e.preventDefault();
    const { selectedRow } = this.props;
    let tmp = {
        id: selectedRow.id,
        dealername: this.refs.dealerName.value,
        dealerregno: this.refs.dealerRegno.value,
        isenable: Number(this.refs.isenable.value)
    }
    MobicomApi.EditDiller(tmp).then((res) => {
      if(res.success) {
        toastr.success(res.message);
        this.closeModal(res.success);
      } else {
        toastr.error(res.message);
      }
    })
  }

  closeModal = (success) => {
    this.props.reset();
    this.props.closeModal(success);
  }

  getInitialValues = (name) => {
    const { selectedRow } = this.props;
    if (selectedRow == null) {
        return "";
      } else {
        return selectedRow[name];
      }
  }

  render() {
    return (
      <Modal
        isOpen={this.props.isOpen}
        closeModal={() => this.closeModal()}
        className="animated fadeIn col-md-8 col-lg-8 col-sm-8 mx-auto"
      >
        <form id="popupform" name="popupform" onSubmit={this.formSubmit}>
          <div className="animated fadeIn ">
            <div className="card">
              <div className="card-header test">
                <strong>&lt;&lt; Төлбөрийн гүйлгээ засах </strong>
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
                      Гүйлгээний дугаар<span className="red">*</span>
                    </label>
                    <div className="col-md-8">
                      <input
                        name="firstStorenm"
                        style={{ width: "100%" }}
                        className="form-control"
                        type="text"
                        //value={firstSelectedUser.storename}
                        required
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
                        name="firstStorenm"
                        style={{ width: "100%" }}
                        className="form-control"
                        type="text"
                        //value={firstSelectedUser.storename}
                        required
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
                        name="firstRegno"
                        style={{ width: "100%" }}
                        className="form-control"
                        type="text"
                        //value={firstSelectedUser.regnum}
                        required
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
                        name="firstDay"
                        style={{ width: "100%" }}
                        className="form-control"
                        type="text"
                        //value={this.state.firstDay}
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
                      <input
                        name="firstSmsQty"
                        style={{ width: "100%" }}
                        className="form-control"
                        type="text"
                        required
                        disabled
                        //value={this.state.firstSmsQty}
                      />
                    </div>
                  </div>
                  <div className="row">
                    <label htmlFor="company" className="col-md-4">
                      Гүйлгээний утга<span className="red">*</span>
                    </label>
                    <div className="col-md-8">
                      <input
                        name="firstStorenm"
                        style={{ width: "100%" }}
                        className="form-control"
                        type="text"
                        //value={firstSelectedUser.storename}
                        required
                        disabled
                      />
                    </div>
                  </div>
                </div>
                <div className="col-md-2 col-lg-2 col-sm-2 tmpresponsive"></div>
                <div className="col-md-5 col-lg-5 col-sm-5 tmpresponsive">
                <div className="row">
                    <label htmlFor="company" className="col-md-4">
                      Төрөл<span className="red">*</span>
                    </label>
                    <div className="col-md-8">
                      <input
                        type="text"
                        list="first-custom-datalist"
                        name="firstUsername"
                        className="form-control"
                        style={{ width: "100%" }}
                        autoComplete="off"
                        onChange={this.storeChange}
                      />
                      <datalist id="first-custom-datalist">
                        {/* {this.renderStoreList(firstUserList)} */}
                      </datalist>
                    </div>
                  </div>
                  <div className="row">
                    <label htmlFor="company" className="col-md-4">
                      Диллерийн РД<span className="red">*</span>
                    </label>
                    <div className="col-md-8">
                      <input
                        type="text"
                        list="first-custom-datalist"
                        name="firstUsername"
                        className="form-control"
                        style={{ width: "100%" }}
                        autoComplete="off"
                        onChange={this.storeChange}
                      />
                      <datalist id="first-custom-datalist">
                        {/* {this.renderStoreList(firstUserList)} */}
                      </datalist>
                    </div>
                  </div>
                  <div className="row">
                    <label htmlFor="company" className="col-md-4">
                      Дэлгүүрийн нэр<span className="red">*</span>
                    </label>
                    <div className="col-md-8">
                      <input
                        name="secondDay"
                        style={{ width: "100%" }}
                        className="form-control"
                        type="text"
                        //value={this.state.secondDay}
                        required
                        disabled
                      />
                    </div>
                  </div>
                  <div className="row">
                    <label htmlFor="company" className="col-md-4">
                      РД<span className="red">*</span>
                    </label>
                    <div className="col-md-8">
                      <input
                        name="secondSmsQty"
                        style={{ width: "100%" }}
                        className="form-control"
                        type="text"
                        required
                        disabled
                        //value={this.state.secondSmsQty}
                      />
                    </div>
                  </div>
                  <div className="row">
                    <label htmlFor="company" className="col-md-4">
                      Утасны дугаар<span className="red">*</span>
                    </label>
                    <div className="col-md-8">
                      <input
                        name="insertdate"
                        style={{ width: "100%" }}
                        className="form-control"
                        type="text"
                        disabled
                        // value={
                        //   currentdate.toLocaleDateString() +
                        //   " " +
                        //   currentdate.getHours() +
                        //   ":" +
                        //   currentdate.getMinutes() +
                        //   ":" +
                        //   currentdate.getSeconds()
                        // }
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
                    /* onClick={this.formSubmit} */
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
  form: "dillerListForm",
});

function mapStateToProps(state) {
  return {
  }
}
export default connect(mapStateToProps, { })(form(DillerModal));
