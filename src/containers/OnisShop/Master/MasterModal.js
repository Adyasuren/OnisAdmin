import React, { Component } from "react";
import { Field, reduxForm, reset } from "redux-form";
import { connect } from "react-redux";
import Modal from "react-modal";
import { GetAllWindowList, AddMaster } from "../../../actions/OnisShop/LicenseAction";
import toastr from 'toastr'
import 'toastr/build/toastr.min.css'
toastr.options = {
    positionClass : 'toast-top-center',
    hideDuration: 1000,
    timeOut: 4000,
    closeButton: true
  }


class MasterModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      regno: "",
    };
  }

  componentWillMount() {
    this.props.GetAllWindowList();
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
    const { isNew, selectedRow } = this.props;
    let values = this.refs.window.value.split(".");
    let tmp = {
      id: isNew ? 0 : selectedRow.id,
      name: values[1],
      menuid: Number(values[0]),
      unit: Number(this.refs.unit.value),
      term: Number(this.refs.term.value),
      price: Number(this.refs.price.value),
      isenable: 1
    }

    this.props.AddMaster(tmp).then((res) => {
      if(res.success)
      {
        toastr.success(res.message);
        this.closeModal(true);
      }
      else
      {
        toastr.error(res.message);
      }
    })
  };

  renderWindowList = () => {
    const { windowList } = this.props;
    let tmp = windowList.map((item, i) => (
    <option value={`${item.id}.${item.name}`}>{item.name}</option>
    ))

    return tmp;
  }

  closeModal = (isReload) => {
    this.props.reset();
    this.props.closeModal(isReload);
  };

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
                <strong>&lt;&lt; Үнэ бүртгэх </strong>
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
                    Цонх<span className="red">*</span>
                  </label>
                  <div className="col-md-8">
                    <select
                      name="window"
                      ref="window"
                      style={{ width: "100%" }}
                      className="form-control"
                      required
                      defaultValue={`${this.checkSelectedRow("menuid")}.${this.checkSelectedRow("name")}`}
                    >
                      {this.renderWindowList()}
                    </select>
                  </div>
                </div>
                <div className="row">
                  <label htmlFor="company" className="col-md-4">
                    Нэгж<span className="red">*</span>
                  </label>
                  <div className="col-md-8">
                    <input
                      name="unit"
                      ref="unit"
                      pattern="[0-9]*"
                      style={{ width: "100%" }}
                      className="form-control"
                      type="number"
                      required
                      defaultValue={this.checkSelectedRow("unit")}
                    />
                  </div>
                </div>
                <div className="row">
                  <label htmlFor="company" className="col-md-4">
                    Хугацаа<span className="red">*</span>
                  </label>
                  <div className="col-md-8">
                    <select
                      name="term"
                      ref="term"
                      style={{ width: "100%" }}
                      className="form-control"
                      required
                      defaultValue={this.checkSelectedRow("term")}
                    >
                      <option value="1">Жил</option>
                      <option value="2">Сар</option>
                    </select>
                  </div>
                </div>
                <div className="row">
                  <label htmlFor="company" className="col-md-4">
                    Үнэ<span className="red">*</span>
                  </label>
                  <div className="col-md-8">
                    <input
                      name="price"
                      ref="price"
                      pattern="[0-9]*"
                      style={{ width: "100%" }}
                      className="form-control"
                      type="number"
                      required
                      defaultValue={this.checkSelectedRow("price")}
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
  form: "MasterModal",
});

function mapStateToProps(state) {
  return {
    windowList: state.shopLicense.windowList,
  };
}
export default connect(mapStateToProps, {
  GetAllWindowList,
  AddMaster
})(form(MasterModal));
