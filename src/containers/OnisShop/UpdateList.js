import React, { Component } from "react";
import { Field, reduxForm } from "redux-form";
import { connect } from "react-redux";
import { Link } from "react-router";
import "react-bootstrap-table/dist/react-bootstrap-table.min.css";
import { getDeskStore, editDeskStore, clearBranch } from "../../actions/desktop_action";
import { editUpdate } from "../../actions/OnisUpdate_action"
import {getDistrictUpdate} from "../../actions/OnisUpdate_action" ;
import Moment from 'moment';
import {
  BootstrapTable,
  TableHeaderColumn,
  SizePerPageDropDown
} from "react-bootstrap-table";
var SearchObj1 = {};
var onChangeSearch = {};
var selectedrank = "";
Object.defineProperty(onChangeSearch, "startdate", {
  value: new Date().toISOString(),
  writable: true,
  enumerable: true,
  configurable: true
});
Object.defineProperty(onChangeSearch, "enddate", {
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
  }

  handleFormSubmit(formProps) {
    formProps.uiversion= 0;
    formProps.apiversion= 0;
    formProps.insby= 0;
    formProps.startdate= "2020-06-17T02:12:37.937Z";
    formProps.enddate= "2020-06-17T02:12:37.937Z";
    this.props.getDistrictUpdate(formProps);
  }

  renderShowsTotal(start, to, total) {
    return (
      <div className="row" style={{ marginLeft: "5px" }}>
        <p style={{ color: "#607d8b", marginRight: "5px", cursor: "pointer" }}>
          {" "}
          {/* Нийт: {this.props.rows.length}{" "} */}
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
  editClick(row) {
    this.props.editUpdate(row);
  }
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
    var selectedrow = "";
      for (var key in this.props.rows) {
          selectedrow = this.props.rows[key];
        }
      
      this.editClick(selectedrow);
  }
  getShopSingle(id){
    alert(id);
  }
  handleChange(e) {
    console.log(e.target.value);
    switch (e.target.name) {
      case "startdate":
        SearchObj1.startdate = e.target.value + "T00:00:00Z"
        break;
      case "enddate":
        SearchObj1.enddate = e.target.value + "T23:59:59Z"
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
    const self = this;
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
        // {
        //   text: "Бүгд",
        //   value: rows.length
        // }
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
    function clickableSpan(cell, row){
      return (
        <span onClick={self.getShopSingle.bind(self, row.storenm)}>Xapax</span>
      )
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
                      <label>Шинэчилсэн огноо</label>
                      <Field
                        name="startdate"
                        ref="startdate"
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
                        name="enddate"
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
                      <label>Шинэчилсэн хэрэглэгч</label>
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
                      <label>API version</label>
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
                      <label>UI version</label>
                      <Field
                        name="searchseller"
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
                    dataField="updymd"
                    headerAlign="center"
                    dataAlign="center"
                    isKey={true}
                    dataSort={true}
                  >
                    <span className="descr"> Шинэчилсэн огноо</span>
                  </TableHeaderColumn>
                  <TableHeaderColumn
                    dataField="insby"
                    headerAlign="center"
                    dataAlign="center"
                    dataSort={true}
                  >
                    <span className="descr"> Бүртгэсэн хэрэглэгч</span>
                  </TableHeaderColumn>
                  
                  <TableHeaderColumn
                    dataField="name"
                    headerAlign="center"
                    dataAlign="center"
                    dataSort={true}
                  >
                    <span className="descr"> Тайлбар</span>
                  </TableHeaderColumn>
                  <TableHeaderColumn
                    dataField="ui"
                    headerAlign="center"
                    dataAlign="center"
                    dataSort={true}
                  >
                    <span className="descr"> UI version</span>
                  </TableHeaderColumn>
                  <TableHeaderColumn
                    dataField="api"
                    headerAlign="center"
                    dataAlign="center"
                    dataSort={true}
                  >
                    <span className="descr"> API version</span>
                  </TableHeaderColumn>
                  <TableHeaderColumn
                    dataField="type"
                    headerAlign="center"
                    dataAlign="center"
                    dataSort={true}
                  >
                    <span className="descr"> Type</span>
                  </TableHeaderColumn>
                  <TableHeaderColumn
                    dataField="id"
                    headerAlign="center"
                    dataAlign="center"
                    dataSort={false}
                    dataFormat={clickableSpan}
                  >
                    <span className="descr">URL</span>
                  </TableHeaderColumn>
                  <TableHeaderColumn
                    dataField="insymd"
                    headerAlign="center"
                    dataAlign="center"
                    dataSort={true}
                  >
                    <span className="descr"> Бүртгэсэн огноо</span>
                  </TableHeaderColumn>
                  <TableHeaderColumn
                    dataField="mirate"
                    headerAlign="center"
                    dataAlign="center"
                    dataSort={true}
                  >
                    <span className="descr"> Бааз</span>
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
          &nbsp;&nbsp;
          &nbsp;&nbsp;
          <button
            type="button"
            className="btn btn-success"
            onClick={() => this.hiddenclick()}
          >
            <i className="fa fa-paper-plane-o" />
            Шинэ &nbsp;&nbsp;
          </button>
          &nbsp;&nbsp;
          &nbsp;&nbsp;
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

  if (Object.keys(SearchObj1).length === 0) {
    return {
      rows: state.onisupdate.rows,
      istrue: istrue,
      isfalse: isfalse,
      isexpired: isexpired,
      initialValues: {
        startdate: new Date().toISOString().slice(0, 10),
        enddate: new Date().toISOString().slice(0, 10)
      }
    };
  } else {
    return {
      rows: state.onisupdate.rows,
      istrue: istrue,
      isfalse: isfalse,
      isexpired: isexpired,
      initialValues: {
        enddate: SearchObj1.enddate,
        startdate: SearchObj1.startdate,
        regNum: SearchObj1.regNum,
        phonenum: SearchObj1.phonenum
      }
    };
  }
}
export default connect(
  mapStateToProps,
  { getDeskStore, editDeskStore, clearBranch, getDistrictUpdate, editUpdate }
)(form(Components));
