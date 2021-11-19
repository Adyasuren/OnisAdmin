import React, { Component } from "react";
import { reduxForm } from "redux-form";
import { connect } from "react-redux";
import Modal from "react-modal";
import { GetGroupedMasterList, AddLicense } from "../../../actions/OnisShop/LicenseAction";
import { MasterListTableTitle } from "./TableTitle";
import ShopPaymentApi from "../../../api/OnisShop/ShopPaymentApi";
import LicenseApi from "../../../api/OnisShop/LicenseApi";
import toastr from 'toastr'
import 'toastr/build/toastr.min.css'
import swal from 'sweetalert';
import moment from 'moment';
import TuneModal from "./TuneModal";

toastr.options = {
  positionClass: 'toast-top-center',
  hideDuration: 1000,
  timeOut: 4000,
  closeButton: true
}


class PaymentModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      regno: "",
      payPrice: 0,
      dropData: [],
      selectedValue: {},
      selectedType: 0,
      selectedStatus: "0",
      invoices: [],
      selectedInvoice: null,
      isTuneModal: false,
      tuneData: [],
    };
  }

  openTuneModal = (e) => {
    e.preventDefault();
    const { selectedInvoice, tuneData } = this.state;
    var day = 0
    let statmntid = this.getDefaultValues("statementid");
    if (statmntid) {
      if (selectedInvoice) {
        LicenseApi.InvoiceTune(selectedInvoice.invoiceno, statmntid).then((res) => {
          if (res.success) {
            res.data.map((item, i) => {
              item.rank = i + 1;
              if (item.name === "Борлуулалт") {
                day = item.procentday
              }
              if (item.name === "Орлого") {
                item.procentday = day;
              }
            })
            this.setState({ tuneData: res.data, isTuneModal: true })
          } else {
            toastr.error(res.message)
          }
        });
      } else {
        toastr.error("Нэхэмжлэх сонгоно уу.");
      }
    } else {
      toastr.error("Алдаатай төлбөрийн гүйлгээ байна");
    }
  }

  closeTuneModal = (data) => {
    let { selectedInvoice } = this.state;
    if (data) {
      this.setState({ isTuneModal: false }, () => {
        selectedInvoice.amount = this.getDefaultValues("amount", true);
        selectedInvoice.details = data;
        this.setState({ selectedInvoice: selectedInvoice })
      })
    } else {
      this.setState({ isTuneModal: false });
    }
  }

  componentDidMount() {
    const { selectedRow } = this.props;
    // this.onChangeType(selectedRow.type);
  }

  formSubmit = (e) => {
    e.preventDefault();
    const { selectedRow, storeList } = this.props;
    const { dropData, selectedType, selectedStatus } = this.state;
    if (selectedRow) {
      if (e.target.status.value != "2") {
        if (e.target.storeid.value) {
          if (selectedType != "0") {
            let storeid = dropData.find(item => item.regno == e.target.storeid.value);
            if (storeid) {
              let tmp = {
                STATEMENTID: selectedRow.statementid,
                UPDBY: Number(localStorage.getItem("id")),
                TYPE: Number(selectedType),
                STOREID: e.target.type.value == "1" ? storeid.id : storeid.storeid,
                UPDBYNAME: localStorage.getItem("logname"),
                ISSEND: Number(this.refs.status.value),
                NOTE: String(this.refs.note.value)
              }
              if (e.target.type.value == "1") {
                this.sendLicensePayment(e, tmp);
              } else {
                this.sendMobiPayment(e, tmp);
              }
            } else {
              toastr.error("Зөв РД сонгоно уу.")
            }
          } else {
            toastr.error("Төрөл сонгоно уу.")
          }
        } else {
          toastr.error("Дэлгүүр сонгоно уу.")
        }
      } else {
        let tmpForStatus = {
          STATEMENTID: selectedRow.statementid,
          ISSEND: Number(this.refs.status.value),
        }
        this.sendArchivePayment(e, tmpForStatus);
      }
    }
  };

  sendMobiPayment = (e, tmp) => {
    swal(`Та мобикомын диллерийн данс цэнэглэх гэж байна. Хадгалах уу ?`, {
      buttons: ["Үгүй", "Тийм"],
    }).then(value => {
      if (value) {
        console.log(tmp)
        ShopPaymentApi.EditPayment(tmp).then((res) => {
          if (res.success) {
            this.closeModal();
            toastr.success(res.message);
          } else {
            toastr.error(res.message);
          }
        })
      }
    });
  }

  sendLicensePayment = (e, tmp) => {
    const { selectedInvoice } = this.state;
    let statmntid = this.getDefaultValues("statementid");
    if (statmntid) {
      if (selectedInvoice) {
        if (Number(e.target.priceDiff.value.replace(',', '').replace('₮', '').replace('-', '0')) == 0) {
          tmp.amount = selectedInvoice.amount;
          tmp.invoiceno = selectedInvoice.invoiceno;
          tmp.details = selectedInvoice.details;
          swal(`Та хэрэглэгчийн лиценз сунгах гэж байна. Хадгалах уу ?`, {
            buttons: ["Үгүй", "Тийм"],
          }).then(value => {
            if (value) {
              ShopPaymentApi.EditPayment(tmp).then((res) => {
                if (res.success) {
                  this.closeModal();
                  toastr.success(res.message);
                } else {
                  toastr.error(res.message);
                }
              })
            }
          });
        } else {
          toastr.error("Нэхэмжлэхийн дүн, төлсөн дүн зөрүүтэй байна.");
        }
      } else {
        toastr.error("Нэхэмжлэх сонгоно уу.");
      }
    } else {
      toastr.error("Алдаатай төлбөрийн гүйлгээ байна");
    }
  }

  sendArchivePayment = (e, tmpForStatus) => {
    swal(`Та энэ мэдээллийг архивлах гэж байна. Хадгалах уу ?`, {
      buttons: ["Үгүй", "Тийм"],
    }).then(value => {
      if (value) {
        ShopPaymentApi.EditPayment(tmpForStatus).then((res) => {
          if (res.success) {
            this.closeModal();
            toastr.success(res.message);
          } else {
            toastr.error(res.message);
          }
        })
      }
    });
  }

  renderStoreList = () => {
    const { dropData } = this.state;
    let tmp = dropData.map((item, i) => {
      return (
        <option key={i} value={item.regno}>
          {`${item.storenm}`}
        </option>
      );
    });
    return tmp;
  };

  renderInvoiceList = () => {
    const { invoices } = this.state;
    let tmp = invoices.map((item, i) => {
      return (
        <option key={i} value={item.invoiceno}>
          {/*  {`${item.invoiceno}`} */}
        </option>
      );
    });
    return tmp;
  };

  priceFormatter = (value) => {
    if (value === null) {
      return "-";
    } else if (value === 0) {
      return "-";
    } else if (isNaN(value)) {
      return "-";
    } else {
      let tmp = Math.round(value);
      return tmp.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + ' ₮';
    }
  };

  closeModal = (isReload) => {
    this.props.reset();
    this.setState({ selectedInvoice: null, selectedType: 0 })
    this.props.closeModal(isReload);
  };

  getDefaultValues = (property, isnum) => {
    const { selectedRow } = this.props;
    if (selectedRow === null || selectedRow === undefined) {
      return isnum ? 0 : ""
    } else {
      if (selectedRow[property] === null || selectedRow[property] === undefined) {
        return isnum ? 0 : ""
      }
      return selectedRow[property]
    }
  }

  storeChange = (e) => {
    const { dropData } = this.state;
    let res = dropData.find(item => item.regno == e.target.value)
    if (res) {
      LicenseApi.GetInvoices(res.regno).then((invRes) => {
        if (invRes.success) {
          this.setState({ invoices: invRes.data })
        }
      });
      this.setState({ selectedValue: res })
    } else {
      this.setState({ selectedValue: {} })
    }
  }

  onChangeType = (e) => {
    const { storeList, dealerList } = this.props;
    let type = e.target.value ? e.target.value : e
    if (type == 2) {
      this.setState({ dropData: dealerList })
    } else if (type == 1) {
      this.setState({ dropData: storeList })
    } else {
      this.setState({ dropData: [] })
    }
    this.setState({ selectedType: type })
  }

  onChangeStatus = (e) => {

    this.setState({ selectedStatus: e.target.value })
  }

  changeInvoice = (e) => {
    const { invoices } = this.state;
    if (e.target.value === null || e.target.value === "") {
      this.setState({ selectedInvoice: null })
    } else {
      let res = invoices.find(item => item.invoiceno == e.target.value)
      if (res) {
        this.setState({ selectedInvoice: res })
      } else {
        this.setState({ selectedInvoice: null })
      }
    }
  }

  diffAmount = () => {
    const { selectedRow } = this.props;
    const { selectedInvoice } = this.state;
    if (selectedInvoice != null && selectedRow != null) {
      let amt = this.getDefaultValues("amount", true);
      let invAmt = selectedInvoice.amount;
      return amt - invAmt;
    }
    return 0;
    // this.getDefaultValues("amount")
  }


  render() {
    const { selectedValue, selectedType, selectedInvoice, isTuneModal, tuneData, selectedStatus } = this.state;
    return (
      <Modal
        isOpen={this.props.isOpen}
        closeModal={() => this.closeModal(true)}
        className="animatedpopup animated fadeIn col-md-10 mx-auto"
      >
        <form id="popupform" name="popupform" onSubmit={this.formSubmit}>
          <div className="animated fadeIn ">
            <div className="card" style={{ borderRadius: 8 }}>
              <div className="card-header test" style={{ borderRadius: 8 }}>
                <strong>&lt;&lt; Төлбөрийн гүйлгээ засах</strong>
                <button
                  className="tn btn-sm btn-primary button-ban card-right"
                  style={{ borderRadius: 8 }}
                  onClick={() => this.closeModal(true)}
                >
                  X
                </button>
              </div>
              <div className="card-block col-md-12 col-lg-12 col-sm-12 tmpresponsive" style={{ display: "flex" }}>
                <div className="col-md-6 col-lg-6 col-sm-6 tmpresponsive">
                  <div className="row">
                    <label htmlFor="company" className="col-md-4">
                      Гүйлгээний дугаар<span className="red">*</span>
                    </label>
                    <div className="col-md-8">
                      <input
                        name="statementid"
                        style={{ width: "100%", borderRadius: 8 }}
                        className="form-control"
                        type="text"
                        required
                        value={this.getDefaultValues("statementid")}
                        disabled
                      />
                    </div>
                  </div>
                  <div className="row">
                    <label htmlFor="company" className="col-md-4">
                      Төлбөрийн хэлбэр<span className="red">*</span>
                    </label>
                    <div className="col-md-8">
                      <input
                        name="paytypename"
                        style={{ width: "100%", borderRadius: 8 }}
                        className="form-control"
                        type="text"
                        value={this.getDefaultValues("paytypename")}
                        disabled
                      />
                    </div>
                  </div>
                  <div className="row">
                    <label htmlFor="company" className="col-md-4">
                      Дансны дугаар<span className="red">*</span>
                    </label>
                    <div className="col-md-8">
                      <input
                        name="transferaccount"
                        style={{ width: "100%", borderRadius: 8 }}
                        className="form-control"
                        type="text"
                        value={this.getDefaultValues("transferaccount")}
                        disabled
                      />
                    </div>
                  </div>
                  <div className="row">
                    <label htmlFor="company" className="col-md-4">
                      Гүйлгээний огноо<span className="red">*</span>
                    </label>
                    <div className="col-md-8">
                      <input
                        name="transacdate"
                        type="text"
                        value={moment(this.getDefaultValues("transacdate")).format('YYYY-MM-DD')}
                        style={{ width: "100%", borderRadius: 8 }}
                        className="form-control"
                        disabled
                      />
                    </div>
                  </div>
                  <div className="row">
                    <label htmlFor="company" className="col-md-4">
                      Төлсөн дүн<span className="red">*</span>
                    </label>
                    <div className="col-md-8">
                      <input
                        name="amount"
                        style={{ width: "100%", borderRadius: 8 }}
                        className="form-control"
                        value={this.priceFormatter(this.getDefaultValues("amount"))}
                        type="text"
                        disabled
                      />
                    </div>
                  </div>
                  <div className="row">
                    <label htmlFor="company" className="col-md-4">
                      Гүйлгээний утга<span className="red">*</span>
                    </label>
                    <div className="col-md-8">
                      <input
                        name="description"
                        style={{ width: "100%", borderRadius: 8 }}
                        className="form-control"
                        type="text"
                        disabled
                        value={this.getDefaultValues("description")}
                      />
                    </div>
                  </div>
                  <div className="row">
                    <label htmlFor="company" className="col-md-4">
                      Төлөв<span className="red">*</span>
                    </label>
                    <div className="col-md-8">
                      <select
                        name="status"
                        ref="status"
                        style={{ width: "100%", borderRadius: 8 }}
                        className="form-control"
                        value={selectedStatus}
                        required
                        onChange={this.onChangeStatus}
                      >
                        <option value="1">Амжилттай</option>
                        <option value="0">Амжилтгүй</option>
                        <option value="2">Архив</option>
                      </select>
                    </div>
                  </div>
                </div>
                {
                  selectedStatus == "1" ?
                    <div className="col-md-6 col-lg-6 col-sm-6 tmpresponsive">
                      <div className="row">
                        <label htmlFor="company" className="col-md-4">
                          Төрөл<span className="red">*</span>
                        </label>
                        <div className="col-md-8">
                          <select
                            name="type"
                            style={{ width: "100%", borderRadius: 8 }}
                            className="form-control"
                            required
                            onChange={this.onChangeType}
                          >
                            <option value="0"></option>
                            <option value="1">Лиценз</option>
                            <option value="2">Мобиком</option>

                          </select>
                        </div>
                      </div>
                      <div className="row">
                        <label htmlFor="company" className="col-md-4">
                          {selectedType == 2 ? "Диллерийн РД" : "Дэлгүүрийн РД"}<span className="red">*</span>
                        </label>
                        <div className="col-md-8">
                          <input type="text" list="data" name="storeid" className="form-control" style={{ width: "100%", borderRadius: 8 }} autoComplete="off" onChange={this.storeChange} />
                          <datalist id="data">
                            {this.renderStoreList()}
                          </datalist>
                        </div>
                      </div>
                      <div className="row">
                        <label htmlFor="company" className="col-md-4">
                          Дэлгүүрийн нэр<span className="red">*</span>
                        </label>
                        <div className="col-md-8">
                          <input
                            name="storename"
                            style={{ width: "100%", borderRadius: 8 }}
                            className="form-control"
                            type="text"
                            disabled
                            value={selectedValue.storenm}
                          />
                        </div>
                      </div>
                      {
                        selectedType == 2 ?
                          <div className="row">
                            <label htmlFor="company" className="col-md-4">
                              РД<span className="red">*</span>
                            </label>
                            <div className="col-md-8">
                              <input
                                name="storeregno"
                                style={{ width: "100%", borderRadius: 8 }}
                                className="form-control"
                                type="text"
                                disabled
                                value={selectedValue.regno}
                              />
                            </div>
                          </div> : null
                      }

                      {
                        selectedType == 1 ?
                          <div>
                            <div className="row">
                              <label htmlFor="company" className="col-md-4">
                                Нэхэмжлэхийн дугаар<span className="red">*</span>
                              </label>
                              <div className="col-md-8">
                                <input type="text" list="data1" name="invoiceid" ref="invoiceid" className="form-control" style={{ width: "100%", borderRadius: 8 }} autoComplete="off" onChange={this.changeInvoice} />
                                <datalist id="data1">
                                  {this.renderInvoiceList()}
                                </datalist>
                              </div>
                            </div>
                            <div className="row">
                              <label htmlFor="company" className="col-md-4">
                                Нэхэмжлэхийн дүн<span className="red">*</span>
                              </label>
                              <div className="col-md-8">
                                <input
                                  name="price"
                                  style={{ width: "100%", borderRadius: 8 }}
                                  className="form-control"
                                  type="text"
                                  disabled
                                  value={this.priceFormatter(selectedInvoice == null ? 0 : selectedInvoice.amount)}
                                />
                              </div>
                            </div>
                            <div className="row">
                              <label htmlFor="company" className="col-md-4">
                                Нэхэмжлэхийн зөрүү<span className="red">*</span>
                              </label>
                              <div className="col-md-5" style={{ paddingRight: "0px" }}>
                                <input
                                  name="priceDiff"
                                  style={{ width: "100%", borderRadius: 8 }}
                                  className="form-control"
                                  type="text"
                                  disabled
                                  value={this.priceFormatter(this.diffAmount())}
                                />
                              </div>
                              <div className="col-md-3" style={{ paddingLeft: "0px" }}>
                                <button
                                  onClick={this.openTuneModal}
                                  style={{ width: "100%", borderRadius: 8 }}
                                  className="form-control btn btn-sm btn-primary button-save"
                                >
                                  Тааруулах
                                </button>
                              </div>
                            </div>
                          </div>
                          : null
                      }
                      <div className="row">
                        <label htmlFor="company" className="col-md-4">
                          Утасны дугаар<span className="red">*</span>
                        </label>
                        <div className="col-md-8">
                          <input
                            name="phoneno"
                            style={{ width: "100%", borderRadius: 8 }}
                            className="form-control"
                            type="text"
                            disabled
                            value={selectedValue.phoneno}
                          />
                        </div>
                      </div>
                      <div className="row">
                        <label htmlFor="company" className="col-md-4">
                          Бүртгэсэн огноо<span className="red">*</span>
                        </label>
                        <div className="col-md-8">
                          <input
                            name="insertdate"
                            style={{ width: "100%", borderRadius: 8 }}
                            className="form-control"
                            type="text"
                            disabled
                            value={moment(this.getDefaultValues("insertdate")).format('YYYY-MM-DD HH:mm:ss')}
                          />
                        </div>
                      </div>
                      <div className="row">
                        <label htmlFor="company" className="col-md-4">
                          Тэмдэглэл<span className="red">*</span>
                        </label>
                        <div className="col-md-8">
                          <input
                            name="note"
                            ref="note"
                            style={{ width: "100%", borderRadius: 8 }}
                            className="form-control"
                            type="text"
                          />
                        </div>
                      </div>
                    </div>
                    : <div className="row">
                      <label htmlFor="company" className="col-md-4">
                        Тэмдэглэл<span className="red">*</span>
                      </label>
                      <div className="col-md-8">
                        <input
                          name="note"
                          ref="note"
                          style={{ width: "100%", borderRadius: 8 }}
                          className="form-control"
                          type="text"
                        />
                      </div>
                    </div>
                }
              </div>
              <div className="card-footer test" style={{ borderRadius: 8 }}>
                <div className="card-right">
                  <button
                    type="button"
                    className="btn btn-sm btn-primary button-ban"
                    style={{ borderRadius: 8 }}
                    onClick={() => this.closeModal(true)}
                  >
                    <i className="fa fa-ban" />
                    Болих
                  </button>
                  <button
                    type="submit"
                    className="btn btn-sm btn-primary button-save"
                    style={{ borderRadius: 8 }}
                  >
                    <i className="fa fa-save" />
                    Хадгалах
                  </button>
                </div>
              </div>
            </div>
          </div>
        </form>
        <TuneModal
          isOpen={isTuneModal}
          data={tuneData}
          closeModal={this.closeTuneModal}
        />
      </Modal>
    );
  }
}
const form = reduxForm({
  form: "ShopLicenseModal",
});

function mapStateToProps(state) {
  return {
    groupMasterList: state.shopLicense.groupMasterList,
    storeList: state.OnisShop.rows,
    dealerList: state.shopMobicom.dealerList,
  };
}
export default connect(mapStateToProps, {
  GetGroupedMasterList, AddLicense
})(form(PaymentModal));
