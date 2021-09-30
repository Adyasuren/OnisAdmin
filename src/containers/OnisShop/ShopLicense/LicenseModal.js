import React, { Component } from "react";
import { reduxForm } from "redux-form";
import { connect } from "react-redux";
import Modal from "react-modal";
import TableFok from "../../../components/TableFok";
import {
  GetGroupedMasterList,
  AddLicense,
  GetLicenseWindows,
} from "../../../actions/OnisShop/LicenseAction";
import { MasterListTableTitle } from "./TableTitle";
import toastr from "toastr";
import "toastr/build/toastr.min.css";
import moment from "moment";
import { key } from "../../../../package.json";
import swal from "sweetalert";
import CurrencyInput from "react-currency-input";

toastr.options = {
  positionClass: "toast-top-center",
  hideDuration: 1000,
  timeOut: 4000,
  closeButton: true,
};

class ShopLicenseModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      regno: "",
      payPrice: 0,
      selectedValue: null,
      selectedWindows: [],
      masterList: [],
    };
  }

  componentWillMount() {
    const { selectedRow, isNew, storeList } = this.props;
    if (!isNew) {
      if (selectedRow) {
        this.setState({ payPrice: selectedRow.amount });
        let res = storeList.find((item) => item.regno == selectedRow.regno);
        if (res) {
          this.setState({ selectedValue: res });
        }
        this.props.GetLicenseWindows(selectedRow.id).then((detailRes) => {
          this.props.GetGroupedMasterList(selectedRow.regno).then((listRes) => {
            listRes.data.map((item, i) => {
              if (detailRes.data) {
                let res1 = detailRes.data.find(
                  (item1) => item1.menuid == item.menuid
                );
                if (res1) {
                  if (item.mastert) {
                    let masterRes = item.mastert.find(
                      (item1) => item1.id == res1.masterid
                    );
                    if (masterRes) {
                      item.masterid = masterRes.id;
                      item.price = masterRes.price;
                    }
                  }
                }
              }
            });
            this.setState({
              masterList: listRes.data,
              selectedWindows: detailRes.data,
            });
          });
        });
      }
    } else {
      console.log(selectedRow)
        this.props.GetGroupedMasterList().then((res) => {
          this.setState({ masterList: res.data });
        });
      
    }
  }

  formSubmit = (e) => {
    e.preventDefault();
    const { selectedValue } = this.state;
    const { groupMasterList, isNew, selectedRow } = this.props;
    if (selectedValue) {
      let tmp = {
        masters: [],
      };
      groupMasterList.map((item, i) => {
        //item.price &&
        if (item.masterid) {
          // item.price > 0 &&
          if (item.masterid > 0) {
            tmp.masters.push(item.masterid);
          }
        }
      });
      if (tmp.masters.length > 0) {
        if (e.target.payprice.value) {
          if (
            this.state.payPrice ==
            Number(e.target.payprice.value.replace(",", ""))
          ) {
            (tmp.id = isNew ? 0 : selectedRow.id),
              (tmp.invoiceno = isNew ? 0 : Number(e.target.invoiceno.value)),
              (tmp.storeid = selectedValue.id),
              (tmp.regno = selectedValue.regno),
              (tmp.amount = Number(
                e.target.invoiceamount.value.replace("₮", "").replace(",", "")
              )),
              (tmp.paymenttype = Number(e.target.paymenttype.value)),
              (tmp.paymentymd =
                e.target.paymentymd.value == ""
                  ? null
                  : e.target.paymentymd.value),
              (tmp.useramount = Number(
                e.target.payprice.value.replace(",", "")
              )),
              (tmp.status = e.target.status.value
                ? Number(e.target.status.value)
                : 0),
              (tmp.changeby = Number(localStorage.getItem("id"))),
              (tmp.changebyname = localStorage.getItem("logname")),
              (tmp.key = key);
            swal(`Хадгалахдаа итгэлтэй байна уу ?`, {
              buttons: ["Үгүй", "Тийм"],
            }).then((value) => {
              if (value) {
                this.props.AddLicense(tmp).then((res) => {
                  if (res.success) {
                    toastr.success(res.message);
                    this.closeModal(true);
                  } else {
                    toastr.error(res.message);
                  }
                });
              }
            });
          } else {
            toastr.error("Нэхэмжлэлийн дүн, Төлсөн дүн 2 зөрүүтэй байна.");
          }
        } else {
          toastr.error("Төлсөн дүн оруулна уу.");
        }
      } else {
        toastr.error("Модуль сонгоно уу.");
      }
    } else {
      toastr.error("Дэлгүүр сонгоно уу.");
    }
  };

  storeChange = (e) => {
    const { storeList } = this.props;
    let res = storeList.find((item) => item.regno == e.target.value);
    if (res) {
      this.setState({ selectedValue: res });
    } else {
      this.setState({ selectedValue: {} });
    }
  };

  renderStoreList = () => {
    const { storeList } = this.props;
    let tmp = storeList.map((item, i) => {
      return (
        <option key={i} value={item.regno}>
          {`${item.storenm}`}
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
      return tmp.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + " ₮";
    }
  };

  changePrice = () => {
    const { groupMasterList } = this.props;
    let price = 0;
    groupMasterList.map((item) => {
      if (item.price) {
        price = price + item.price;
      }
    });
    this.setState({ payPrice: price });
  };

  closeModal = (isReload) => {
    this.props.reset();
    this.props.closeModal(isReload);
  };

  generateFooterItems = (index, label) => {
    let tmp = {
      label: "0",
      columnIndex: index,
      align: "center",
      formatter: (data) => {
        let sum = 0;
        data.map((item, i) => {
          if (item[label] !== undefined && item[label] !== NaN) {
            sum += item[label];
          }
        });
        return (
          <strong>
            {sum === 0
              ? "-"
              : sum.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
          </strong>
        );
      },
    };
    return tmp;
  };

  getDefaultValues = (property, isnum) => {
    const { selectedRow } = this.props;
    if (selectedRow === null || selectedRow === undefined) {
      return isnum ? 0 : "";
    } else {
      if (
        selectedRow[property] === null ||
        selectedRow[property] === undefined
      ) {
        return isnum ? 0 : "";
      }
      return selectedRow[property];
    }
  };

  render() {
    const { groupMasterList, selectedRow, isNew } = this.props;
    const { selectedValue, selectedWindows, masterList } = this.state;
    console.log(masterList)
    const footerData = [
      [
        {
          label: "Нийт",
          columnIndex: 1,
        },
        this.generateFooterItems(3, "price"),
      ],
    ];
    var currentdate = new Date();
    function myFormat(num) {
      return this.priceFormatter(num);
    }
    return (
      <Modal
        isOpen={this.props.isOpen}
        closeModal={() => this.closeModal()}
        className="animated fadeIn col-md-12 col-lg-12 col-sm-12 mx-auto"
      >
        <form id="popupform" name="popupform" onSubmit={this.formSubmit}>
          <div className="animated fadeIn ">
            <div className="card">
              <div className="card-header test">
                <strong>&lt;&lt; Лиценз бүртгэх </strong>
                <button
                  className="tn btn-sm btn-primary button-ban card-right"
                  onClick={() => this.closeModal()}
                >
                  X
                </button>
              </div>
              <div
                className="card-block col-md-12 col-lg-12 col-sm-12 tmpresponsive"
                style={{ display: "flex" }}
              >
                <div className="col-md-4 col-lg-4 col-sm-4 tmpresponsive">
                  <div className="row">
                    <label htmlFor="company" className="col-md-4">
                      Дэлгүүр<span className="red">*</span>
                    </label>
                    <div className="col-md-8">
                      <input
                        type="text"
                        list="data"
                        name="storeid"
                        className="form-control"
                        style={{ width: "100%" }}
                        autoComplete="off"
                        onChange={this.storeChange}
                        defaultValue={this.getDefaultValues("regno")}
                      />
                      <datalist id="data">{this.renderStoreList()}</datalist>
                      {/*   <select
                      name="storeid"
                      style={{ width: "100%" }}
                      className="form-control"
                      required
                    >
                      <option value="0">- Сонгох -</option>
                      {this.renderStoreList()}
                    </select> */}
                    </div>
                  </div>
                  <div className="row">
                    <label htmlFor="company" className="col-md-4">
                      Дэлгүүрийн нэр<span className="red">*</span>
                    </label>
                    <div className="col-md-8">
                      <input
                        name="storenm"
                        style={{ width: "100%" }}
                        className="form-control"
                        type="text"
                        required
                        disabled
                        value={selectedValue ? selectedValue.storenm : ""}
                      />
                    </div>
                  </div>
                  <div className="row">
                    <label htmlFor="company" className="col-md-4">
                      Нэхэмжлэх дугаар<span className="red">*</span>
                    </label>
                    <div className="col-md-8">
                      <input
                        name="invoiceno"
                        style={{ width: "100%" }}
                        className="form-control"
                        type="text"
                        required
                        disabled
                        defaultValue={this.getDefaultValues("invoiceno")}
                      />
                    </div>
                  </div>
                  <div className="row">
                    <label htmlFor="company" className="col-md-4">
                      Нэхэмжлэхийн дүн<span className="red">*</span>
                    </label>
                    <div className="col-md-8">
                      <input
                        name="invoiceamount"
                        style={{ width: "100%" }}
                        className="form-control"
                        type="text"
                        required
                        disabled
                        value={this.priceFormatter(this.state.payPrice)}
                      />
                    </div>
                  </div>
                  {/*   <div className="row">
                  <label htmlFor="company" className="col-md-4">
                    Нэхэмжлэхийн утга<span className="red">*</span>
                  </label>
                  <div className="col-md-8">
                    <input
                      name="description"
                      style={{ width: "100%" }}
                      className="form-control"
                      type="text"
                      required
                      disabled
                    />
                  </div>
                </div> */}
                  <div className="row">
                    <label htmlFor="company" className="col-md-4">
                      Нэхэмжлэхийн төлөв<span className="red">*</span>
                    </label>
                    <div className="col-md-8">
                      <select
                        className="form-control"
                        ref="status"
                        name="status"
                        style={{ width: "100%" }}
                        defaultValue={this.getDefaultValues("statis", true)}
                      >
                        <option value={1}>Үүссэн</option>
                        <option value={2}>Амжилттай</option>
                        <option value={4}>Цуцлагдсан</option>
                      </select>
                    </div>
                  </div>
                  <div className="row">
                    <label htmlFor="company" className="col-md-4">
                      Төлбөрийн хэлбэр<span className="red">*</span>
                    </label>
                    <div className="col-md-8">
                      <select
                        name="paymenttype"
                        style={{ width: "100%" }}
                        className="form-control"
                        defaultValue={this.getDefaultValues(
                          "paymenttype",
                          true
                        )}
                      >
                        <option value={1}>Бэлэн</option>
                        <option value={2}>Дансаар</option>
                      </select>
                    </div>
                  </div>
                  <div className="row">
                    <label htmlFor="company" className="col-md-4">
                      Төлсөн дүн<span className="red">*</span>
                    </label>
                    <div className="col-md-8">
                      <CurrencyInput
                        precision="0"
                        maxLength={9}
                        name="payprice"
                        ref="payprice"
                        style={{ width: "100%" }}
                        className="form-control"
                      />
                    </div>
                  </div>
                  <div className="row">
                    <label htmlFor="company" className="col-md-4">
                      Төлбөрийн огноо<span className="red">*</span>
                    </label>
                    <div className="col-md-8">
                      <input
                        name="paymentymd"
                        type="text"
                        style={{ width: "100%" }}
                        className="form-control"
                        disabled
                        defaultValue={
                          isNew
                            ? moment().format("YYYY-MM-DD")
                            : this.getDefaultValues("paymentymd")
                        }
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
                        style={{ width: "100%" }}
                        className="form-control"
                        type="text"
                        disabled
                        value={
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
                  <div className="row">
                    <label htmlFor="company" className="col-md-4">
                      Бүртгэсэн хэрэглэгч<span className="red">*</span>
                    </label>
                    <div className="col-md-8">
                      <input
                        name="logname"
                        style={{ width: "100%" }}
                        className="form-control"
                        type="text"
                        value={localStorage.getItem("logname")}
                        disabled
                      />
                    </div>
                  </div>

                  {/*  <div className="row">
                  <label htmlFor="company" className="col-md-4">
                    Гүйлгээний утга<span className="red">*</span>
                  </label>
                  <div className="col-md-8">
                    <input
                      name="description"
                      style={{ width: "100%" }}
                      className="form-control"
                      type="text"
                      disabled
                    />
                  </div>
                </div> */}
                </div>
                <div className="col-md-8 col-lg-8 col-sm-8 tmpresponsive">
                  <TableFok
                    data={masterList}
                    title={MasterListTableTitle}
                    changePrice={this.changePrice}
                    selectedWindows={selectedWindows}
                    isNew={isNew}
                    footerData={footerData}
                  />
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
  form: "ShopLicenseModal",
});

function mapStateToProps(state) {
  return {
    groupMasterList: state.shopLicense.groupMasterList,
    storeList: state.OnisShop.rows,
  };
}
export default connect(mapStateToProps, {
  GetGroupedMasterList,
  AddLicense,
  GetLicenseWindows,
})(form(ShopLicenseModal));
