import React, { Component } from "react";
import { reduxForm } from "redux-form";
import { connect } from "react-redux";
import Modal from "react-modal";
import ShopBannerApi from "../../../api/OnisShop/ShopBannerApi"
import { userList } from "../../../actions/onisUser_action";
import toastr from 'toastr'
import 'toastr/build/toastr.min.css'
toastr.options = {
    positionClass : 'toast-top-center',
    hideDuration: 1000,
    timeOut: 4000,
    closeButton: true
  }

class PosApiModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      file: {},
    }
  }

  formSubmit = (e) => {
    e.preventDefault();
    let formProps = {};
    formProps.bannernm = this.refs.bannernm.value;
    formProps.startymd = e.target.startdate.value;
    formProps.endymd = e.target.enddate.value;
    formProps.insby = Number(localStorage.getItem("id"));
    let formData = new FormData();
    formData.append("img", this.state.file);
    ShopBannerApi.AddBanner(formData, formProps).then(res => {
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

  onChangeFile = (e) => {
    this.setState({ file: e.target.files[0] });
    this.refs.fileInput.value = e.target.files[0].name;
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
                    Баннерийн нэр<span className="red">*</span>
                </label>
                <div className="col-md-8">
                  <input
                    name="bannernm"
                    ref="bannernm"
                    style={{ width: "100%" }}
                    className="form-control"
                    type="text"
                    required
                  />
                </div>
              </div>
              <div className="row">
                <label htmlFor="company" className="col-md-4">
                    Баннерын байршил<span className="red">*</span>
                </label>
                <div className="col-md-8" style={{ display: 'flex' }}>
                    <input
                        className="form-control"
                        name="file"
                        style={{ width: "100%" }}
                        type="file"
                        ref="file"
                        required
                        accept="image/*"
                        onChange={this.onChangeFile}
                    />
                </div>
              </div>
              <div className="row">
                <label htmlFor="company" className="col-md-4">
                  Эхлэх огноо<span className="red">*</span>
                </label>
                <div className="col-md-8">
                  <input
                    name="startdate"
                    ref="startdate"
                    type="date"
                    style={{ width: "100%" }}
                    className="form-control"
                    required
                  />
                </div>
              </div>
              <div className="row">
                <label htmlFor="company" className="col-md-4">
                  Дуусах огноо<span className="red">*</span>
                </label>
                <div className="col-md-8">
                  <input
                    name="enddate"
                    ref="enddate"
                    type="date"
                    style={{ width: "100%" }}
                    className="form-control"
                    required
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
  form: "shopBannerList",
});

function mapStateToProps(state) {
  return {
    storeList: state.OnisShop.rows,
  }
}
export default connect(mapStateToProps, { 
  userList,
})(form(PosApiModal));
