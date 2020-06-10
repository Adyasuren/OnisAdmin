import React, { Component } from "react";
import { Field, reduxForm } from "redux-form";
import { connect } from "react-redux";
import { Link } from "react-router";
import "react-bootstrap-table/dist/react-bootstrap-table.min.css";
import { getBranch, clearBranch, editDeskBranch } from "../../actions/desktop_action";
import Moment from 'moment'
import {
  BootstrapTable,
  TableHeaderColumn,
  SizePerPageDropDown
} from "react-bootstrap-table";
var SearchObj5 = {};
var onChangeSearch1 = {};
Object.defineProperty(onChangeSearch1, "startDate", {
  value: new Date().toISOString(),
  writable: true,
  enumerable: true,
  configurable: true
});
Object.defineProperty(onChangeSearch1, "endDate", {
  value: new Date().toISOString().slice(0, 10) + " 23:59:59",
  writable: true,
  enumerable: true,
  configurable: true
});
class Components extends Component {
  constructor(props) {
    super(props);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.renderShowsTotal = this.renderShowsTotal.bind(this);
    this.state = {
      Loading: true
    };
    document.title = "Хэрэглэгчийн жагсаалт - Оньс админ";
  }

  componentWillMount() {
    this.props.clearBranch();
    this.props.getBranch(SearchObj5);
  }

  handleChange(e) {
    switch (e.target.name) {
      case "startDate":
        SearchObj5.startDate = e.target.value
        break;
      case "endDate":
        SearchObj5.endDate = e.target.value
        break;
      default:
        SearchObj5.regNum = e.target.value
        break;
    }
    SearchObj5 = onChangeSearch1;
  }

  handleFormSubmit(formProps) {
    this.setState({ Loading: true });
    console.log("ачаалах");
    var bgnDate = formProps.startDate;
    var endDate = formProps.endDate;
    formProps.startDate += " 00:00:00";
    formProps.endDate += " 23:59:59";
    SearchObj5 = formProps;
    console.log(SearchObj5);

    this.props.clearBranch();
    this.props.getBranch(SearchObj5)
    formProps.startDate = bgnDate;
    formProps.endDate = endDate;
    this.setState({ Loading: false });
  }

  renderShowsTotal(start, to, total) {
    return (
      <div className="row" style={{ marginLeft: "5px" }}>
        <p style={{ color: "#607d8b", marginRight: "5px", cursor: "pointer" }}>
          {" "}
          Нийт: {this.props.rows.length}{" "}
        </p>
        |
        <p
          style={{
            color: "#f8cb00",
            marginRight: "5px",
            marginLeft: "5px",
            cursor: "pointer"
          }}
          onClick={() => (this.props.rows = [])}
        >
          {" "}
          Толгой ( {this.props.istrue} ){" "}
        </p>
        |
        <p
          style={{
            color: "#C0C0C0",
            marginRight: "5px",
            marginLeft: "5px",
            cursor: "pointer"
          }}
        >
          {" "}
          Салбар ( {this.props.isfalse} ){" "}
        </p>
      </div>
    );
  }

  handleDoubleClick = row => {
    this.props.editDeskBranch(row);
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
    /* console.log(row); */
  };

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

    function statusFormatter(cell, row) {
      if (row.status === 1) {
        return "Идэвхитэй";
      } else if (row.status === 0) {
        return "Идэвхигүй";
      } else return null;
    }
    function branchFormatter(cell, row) {
      if (row.lclbranchid === 1) {
        return "Толгой";
      } else {
        return "Салбар";
      }
    }

