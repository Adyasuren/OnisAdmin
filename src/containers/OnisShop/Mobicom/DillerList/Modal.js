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
      className="animatedpopup animated fadeIn col-md-4 mx-auto"
    >
      <form id="popupform" name="popupform" onSubmit={this.formSubmit}>
        <div className="animated fadeIn ">
          <div className="card">
            <div className="card-header test">
              <strong>&lt;&lt; Баннер бүртгэх </strong>
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
                    Диллер регистр<span className="red">*</span>
                </label>
                <div className="col-md-8">
                  <input
                    name="dealerRegno"
                    ref="dealerRegno"
                    style={{ width: "100%" }}
                    className="form-control"
                    type="text"
                    defaultValue={this.getInitialValues("dealerregno")}
                  />
                </div>
              </div>
              <div className="row">
                <label htmlFor="company" className="col-md-4">
                    Овог<span className="red">*</span>
                </label>
                <div className="col-md-8">
                  <input
                    name="lastname"
                    ref="lastname"
                    style={{ width: "100%" }}
                    className="form-control"
                    type="text"
                    defaultValue={this.getInitialValues("lastname")}
                  />
                </div>
              </div>
              <div className="row">
                <label htmlFor="company" className="col-md-4">
                    Нэр<span className="red">*</span>
                </label>
                <div className="col-md-8">
                  <input
                    name="dealerName"
                    ref="dealerName"
                    style={{ width: "100%" }}
                    className="form-control"
                    type="text"
                    defaultValue={this.getInitialValues("dealername")}
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
                    type="number"
                    defaultValue={this.getInitialValues("phoneno")}
                  />
                </div>
              </div>
              <div className="row">
                <label htmlFor="company" className="col-md-4">
                    Имэйл<span className="red">*</span>
                </label>
                <div className="col-md-8">
                  <input
                    name="email"
                    ref="email"
                    style={{ width: "100%" }}
                    className="form-control"
                    type="number"
                    defaultValue={this.getInitialValues("email")}
                  />
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
                      defaultValue={this.getInitialValues("isenable")}
                    >
                      <option value="1">Идэвхтэй</option>
                      <option value="2">Идэвхгүй</option>
                    </select>
                  </div>
                </div>
            </div>
            <div className="card-footer test">
              <div className="card-right">
                <button type="button" className="btn btn-sm btn-primary button-ban" onClick={() => this.closeModal()}>
                  <i className="fa fa-ban" />
                  Болих
                </button>
                <button type="submit" className="btn btn-sm btn-primary button-save">
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
