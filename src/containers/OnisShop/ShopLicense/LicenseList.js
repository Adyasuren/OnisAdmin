import React, { Component } from "react";
import { connect } from "react-redux";
import { Field, reduxForm } from "redux-form";
import TableFok from "../../../components/TableFok";
import {
  LicenseListTableTitle,
  LicenseModuleListTableTitle,
} from "./TableTitle";
import {
  GetAllLisenceList,
  GetLicenseWindows,
  GetAllLisenceModule,
} from "../../../actions/OnisShop/LicenseAction";
import LicenseModal from "./LicenseModal";
import LicenseDetailModal from "./LicenseDetailModal";
import { key } from "../../../../package.json";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import toastr from "toastr";
import "toastr/build/toastr.min.css";

toastr.options = {
  positionClass: "toast-top-center",
  hideDuration: 1000,
  timeOut: 4000,
  closeButton: true,
};

let searchobj = {};

class Components extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      isNew: true,
      selectedRow: null,
      isOpenHistory: false,
      licenseHistory: [],
      tabIndex: 0,
      clickedInvoiceno: "",
      clickedInvoiceno1: "",
    };
  }

  handleNew = () => {
    this.setState({ isNew: true, selectedRow: null }, () => {
      this.openModal();
    });
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

  closeHistoryModal = () => {
    this.setState({ isOpenHistory: false });
  };

  handleReload = (e) => {
    e.preventDefault();
    let tmp = {};
    console.log(this.refs.invoiceno1.value);
    tmp.storenm = this.refs.storenm.value;
    tmp.regno = this.refs.regno.value;
    tmp.startymd = this.refs.startymd.value;
    tmp.endymd = this.refs.endymd.value;
    tmp.invoiceno = this.refs.invoiceno1.value
      ? Number(this.refs.invoiceno1.value)
      : null;
    tmp.key = key;
    searchobj = tmp;
    this.props.GetAllLisenceList(tmp);
  };

  handleReloadModule = (e) => {
    e.preventDefault();
    let tmp = {};
    if (this.refs.invoiceendymd.value && this.refs.invoiceymd.value) {
      tmp.endymd = this.refs.invoiceendymd.value
        ? this.refs.invoiceendymd.value
        : null;
      tmp.startymd = this.refs.invoiceymd.value
        ? this.refs.invoiceymd.value
        : null;
      tmp.storenm = this.refs.storenmmdl.value
        ? this.refs.storenmmdl.value
        : "";
      tmp.phoneno = 0;
      tmp.regno = this.refs.regnomdl.value;
      tmp.invoiceno = this.refs.invoiceno.value
        ? Number(this.refs.invoiceno.value)
        : null;
      tmp.key = key;
      searchobj = tmp;
      this.props.GetAllLisenceModule(tmp);
    } else {
      toastr.error("Огноо сонгоно уу.");
    }
  };

  rowDoubleClick = (row) => {
    this.props.GetLicenseWindows(row.licenseid).then((res) => {
      if (res.success) {
        this.setState({ licenseHistory: res.data }, () => {
          this.setState({ isOpenHistory: true });
        });
      }
    });
  };

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

  handleEdit = () => {
    const { selectedRow } = this.state;
    if (selectedRow != null) {
      this.setState({ isNew: false }, () => {
        this.openModal();
      });
    } else {
      toastr.error("Мөр сонгоно уу.");
    }
  };

  linkClick = (row) => {
    this.setState(
      { tabIndex: 1, clickedInvoiceno: row.invoiceno, clickedInvoiceno1: "" },
      () => {
        this.handleReloadModule();
      }
    );
  };

  linkClick1 = (row) => {
    this.setState(
      { tabIndex: 0, clickedInvoiceno: "", clickedInvoiceno1: row.invoiceno },
      () => {
        this.handleReload();
      }
    );
  };

  generateFooterItems = (index, label, isSuccess, data) => {
    const { licenseList } = this.props;
    let sum = 0;
    data.map((item, i) => {
      if (item[label] !== undefined && item[label] !== NaN) {
        if (isSuccess) {
          if (item.status == 2) {
            sum += item[label];
          }
        } else {
          sum += item[label];
        }
      }
    });
    let tmp = {
      label:
        sum === 0 ? "-" : sum.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
      columnIndex: index,
      align: "right",
    };
    return tmp;
  };

  render() {
    const {
      isOpen,
      isNew,
      selectedRow,
      isOpenHistory,
      licenseHistory,
      tabIndex,
      clickedInvoiceno,
      clickedInvoiceno1,
    } = this.state;
    const { licenseList, licenseListModule } = this.props;
    const footerData = [
      [
        {
          label: "Нийт",
          columnIndex: 1,
        },
        this.generateFooterItems(5, "amount", true, licenseList),
        this.generateFooterItems(10, "useramount", true, licenseList),
      ],
    ];

    const footerData1 = [
      {
        label: "Нийт",
        columnIndex: 1,
      },
      this.generateFooterItems(8, "amount", false, licenseListModule),
    ];
    return (
      <div className="animated fadeIn">
        <div className="row">
          <div className="col-lg-12 col-md-12 col-sm-12">
            <div className="card">
              <div className="card-block col-md-12 col-lg-12 col-sm-12 tmpresponsive">
                <Tabs
                  selectedIndex={tabIndex}
                  onSelect={(index) => this.setState({ tabIndex: index })}
                >
                  <TabList>
                    <Tab>Нэхэмжлэхээр</Tab>
                    <Tab>Модулаар</Tab>
                  </TabList>
                  <TabPanel>
                    <form id="myForm" onSubmit={this.handleReload}>
                      <div className="row" name="formProps">
                        <div className="form-group col-sm-1.3 mr-1-rem">
                          <label>Нэхэмжлэхийн огноо</label>
                          <div className="display-flex">
                            <Field
                              ref="startymd"
                              name="startymd"
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
                              ref="endymd"
                              name="endymd"
                              component="input"
                              type="date"
                              className="form-control dateclss"
                            />
                          </div>
                        </div>
                        <div className="form-group col-sm-1.3 mr-1-rem">
                          <label>Дэлгүүрийн нэр</label>
                          <Field
                            ref="storenm"
                            name="storenm"
                            component="input"
                            type="text"
                            className="form-control"
                          />
                        </div>
                        <div className="form-group col-sm-1.3 mr-1-rem">
                          <label>Татвар төлөгчийн дугаар</label>
                          <input
                            ref="regno"
                            name="regno"
                            type="text"
                            maxLength="10"
                            className="form-control"
                          />
                        </div>
                        <div className="form-group col-sm-1.3 mr-1-rem">
                          <label>Нэхэмжлэхийн дугаар</label>
                          <input
                            ref="invoiceno1"
                            name="invoiceno1"
                            type="text"
                            maxLength="10"
                            type="number"
                            className="form-control"
                            defaultValue={clickedInvoiceno1}
                          />
                        </div>
                        <div style={{ marginTop: 20, marginLeft: 450 }}>
                          <button
                            type="button"
                            className="btn btn-edit-new mr-1-rem"
                            style={{ float: "right" }}
                            onClick={this.handleEdit}
                          >
                            <i className="fa fa-paper-plane-o" />
                            Засах
                          </button>
                          <button
                            type="button"
                            className="btn btn-success mr-1-rem"
                            style={{ float: "right" }}
                            onClick={this.handleNew}
                          >
                            <i className="fa fa-file-text-o" />
                            Шинэ
                          </button>
                          <button
                            type="submit"
                            className="btn btn-primary"
                            style={{ float: "right" }}
                          >
                            <i className="fa fa-retweet" />
                            Ачаалaх
                          </button>
                        </div>
                      </div>
                    </form>
                    <TableFok
                      title={LicenseListTableTitle}
                      rowDoubleClick={this.rowDoubleClick}
                      rowClick={this.rowClick}
                      linkClick={this.linkClick}
                      data={licenseList}
                      footerData={footerData}
                    />
                    {/* <div>
                    <button
                      type="button"
                      className="btn btn-primary"
                      onClick={this.handleReload}
                    >
                      <i className="fa fa-retweet" />
                      Ачаалaх
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
                  </div> */}
                  </TabPanel>
                  <TabPanel>
                    <form id="myForm" onSubmit={this.handleReloadModule}>
                      <div className="row" name="formProps">
                        <div className="form-group col-sm-1.3 mr-1-rem">
                          <label>Нэхэмжлэхийн огноо</label>
                          <div className="display-flex">
                            <Field
                              ref="invoiceymd"
                              name="invoiceymd"
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
                              ref="invoiceendymd"
                              name="invoiceendymd"
                              component="input"
                              type="date"
                              className="form-control dateclss"
                            />
                          </div>
                        </div>
                        <div className="form-group col-sm-1.3 mr-1-rem">
                          <label>Дэлгүүрийн нэр</label>
                          <Field
                            ref="storenmmdl"
                            name="storenmmdl"
                            component="input"
                            type="text"
                            className="form-control"
                          />
                        </div>
                        <div className="form-group col-sm-1.3 mr-1-rem">
                          <label>Татвар төлөгчийн дугаар</label>
                          <input
                            ref="regnomdl"
                            name="regnomdl"
                            type="text"
                            maxLength="10"
                            className="form-control"
                          />
                        </div>
                        {/*  <div className="form-group col-sm-1.3 mr-1-rem">
                      <label>Утасны дугаар</label>
                      <input 
                        ref="phonenomdl"
                        name="phonenomdl"
                        type="number" 
                        maxLength="10"
                        className="form-control" 
                        />
                    </div> */}
                        <div className="form-group col-sm-1.3 mr-1-rem">
                          <label>Нэхэмжлэхийн дугаар</label>
                          <input
                            ref="invoiceno"
                            name="invoiceno"
                            type="text"
                            maxLength="10"
                            type="number"
                            className="form-control"
                            defaultValue={clickedInvoiceno}
                          />
                        </div>
                        <div style={{ marginTop: 20, marginLeft: 650 }}>
                          <button
                            type="submit"
                            className="btn btn-primary"
                            style={{ float: "right" }}
                          >
                            <i className="fa fa-retweet" />
                            Ачаалах
                          </button>
                        </div>
                      </div>
                    </form>
                    <TableFok
                      title={LicenseModuleListTableTitle}
                      rowClick={this.rowClick}
                      linkClick={this.linkClick1}
                      isRowError={true}
                      footerData={footerData1}
                      // rowDoubleClick={this.rowDoubleClick}
                      data={licenseListModule}
                    />
                    {/* <div>
                      <button
                        type="button"
                        className="btn btn-primary"
                        onClick={this.handleReloadModule}
                      >
                        <i className="fa fa-retweet" />
                        Ачаалах
                      </button>
                    </div> */}
                  </TabPanel>
                </Tabs>
              </div>
            </div>
          </div>
        </div>
        {isOpen ? (
          <LicenseModal
            isNew={isNew}
            isOpen={isOpen}
            openModal={this.openModal}
            closeModal={this.closeModal}
            selectedRow={selectedRow}
          />
        ) : null}

        <LicenseDetailModal
          data={licenseHistory}
          isOpen={isOpenHistory}
          closeModal={this.closeHistoryModal}
        />
      </div>
    );
  }
}

const form = reduxForm({ form: "masterList1" });

function mapStateToProps(state) {
  return {
    licenseList: state.shopLicense.licenseList,
    licenseListModule: state.shopLicense.licenseListModule,
    initialValues:
      Object.keys(searchobj).length === 0
        ? {
            startymd: new Date().toISOString().slice(0, 10),
            endymd: new Date().toISOString().slice(0, 10),
            invoiceymd: new Date().toISOString().slice(0, 10),
            invoiceendymd: new Date().toISOString().slice(0, 10),
          }
        : {
            startymd: new Date(searchobj.startymd).toISOString().slice(0, 10),
            endymd: new Date(searchobj.endymd).toISOString().slice(0, 10),
            invoiceymd: new Date(searchobj.startymd).toISOString().slice(0, 10),
            invoiceendymd: new Date(searchobj.endymd)
              .toISOString()
              .slice(0, 10),
          },
  };
}

export default connect(mapStateToProps, {
  GetAllLisenceList,
  GetLicenseWindows,
  GetAllLisenceModule,
})(form(Components));
