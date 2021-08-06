import React, { Component } from "react";
import { Field, reduxForm } from "redux-form";
import { connect } from "react-redux";
import {
  getLicense,
  clearLicense,
  editLicense,
} from "../../actions/license_action";
import {
  BootstrapTable,
  TableHeaderColumn,
  SizePerPageDropDown,
} from "react-bootstrap-table";
import "react-bootstrap-table/dist/react-bootstrap-table.min.css";
import SmsModal from "./SmsModal";
import LicenseTransfer from "./LicenseTransfer";

var SearchObj4 = {};
var onChangeSearch = {};

class License extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filter: 1,
      isCheckonis: false,
      isCheckonisplus: false,
      isOpen: false,
      isLicenseModal: false,
    };
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.Refresh = this.Refresh.bind(this);
    this.renderShowsTotal = this.renderShowsTotal.bind(this);
    this.isonisType = this.isonisType.bind(this);
    this.click = this.click.bind(this);
    document.title = "Лицензын жагсаалт - Оньс админ";
  }

  componentWillMount() {
    SearchObj4.beginDate = "2000-01-01";
    SearchObj4.endDate = "2999-12-31";
    this.props.clearLicense();
    this.props.getLicense(SearchObj4);
  }

  handleFormSubmit(formProps) {
    SearchObj4.userType = this.isonisType(
      this.state.isCheckonis,
      this.state.isCheckonisplus
    );
    this.props.getLicense(SearchObj4);
  }

  click() {
    this.props.clearSaleList();
  }

  handleChange(e) {
    switch (e.target.name) {
      case "userName":
        Object.defineProperty(onChangeSearch, "userName", {
          value: e.target.value,
          writable: true,
          enumerable: true,
          configurable: true,
        });
        break;
      case "regNum":
        Object.defineProperty(onChangeSearch, "regNum", {
          value: e.target.value,
          writable: true,
          enumerable: true,
          configurable: true,
        });
        break;
      case "phoneNum":
        Object.defineProperty(onChangeSearch, "phoneNum", {
          value: e.target.value,
          writable: true,
          enumerable: true,
          configurable: true,
        });
        break;
      case "SMSQTY":
        Object.defineProperty(onChangeSearch, "SMSQTY", {
          value: e.target.value,
          writable: true,
          enumerable: true,
          configurable: true,
        });
        break;
      default:
        break;
    }
    SearchObj4 = onChangeSearch;
    this.props.getLicense(onChangeSearch);
  }

  checkCustomer(e) {

  }

  handleClick = (e) => {
    switch (e.target.name) {
      case "onis":
        this.setState({ isCheckonis: !this.state.isCheckonis });
        break;
      case "onisplus":
        this.setState({ isCheckonisplus: !this.state.isCheckonisplus });
        break;
      default:
        break;
    }
  };

  isonisType(isCheckonis, isCheckonisplus) {
    if (isCheckonis === true && isCheckonisplus === false) return 1;
    else if (isCheckonisplus === true && isCheckonis === false) return 2;
    else return 0;
  }

  Refresh() {
    window.location.reload();
  }

  createCustomClearButton = (onClick) => {
    return (
      <button className="btn btn-warning" onClick={onClick}>
        Clean
      </button>
    );
  };

  numberofrows(cell, formatExtraData, row, rowIdx) {
    return rowIdx;
  }

  onToggleDropDown = (toggleDropDown) => {
    toggleDropDown();
  };

  renderSizePerPageDropDown = (props) => {
    return (
      <SizePerPageDropDown
        className="my-size-per-page"
        btnContextual="btn-warning"
        variation="dropdown"
        {...props}
        onClick={() => this.onToggleDropDown(props.toggleDropDown)}
      />
    );
  };

  renderShowsTotal(start, to, total) {
    return (
      <div>
        <p style={{ color: "#607d8b", width: "500px" }}>
          <a style={{ color: "#607d8b" }} onClick={this.tpmFilter}>
            Бүгд ( {total} ){" "}
          </a>
          |
          <a
            href="#"
            onClick={() => this.setState({ filter: 1 })}
            style={{ color: "#FFC11B" }}
          >
            {" "}
            Хэвийн ( {this.props.istrue} ){" "}
          </a>
          |
          <a
            href="#"
            onClick={() => this.setState({ filter: 0 })}
            style={{ color: "red" }}
          >
            {" "}
            Хугацаа дууссан ( {this.props.isexpired} ){" "}
          </a>{" "}
          |
          <a
            href="#"
            onClick={() => this.setState({ filter: -1 })}
            style={{ color: "red" }}
          >
            {" "}
            Лиценз үүсээгүй ( {this.props.isfalse} ){" "}
          </a>
        </p>
      </div>
    );
  }

  handleSms = () => {
    this.openModal();
  };

  openModal = () => {
    this.setState({ isOpen: true });
  };

  closeModal = (isReload) => {
    this.setState({ isOpen: false }, () => {
      if (isReload) {
        this.handleFormSubmit();
      }
    });
  };
  handleLicense = () => {
    this.openLicense();
  };

  openLicense = () => {
    this.setState({ isLicenseModal: true });
  };

  closeLicense = (isReload) => {
    this.setState({ isLicenseModal: false }, () => {
      if (isReload) {
        this.handleFormSubmit();
      }
    });
  };

  render() {
    const { handleSubmit } = this.props;
    const { rows } = this.props;

    var tmpArray = rows;

    tmpArray = rows.filter((item) => {
      if (
        this.isonisType(this.state.isCheckonis, this.state.isCheckonisplus) ===
        0
      ) {
        return item;
      } else if (
        item.userType ===
        this.isonisType(this.state.isCheckonis, this.state.isCheckonisplus)
      ) {
        return item;
      } else {
        return item;
      }
    });

    const selectRowProp = {
      mode: "radio",
      bgColor: "pink", // you should give a bgcolor, otherwise, you can't regonize which row has been selected
      hideSelectColumn: true, // enable hide selection column.
      clickToSelect: true, // you should enable clickToSelect, otherwise, you can't select column.
    };

    const options = {
      page: 1, // which page you want to show as default
      sizePerPageDropDown: this.renderSizePerPageDropDown,
      sizePerPageList: [
        {
          text: "10",
          value: 10,
        },
        {
          text: "20",
          value: 20,
        },
        {
          text: "30",
          value: 30,
        },
        {
          text: "40",
          value: 40,
        },
        {
          text: "Бүгд",
          value: rows.length,
        },
      ], // you can change the dropdown list for size per page
      paginationPosition: "bottom",
      prePage: "Өмнөх", // Previous page button text
      nextPage: "Дараах", // Next page button text
      firstPage: "Эхнийх", // First page button text
      lastPage: "Сүүлийх",
      paginationShowsTotal: this.renderShowsTotal,
      sizePerPage: 10, // which size per page you want to locate as default
      pageStartIndex: 1, // where to start counting the pages
      noDataText: "Өгөгдөл олдсонгүй",
    };

    function columnClassNameFormat(fieldValue, row, rowIdx, colIdx) {
      return row.status <= 0
        ? "td-selected-column-fall"
        : "td-selected-column-success";
    }

    const appFormat = {
      1: "Oньс",
      2: "ОньсПлас",
    };

    function qualityType(cell) {
      if (cell === null) {
        return null;
      }
      if (cell === 1) {
        return "Хэвийн";
      }
      if (cell === 0) {
        return "Хугацаа дууссан";
      }
      if (cell < 0) {
        return "Лиценз үүсээгүй";
      }
    }
    function enumFormatter(cell, row, enumObject) {
      return enumObject[cell];
    }
    return (
      <div className="animated fadeIn">
        <div className="row">
          <div className="col-lg-12">
            <div className="card">
              <div className="card-header">
                <form
                  onSubmit={handleSubmit(this.handleFormSubmit)}
                  id="myForm"
                >
                  <div className="row">
                    <div
                      className="form-group col-sm-1.3"
                      style={{ marginLeft: "20px" }}
                    >
                      <label>Нэвтрэх дугаар</label>
                      <input
                        name="userName"
                        type="text"
                        maxLength="6"
                        onChange={this.handleChange.bind(this)}
                        className="form-control"
                      />
                    </div>
                    <div
                      className="form-group col-sm-1.3"
                      style={{ marginLeft: "20px" }}
                    >
                      <label>Татвар төлөгчийн дугаар</label>
                      <input
                        name="regNum"
                        onChange={this.handleChange.bind(this)}
                        type="text"
                        maxLength="10"
                        className="form-control"
                      />
                    </div>
                    <div
                      className="form-group col-sm-1.3"
                      style={{ marginLeft: "20px" }}
                    >
                      <label>Утасны дугаар</label>
                      <input
                        name="phoneNum"
                        onChange={this.handleChange.bind(this)}
                        type="Number"
                        maxLength="8"
                        className="form-control"
                      />
                    </div>
                  </div>
                  <div
                    className="form-group col-sm-1.3"
                    style={{ marginLeft: "5px" }}
                  >
                    <Field
                      name="onis"
                      component="input"
                      type="checkbox"
                      onChange={this.handleClick}
                    />
                    &nbsp;&nbsp;
                    <label>Оньс</label>
                    &nbsp;&nbsp;&nbsp;&nbsp;
                    <Field
                      name="onisplus"
                      component="input"
                      type="checkbox"
                      onChange={this.handleClick}
                    />
                    &nbsp;&nbsp;
                    <label>ОньсПлас </label>
                    <button
                      type="button"
                      className="btn"
                      style={{backgroundColor: "#f7a115", color: "white",float: 'right'}}
                      onClick={this.handleLicense}
                    >
                      <i className="fa fa-save" />
                      Лиценз шилжүүлэх
                    </button>
                    &nbsp;&nbsp;
                    <button
                      type="button"
                      className="btn"
                      style={{backgroundColor: "#f7a115", color: "white",float: 'right', marginRight:15}}
                      onClick={this.handleSms}
                    >
                      <i className="fa fa-save" />
                      Мессеж эрх
                    </button>
                    <button
                      type="button"
                      className="btn"
                      style={{ backgroundColor: "#b0bec5", color: "white",float: 'right', marginRight:15}}
                      onClick={() => this.click()}
                    >
                      <i className="fa fa-print" /> Хэвлэх&nbsp;
                    </button>
                    <button type="submit" className="btn btn-primary" form="myForm" style={{ float: 'right', marginRight:15}}>
                      <i className="fa fa-retweet" /> Ачаалах
                    </button>
                  </div>
                </form>
              </div>
              <div className="card-block tmpresponsive">
                <BootstrapTable
                  data={tmpArray}
                  hover={true}
                  pagination={true}
                  ref="table"
                  maxHeight={"500px"}
                  width={"500px"}
                  tableHeaderClass="tbl-header-class"
                  tableBodyClass="tbl-body-class"
                  options={options}
                  selectRow={selectRowProp}
                  bordered={true}
                  striped
                  condensed
                >
                  <TableHeaderColumn
                    dataField="rank"
                    width="50px"
                    dataAlign="center"
                    headerAlign="center"
                    dataSort={true}
                    columnClassName={columnClassNameFormat}
                    isKey
                  >
                    <span className="descr">№ &nbsp;&nbsp;&nbsp;</span>
                  </TableHeaderColumn>

                  <TableHeaderColumn
                    dataField="userType"
                    width="100px"
                    dataAlign="center"
                    headerAlign="center"
                    dataSort={true}
                    dataFormat={enumFormatter}
                    formatExtraData={appFormat}
                  >
                    {" "}
                    <span className="descr"> Систем &nbsp;&nbsp;&nbsp;</span>
                  </TableHeaderColumn>
                  <TableHeaderColumn
                    ref="username"
                    dataField="storeId"
                    width="100px"
                    dataAlign="center"
                    headerAlign="center"
                    dataSort={true}
                    columnClassName={columnClassNameFormat}
                  >
                    <span className="descr">Дэлгүүрийн код &nbsp;&nbsp;</span>
                  </TableHeaderColumn>

                  <TableHeaderColumn
                    ref="payddate"
                    dataField="storeName"
                    width="100px"
                    dataAlign="center"
                    headerAlign="center"
                    dataSort={true}
                    columnClassName={columnClassNameFormat}
                  >
                    <span className="descr">
                      Дэлгүүрийн нэр &nbsp;&nbsp;&nbsp;
                    </span>
                  </TableHeaderColumn>

                  <TableHeaderColumn
                    ref="paydamount"
                    dataField="regNum"
                    width="100px"
                    dataAlign="center"
                    headerAlign="center"
                    dataSort={true}
                    columnClassName={columnClassNameFormat}
                  >
                    <span className="descr">
                      Регистрийн дугаар &nbsp;&nbsp;&nbsp;
                    </span>
                  </TableHeaderColumn>

                  <TableHeaderColumn
                    dataField="userName"
                    width="100px"
                    dataAlign="center"
                    headerAlign="center"
                    dataSort={true}
                    columnClassName={columnClassNameFormat}
                  >
                    <span className="descr">
                      Нэвтрэх дугаар &nbsp;&nbsp;&nbsp;
                    </span>
                  </TableHeaderColumn>

                  <TableHeaderColumn
                    dataField="licenseDay"
                    width="100px"
                    dataAlign="center"
                    headerAlign="center"
                    columnClassName={columnClassNameFormat}
                    dataSort={true}
                  >
                    <span className="descr">
                      Лицензын хоног&nbsp;&nbsp;&nbsp;
                    </span>
                  </TableHeaderColumn>
                  <TableHeaderColumn
                    dataField="smsqty"
                    width="100px"
                    dataAlign="center"
                    headerAlign="center"
                    columnClassName={columnClassNameFormat}
                    dataSort={true}
                  >
                    <span className="descr">Мессеж тоо&nbsp;&nbsp;&nbsp;</span>
                  </TableHeaderColumn>

                  <TableHeaderColumn
                    ref="phoneNum"
                    dataField="phoneNum"
                    width="100px"
                    dataAlign="center"
                    headerAlign="center"
                    dataSort={true}
                    columnClassName={columnClassNameFormat}
                  >
                    <span className="descr">
                      Утасны дугаар &nbsp;&nbsp;&nbsp;
                    </span>
                  </TableHeaderColumn>

                  <TableHeaderColumn
                    ref="isactive"
                    dataField="isActive"
                    width="100px"
                    dataAlign="center"
                    headerAlign="center"
                    dataSort={true}
                    columnClassName={columnClassNameFormat}
                    dataFormat={qualityType}
                  >
                    <span className="descr">Төлөв &nbsp;&nbsp;&nbsp;</span>
                  </TableHeaderColumn>
                </BootstrapTable>
              </div>
            </div>
          </div>
        </div>

        {/* <div className="card-block">
          <button type="submit" className="btn btn-primary" form="myForm">
            <i className="fa fa-retweet" /> Ачаалах
          </button>
          &nbsp;&nbsp;
          <button
            type="button"
            className="btn"
            style={{ backgroundColor: "#b0bec5", color: "white" }}
            onClick={() => this.click()}
          >
            <i className="fa fa-print" /> Хэвлэх&nbsp;
          </button>
          <button
            className="btn btn-primary button-save"
            onClick={this.handleSms}
          >
            <i className="fa fa-save" />
            Мессеж эрх
          </button>
          <button
            className="btn btn-primary button-save"
            onClick={this.handleLicense}
          >
            <i className="fa fa-save" />
            Лиценз шилжүүлэх
          </button>
        </div> */}
        {this.state.isOpen ? (
          <SmsModal
            isOpen={this.state.isOpen}
            openModal={this.openModal}
            closeModal={this.closeModal}
          />
        ) : null}
        {this.state.isLicenseModal ? (
          <LicenseTransfer
            isOpen={this.state.isLicenseModal}
            openModal={this.openLicense}
            closeModal={this.closeLicense}
          />
        ) : null}
      </div>
    );
  }
}
const form = reduxForm({
  form: "License",
});

function mapStateToProps(state) {
  let istrue = 0;
  let isfalse = 0;
  let isexpired = 0;
  for (let i = 0; i < state.license.rows.length; i++) {
    if (
      state.license.rows[i].status === 0 ||
      state.license.rows[i].status === null
    ) {
      isexpired++;
    }
    if (state.license.rows[i].status === 1) {
      istrue++;
    }
    if (state.license.rows[i].status === -1) {
      isfalse++;
    }
  }

  return {
    rows: state.license.rows,
    columns: state.license.columns,
    istrue: istrue,
    isfalse: isfalse,
    isexpired: isexpired,
    initialValues: {
      phoneNum: SearchObj4.phoneNum,
      regNum: SearchObj4.regNum,
      userName: SearchObj4.userName,
    },
  };
}
export default connect(mapStateToProps, {
  getLicense,
  clearLicense,
  editLicense,
})(form(License));
