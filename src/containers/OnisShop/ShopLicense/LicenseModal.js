import React, { Component } from "react";
import { Field, reduxForm, reset } from "redux-form";
import { connect } from "react-redux";
import Modal from "react-modal";
import niceAlert from "sweetalert";
import TableFok from "../../../components/TableFok";
import { userList } from "../../../actions/onisUser_action";
import { MasterListTableTitle } from "./TableTitle";

class MasterModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      regno: "",
    };
  }

  componentWillMount() {
    let tmp = {
      regno: "",
      phoneno: 0,
      distcode: "",
      startdate: "2020-01-01",
      enddate: new Date().toISOString().slice(0, 10),
    };
    this.props.userList(tmp);
  }

  checkSelectedRow = (name) => {
    if (this.props.selectedRow == null) {
      return "";
    } else {
      if (this.props.isNew) {
        return "";
      } else {
        /* if(name == 'storeid')
        {
          this.searchRegNo(this.props.selectedRow[name]);
        } */
        return this.props.selectedRow[name];
      }
    }
  };

  formSubmit = (e) => {
    const { createRecord, resetForm } = this.props;
    e.preventDefault();
  };

  renderStoreList = () => {
    const { storeList } = this.props;
    let tmp = storeList.map((item, i) => {
      return (
        <option key={i} value={item.id}>
          {`${item.regno} ${item.storenm}`}
        </option>
      );
    });
    return tmp;
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

  closeModal = () => {
    this.props.reset();
    this.setState({ regno: "" });
    this.props.closeModal();
  };

  render() {
    var currentdate = new Date();
    return (
      <Modal
        isOpen={this.props.isOpen}
        closeModal={() => this.closeModal()}
        className="animatedpopup animated fadeIn col-md-10 mx-auto"
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
              <div className="card-block col-md-12 col-lg-12 col-sm-12 tmpresponsive" style={{ display: "flex" }}>
              <div className="col-md-4 col-lg-4 col-sm-4 tmpresponsive">
              <div className="row">
                  <label htmlFor="company" className="col-md-4">
                    Бүтээгдэхүүн<span className="red">*</span>
                  </label>
                  <div className="col-md-8">
                    <select
                      name="storeid"
                      style={{ width: "100%" }}
                      className="form-control"
                      required
                      defaultValue={this.checkSelectedRow("storeid")}
                    >
                      <option />
                      <option value="1">Оньс шоп</option>
                    </select>
                  </div>
                </div>
                <div className="row">
                  <label htmlFor="company" className="col-md-4">
                    Дэлгүүр<span className="red">*</span>
                  </label>
                  <div className="col-md-8">
                    <input
                      name="merchantName"
                      style={{ width: "100%" }}
                      className="form-control"
                      type="text"
                      required
                      defaultValue={this.checkSelectedRow("merchantname")}
                    />
                  </div>
                </div>
                <div className="row">
                  <label htmlFor="company" className="col-md-4">
                    Нэхэмжлэх дугаар<span className="red">*</span>
                  </label>
                  <div className="col-md-8">
                    <input
                      name="vsamid"
                      style={{ width: "100%" }}
                      className="form-control"
                      type="text"
                      required
                      defaultValue={this.checkSelectedRow("vsamid")}
                    />
                  </div>
                </div>
                <div className="row">
                  <label htmlFor="company" className="col-md-4">
                    Төлөх дүн<span className="red">*</span>
                  </label>
                  <div className="col-md-8">
                    <input
                      name="authid"
                      style={{ width: "100%" }}
                      className="form-control"
                      type="text"
                      disabled
                      defaultValue={this.checkSelectedRow("authid")}
                    />
                  </div>
                </div>
                <div className="row">
                  <label htmlFor="company" className="col-md-4">
                    Төлбөрийн хэлбэр<span className="red">*</span>
                  </label>
                  <div className="col-md-8">
                    <select
                      name="storeid"
                      style={{ width: "100%" }}
                      className="form-control"
                      required
                      defaultValue={this.checkSelectedRow("storeid")}
                    >
                      <option />
                      <option value="1">Бэлэн</option>
                    </select>
                  </div>
                </div>
                <div className="row">
                  <label htmlFor="company" className="col-md-4">
                    Гүйлгээний огноо<span className="red">*</span>
                  </label>
                  <div className="col-md-8">
                    <input
                      name="contractDate"
                      type="date"
                      style={{ width: "100%" }}
                      className="form-control"
                      required
                    />
                  </div>
                </div>
                <div className="row">
                  <label htmlFor="company" className="col-md-4">
                    Төлсөн дүн<span className="red">*</span>
                  </label>
                  <div className="col-md-8">
                    <input
                      name="terminalid"
                      style={{ width: "100%" }}
                      className="form-control"
                      type="text"
                      required
                      defaultValue={this.checkSelectedRow("terminalid")}
                    />
                  </div>
                </div>
                <div className="row">
                  <label htmlFor="company" className="col-md-4">
                    Гүйлгээний утга<span className="red">*</span>
                  </label>
                  <div className="col-md-8">
                    <input
                      name="terminalid"
                      style={{ width: "100%" }}
                      className="form-control"
                      type="text"
                      required
                      defaultValue={this.checkSelectedRow("terminalid")}
                    />
                  </div>
                </div>
              </div>
              <div className="col-md-8 col-lg-8 col-sm-8 tmpresponsive">
                <TableFok data={[]} title={MasterListTableTitle}/>
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
    storeList: state.OnisShop.rows,
  };
}
export default connect(mapStateToProps, {
  userList,
})(form(MasterModal));
