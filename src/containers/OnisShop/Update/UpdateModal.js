import React, { Component } from "react";
import { reduxForm } from "redux-form";
import { connect } from "react-redux";
import Modal from "react-modal";
import ShopUpdateApi from "../../../api/OnisShop/ShopUpdateApi"
import toastr from 'toastr'
import 'toastr/build/toastr.min.css'
toastr.options = {
    positionClass : 'toast-top-center',
    hideDuration: 1000,
    timeOut: 4000,
    closeButton: true
  }

class UpdateModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      file: {},
      ui32: {},
      ui64: {},
      api32: {},
      api64: {},
    }
  }

  formSubmit = (e) => {
    e.preventDefault();
    let formProps = {};
    formProps.NAME = this.refs.decsription.value;
    formProps.UIVERSION = this.refs.uiversion.value;
    formProps.APIVERSION = this.refs.apiversion.value;
    formProps.TYPE = this.refs.type.value;
    formProps.MIGRATE = this.refs.migrate.value;
    let formData = new FormData();
    formData.append("ui32", this.state.ui32);
    formData.append("ui64", this.state.ui64);
    formData.append("api32", this.state.api32);
    formData.append("api64", this.state.api64);
    console.log(formProps);
    ShopUpdateApi.AddNewUpdate(formData, formProps).then((res) => {
        if(res.success)
        {
            toastr.success(res.message);
            this.closeModal(res.success);
        }
        else
        {
            toastr.error(res.message);
        }
    });
  }

  closeModal = (success) => {
    this.props.reset();
    this.props.closeModal(success);
  }

  onChangeFile = (e, type) => {
    if (type == "ui32") {
      this.setState({ ui32: e.target.files[0] });
    } else if (type == "ui64") {
      this.setState({ ui64: e.target.files[0] });
    } else if (type == "api32") {
      this.setState({ api32: e.target.files[0] });
    } else if (type == "api64") {
      this.setState({ api64: e.target.files[0] });
    }
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
              <strong>&lt;&lt; Шинэчлэл бүртгэх </strong>
              <button
                className="tn btn-sm btn-primary button-ban card-right"
                onClick={() => this.closeModal()}
              >
                X
              </button>
            </div>
            <div className="card-block col-md-12 col-lg-12 col-sm-12">
              <div className="row">
                <label htmlFor="company" className="col-md-4">
                    Тайлбар<span className="red">*</span>
                </label>
                <div className="col-md-8">
                  <input
                    name="decsription"
                    ref="decsription"
                    style={{ width: "100%" }}
                    className="form-control"
                    type="text"
                    required
                  />
                </div>
              </div>
              <div className="row">
                <label htmlFor="company" className="col-md-4">
                    UI version<span className="red">*</span>
                </label>
                <div className="col-md-8">
                  <input
                    name="uiversion"
                    ref="uiversion"
                    style={{ width: "100%" }}
                    className="form-control"
                    type="text"
                    required
                  />
                </div>
              </div>
              <div className="row">
                <label htmlFor="company" className="col-md-4">
                    API version<span className="red">*</span>
                </label>
                <div className="col-md-8">
                  <input
                    name="apiversion"
                    ref="apiversion"
                    style={{ width: "100%" }}
                    className="form-control"
                    type="text"
                    required
                  />
                </div>
              </div>
              <div className="row">
                <label htmlFor="company" className="col-md-4">
                    Type<span className="red">*</span>
                </label>
                <div className="col-md-8">
                  <select
                    name="type"
                    ref="type"
                    style={{ width: "100%" }}
                    className="form-control"
                    type="text"
                    required
                  >
                        <option value="1">Заавал</option>
                        <option value="2">Заавал биш</option>
                </select>
                </div>
              </div>
              <div className="row">
                <label htmlFor="company" className="col-md-4">
                    Бааз<span className="red">*</span>
                </label>
                <div className="col-md-8">
                  <select
                    name="migrate"
                    ref="migrate"
                    style={{ width: "100%" }}
                    className="form-control"
                    type="text"
                    required
                  >
                        <option value="1">Тийм</option>
                        <option value="2">Үгүй</option>
                </select>
                </div>
              </div>
              <div className="row">
                <label htmlFor="company" className="col-md-4">
                    UI байршил x32<span className="red">*</span>
                </label>
                <div className="col-md-8" style={{ display: 'flex' }}>
                    <input
                        className="form-control"
                        name="ui32"
                        style={{ width: "100%" }}
                        type="file"
                        ref="ui32"
                        required
                        accept=".zip, .rar"
                        onChange={(e) => this.onChangeFile(e, "ui32")}
                    />
                </div>
              </div>
              <div className="row">
                <label htmlFor="company" className="col-md-4">
                    UI байршил x64<span className="red">*</span>
                </label>
                <div className="col-md-8" style={{ display: 'flex' }}>
                    <input
                        className="form-control"
                        name="ui64"
                        style={{ width: "100%" }}
                        type="file"
                        ref="ui64"
                        required
                        accept=".zip, .rar"
                        onChange={(e) => this.onChangeFile(e, "ui64")}
                    />
                </div>
              </div>
              <div className="row">
                <label htmlFor="company" className="col-md-4">
                    API байршил x32<span className="red">*</span>
                </label>
                <div className="col-md-8" style={{ display: 'flex' }}>
                    <input
                        className="form-control"
                        name="api32"
                        style={{ width: "100%" }}
                        type="file"
                        ref="api32"
                        required
                        accept=".zip, .rar"
                        onChange={(e) => this.onChangeFile(e, "api32")}
                    />
                </div>
              </div>
              <div className="row">
                <label htmlFor="company" className="col-md-4">
                    API байршил x64<span className="red">*</span>
                </label>
                <div className="col-md-8" style={{ display: 'flex' }}>
                    <input
                        className="form-control"
                        name="api64"
                        style={{ width: "100%" }}
                        type="file"
                        ref="api64"
                        required
                        accept=".zip, .rar"
                        onChange={(e) => this.onChangeFile(e, "api64")}
                    />
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
                        value={localStorage.getItem("id")}
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
  form: "shopUpdateModal",
});

function mapStateToProps(state) {
  return {
    // storeList: state.OnisShop.rows,
  }
}
export default connect(mapStateToProps, { })(form(UpdateModal));
