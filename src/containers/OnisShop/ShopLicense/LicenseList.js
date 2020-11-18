import React, { Component } from "react";
import { connect } from "react-redux";
import { Field, reduxForm } from "redux-form";
import TableFok from "../../../components/TableFok";
import { LicenseListTableTitle } from "./TableTitle";
import { GetAllLisenceList, GetLicenseWindows } from "../../../actions/OnisShop/LicenseAction";
import LicenseModal from "./LicenseModal";
import LicenseDetailModal from "./LicenseDetailModal";

class Components extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      isNew: true,
      selectedRow: null,
      isOpenHistory: false,
      licenseHistory: []
    };
  }

  handleNew = () => {
    this.setState({ isNew: true }, () => {
      this.openModal();
    });
  };

  openModal = () => {
    this.setState({ isOpen: true });
  };

  closeModal = (isReload) => {
    this.setState({ isOpen: false }, () => {
      if(isReload)
      {
        // this.handleReload();
      }
    });
  };

  closeHistoryModal = () => {
    this.setState({ isOpenHistory: false });
  };

  handleReload = () => {
    let tmp = {}
    tmp.storenm = this.refs.storeNm.value;
    tmp.regno = this.refs.regNo.value;
    tmp.phoneNum = this.refs.phoneNum.value;
    tmp.invoicedate = this.refs.invoiceDate.value; 
    this.props.GetAllLisenceList(tmp);
  }

  rowDoubleClick = (row) => {
    this.props.GetLicenseWindows(row.licenseid).then((res) => {
      if(res.success)
      {
        this.setState({ licenseHistory: res.data }, () => {
          this.setState({ isOpenHistory: true })
        })
      }
    });
  }

  render() {
    const { isOpen, isNew, selectedRow, isOpenHistory, licenseHistory } = this.state;
    const { licenseList } = this.props;
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
                          ref="invoiceDate"
                          name="invoiceDate"
                          component="input"
                          type="date"
                          className="form-control dateclss"
                        />
                      </div>
                    </div>
                    <div className="form-group col-sm-1.3 mr-1-rem">
                      <label>Төлбөрийн огноо</label>
                      <div className="display-flex">
                        <Field
                          ref="paymentDate"
                          name="paymentDate"
                          component="input"
                          type="date"
                          className="form-control dateclss"
                        />
                      </div>
                    </div>
                    <div className="form-group col-sm-1.3 mr-1-rem">
                      <label>Дэлгүүрийн нэр</label>
                      <Field
                        ref="storeNm"
                        name="storeNm"
                        component="input"
                        type="text"
                        className="form-control"
                      />
                    </div>
                    <div className="form-group col-sm-1.3 mr-1-rem">
                      <label>Регистрийн дугаар</label>
                      <Field
                        name="regNo"
                        ref="regNo"
                        component="input"
                        type="text"
                        className="form-control"
                      />
                    </div>
                    <div className="form-group col-sm-1.3 mr-1-rem">
                      <label>Утасны дугаар</label>
                      <Field
                        name="phoneNum"
                        ref="phoneNum"
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
                  title={LicenseListTableTitle}
                  rowDoubleClick={this.rowDoubleClick}
                  data={licenseList}
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
            className="btn btn-success mr-1-rem"
            onClick={this.handleNew}
          >
            <i className="fa fa-file-text-o" />
            Шинэ
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
        <LicenseModal
          isNew={isNew}
          isOpen={isOpen}
          openModal={this.openModal}
          closeModal={this.closeModal}
          selectedRow={selectedRow}
        />
        <LicenseDetailModal data={licenseHistory} isOpen={isOpenHistory} closeModal={this.closeHistoryModal}/>
      </div>
    );
  }
}

const form = reduxForm({ form: "masterList1" });

function mapStateToProps(state) {
  return {
    licenseList: state.shopLicense.licenseList,
    initialValues: {
      invoiceDate: new Date().toISOString().slice(0, 10),
      paymentDate: new Date().toISOString().slice(0, 10),
    },
  };
}

export default connect(mapStateToProps, {
  GetAllLisenceList,
  GetLicenseWindows
})(form(Components));
