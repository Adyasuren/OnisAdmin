import React, { Component } from "react";
import { Field, reduxForm } from "redux-form";
import { connect } from "react-redux";
import { Link } from "react-router";
import "react-bootstrap-table/dist/react-bootstrap-table.min.css";
import { getPayment, editDesktopPayment } from "../../actions/desktop_action";
import Moment from 'moment'
import {
  BootstrapTable,
  TableHeaderColumn,
  SizePerPageDropDown
} from "react-bootstrap-table";
var SearchObj6 = {};
var onChangeSearch = {};
Object.defineProperty(onChangeSearch, "startDate", {
  value: new Date().toISOString(),
  writable: true,
  enumerable: true,
  configurable: true
});
Object.defineProperty(onChangeSearch, "endDate", {
  value: new Date().toISOString().slice(0, 10) + " 23:59:59",
  writable: true,
  enumerable: true,
  configurable: true
});
const formatter = new Intl.NumberFormat("en-US");

class Components extends Component {
  constructor(props) {
    super(props);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.renderShowsTotal = this.renderShowsTotal.bind(this);
    this.hiddenclick = this.hiddenclick.bind(this);
    this.state = {
      Loading: true
    };
    document.title = "Хэрэглэгчийн жагсаалт - Оньс админ";
  }

  componentWillMount() {
    /* SearchObj1 = {
      startDate: new Date().toISOString().slice(0, 10),
      endDate: new Date().toISOString().slice(0, 10) + "T23:59:59Z",
    };
    SearchObj4 = {
      startDate: new Date().toISOString().slice(0, 10),
      endDate: new Date().toISOString().slice(0, 10) + "T23:59:59Z",
      paymentType: "0"

    };
    this.props.getPayment(SearchObj1);
    this.setState({ Loading: false }); */
    this.setState({ Loading: true });
    var currentdate = new Date();
    if (Object.keys(SearchObj6).length === 0) {
      SearchObj6 = {
        startDate: currentdate.toLocaleDateString() + " 00:00:00",
        endDate: currentdate.toLocaleDateString() + " 23:59:59"
      };
      this.props.getPayment(SearchObj6);
    } else {
      this.props.getPayment(SearchObj6);
    }
    this.setState({ Loading: false });
  }

  handleFormSubmit(formProps) {
    this.setState({ Loading: true });
    var bgnDate = formProps.startDate;
    var endDate = formProps.endDate;
    formProps.startDate += " 00:00:00";
    formProps.endDate += " 23:59:59";
    SearchObj6 = formProps;
    this.props.getPayment(SearchObj6);
    formProps.startDate = bgnDate;
    formProps.endDate = endDate;
    this.setState({ Loading: false });
  }

  renderShowsTotal() {
    return (
      <div className="row" style={{ marginLeft: "5px" }}>
        <b className="descr">Хайлтын нийт дүн: {formatter.format(this.props.price)}</b>
      </div>
    );
  }

  handleDoubleClick = row => {
    this.props.editDesktopPayment(row)
  };