    function dateFormatter(cell, row) {
      if (cell === null) {
        return null;
      }
      return Moment(cell).format('YYYY-MM-D')
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
                      <label>Бүртгүүлсэн огноо</label>
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
                  <div className="animated fadeIn">
                    <div className="row">
                      <div className="col-lg-12">
                        <div className="card-header test" ref="test">
                          <div className="row">
                            <div className="form-group col-sm-1.3">
                              <Link
                                to="desktopUser"
                                style={{
                                  verticalAlign: "super",
                                  marginRight: "50px",
                                  cursor: "pointer",
                                  color: "black"
                                }}
                              >
                                Харилцагч
                              </Link>
                              <div style={{ float: "left" }} />
                              <Link
                                to="desktopBranch"
                                style={{
                                  cursor: "pointer",
                                  verticalAlign: "super",
                                  textDecoration: "underline",
                                  color: "orange",
                                  marginRight: "20px"
                                }}
                              >
                                Салбар
                              </Link>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </form>
              </div>

              <div className="card-block tmpresponsive">
                <BootstrapTable
                  data={rows}
                  hover={true}
                  pagination={true}
                  tableHeaderClass="tbl-header-class sticky-header"
                  tableBodyClass="tbl-body-class"
                  options={options}
                  maxHeight={"500px"}
                  bordered={true}
                  selectRow={selectRowProp}
                  striped
                  condensed
                >
                  <TableHeaderColumn
                    width="3%"
                    dataFormat={indexN}
                    headerAlign="center"
                    dataAlign="center"

                  >
                    <span className="descr">Д.д</span>
                  </TableHeaderColumn>
                  <TableHeaderColumn
                    headerAlign="center"
                    dataField="branchid"
                    dataAlign="left"
                    isKey={true}
                    hidden={true}
                  >
                    <span className="descr">branch id</span>
                  </TableHeaderColumn>
                  <TableHeaderColumn
                    headerAlign="center"
                    dataField="ownername"
                    dataAlign="left"
                    dataSort={true}
                  >
                    <span className="descr">Харилцагчийн нэр</span>
                  </TableHeaderColumn>
                  <TableHeaderColumn
                    dataField="regnum"
                    headerAlign="center"
                    dataAlign="center"
                    dataSort={true}
                  >
                    <span className="descr">РД</span>
                  </TableHeaderColumn>
                  <TableHeaderColumn
                    headerAlign="center"
                    dataField="branchname"
                    dataAlign="left"
                    dataSort={true}
                  >
                    <span className="descr">Салбарын нэр</span>
                  </TableHeaderColumn>
                  <TableHeaderColumn
                    dataField="lclbranchid"
                    headerAlign="center"
                    dataAlign="center"
                    dataFormat={branchFormatter}
                    dataSort={true}
                  >
                    <span className="descr">Төрөл</span>
                  </TableHeaderColumn>
                  <TableHeaderColumn
                    dataField="lclbranchid"
                    headerAlign="center"
                    dataAlign="center"
                    dataSort={true}
                  >
                    <span className="descr">Салбарын дугаар</span>
                  </TableHeaderColumn>
                  <TableHeaderColumn
                    dataField="insertdate"
                    headerAlign="center"
                    dataAlign="center"
                    dataFormat={dateFormatter}
                    dataSort={true}
                  >
                    <span className="descr">Бүртгэсэн огноо</span>
                  </TableHeaderColumn>
                  <TableHeaderColumn
                    dataField="insertuser"
                    headerAlign="center"
                    dataAlign="center"
                    dataSort={true}
                  >
                    <span className="descr">Бүртгэсэн хэрэглэгч</span>
                  </TableHeaderColumn>
                  <TableHeaderColumn
                    dataField="macaddress"
                    headerAlign="center"
                    dataAlign="center"
                    dataSort={true}
                  >
                    <span className="descr">MAC address</span>
                  </TableHeaderColumn>
                  <TableHeaderColumn
                    dataField="address"
                    headerAlign="center"
                    dataAlign="left"
                    dataSort={true}
                  >
                    <span className="descr">Хаяг</span>
                  </TableHeaderColumn>
                  <TableHeaderColumn
                    dataField="phonenum"
                    headerAlign="center"
                    dataAlign="center"
                    dataSort={true}
                  >
                    <span className="descr">Утас</span>
                  </TableHeaderColumn>
                  <TableHeaderColumn
                    dataField="licenseexpdate"
                    headerAlign="center"
                    dataAlign="center"
                    dataFormat={dateFormatter}
                    dataSort={true}
                  >
                    <span className="descr">Лиценз дуусах огноо</span>
                  </TableHeaderColumn>
                  <TableHeaderColumn
                    dataField="hasdatabank"
                    headerAlign="center"
                    dataAlign="center"
                    dataSort={true}
                  >
                    <span className="descr">Датабанк ашигладаг эсэх</span>
                  </TableHeaderColumn>
                  <TableHeaderColumn
                    dataField="databankurl"
                    headerAlign="center"
                    dataAlign="center"
                    dataSort={true}
                  >
                    <span className="descr">Датабанк хаяг</span>
                  </TableHeaderColumn>
                  <TableHeaderColumn
                    dataField="note"
                    headerAlign="center"
                    dataAlign="center"
                    dataSort={true}
                  >
                    <span className="descr">Тэмдэглэл</span>
                  </TableHeaderColumn>
                  <TableHeaderColumn
                    dataField="status"
                    headerAlign="center"
                    dataAlign="center"
                    dataFormat={statusFormatter}
                    dataSort={true}
                  >
                    <span className="descr">Төлөв</span>
                  </TableHeaderColumn>
                </BootstrapTable>
              </div>
            </div>
          </div>
        </div>
        <div className="card-block">
          <button
            type="submit"
            className="btn btn-primary"
            form="myForm"
            style={{ marginRight: "10px" }}
          >
            <i className="fa fa-retweet" /> Ачаалах
          </button>
          <Link
            to={"/desktopbranchadd"}
            className="btn btn-success"
            style={{ marginRight: "10px" }}
          >
            <i className="fa fa-file-text-o" /> Шинэ
          </Link>
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
  form: "DesktopBranch"
});

function mapStateToProps(state) {
  let istrue = 0;
  let isfalse = 0;
  let isexpired = 0;
  for (let i = 0; i < state.desktop.branch.length; i++) {
    if (
      state.desktop.branch[i].lclbranchid === 0 ||
      state.desktop.branch[i].lclbranchid === null
    ) {
      isexpired++;
    }
    if (state.desktop.branch[i].lclbranchid === 1) {
      istrue++;
    }
    else {
      isfalse++;
    }
  }

  if (Object.keys(SearchObj5).length === 0) {
    return {
      rows: state.desktop.branch,
      istrue: istrue,
      isfalse: isfalse,
      isexpired: isexpired,
      initialValues: {
        startDate: new Date().toISOString().slice(0, 10),
        endDate: new Date().toISOString().slice(0, 10)
      }
    };
  } else {
    return {
      rows: state.desktop.branch,
      istrue: istrue,
      isfalse: isfalse,
      isexpired: isexpired,
      initialValues: {
        endDate: SearchObj5.endDate,
        startDate: SearchObj5.startDate,
        regNum: SearchObj5.regNum,
      }
    };
  }
}
export default connect(
  mapStateToProps,
  { getBranch, clearBranch, editDeskBranch }
)(form(Components));
