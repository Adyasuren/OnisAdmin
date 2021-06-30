import React, { Component } from "react";
import { Field, reduxForm } from "redux-form";
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

class BannerModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      file: {},
      file1: {}
    }
  }

  formSubmit = (e) => {
    e.preventDefault();
    if(this.dateDiff(e.target.startdate.value, e.target.enddate.value)) {
      let formProps = {};
      formProps.bannernm = e.target.bannernm.value;
      formProps.startymd = e.target.startdate.value;
      formProps.endymd = e.target.enddate.value;
      formProps.insby = Number(localStorage.getItem("id"));
      formProps.isenable = e.target.isenable.value;
      if(this.props.isNew) {
        let formData = new FormData();
        formData.append("img", this.state.file);
        formData.append("img2", this.state.file1)
        ShopBannerApi.AddBanner(formData, formProps).then(res => {
            if(res.success) {
                toastr.success(res.message);
                this.closeModal(res.success);
            } else {
                toastr.error(res.message);
            }
        });
      } else {
        formProps.id = this.props.selectedRow.id;
        ShopBannerApi.EditBanner(formProps).then((res) => {
          if(res.success) {
                toastr.success(res.message);
                this.closeModal(res.success);
            } else {
                toastr.error(res.message);
            }
        })
      }
    }
  }

  closeModal = (success) => {
    this.props.reset();
    this.props.closeModal(success);
  }

  onChangeFile1 = (e) => {
    this.setState({ file1: e.target.files[0] });
  }

  onChangeFile = (e) => {
    this.setState({ file: e.target.files[0] });
   // this.refs.fileInput.value = e.target.files[0].name;
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

  dateChange = (e) => {
    let sdate, edate;
    if(e.target.name == "enddate") {
      sdate = this.refs.startdate.value
      edate = e.target.value
    } else {
      sdate = e.target.value
      edate = this.refs.enddate.value
    }
    this.dateDiff(sdate, edate)
  }

  checkSelectedRow = (name) => {
    if (this.props.selectedRow == null) {
      return null;
    } else {
      if (this.props.isNew) {
        return null;
      } else {
        return this.props.selectedRow[name];
      }
    }
  };


  render() {
    const {isNew} = this.props;
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
                    defaultValue={this.checkSelectedRow("bannernm")}
                  />
                </div>
              </div>
              {
                isNew ? 
                <div>
                   <div className="row">
                <label htmlFor="company" className="col-md-4">
                    Нэвтрэх баннерын байршил<span className="red">*</span>
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
                    Хэрэглэгчийн баннерын байршил<span className="red">*</span>
                </label>
                <div className="col-md-8" style={{ display: 'flex' }}>
                    <input
                        className="form-control"
                        name="file1"
                        style={{ width: "100%" }}
                        type="file"
                        ref="file1"
                        required
                        accept="image/*"
                        onChange={this.onChangeFile1}
                    />
                </div>
              </div>
                </div>
                : null
              }
              <div className="row">
                <label htmlFor="company" className="col-md-4">
                  Эхлэх огноо<span className="red">*</span>
                </label>
                <div className="col-md-8">
                  <input type={"date"} name="startdate"
                    ref="startdate"
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
                <input
                    type={"date"}
                    name="enddate"
                    ref="enddate"
                    type="date"
                    style={{ width: "100%" }}
                    onChange={this.dateChange}
                    className="form-control"
                    required
                    defaultValue={this.checkSelectedRow("endymd") == null ? null : this.checkSelectedRow("endymd").substring(0,10)} />
                </div>
              </div>
              <div className="row">
                <label htmlFor="company" className="col-md-4">
                  Төлөв<span className="red">*</span>
                </label>
                <div className="col-md-8">
                  <select className="form-control" ref="isenable" name="isenable" style={{ width: "100%" }} defaultValue={this.checkSelectedRow("isenable")}>
                    <option value={1}>Идэвхтэй</option>
                    <option value={2}>Идэвхигүй</option>
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
  form: "shopBannerModal",
});

function mapStateToProps(state) {
  return {
    storeList: state.OnisShop.rows,
    initialValues: {
      startdate: new Date().toISOString().slice(0, 10),
      enddate: new Date().toISOString().slice(0, 10),
    },
  }
}
export default connect(mapStateToProps, { 
  userList,
})(form(BannerModal));
