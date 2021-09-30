import React, { Component } from "react";
import { reduxForm } from "redux-form";
import { connect } from "react-redux";
import Modal from "react-modal";
import TableFok from "../../../components/TableFok";
import { GetGroupedMasterList, AddLicense } from "../../../actions/OnisShop/LicenseAction";
import { LisenceHistoryTableTitle } from "./TableTitle";
import toastr from 'toastr'
import 'toastr/build/toastr.min.css'
import moment from 'moment';
toastr.options = {
    positionClass : 'toast-top-center',
    hideDuration: 1000,
    timeOut: 4000,
    closeButton: true
  }


class LicenseDetailModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    const { data } = this.props;
    return (
      <Modal
        isOpen={this.props.isOpen}
        closeModal={() => this.props.closeModal()}
        className="animatedpopup animated fadeIn col-md-8 mx-auto"
      >
        <form id="popupform" name="popupform" onSubmit={this.formSubmit}>
          <div className="animated fadeIn ">
            <div className="card">
              <div className="card-header test">
                <strong>&lt;&lt; Лиценз бүртгэх </strong>
                <button
                  className="tn btn-sm btn-primary button-ban card-right"
                  onClick={() => this.props.closeModal()}
                >
                  X
                </button>
              </div>
              <div className="card-block col-md-12 col-lg-12 col-sm-12 tmpresponsive" style={{ display: "flex" }}>
              <TableFok data={data} title={LisenceHistoryTableTitle}/>
              </div>
              <div className="card-footer test">
                <div className="card-right">
                  <button
                    type="button"
                    className="btn btn-sm btn-primary button-ban"
                    onClick={() => this.props.closeModal()}
                  >
                    <i className="fa fa-ban" />
                    Хаах
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
  form: "LicenseDetailModal",
});

function mapStateToProps(state) {
  return {
    groupMasterList: state.shopLicense.groupMasterList,
    storeList: state.OnisShop.rows,
  };
}
export default connect(mapStateToProps, {
  GetGroupedMasterList, AddLicense
})(form(LicenseDetailModal));
