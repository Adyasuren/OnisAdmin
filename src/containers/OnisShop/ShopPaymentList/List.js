import React, { Component } from "react";
import { connect } from "react-redux";
import { Field, reduxForm } from "redux-form";
import TableFok from "../../../components/TableFok";
import { ShopPaymentListTableTitle } from "./TableTitle";
import { GetPaymentList } from "../../../actions/OnisShop/ShopPaymentAction";
import toastr from 'toastr'
import 'toastr/build/toastr.min.css'
import PaymentModal from "./Modal";

let searchobj = {}
var SearchObj1 = {};

toastr.options = {
  positionClass: 'toast-top-center',
  hideDuration: 1000,
  timeOut: 4000,
  closeButton: true
}


class Components extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      selectedRow: null,
    };
  }

  rowClick = (row) => {
    const { selectedRow } = this.state;
    if (this.state.selectedRow === null) {
      this.setState({ selectedRow: row });
    } else {
      if (selectedRow.rank !== row.rank) {
        this.setState({ selectedRow: row });
      } else {
        this.setState({ selectedRow: null });
      }
    }
  };

  openModal = () => {
    this.setState({ isOpen: true });
  };

  closeModal = (isReload) => {
    this.setState({ isOpen: false }, () => {
      if (isReload) {
        this.handleReload();
      }
    });
  };

  handleEdit = () => {
    const { selectedRow } = this.state;
    if (selectedRow != null) {
      if (!selectedRow.issend) {
        this.openModal();
      } else {
        toastr.error("Амжилттай гүйлгээг засах боломжгүй");
      }
    } else {
      toastr.error("Мөр сонгоно уу.");
    }
  }
  handleReload = (e) => {
    e.preventDefault();
    let tmp = {}
    tmp.regno = this.refs.regno.value == undefined ? "" : this.refs.regno.value;
    tmp.phoneno = this.refs.phoneno.value == undefined ? 0 : Number(this.refs.phoneno.value);
    tmp.startdate = this.refs.startdate.value;
    tmp.enddate = this.refs.enddate.value;
    tmp.type = this.refs.type.value == "0" ? null : Number(this.refs.type.value);
    tmp.issend = Number(this.refs.status.value)
    tmp.paymenttype = this.refs.paymenttype.value == "0" ? null : Number(this.refs.paymenttype.value);
    searchobj = tmp;
    this.props.GetPaymentList(tmp);
  }

  render() {
    const { isOpen, selectedRow } = this.state;
    const { paymentData, successSum } = this.props;
    return (
      <div className="animated fadeIn">
        <div className="row">
          <div className="col-lg-12 col-md-12 col-sm-12">
            <div className="card">
              <div className="card-header">
                <form id="myForm" onSubmit={this.handleReload}>
                  <div className="row" name="formProps">
                    <div className="form-group col-sm-1.3 mr-1-rem">
                      <label>Гүйлгээний огноо</label>
                      <div className="display-flex">
                        <Field
                          ref="startdate"
                          name="startdate"
                          component="input"
                          type="date"
                          className="form-control dateclss"
                        />
                      </div>
                    </div>
                    <div className="form-group col-sm-1.3 mr-1-rem">
                      <label>&nbsp;</label>
                      <div className="display-flex">
                        <Field
                          ref="enddate"
                          name="enddate"
                          component="input"
                          type="date"
                          className="form-control dateclss"
                        />
                      </div>
                    </div>
                    <div className="form-group col-sm-1.3 mr-1-rem">
                      <label>Төлөв</label>
                      <select
                        name="status"
                        ref="status"
                        style={{ width: "100%" }}
                        className="form-control"
                      >
                        <option value="2">Бүгд</option>
                        <option value="1">Амжилттай</option>
                        <option value="0">Амжилтгүй</option>
                      </select>
                    </div>
                    <div className="form-group col-sm-1.3 mr-1-rem">
                      <label>Төрөл</label>
                      <select
                        name="type"
                        ref="type"
                        style={{ width: "100%" }}
                        className="form-control"
                      >
                        <option value="0">Бүгд</option>
                        <option value="1">Лиценз</option>
                        <option value="2">Мобиком</option>
                        <option value="3">ЖиМобайл</option>
                      </select>
                    </div>
                    <div className="form-group col-sm-1.3 mr-1-rem">
                      <label>Төлбөрийн төрөл</label>
                      <select
                        name="paymenttype"
                        ref="paymenttype"
                        style={{ width: "100%" }}
                        className="form-control"
                      >
                        <option value="0">Бүгд</option>
                        <option value="1">Бэлэн</option>
                        <option value="2">Дансаар</option>
                        <option value="3">Qpay</option>
                      </select>
                    </div>
                    <div className="form-group col-sm-1.3 mr-1-rem">
                      <label>Регистрийн дугаар</label>
                      <Field
                        name="regno"
                        ref="regno"
                        component="input"
                        type="text"
                        className="form-control"
                      />
                    </div>
                    <div className="form-group col-sm-1.3 mr-1-rem">
                      <label>Утасны дугаар</label>
                      <Field
                        name="phoneno"
                        ref="phoneno"
                        component="input"
                        type="text"
                        className="form-control"
                      />
                    </div>
                  </div>
                  <button
                    type="button"
                    className="btn btn-edit-new mr-1-rem"
                    style={{float:'right'}}
                    onClick={this.handleEdit}
                  >
                    <i className="fa fa-paper-plane-o" />
                    Засах
                  </button>
                  <button
                    type="submit"
                    className="btn btn-primary"
                    style={{float:'right', }}
                  >
                    <i className="fa fa-retweet" />
                    Ачаалах
                  </button>
                </form>
              </div>
              <div className="card-block col-md-12 col-lg-12 col-sm-12 tmpresponsive">
                <TableFok
                  title={ShopPaymentListTableTitle}
                  data={paymentData}
                  rowClick={this.rowClick}
                  sumValue={successSum}
                />
              </div>
            </div>
          </div>
        </div>
        {/* <div>
          <button
            type="button"
            className="btn btn-primary"
            onClick={this.handleReload}
          >
            <i className="fa fa-retweet" />
            Ачаалах
          </button>
          <button
            type="button"
            className="btn btn-edit-new mr-1-rem"
            onClick={this.handleEdit}
          >
            <i className="fa fa-paper-plane-o" />
            Засах
          </button>
        </div> */}
        <PaymentModal
          isOpen={isOpen}
          openModal={this.openModal}
          closeModal={this.closeModal}
          selectedRow={selectedRow}
        />

        {/*  <LicenseDetailModal
          isOpen={isOpen}
          openModal={this.openModal}
          closeModal={this.closeModal}
          selectedRow={selectedRow}
        /> */}
      </div>
    );
  }
}

const form = reduxForm({ form: "masterList1" });

function mapStateToProps(state) {
  return {
    paymentData: state.shopPayment.paymentData,
    successSum: state.shopPayment.successSum,
    initialValues: Object.keys(searchobj).length === 0 ? {
      startdate: new Date().toISOString().slice(0, 10),
      enddate: new Date().toISOString().slice(0, 10),
    } : {
      startdate: new Date(searchobj.startdate).toISOString().slice(0, 10),
      enddate: new Date(searchobj.enddate).toISOString().slice(0, 10),
      phoneno: searchobj.phoneno,
      regno: searchobj.regno,
      type: searchobj.type,
      status: searchobj.status,
      paymenttype: searchobj.paymenttype
    }
  };
}

export default connect(mapStateToProps, {
  GetPaymentList
})(form(Components));
