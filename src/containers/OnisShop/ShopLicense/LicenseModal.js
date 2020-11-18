import React, { Component } from "react";
import { reduxForm } from "redux-form";
import { connect } from "react-redux";
import Modal from "react-modal";
import TableFok from "../../../components/TableFok";
import { GetGroupedMasterList, AddLicense } from "../../../actions/OnisShop/LicenseAction";
import { MasterListTableTitle } from "./TableTitle";
import toastr from 'toastr'
import 'toastr/build/toastr.min.css'
import moment from 'moment';
toastr.options = {
    positionClass : 'toast-top-center',
    hideDuration: 1000,
    timeOut: 4000,
    closeButton: true
  }


class ShopLicenseModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      regno: "",
      payPrice: 0,
    };
  }

  componentWillMount() {
    this.props.GetGroupedMasterList();
  }

  formSubmit = (e) => {
    e.preventDefault();
    const { groupMasterList } = this.props;
    let tmp = {
      invoiceno: 0,
      storeid: Number(e.target.storeid.value),
      price: Number(e.target.payprice.value.replace("₮", "").replace(",", "")),
      paymenttype: Number(e.target.paymenttype.value),
      invoicedate: e.target.invoicedate.value,
      useramount: Number(e.target.payedprice.value),
      description: e.target.description.value,
      menus: "",
      changeby: Number(localStorage.getItem("id")),
      masters: []
    } 
    groupMasterList.map((item, i) => {
      if(item.price && item.masterid)
      {
        if(item.price > 0 && item.masterid > 0)
        {
          tmp.masters.push(item.masterid);
          tmp.menus = tmp.menus + item.menuid + ", "
        }
      }
    })
    this.props.AddLicense(tmp).then((res) => {
      if(res.success) {
         toastr.success(res.message);
         this.closeModal(true);
      } else {
        toastr.error(res.message);
      }
    })
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

  changePrice = () => {
    const { groupMasterList } = this.props;
    let price = 0;
    groupMasterList.map((item) => {
      if(item.price) {
        price = price + item.price;
      }
    })
    this.setState({ payPrice: price })
  }

  closeModal = (isReload) => {
    this.props.reset();
    this.props.closeModal(isReload);
  };

  render() {
    const { groupMasterList } = this.props;
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
                <strong>&lt;&lt; Лиценз бүртгэх </strong>
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
                    Дэлгүүр<span className="red">*</span>
                  </label>
                  <div className="col-md-8">
                  <select
                      name="storeid"
                      style={{ width: "100%" }}
                      className="form-control"
                      required
                    >
                      <option value="0">- Сонгох -</option>
                      {this.renderStoreList()}
                    </select>
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
                    />
                  </div>
                </div>
                <div className="row">
                  <label htmlFor="company" className="col-md-4">
                    Төлөх дүн<span className="red">*</span>
                  </label>
                  <div className="col-md-8">
                    <input
                      name="payprice"
                      style={{ width: "100%" }}
                      className="form-control"
                      type="text"
                      value={this.priceFormatter(this.state.payPrice)}
                      disabled
                    />
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
                    >
                      <option value="0">- Сонгох -</option>
                      <option value="1">Бэлэн</option>
                      <option value="2">Дансаар</option>
                    </select>
                  </div>
                </div>
                <div className="row">
                  <label htmlFor="company" className="col-md-4">
                    Гүйлгээний огноо<span className="red">*</span>
                  </label>
                  <div className="col-md-8">
                    <input
                      name="invoicedate"
                      type="text"
                      value={moment().format('YYYY-MM-DD')}
                      style={{ width: "100%" }}
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
                      name="payedprice"
                      style={{ width: "100%" }}
                      className="form-control"
                      type="text"
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
                      style={{ width: "100%" }}
                      className="form-control"
                      type="text"
                    />
                  </div>
                </div>
              </div>
              <div className="col-md-8 col-lg-8 col-sm-8 tmpresponsive">
                <TableFok data={groupMasterList} title={MasterListTableTitle} changePrice={this.changePrice}/>
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
  GetGroupedMasterList, AddLicense
})(form(ShopLicenseModal));
