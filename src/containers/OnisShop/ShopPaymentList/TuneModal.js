import React, { Component } from "react";
import { reduxForm } from "redux-form";
import { connect } from "react-redux";
import Modal from "react-modal";
import { GetGroupedMasterList, AddLicense } from "../../../actions/OnisShop/LicenseAction";
import { TuneListTableTitle } from "./TableTitle";
import TableFok from "../../../components/TableFok";
import LicenseApi from "../../../api/OnisShop/LicenseApi";
import toastr from "toastr";
import "toastr/build/toastr.min.css";
import swal from "sweetalert";
toastr.options = {
  positionClass: "toast-top-center",
  hideDuration: 1000,
  timeOut: 4000,
  closeButton: true,
};

class PaymentModal extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

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
        return <strong>{sum === 0 ? "-" : sum.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</strong>;
      },
    };
    return tmp;
  };

  formSubmit = (e) => {
    e.preventDefault();
    swal(`Та нэхэмжлэхийн мэдээллийг төлсөн дүнд тааруулж засах гэж байна. Зөвшөөрөх үү?`, {
      buttons: ["Үгүй", "Тийм"],
    }).then((value) => {
      if (value) {
        if (this.props.data.length > 0) {
          toastr.success("Амжилттай таарууллаа");
          this.props.closeModal(this.props.data);
          console.log(this.props.data)
        } else {
          toastr.error("Тааруулах боломжгүй гүйлгээ байна.");
        }
      }
    });
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

  closeModal = () => {
    this.props.reset();
    this.props.closeModal(null);
  };

  render() {
    const {} = this.state;
    return (
      <Modal
        isOpen={this.props.isOpen}
        closeModal={() => this.closeModal()}
        className="animatedpopup animated fadeIn col-md-8 mx-auto"
      >
        <form id="popupform" name="popupform" onSubmit={this.formSubmit}>
          <div className="animated fadeIn ">
            <div className="card">
              <div className="card-header test">
                <strong>&lt;&lt; Тааруулах</strong>
                <button className="tn btn-sm btn-primary button-ban card-right" onClick={() => this.closeModal()}>
                  X
                </button>
              </div>
              <div className="card-block col-md-12 col-lg-12 col-sm-12 tmpresponsive" style={{ display: "flex" }}>
                <TableFok data={this.props.data} title={TuneListTableTitle} />
              </div>
              <div className="card-footer test">
                <div className="card-right">
                  <button type="button" className="btn btn-sm btn-primary button-ban" onClick={() => this.closeModal()}>
                    <i className="fa fa-ban" />
                    Болих
                  </button>
                  <button type="submit" className="btn btn-sm btn-primary button-save">
                    <i className="fa fa-save" />
                    Сунгалтыг зөвшөөрөх
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
    dealerList: state.shopMobicom.dealerList,
  };
}
export default connect(mapStateToProps, {
  GetGroupedMasterList,
  AddLicense,
})(form(PaymentModal));
