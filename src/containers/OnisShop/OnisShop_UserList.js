import React, { Component } from "react";
import { Field, reduxForm } from "redux-form";
import { connect } from "react-redux";
import { Link } from "react-router";
import "react-bootstrap-table/dist/react-bootstrap-table.min.css";
import { getDeskStore, editDeskStore, clearBranch } from "../../actions/desktop_action";
import {getCustomer, clearUsers, editCustomer} from "../../actions/customer_action";
import {getDistrictNew} from "../../actions/district_action";
import {OnisUser} from "../../actions/OnisUser_action";
import Moment from 'moment';
import {BootstrapTable, TableHeaderColumn, SizePerPageDropDown} from "react-bootstrap-table";
//vareable
var SearchObj1 = {};
var onChangeSearch = {};
var selectedrank = "";

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
                    this.setState({ Loading: true });
                    this.props.getDistrictNew();

                    var currentdate = new Date();
                    if (Object.keys(SearchObj1).length === 0) {
                      SearchObj1 = {
                        startDate: currentdate.toLocaleDateString() + " 00:00:00",
                        endDate: currentdate.toLocaleDateString() + " 23:59:59"
                      };
                      // this.props.getDeskStore(SearchObj1);
                    } else {
                      // this.props.getDeskStore(SearchObj1);
                    }
                    this.setState({ Loading: false });
                  }

                  handleFormSubmit(formProps) {
                    this.setState({ Loading: true });
                    var bgnDate = formProps.startDate;
                    var endDate = formProps.endDate;
                    formProps.regno = "";
                    formProps.phoneno = 0;
                    formProps.distcode = formProps.distcode;
                    formProps.startDate += " 00:00:00";
                    formProps.endDate += " 23:59:59";
                    SearchObj1 = formProps;

                    console.log(formProps);
                    this.props.clearBranch();
                    formProps.startDate = bgnDate;
                    formProps.endDate = endDate;
                    
                    this.props.OnisUser(formProps);
                    this.setState({ Loading: false });

                  }
                  
                  renderShowsTotal(start, to, total) {
                    console.log("this.props", this.props.istrue)
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
                          
          onClick={() => (this.props.rows = [])}
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
                    console.log("editClick");
                    this.setState({ Loading: true });
                    this.props.editCustomer(row);
                    this.setState({ Loading: false });
                  }
                  renderSizePerPageDropDown = (props) => {
                    console.log("props", props);
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
                    if (this.refs.table.state.selectedRowKeys.length > 0) {
                      for (var key in this.props.rows) {
                        if (this.props.rows[key].rank === selectedrank) {
                          selectedrow = this.props.rows[key];
                        }
                      }
                      this.editClick(selectedrow);
                    } else {
                      alert("Засах мөрөө сонгоно уу!");
                    }
                  }
                  getShopSingle(id){
                      alert(id);
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
    const self = this;
    const { handleSubmit } = this.props;
    const { rows } = this.props;
    const { disrows } = this.props;
    const distFormatter = {
      "01": "Архангай",
      "27": "Багануур",
      "28": "Багахангай",
      "26": "Баянгол",
      "24": "Баянзүрх",
      "02": "Баян-Өлгий",
      "03": "Баянхонгор",
      "04": "Булган",
      "05": "Говь-Алтай",
      "32": "Говьсүмбэр",
      "19": "Дархан-Уул",
      "06": "Дорноговь",
      "07": "Дорнод",
      "08": "Дундговь",
      "09": "Завхан",
      "29": "Налайх",
      "20": "Орхон",
      "10": "Өвөрхангай",
      "11": "Өмнөговь",
      "34": "Сонгинохайрхан",
      "12": "Сүхбаатар /аймаг/",
      "25": "Сүхбаатар /дүүрэг/",
      "13": "Сэлэнгэ",
      "14": "Төв",
      "15": "Увс",
      "23": "Хан-Уул",
      "16": "Ховд",
      "17": "Хөвсгөл",
      "18": "Хэнтий",
      "35": "Чингэлтэй"
    };
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

    var distcode = Object.keys(disrows).map(function (key) {
      var user = disrows[key];
      user.name = key;
      return user.distcode;
    });

    var distname = Object.keys(disrows).map(function (key) {
      var user = disrows[key];
      user.name = name;
      return user.name;
    });

    var distOptions = disrows.map(function (item, index) {
      return (
        <option key={index} value={item.id}>  
          {distFormatter[item.code]}
        </option>
      );
    });


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
      if (row.isvatpayer === 2) {
        return "Тийм";
      }
      if (row.isvatpayer === 1) {
        return "Үгүй";
      }
    }
    function vatFormatter1(cell, row) {
      if (row.iscitytax === 2) {
        return "Тийм";
      }
      if (row.iscitytax === 1) {
        return "Үгүй";
      }
    }
    function isActive(ceil,row){
      if(row.isenable === 1 ){
        return "Идэвхитэй"
      }
      if(row.isenable === 2 ){
        return "Идэвхигүй"
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
                      <label>Бүртгүүлсэн огноо</label>
                      <Field
                        name="startDate"
                        ref="startDate"
                        component="input"
                        type="date"
                        // value={this.props.rows}
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
                      <label>Дүүрэг</label>
                      <Field
                        name="distcode"
                        component="select"
                        className="form-control"
                      >
                        <option />
                        {distOptions}
                      </Field>
                    </div>
                  </div>
                  </form>
              </div>

              <div className="card-block tmpresponsive">
                <BootstrapTable
                  data = {rows}
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
                    dataField="storenm"
                    headerAlign="center"
                    dataAlign="center"
                    dataSort={true}
                  >
                    <span className="descr">Дэлгүүрийн нэр</span>
                  </TableHeaderColumn>
                  <TableHeaderColumn
                    dataField="regno"
                    headerAlign="center"
                    dataAlign="center"
                    dataSort={true}
                  >
                    <span className="descr">Регистрийн дугаар</span>
                  </TableHeaderColumn>
                  <TableHeaderColumn
                    dataField="iscitytax"
                    headerAlign="center"
                    dataAlign="center"
                    dataSort={true}
                    dataFormat={vatFormatter1}
                  >
                    <span className="descr">НХАТ төлөгч эсэх</span>
                  </TableHeaderColumn>
                  <TableHeaderColumn
                    dataField="isvatpayer"
                    headerAlign="center"
                    dataAlign="center"
                    dataSort={true}
                    dataFormat={vatFormatter}
                  >
                    <span className="descr">НӨАТ төлөгч эсэх</span>
                  </TableHeaderColumn>
                  
                  <TableHeaderColumn
                    dataField="classname"
                    headerAlign="center"
                    dataAlign="center"
                    dataSort={true}
                    
                  >
                    <span className="descr">Үйл ажиллагааны чиглэл</span>
                  </TableHeaderColumn>
                  <TableHeaderColumn
                    dataField="phoneno"
                    headerAlign="center"
                    dataAlign="center"
                    dataSort={true}
                  >
                    <span className="descr">Утас</span>
                  </TableHeaderColumn>
                  
                  <TableHeaderColumn
                    dataField={'distname'}
                    headerAlign="center"
                    dataAlign="center"
                    dataSort={true}
                    isKey
                    formatExtraData={distFormatter}
                  >
                    <span className="descr">Дүүрэг</span>
                  </TableHeaderColumn>
                  <TableHeaderColumn
                    dataField="address"
                    headerAlign="center"
                    dataAlign="center"
                    dataSort={true}
                  >
                    <span className="descr">Хаяг</span>
                  </TableHeaderColumn>
                  
                  <TableHeaderColumn
                    dataField="insymd"
                    headerAlign="center"
                    dataAlign="center"
                    dataSort={true}
                  >
                    <span className="descr">Бүртгүүлсэн огноо</span>
                  </TableHeaderColumn>
                  <TableHeaderColumn
                    dataField="iseneble"
                    headerAlign="center"
                    dataAlign="center"
                    dataSort={true}
                    dataFormat={isActive}
                  >
                    <span className="descr">Төлөв</span>
                  </TableHeaderColumn>
                  {/* link  */}
                  {/* <TableHeaderColumn
                    dataField="id"
                    headerAlign="center"
                    dataAlign="center"
                    dataSort={false}
                    dataFormat={clickableSpan}
                  >
                    <span className="descr"></span>
                  </TableHeaderColumn> */}
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
  var istrue = 0;
  var isfalse = 0;
  var total = 0;
  for (var i = 0; i < state.OnisShop.rows.length; i++) {
    if (state.OnisShop.rows[i].isenable === 1) {
      istrue++;
    }
    if (state.OnisShop.rows[i].isenable === 0) {
      isfalse++;
    }
    total++;
  }
  // console.log(state);
  if (Object.keys(SearchObj1).length === 0) {
    return {
      disrows: state.district.rows,
      istrue: istrue,
      isfalse: isfalse,
      total: total,
      rows: state.OnisShop.rows,
      initialValues: {
        startDate: new Date().toISOString().slice(0, 10),
        endDate: new Date().toISOString().slice(0, 10)
      }
    };
  } else {
    return {
      disrows: state.district.rows,
      rows: state.OnisShop.rows,
      istrue: istrue,
      isfalse: isfalse,
      total: total,
      initialValues: {
        endDate: SearchObj1.endDate,
        startDate: SearchObj1.startDate,
        regNum: SearchObj1.regNum,
        phonenum: SearchObj1.phonenum
      }
    };
  }
}


export default connect(mapStateToProps,{ getDeskStore, OnisUser, editDeskStore, clearBranch, editCustomer, getDistrictNew })(form(Components));