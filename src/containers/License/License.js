import React, { Component } from "react";
import { Field, reduxForm } from "redux-form";
import { connect } from "react-redux";
import {
  getLicense,
  clearLicense,
  editLicense
} from "../../actions/license_action";
import { BootstrapTable, TableHeaderColumn } from "react-bootstrap-table";
import "react-bootstrap-table/dist/react-bootstrap-table.min.css";
//import Loading from '../../components/Loading';

var SearchObj3 = {};
var onChangeSearch = {};
Object.defineProperty(onChangeSearch, "beginDate", {
  value: new Date().toISOString(),
  writable: true,
  enumerable: true,
  configurable: true
});
Object.defineProperty(onChangeSearch, "endDate", {
  value: new Date().toISOString(),
  writable: true,
  enumerable: true,
  configurable: true
});

class License extends Component {
  constructor(props) {
    super(props);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.click = this.click.bind(this);
    this.Refresh = this.Refresh.bind(this);
    this.renderShowsTotal = this.renderShowsTotal.bind(this);
    this.state = { value: true, Loading: false };
  }

  componentDidMount() {
    this.setState({ Loading: true });
    var currentdate = new Date();
    this.props.clearLicense();
    if (Object.keys(SearchObj3).length === 0) {
      SearchObj3 = {
        beginDate: currentdate.toLocaleDateString() + " 00:00:00",
        endDate: currentdate.toLocaleDateString() + " 23:59:59"
      };
      this.props.getLicense(SearchObj3);
    } else {
      this.props.getLicense(SearchObj3);
    }
    this.setState({ Loading: false });
  }

  handleFormSubmit(formProps) {
    this.setState({ Loading: true });
    if (formProps.endDate.length !== 0 && formProps.beginDate.length !== 0) {
      var bgnDate = formProps.beginDate;
      var endDate = formProps.endDate;
      formProps.beginDate += " 00:00:00";
      formProps.endDate += " 23:59:59";
      this.props.getLicense(formProps);
      formProps.beginDate = bgnDate;
      formProps.endDate = endDate;
    } else {
      window.alert("Эхлэх дуусах хугацааг сонгоно уу");
    }
    this.setState({ Loading: false });
  }
  click() {
    print();
  }

  editClick(row) {
    this.props.editLicense(row);
  }

  handleChange(e) {
    switch (e.target.name) {
      case "beginDate":
        Object.defineProperty(onChangeSearch, "beginDate", {
          value: e.target.value + " 00:00:00",
          writable: true,
          enumerable: true,
          configurable: true
        });
        break;
      case "endDate":
        Object.defineProperty(onChangeSearch, "endDate", {
          value: e.target.value + " 23:59:59",
          writable: true,
          enumerable: true,
          configurable: true
        });
        break;
      case "paymentType":
        switch (e.target.value) {
          case "0":
            Object.defineProperty(onChangeSearch, "paymentType", {
              value: 0,
              writable: true,
              enumerable: true,
              configurable: true
            });
            break;
          case "1":
            Object.defineProperty(onChangeSearch, "paymentType", {
              value: 1,
              writable: true,
              enumerable: true,
              configurable: true
            });
            break;
          case "2":
            Object.defineProperty(onChangeSearch, "paymentType", {
              value: 2,
              writable: true,
              enumerable: true,
              configurable: true
            });
            break;
          case "3":
            Object.defineProperty(onChangeSearch, "paymentType", {
              value: 3,
              writable: true,
              enumerable: true,
              configurable: true
            });
            break;
          default:
            Object.defineProperty(onChangeSearch, "paymentType", {
              value: "",
              writable: true,
              enumerable: true,
              configurable: true
            });
            break;
        }
        break;
      case "userName":
        Object.defineProperty(onChangeSearch, "userName", {
          value: e.target.value,
          writable: true,
          enumerable: true,
          configurable: true
        });
        break;
      default:
        break;
    }
    SearchObj3 = onChangeSearch;
    this.props.getLicense(onChangeSearch);
  }

  hiddenclick() {
    if (this.refs.table.state.selectedRowKeys.length > 0) {
      var selectedrow = [];
      for (var key in this.props.rows) {
        if (
          this.props.rows[key].rank === this.refs.table.state.selectedRowKeys
        ) {
          selectedrow = this.props.rows[key];
        }
      }
      this.editClick(selectedrow);
    } else {
      alert("Засах мөрөө сонгоно уу!");
    }
  }
  Refresh() {
    window.location.reload();
  }
  handlerClickCleanFiltered() {
    this.refs.username.cleanFiltered();
    this.refs.payddate.cleanFiltered();
    this.refs.paydamount.cleanFiltered();
    this.refs.isactive.cleanFiltered();
    this.refs.typeid.cleanFiltered();
  }

  createCustomClearButton = onClick => {
    return (
      <button className="btn btn-warning" onClick={onClick}>
        Clean
      </button>
    );
  };
  numberofrows(cell, formatExtraData, row, rowIdx) {
    return rowIdx;
  }

