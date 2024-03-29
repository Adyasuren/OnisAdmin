import React, { Component } from "react";
import { Field, reduxForm, reset } from "redux-form"; import { connect } from "react-redux";
import Modal from "react-modal";
import {
  AddUpointSettings,
  UpdateUpointSettings,
} from "../../../actions/OnisShop/UpointAction";
import { userList } from "../../../actions/onisUser_action";
import toastr from "toastr";
import "toastr/build/toastr.min.css";
toastr.options = {
  positionClass: "toast-top-center",
  hideDuration: 1000,
  timeOut: 4000,
  closeButton: true,
};

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

  componentWillReceiveProps(prevProps) {
    if (prevProps.selectedRow !== this.props.selectedRow) {
      if (prevProps.selectedRow != null && prevProps.selectedRow != undefined) {
        this.setState({ selectedStorenm: prevProps.selectedRow.storenm })
      } else {
        this.setState({ selectedStorenm: null })
      }
    }
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
    tmp.regno = this.refs.regno.value;
    tmp.storeid = storeList.find(x => x.regno == this.refs.regno.value).id;
    tmp.posno = Number(e.target.posno.value);
    tmp.insby = Number(localStorage.getItem("id"));
    tmp.saletransaction = Number(e.target.saletransaction.value);
    if (this.props.isNew) {
      this.props.AddUpointSettings(tmp).then((res) => {
        if (res.success) {
          toastr.success(res.message);
          this.closeModal();
        } else {
          toastr.error(res.message);
        }
      });
    } else {
      this.props
        .UpdateUpointSettings(tmp, this.props.selectedRow.id)
        .then((res) => {
          if (res.success) {
            toastr.success(res.message);
            this.closeModal();
          } else {
            toastr.error(res.message);
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
    if (storeList) {
      this.setState({ selectedStorenm: storeList.find(i => i.regno == e.target.value).storenm })
    }
  }
  closeModal = (isReload) => {
    this.setState({ regno: "" });
    this.props.closeModal(isReload);
    this.props.reset();
    this.props.handleReload();
  };

  render() {
    const { selectedStorenm } = this.state;
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
                <strong>&lt;&lt; Upoint мерчант бүртгэх </strong>
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
                    <input type="text" list="data" name="regno" ref="regno" defaultValue={this.checkSelectedRow("regno")} className="form-control" style={{ width: "100%" }} autoComplete="off" onChange={this.storeChange} />
                    <datalist id="data">
                      {this.renderStoreList()}
                    </datalist>
                    {/*  <select
                      name="storeid"
                      style={{ width: "100%" }}
                      className="form-control"
                      onChange={this.handleChangeStore}
                      required
                      defaultValue={this.checkSelectedRow("storeid")}
                    >
                      <option />
                      {this.renderStoreList()}
                    </select> */}
                  </div>
                </div>
                <div className="row">
                  <label htmlFor="company" className="col-md-4">
                    Татвар төлөгчийн нэр<span className="red">*</span>
                  </label>
                  <div className="col-md-8">
                    <input type="text" ref="storenm" value={selectedStorenm} name="storenm" className="form-control" style={{ width: "100%" }} disabled />
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
                    Мэдээлэл дамжуулах эсэх<span className="red">*</span>
                  </label>
                  <div className="col-md-8">
                    <select
                      name="saletransaction"
                      style={{ width: "100%" }}
                      className="form-control"
                      required
                      defaultValue={this.checkSelectedRow("saletransaction")}
                    >
                      <option value={1}>Тийм</option>
                      <option value={2}>Үгүй</option>
                    </select>
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
  form: "UpointModal",
});

function mapStateToProps(state) {
  return {
    storeList: state.OnisShop.rows,
  };
}
export default connect(mapStateToProps, {
  userList,
  AddUpointSettings,
  UpdateUpointSettings,
})(form(UmoneyModal));
