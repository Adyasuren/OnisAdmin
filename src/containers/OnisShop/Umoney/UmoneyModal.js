import React, { Component } from "react";
import { Field, reduxForm, reset } from "redux-form";
import { connect } from "react-redux";
import Modal from "react-modal";
import niceAlert from "sweetalert";
import {
  AddUmoneySettings,
  UpdateUmoneySettings,
} from "../../../actions/OnisShop/UmoneyAction";
import { userList } from "../../../actions/onisUser_action";

class UmoneyModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      regno: "",
      selectedStorenm: "",
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
    const { createRecord, resetForm } = this.props;
    e.preventDefault();
    let tmp = {};
    tmp.regno = e.target.storeid.value;
    tmp.storeid = this.props.storeList.find(i => i.regno == e.target.storeid.value).id;
    tmp.posno = Number(e.target.posno.value);
    tmp.vsamid = e.target.vsamid.value;
    tmp.authid = e.target.authid.value;
    tmp.contractymd = new Date().toISOString().slice(0, 10)
    tmp.terminalid = e.target.terminalid.value;
    tmp.merchantName = e.target.merchantName.value;
    tmp.insby = Number(localStorage.getItem("id"));
    if (this.props.isNew) {
      this.props.AddUmoneySettings(tmp).then((res) => {
        if (res.success) {
          this.closeModal();
        }
      });
    } else {
      this.props
        .UpdateUmoneySettings(tmp, this.props.selectedRow.id)
        .then((res) => {
          if (res.success) {
            this.closeModal();
          }
        });
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
    const { storeList } = this.props;
    this.searchRegNo(e.target.value);
  };

  searchRegNo = (value) => {
    const { storeList } = this.props;
   let tmp = storeList.find((store) => store.id == value);
   if (tmp != null) {
     this.refs.regno.value = tmp.regno;
       this.setState({ regno: tmp.regno })
    }
  };
  storeChange = (e) => {
    const { storeList } = this.props;
    if(storeList) {
      this.setState({ selectedStorenm: storeList.find(i => i.regno == e.target.value).storenm })
    }
  }
  closeModal = () => {
    this.props.reset();
    this.setState({ regno: "" });
    this.props.closeModal();
    this.props.handleReload();
  };
  render() {
    const {selectedStorenm} = this.state;
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
                <strong>&lt;&lt; Umoney бүртгэх </strong>
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
                  <input type="text" list="data" name="storeid" defaultValue={this.checkSelectedRow("regno")} className="form-control" style={{ width: "100%" }} autoComplete="off" disabled={!this.props.isNew}  onChange={this.storeChange}/>
                  <datalist id="data">
                    {this.renderStoreList()}
                  </datalist>
                    {/*<select
                      name="storeid"
                      style={{ width: "100%" }}
                      className="form-control"
                      onChange={this.handleChangeStore}s
                      required
                      defaultValue={this.checkSelectedRow("storeid")}
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
                  <input type="text" ref="storenm" value={!this.props.isNew ? this.checkSelectedRow("storenm") : selectedStorenm} name="storenm" className="form-control" style={{ width: "100%" }} disabled/>
                  </div>
                </div>
                <div className="row">
                  <label htmlFor="company" className="col-md-4">
                    Посын дугаар<span className="red">*</span>
                  </label>
                  <div className="col-md-8">
                    <input
                      name="posno"
                      style={{ width: "100%" }}
                      className="form-control"
                      type="number"
                      required
                      defaultValue={this.checkSelectedRow("posno")}
                    />
                  </div>
                </div>
                <div className="row">
                  <label htmlFor="company" className="col-md-4">
                    Merchant name<span className="red">*</span>
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
                    VSAM ID<span className="red">*</span>
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
                    Authentication ID<span className="red">*</span>
                  </label>
                  <div className="col-md-8">
                    <input
                      name="authid"
                      style={{ width: "100%" }}
                      className="form-control"
                      type="text"
                      required
                      defaultValue={this.checkSelectedRow("authid")}
                    />
                  </div>
                </div>
                <div className="row">
                  <label htmlFor="company" className="col-md-4">
                    Terminal ID<span className="red">*</span>
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
               {/* <div className="row">
                  <label htmlFor="company" className="col-md-4">
                  Гэрээ байгуулсан огноо<span className="red">*</span>
                  </label>
                  <div className="col-md-8">
                    <input
                      name="contractDate"
                      type="date"
                      style={{ width: "100%" }}
                      className="form-control"
                      required
                      defaultValue={
                        this.checkSelectedRow("contractymd") == ""
                          ? ""
                          : new Date(this.checkSelectedRow("contractymd"))
                              .toISOString()
                              .slice(0, 10)
                        
                       />*/}
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
        </form>
      </Modal>
    );
  }
}
const form = reduxForm({
  form: "UmoneyModal",
});

function mapStateToProps(state) {
  return {
    storeList: state.OnisShop.rows,
  };
}
export default connect(mapStateToProps, {
  userList,
  AddUmoneySettings,
  UpdateUmoneySettings,
})(form(UmoneyModal));
