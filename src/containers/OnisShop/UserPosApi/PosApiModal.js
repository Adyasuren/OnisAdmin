import React, { Component } from "react";
import { Field, reduxForm, reset } from "redux-form";
import { connect } from "react-redux";
import Modal from "react-modal";
import niceAlert from "sweetalert";
import UserPosApi from "../../../api/OnisShop/UserPosApi";
import { userList } from "../../../actions/onisUser_action";
import toastr from "toastr";
import "toastr/build/toastr.min.css";
toastr.options = {
  positionClass: "toast-top-center",
  hideDuration: 1000,
  timeOut: 4000,
  closeButton: true,
};

class PosApiModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      regno: "",
      selectedStorenm: "",
      file: {},
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
    e.preventDefault();
    let formProps = {};
    formProps.regno = this.refs.regno.value;
    formProps.insby = Number(localStorage.getItem("id"));
    formProps.type = Number(this.refs.apitype.value);
    let formData = new FormData();
    formData.append("file", this.state.file);
    UserPosApi.RegisterPosApi(formData, formProps).then((res) => {
      console.log(res)
      if (res.success) {
        toastr.success(res.message);
        this.closeModal(res.success);
      } else {
        toastr.error(res.message);
      }
    });
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
      this.refs.regno.value = tmp.regno;
    }
  };
  storeChange = (e) => {
    const { storeList } = this.props;
    if(storeList) {
      this.setState({ selectedStorenm: storeList.find(i => i.regno == e.target.value).storenm })
    }
  }
  closeModal = (success) => {
    this.props.reset();
    this.setState({ regno: "" });
    this.props.closeModal(success);
  };

  onChangeFile = (e) => {
    this.setState({ file: e.target.files[0] });
    this.refs.fileInput.value = e.target.files[0].name;
  };

  render() {
    const {selectedStorenm} = this.state;
    const { isNew } = this.props;
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
                <strong>&lt;&lt; PosApi бүртгэх </strong>
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
                  <input type="text" list="data" name="regno" ref="regno" className="form-control" style={{ width: "100%" }} autoComplete="off" onChange={this.storeChange}/>
                  <datalist id="data">
                    {this.renderStoreList()}
                  </datalist>
                    {/*<select
                      name="regno"
                      style={{ width: "100%" }}
                      className="form-control"
                      onChange={this.handleChangeStore}
                      required
                      defaultValue={this.checkSelectedRow("regno")}
                    >
                      <option />
                      {this.renderStoreList()}
                    </select>*/}
                  </div>
                </div>
                <div className="row">
                  <label htmlFor="company" className="col-md-4">
                    Татвар төлөгчийн нэр<span className="red">*</span>
                  </label>
                  <div className="col-md-8">
                  <input type="text" ref="storenm" value={selectedStorenm} name="storenm" className="form-control" style={{ width: "100%" }} disabled/>
                  </div>
                </div>
                <div className="row">
                  <label htmlFor="company" className="col-md-4">
                    Төрөл<span className="red">*</span>
                  </label>
                  <div className="col-md-8">
                    <select
                      name="apitype"
                      ref="apitype"
                      style={{ width: "100%" }}
                      className="form-control"
                      required
                      defaultValue={this.checkSelectedRow("type")}
                    >
                      <option value="1">Үндсэн</option>
                      <option value="2">Нэмэлт</option>
                    </select>
                  </div>
                </div>
                <div className="row">
                  <label htmlFor="company" className="col-md-4">
                    PosApi байршил<span className="red">*</span>
                  </label>
                  <div className="col-md-8" style={{ display: "flex" }}>
                    <input
                      name="fileInput"
                      ref="fileInput"
                      type="text"
                      defaultValue={this.checkSelectedRow("url")}
                      disabled
                      style={{
                        backgroundColor: "white",
                        borderRightStyle: "none",
                        color: "#607d8b",
                      }}
                      className="col-md-8 form-control"
                    />
                    <input
                      className="col-md-4 form-control"
                      name="file"
                      type="file"
                      ref="file"
                      required={isNew}
                      style={{ borderLeftStyle: "none", color: "white" }}
                      accept=".zip, .rar"
                      onChange={this.onChangeFile}
                    />
                  </div>
                </div>
                <div className="row">
                  {/*<label htmlFor="company" className="col-md-4">
                    Төлөв<span className="red">*</span>
                  </label>
                  <div className="col-md-8">
                    <select
                      name="status"
                      style={{ width: "100%" }}
                      className="form-control"
                      required
                      defaultValue={this.checkSelectedRow("status")}
                    > 
                      <option value="1">Идэвхитэй</option>
                      <option value="0">Идэвхигүй</option>
                    </select>
                    </div>*/}
                </div>
                <div className="row">
                  <label htmlFor="company" className="col-md-4">
                    Бүртгэсэн хэрэглэгч<span className="red">*</span>
                  </label>
                  <div className="col-md-8">
                    <input
                      name="insby"
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
  form: "PosApiModal",
});

function mapStateToProps(state) {
  return {
    storeList: state.OnisShop.rows,
  };
}
export default connect(mapStateToProps, {
  userList,
})(form(PosApiModal));
