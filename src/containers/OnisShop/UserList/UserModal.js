import React, { Component } from "react";
import { Field, reduxForm, reset } from "redux-form";
import { connect } from "react-redux";
import Modal from "react-modal";
import niceAlert from "sweetalert";
import ShopUserList from "../../../api/OnisShop/UserListApi";
import { userList } from "../../../actions/onisUser_action";
import toastr from "toastr";
import "toastr/build/toastr.min.css";
toastr.options = {
  positionClass: "toast-top-center",
  hideDuration: 1000,
  timeOut: 4000,
  closeButton: true,
};

class ShopUserModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      regno: "",
      selectedStorenm: "",
    };
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

  formSubmit = (e) => {
    e.preventDefault();
    let formProps = {};
    formProps.insby = Number(localStorage.getItem("id"));
    formProps.regno = Number(this.refs.apitype.value);
    let formData = new FormData();
    formData.append("file", this.state.file);
  };

  closeModal = (success) => {
    this.props.reset();
    this.setState({ regno: "" });
    this.props.closeModal(success);
  };

  storeChange = (e) => {
    const { storeList } = this.props;
    if(storeList) {
      this.setState({ selectedStorenm: storeList.find(i => i.regno == e.target.value).storenm })
    }
  }

  render() {
    const { isNew } = this.props;
    const {selectedStorenm} = this.state;
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
                <strong>&lt;&lt; Хэрэглэгч </strong>
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
                  <input type="text" list="data" name="storeid" className="form-control" style={{ width: "100%" }} autoComplete="off" onChange={this.storeChange}/>
                  <datalist id="data">
                    {this.renderStoreList()}
                  </datalist>
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
  form: "ShopUserModal",
});

function mapStateToProps(state) {
  return {
    storeList: state.OnisShop.rows,
  };
}
export default connect(mapStateToProps, {
  userList,
})(form(ShopUserModal));