  renderShowsTotal(start, to, total) {
    return (
      <div>
        <p style={{ color: "#607d8b", width: "400px" }}>
          Бүгд ( {total} ) |
          <span style={{ color: "#f8cb00" }}>
            Идэвхтэй ( {this.props.istrue} ){" "}
          </span>
          |{" "}
          <span style={{ color: "#C0C0C0" }}>
            Идэвхгүй ( {this.props.isfalse} ){" "}
          </span>
        </p>
      </div>
    );
  }
  render() {
    const { handleSubmit } = this.props;
    const { rows } = this.props;

    const selectRowProp = {
      mode: "radio",
      bgColor: "pink", // you should give a bgcolor, otherwise, you can't regonize which row has been selected
      hideSelectColumn: true, // enable hide selection column.
      clickToSelect: true // you should enable clickToSelect, otherwise, you can't select column.
    };

    const options = {
      page: 1, // which page you want to show as default
      sizePerPageList: [
        {
          text: "10",
          value: 10
        },
        {
          text: "20",
          value: 20
        },
        {
          text: "30",
          value: 30
        },
        {
          text: "40",
          value: 40
        },
        {
          text: "Бүгд",
          value: rows.length
        }
      ], // you can change the dropdown list for size per page
      hideSizePerPage: true,
      prePage: "Өмнөх", // Previous page button text
      nextPage: "Дараах", // Next page button text
      firstPage: "Эхнийх", // First page button text
      lastPage: "Сүүлийх",
      paginationShowsTotal: this.renderShowsTotal, // Accept bool or function
      sizePerPage: 10, // which size per page you want to locate as default
      pageStartIndex: 1, // where to start counting the pages
      paginationPosition: "bottom",
      hidePageListOnlyOnePage: true,
      noDataText: "Өгөгдөл олдсонгүй"
    };

    const qualityType = {
      1: "Идэвхитэй",
      0: "Идэвхигүй"
    };

    const paytype = {
      0: "Энгийн",
      1: "Скайтел",
      2: "Хаан банк",
      3: "Онлайнаар"
    };

    function insempdata(cell, row) {
      if (cell === null) {
        return "Скайтел charge";
      } else {
        return cell;
      }
    }

    function columnClassNameFormat(fieldValue, row, rowIdx, colIdx) {
      return row.isActive === 1
        ? "td-selected-column-success"
        : "td-selected-column-fall";
    }
    function enumFormatter(cell, row, enumObject) {
      return enumObject[cell];
    }

    function priceFormatter(cell, row) {
      if (cell === null) {
        return null;
      } else {
        return "₮" + cell.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      }
    }
    function dateFormatter(cell, row) {
      if (cell === null) {
        return null;
      }
      return cell.substring(0, 10) + " " + cell.substring(11, 19);
    }
    /*onChange={this.handleChange.bind(this)}*/

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
                    <div className="form-group col-sm-1.3">
                      <label>Төлбөр төлсөн огноо</label>
                      <Field
                        name="beginDate"
                        component="input"
                        type="date"
                        className="form-control dateclss"
                      />
                    </div>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <div className="form-group col-sm-1.3">
                      <label> &nbsp;&nbsp;&nbsp;</label>
                      <Field
                        name="endDate"
                        component="input"
                        type="date"
                        className="form-control dateclss"
                      />
                    </div>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <div className="form-group col-sm-1.3">
                      <label>
                        Нэвтрэх дугаар&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                      </label>
                      <Field
                        name="userName"
                        component="input"
                        type="text"
                        className="form-control"
                      />
                    </div>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <div className="form-group col-sm-1.3">
                      <label>
                        Төлбөрийн хэлбэр&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                      </label>
                      <Field
                        name="paymentType"
                        component="select"
                        type="text"
                        className="form-control"
                      >
                        <option value="">Бүгд</option>
                        <option value="0">Энгийн</option>
                        <option value="1">Скайтел</option>
                        <option value="2">Хаан банк</option>
                        <option value="3">Онлайнаар</option>
                      </Field>
                    </div>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    {/*<div className="form-group col-sm-1.3">
        <label>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</label>
        <button type="submit" className="form-control button-save btn">Шүүх</button>
      </div>*/}
                  </div>
                </form>
              </div>
              <div className="card-block">
                {/* <a onClick={ this.handlerClickCleanFiltered.bind(this) } style={ { cursor: 'pointer' } }>Шүүлтүүр арилгах</a> --> */}
                <BootstrapTable
                  data={rows}
                  hover={true}
                  pagination={true}
                  ref="table"
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
                    width="80px"
                    dataAlign="center"
                    headerAlign="center"
                    columnClassName={columnClassNameFormat}
                    dataSort={true}
                    isKey
                  >
                    <span className="descr">Д.д&nbsp;&nbsp;&nbsp;</span>
                  </TableHeaderColumn>
                  <TableHeaderColumn
                    ref="userName"
                    dataField="userName"
                    dataAlign="left"
                    headerAlign="center"
                    columnClassName={columnClassNameFormat}
                    dataSort={true}
                  >
                    <span className="descr">Нэвтрэх дугаар&nbsp;&nbsp;</span>
                  </TableHeaderColumn>
                  <TableHeaderColumn
                    ref="paydDate"
                    dataField="paydDate"
                    dataAlign="left"
                    headerAlign="center"
                    columnClassName={columnClassNameFormat}
                    dataSort={true}
                    dataFormat={dateFormatter}
                  >
                    <span className="descr">
                      Төлсөн огноо &nbsp;&nbsp;&nbsp;
                    </span>
                  </TableHeaderColumn>
                  <TableHeaderColumn
                    ref="paydAmount"
                    dataField="paydAmount"
                    dataAlign="right"
                    headerAlign="center"
                    columnClassName={columnClassNameFormat}
                    dataSort={true}
                    dataFormat={priceFormatter}
                    width="150"
                  >
                    <span className="descr">Төлсөн дүн&nbsp;&nbsp;&nbsp;</span>
                  </TableHeaderColumn>
                  <TableHeaderColumn
                    dataField="startDate"
                    dataAlign="left"
                    headerAlign="center"
                    columnClassName={columnClassNameFormat}
                    dataSort={true}
                    dataFormat={dateFormatter}
                  >
                    <span className="descr">Эхлэх огноо&nbsp;&nbsp;&nbsp;</span>
                  </TableHeaderColumn>
                  <TableHeaderColumn
                    dataField="endDate"
                    dataAlign="left"
                    headerAlign="center"
                    columnClassName={columnClassNameFormat}
                    dataSort={true}
                    dataFormat={dateFormatter}
                  >
                    <span className="descr">
                      Дуусах огноо&nbsp;&nbsp;&nbsp;
                    </span>
                  </TableHeaderColumn>
                  <TableHeaderColumn
                    ref="typeid"
                    dataField="typeId"
                    headerAlign="center"
                    columnClassName={columnClassNameFormat}
                    dataAlign="left"
                    dataSort={true}
                    dataFormat={enumFormatter}
                    formatExtraData={paytype}
                  >
                    <span className="descr">
                      Төлбөрийн хэлбэр&nbsp;&nbsp;&nbsp;
                    </span>
                  </TableHeaderColumn>
                  <TableHeaderColumn
                    dataField="insYmd"
                    dataAlign="left"
                    headerAlign="center"
                    columnClassName={columnClassNameFormat}
                    dataSort={true}
                    dataFormat={dateFormatter}
                  >
                    <span className="descr">
                      Бүртгэсэн огноо&nbsp;&nbsp;&nbsp;
                    </span>
                  </TableHeaderColumn>
                  <TableHeaderColumn
                    dataField="insEmp"
                    dataAlign="left"
                    headerAlign="center"
                    columnClassName={columnClassNameFormat}
                    dataSort={true}
                    dataFormat={insempdata}
                  >
                    <span className="descr">
                      Бүртгэсэн ажилтан&nbsp;&nbsp;&nbsp;
                    </span>
                  </TableHeaderColumn>
                  <TableHeaderColumn
                    ref="isactive"
                    dataField="isActive"
                    headerAlign="center"
                    columnClassName={columnClassNameFormat}
                    dataAlign="left"
                    dataSort={true}
                    dataFormat={enumFormatter}
                    formatExtraData={qualityType}
                  >
                    <span className="descr">Төлөв&nbsp;&nbsp;&nbsp;</span>
                  </TableHeaderColumn>
                </BootstrapTable>
              </div>
            </div>
          </div>
        </div>
        <div className="card-block">
          <button type="submit" className="btn btn-primary" form="myForm">
            <i className="fa fa-retweet" /> Ачаалах
          </button>
          &nbsp;&nbsp;
          <button
            type="button"
            className="btn"
            style={{ backgroundColor: "#f7a115", color: "white" }}
            onClick={() => this.hiddenclick()}
          >
            <i className="fa fa-paper-plane-o" /> Засах&nbsp;&nbsp;
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
        </div>
      </div>
    );
  }
}
const form = reduxForm({
  form: "License"
});

function mapStateToProps(state) {
  var istrue = 0;
  var isfalse = 0;
  for (var i = 0; i < state.license.rows.length; i++) {
    if (state.license.rows[i].isActive === 1) {
      istrue += 1;
    }
    if (state.license.rows[i].isActive === 0) {
      isfalse += 1;
    }
  }

  if (Object.keys(SearchObj3).length === 0) {
    return {
      rows: state.license.rows,
      columns: state.license.columns,
      initialValues: {
        endDate: new Date().toISOString().slice(0, 10),
        beginDate: new Date().toISOString().slice(0, 10)
      }
    };
  } else {
    return {
      rows: state.license.rows,
      columns: state.license.columns,
      initialValues: {
        endDate: SearchObj3.endDate.slice(0, 10),
        beginDate: SearchObj3.beginDate.slice(0, 10),
        userName: SearchObj3.userName,
        paymentType: SearchObj3.paymentType
      },
      istrue,
      isfalse
    };
  }
}
export default connect(
  mapStateToProps,
  { getLicense, clearLicense, editLicense }
)(form(License));