  renderSizePerPageDropDown = props => {
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

  onToggleDropDown = toggleDropDown => {
    toggleDropDown();
  };

  hiddenclick = row => {
    /* console.log(row) */
  };

  editClick = row => {
    /* this.props.editDeskStore(row) */
  }

  handleChange(e) {
    switch (e.target.name) {
      case "startDate":
        SearchObj6.startDate = e.target.value
        break;
      case "endDate":
        SearchObj6.endDate = e.target.value
        break;
      case "regNum":
        SearchObj6.regNum = e.target.value
        break;
      case "phonenum":
        if (e.target.value === "") {
          SearchObj6.phoneNum = null
        }
        else {
          SearchObj6.phoneNum = e.target.value
        }
        break;
      case "paymenttype":
        SearchObj6.paymentType = e.target.value
        break;
      default:
        break;
    }
  }

  render() {
    const { handleSubmit } = this.props;
    const { rows } = this.props;
    const options = {
      page: 1,
      sizePerPageDropDown: this.renderSizePerPageDropDown,
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
      ],
      hideSizePerPage: true,
      onRowClick: this.hiddenclick,
      onRowDoubleClick: this.handleDoubleClick,
      paginationShowsTotal: this.renderShowsTotal,
      prePage: "Өмнөх",
      nextPage: "Дараах",
      firstPage: "Эхнийх",
      lastPage: "Сүүлийх",
      sizePerPage: 10,
      pageStartIndex: 1,
      paginationPosition: "bottom",
      hidePageListOnlyOnePage: true,
      noDataText: "Өгөгдөл олдсонгүй"
    };

    const selectRowProp = {
      mode: "radio",
      bgColor: "pink",
      hideSelectColumn: true,
      clickToSelect: true
    };
    function indexN(cell, row, enumObject, index) {
      return <div>{index + 1}</div>;
    }

    function branchFormatter(cell, row) {
      if (row.lclbranchid === 1) {
        return "Толгой";
      } else {
        return "Салбар";
      }
    }
    function amountFormatter(cell, row) {
      if (cell === null) {
        return null;
      }
      return formatter.format(cell)
    }
    function dateFormatter(cell, row) {
      if (cell === null) {
        return null;
      }
      return Moment(cell).format('YYYY-MM-D')
    }
    function typeFormatter(cell, row) {
      if (row.paymenttype === 1) {
        return "Бэлнээр";
      }
      else if (row.paymenttype === 2) {
        return "Скайтелээр";
      }
      else if (row.paymenttype === 3) {
        return "Хаан банкаар";
      }
      else if (row.paymenttype === 4) {
        return "Онлайнаар";
      }
      else if (row.paymenttype === 5) {
        return "Посоор";
      }
    }

    return (
      <div className="animated fadeIn">
        <div className="row">
          <div className="col-lg-12">
            <div className="card">
              <div className="card-header test" ref="test">
                <form
                  onSubmit={handleSubmit(this.handleFormSubmit)}
                  id="myForm"
                >
                  <div className="row">
                    <div
                      className="form-group col-sm-1.3"
                      style={{ marginLeft: "20px" }}
                    >
                      <label>Гүйлгээний огноо</label>
                      <Field
                        name="startDate"
                        component="input"
                        type="date"
                        className="form-control dateclss"
                        onChange={this.handleChange.bind(this)}
                      />
                    </div>

                    <div
                      className="form-group col-sm-1.3"
                      style={{ marginLeft: "20px" }}
                    >
                      <label>&nbsp;&nbsp;&nbsp;</label>
                      <Field
                        name="endDate"
                        component="input"
                        type="date"
                        className="form-control dateclss"
                        onChange={this.handleChange.bind(this)}
                      />
                    </div>

                    <div
                      className="form-group col-sm-1.3"
                      style={{ marginLeft: "20px" }}
                    >
                      <label>Төлбөрийн хэлбэр</label>
                      <Field
                        name="paymenttype"
                        component="select"
                        type="text"
                        className="form-control"
                        onChange={this.handleChange.bind(this)}
                      >
                        <option value="0">Бүгд</option>
                        <option value="1">Бэлнээр</option>
                        <option value="2">Скайтелээр</option>
                        <option value="3">Хаан банкаар</option>
                        <option value="4">Онлайнаар</option>
                        <option value="5">Посоор</option>
                      </Field>
                    </div>

                    <div
                      className="form-group col-sm-1.3"
                      style={{ marginLeft: "20px" }}
                    >
                      <label>Регистрийн дугаар</label>
                      <Field
                        name="regNum"
                        component="input"
                        type="text"
                        className="form-control"
                        onChange={this.handleChange.bind(this)}
                      />
                    </div>
                  </div>
                </form>
              </div>

              <div className="card-block tmpresponsive">
                <BootstrapTable
                  data={rows}
                  tableHeaderClass="tbl-header-class"
                  tableBodyClass="tbl-body-class"
                  ref="table"
                  options={options}
                  maxHeight={"500px"}
                  width={"100%"}
                  bordered={true}
                  selectRow={selectRowProp}
                  striped={true}
                  hover={true}
                  pagination={true}
                  condensed={true}
                >
                  <TableHeaderColumn
                    dataField="rank"
                    dataAlign="center"
                    headerAlign="center"
                    dataFormat={indexN}
                  >
                    <span className="descr">Д.д</span>
                  </TableHeaderColumn>
                  <TableHeaderColumn
                    dataField="paydate"
                    headerAlign="center"
                    dataAlign="center"
                    dataFormat={dateFormatter}
                  >
                    <span className="descr">Огноо</span>
                  </TableHeaderColumn>
                  <TableHeaderColumn
                    dataField="amount"
                    dataAlign="center"
                    headerAlign="center"
                    dataFormat={amountFormatter}
                  >
                    <span className="descr">Дүн</span>
                  </TableHeaderColumn>
                  <TableHeaderColumn
                    dataField="paymenttype"
                    dataAlign="center"
                    headerAlign="center"
                    dataFormat={typeFormatter}
                  >
                    <span className="descr">Төлбөрийн хэлбэр</span>
                  </TableHeaderColumn>
                  <TableHeaderColumn
                    dataField="regnum"
                    dataAlign="left"
                    headerAlign="center"
                  >
                    <span className="descr">Регистрийн дугаар</span>
                  </TableHeaderColumn>
                  <TableHeaderColumn
                    dataField="storename"
                    headerAlign="center"
                    dataAlign="center"
                  >
                    <span className="descr">Дэлгүүрийн нэр</span>
                  </TableHeaderColumn>
                  <TableHeaderColumn
                    dataField="paymentid"
                    headerAlign="center"
                    dataAlign="center"
                    isKey={true}
                    hidden={true}
                  >
                    <span className="descr">branch id</span>
                  </TableHeaderColumn>
                  <TableHeaderColumn
                    dataField="branchname"
                    headerAlign="center"
                    dataAlign="center"
                  >
                    <span className="descr">Салбарын нэр</span>
                  </TableHeaderColumn>
                  <TableHeaderColumn
                    dataField="lclbranchid"
                    headerAlign="center"
                    dataAlign="center"
                    dataFormat={branchFormatter}
                  >
                    <span className="descr">Төрөл</span>
                  </TableHeaderColumn>
                  <TableHeaderColumn
                    dataField="startdate"
                    headerAlign="center"
                    dataAlign="center"
                    dataFormat={dateFormatter}
                  >
                    <span className="descr">Лиценз эхлэх хугацаа</span>
                  </TableHeaderColumn>
                  <TableHeaderColumn
                    dataField="enddate"
                    headerAlign="center"
                    dataAlign="center"
                    dataFormat={dateFormatter}
                    dataSort={true}
                  >
                    <span className="descr">Лиценз дуусах хугацаа</span>
                  </TableHeaderColumn>
                  <TableHeaderColumn
                    dataField="macaddress"
                    headerAlign="center"
                    dataAlign="center"
                  >
                    <span className="descr">Mac address</span>
                  </TableHeaderColumn>
                  <TableHeaderColumn
                    dataField="insertdate"
                    headerAlign="center"
                    dataAlign="center"
                    dataFormat={dateFormatter}
                  >
                    <span className="descr">Бүртгэсэн огноо</span>
                  </TableHeaderColumn>
                  <TableHeaderColumn
                    dataField="updatedate"
                    headerAlign="center"
                    dataAlign="center"
                    dataFormat={dateFormatter}
                  >
                    <span className="descr">Зассан огноо</span>
                  </TableHeaderColumn>
                  <TableHeaderColumn
                    dataField="insertuser"
                    headerAlign="center"
                    dataAlign="center"
                  >
                    <span className="descr">Бүртгэсэн хэрэглэгч</span>
                  </TableHeaderColumn>
                </BootstrapTable>
              </div>
            </div>
          </div>
        </div>
        <div className="card-block" >
          <button
            type="submit"
            className="btn btn-primary"
            form="myForm"
            style={{ marginRight: "10px" }}
          >
            <i className="fa fa-retweet" /> Ачаалах
          </button>
          <Link
            to={"/paymentadd"}
            className="btn btn-success"
            style={{ marginRight: "10px" }}
          >
            <i className="fa fa-file-text-o" /> Шинэ
          </Link>
          {/* <button
            type="button"
            className="btn"
            style={{
              backgroundColor: "#f7a115",
              color: "white",
              marginRight: "10px"
            }}
            onClick={() => this.hiddenclick()}
          >
            <i className="fa fa-paper-plane-o" /> Засах
          </button> */}
          <button
            type="button"
            className="btn"
            style={{
              backgroundColor: "#b0bec5",
              color: "white",
              marginRight: "10px"
            }}
            onClick={() => this.click()}
          >
            <i className="fa fa-print" /> Хэвлэх
          </button>
        </div>
      </div>
    );
  }
}

const form = reduxForm({
  form: "DesktopPayment"
});

function mapStateToProps(state) {
  let istrue = 0;
  let isfalse = 0;
  let isexpired = 0;
  let sumPrice = 0;
  for (let i = 0; i < state.desktop.rows.length; i++) {
    sumPrice += state.desktop.rows[i].amount
    if (state.desktop.rows[i].lclbranchid === 1) {
      istrue++;
    }
    else {
      isfalse++
    }
  }

  if (Object.keys(SearchObj6).length === 0) {
    return {
      rows: state.desktop.rows,
      istrue: istrue,
      isfalse: isfalse,
      isexpired: isexpired,
      price: sumPrice,
      initialValues: {
        startDate: new Date().toISOString().slice(0, 10),
        endDate: new Date().toISOString().slice(0, 10),
        searchregNum: ""
      }
    };
  } else {
    return {
      rows: state.desktop.rows,
      istrue: istrue,
      isfalse: isfalse,
      isexpired: isexpired,
      price: sumPrice,
      initialValues: {
        endDate: SearchObj6.endDate,
        startDate: SearchObj6.startDate
      }
    };
  }
}
export default connect(
  mapStateToProps,
  { getPayment, editDesktopPayment }
)(form(Components));
