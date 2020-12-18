import React, { Component } from "react";
import { connect } from "react-redux";
import { Field, reduxForm } from "redux-form";
import TableFok from "../../../components/TableFok";
import { ShopPaymentListTableTitle } from "./TableTitle";
import {  GetPaymentList } from "../../../actions/OnisShop/ShopPaymentAction";
import LicenseModal from "../ShopLicense/LicenseModal";
import LicenseDetailModal from "../ShopLicense/LicenseDetailModal";
import PaymentModal from "./Modal";

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
      if(isReload)
      {
        this.handleReload();
      }
    });
  };

  handleEdit = () => {
    if (this.state.selectedRow != null) {
      this.openModal();
    } else {
      console.log("Мөр сонго");
    }
  }
  handleReload = () => {
    let tmp = {}
    tmp.regno = this.refs.regno.value == undefined ? "" : this.refs.regno.value;
    tmp.phoneno = this.refs.phoneno.value == undefined ? 0 : this.refs.phoneno.value;
    tmp.startdate = this.refs.startdate.value;
    tmp.enddate = this.refs.enddate.value;
    tmp.type = this.refs.type.value == "0" ? null : Number(this.refs.type.value);
    tmp.issend = Number(this.refs.status.value)
    this.props.GetPaymentList(tmp);
  }

  render() {
    const { isOpen, selectedRow } = this.state;
    const { paymentData } = this.props;
    return (
      <div className="animated fadeIn">
        <div className="row">
          <div className="col-lg-12 col-md-12 col-sm-12">
            <div className="card">
              <div className="card-header">
                <form id="myForm">
                  <div className="row" name="formProps">
                    <div className="form-group col-sm-1.3 mr-1-rem">
                      <label>Нэхэмжлэхийн огноо</label>
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
                </form>
              </div>
              <div className="card-block col-md-12 col-lg-12 col-sm-12 tmpresponsive">
                <TableFok
                  title={ShopPaymentListTableTitle}
                  data={paymentData}
                  rowClick={this.rowClick}
                />
              </div>
            </div>
          </div>
        </div>
        <div>
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
        </div>
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
    initialValues: {
      startdate: new Date().toISOString().slice(0, 10),
      enddate: new Date().toISOString().slice(0, 10),
    },
  };
}

export default connect(mapStateToProps, {
  GetPaymentList
})(form(Components));
