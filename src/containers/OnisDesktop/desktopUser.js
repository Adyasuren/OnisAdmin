import React, { Component } from "react";
import { Field, reduxForm } from "redux-form";
import { connect } from "react-redux";
import { Link } from "react-router";
import "react-bootstrap-table/dist/react-bootstrap-table.min.css";
import { getDeskStore, editDeskStore, clearBranch } from "../../actions/desktop_action";
import Moment from 'moment'
import {
  BootstrapTable,
  TableHeaderColumn,
  SizePerPageDropDown
} from "react-bootstrap-table";
var SearchObj1 = {};
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
    console.log(SearchObj1);
    this.setState({ Loading: true });
    var currentdate = new Date();
    if (Object.keys(SearchObj1).length === 0) {
      SearchObj1 = {
        startDate: currentdate.toLocaleDateString() + " 00:00:00",
        endDate: currentdate.toLocaleDateString() + " 23:59:59"
      };
      this.props.getDeskStore(SearchObj1);
    } else {
      this.props.getDeskStore(SearchObj1);
    }
    this.setState({ Loading: false });
  }

  handleFormSubmit(formProps) {
    this.setState({ Loading: true });
    var bgnDate = formProps.startDate;
    var endDate = formProps.endDate;
    formProps.startDate += " 00:00:00";
    formProps.endDate += " 23:59:59";
    SearchObj1 = formProps;
    this.props.clearBranch();
    this.props.getDeskStore(formProps);
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
          Идэвхтэй ( {this.props.istrue} ){" "}
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
          Идэвхгүй ( {this.props.isfalse} ){" "}
        </p>
      </div>
    );
  }

  handleDoubleClick = row => {
    /* console.log(row) */
    this.props.editDeskStore(row);
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

  hiddenclick() {
    if (this.refs.table.state.selectedRowKeys.length > 0) {
      var selectedrow = [];
      for (var key in this.props.rows) {
        if (
          this.props.rows[key].username ===
          this.refs.table.state.selectedRowKeys
        ) {
          selectedrow = this.props.rows[key];
        }
      }
      this.editClick(selectedrow);
    } else {
      alert("Засах мөрөө сонгоно уу!");
    }
  }

  editClick = row => {
    /* console.log(row) */
    /* this.props.editDeskStore(row) */
  }

  handleChange(e) {
    console.log(e.target.value);
    switch (e.target.name) {
      case "startDate":
        SearchObj1.startDate = e.target.value + "T00:00:00Z"
        break;
      case "endDate":
        SearchObj1.endDate = e.target.value + "T23:59:59Z"
        break;
      case "regNum":
        SearchObj1.regNum = e.target.value
        break;
      case "searchphonenum":
        if (e.target.value === "") {
          SearchObj1.phoneNum = null
        }
        else {
          SearchObj1.phoneNum = e.target.value
        }
        break;
      case "searchseller":
        SearchObj1.seller = e.target.value
        break;
      default:
        break;
    }
    SearchObj1 = onChangeSearch;
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
      /* onRowClick: this.hiddenclick, */
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

    function vatFormatter(cell, row) {
      if (row.isvatpayer === 1) {
        return "Тийм";
      }
      if (row.isvatpayer === 0) {
        return "Үгүй";
      }
    }

    function dateFormatter(cell, row) {
      if (cell === null) {
        return null;
      }
      return Moment(cell).format('YYYY-MM-D')
    }

    function statusFormatter(cell, row) {
      if (row.status === 1) {
        return "Идэвхитэй";
      } else if (row.status === 0) {
        return "Идэвхигүй";
      } else return null;
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
                        ref="startDate"
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

                    <div
                      className="form-group col-sm-1.3"
                      style={{ marginLeft: "20px" }}
                    >
                      <label>Утасны дугаар</label>
                      <Field
                        name="searchphonenum"
                        component="input"
                        type="text"
                        className="form-control"
                        onChange={this.handleChange.bind(this)}
                      />
                    </div>

                    <div
                      className="form-group col-sm-1.3"
                      style={{ marginLeft: "20px" }}
                    >
                      <label>Борлуулагч</label>
                      <Field
                        name="searchseller"
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
                                  textDecoration: "underline",
                                  color: "orange",
                                  cursor: "pointer"
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
                                  color: "black",
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
                  ref="table"
                  pagination={true}
                  tableHeaderClass="tbl-header-class sticky-header"
                  tableBodyClass="tbl-body-class"
                  options={options}
                  bordered={true}
                  selectRow={selectRowProp}
                  condensed
                  maxHeight={"552px"}
                  striped={true}
                >
                  <TableHeaderColumn
                    width="3%"
                    dataField="rank"
                    dataFormat={indexN}
                    headerAlign="center"
                    dataAlign="center"
                  >
                    <span className="descr">Д.д</span>
                  </TableHeaderColumn>
                  <TableHeaderColumn
                    dataField="regnum"
                    headerAlign="center"
                    dataAlign="center"
                    isKey={true}
                    dataSort={true}
                  >
                    <span className="descr">РД</span>
                  </TableHeaderColumn>
                  <TableHeaderColumn
                    dataField="storename"
                    headerAlign="center"
                    dataAlign="left"
                    dataSort={true}
                  >
                    <span className="descr">Дэлгүүрийн нэр</span>
                  </TableHeaderColumn>
                  <TableHeaderColumn
                    dataField="activity"
                    headerAlign="center"
                    dataAlign="left"
                    dataSort={true}
                  >
                    <span className="descr">Үйл ажиллагааны чиглэл</span>
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
                    headerAlign="center"
                    dataField="phonenum"
                    dataAlign="center"
                    dataSort={true}
                  >
                    <span className="descr">Утас</span>
                  </TableHeaderColumn>
                  <TableHeaderColumn
                    dataField="email"
                    headerAlign="center"
                    dataAlign="center"
                    dataSort={true}
                  >
                    <span className="descr">И-мэйл</span>
                  </TableHeaderColumn>
                  <TableHeaderColumn
                    dataField="distname"
                    headerAlign="center"
                    dataAlign="left"
                    dataSort={true}
                  >
                    <span className="descr">Дүүрэг</span>
                  </TableHeaderColumn>
                  <TableHeaderColumn
                    dataField="isvatpaye"
                    headerAlign="center"
                    dataAlign="center"
                    dataFormat={vatFormatter}
                    dataSort={true}
                  >
                    <span className="descr">НӨАТ төлөгч эсэх</span>
                  </TableHeaderColumn>
                  <TableHeaderColumn
                    dataField="citytaxpercent"
                    headerAlign="center"
                    dataAlign="center"
                    width="5%"
                    dataSort={true}
                  >
                    <span className="descr">НХАТ %</span>
                  </TableHeaderColumn>
                  <TableHeaderColumn
                    dataField="contractcd"
                    headerAlign="center"
                    dataAlign="center"
                    dataSort={true}
                  >
                    <span className="descr">Гэрээний дугаар</span>
                  </TableHeaderColumn>
                  <TableHeaderColumn
                    dataField="contractdate"
                    headerAlign="center"
                    dataAlign="center"
                    dataFormat={dateFormatter}
                    headerText="username"
                    filter={{
                      type: "TextFilter",
                      delay: 0,
                      placeholder: "Procure"
                    }}
                    dataSort={true}
                  >
                    <span className="descr">Гэрээ хийсэн огноо</span>
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
                    dataField="seller"
                    headerAlign="center"
                    dataAlign="center"
                    dataSort={true}
                  >
                    <span className="descr">Борлуулагч</span>
                  </TableHeaderColumn>
                  <TableHeaderColumn
                    dataField="insertdate"
                    headerAlign="center"
                    dataAlign="center"
                    dataFormat={dateFormatter}
                    dataSort={true}
                  >
                    <span className="descr">Бүртгүүлсэн огноо</span>
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
            to={"/desktopcustomeradd"}
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
  form: "DesktopUser"
});

function mapStateToProps(state) {
  let istrue = 0;
  let isfalse = 0;
  let isexpired = 0;
  for (let i = 0; i < state.desktop.rows.length; i++) {
    if (
      state.desktop.rows[i].status === 0 ||
      state.desktop.rows[i].status === null
    ) {
      isexpired++;
    }
    if (state.desktop.rows[i].status === 1) {
      istrue++;
    }
    if (state.desktop.rows[i].status === 0) {
      isfalse++;
    }
  }

  if (Object.keys(SearchObj1).length === 0) {
    return {
      rows: state.desktop.rows,
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
      rows: state.desktop.rows,
      istrue: istrue,
      isfalse: isfalse,
      isexpired: isexpired,
      initialValues: {
        endDate: SearchObj1.endDate,
        startDate: SearchObj1.startDate,
        regNum: SearchObj1.regNum,
        phonenum: SearchObj1.phonenum
      }
    };
  }
}
export default connect(
  mapStateToProps,
  { getDeskStore, editDeskStore, clearBranch }
)(form(Components));
