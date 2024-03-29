import React, { Component } from "react";
import { Link } from "react-router";
import { Field, reduxForm } from "redux-form";
import { connect } from "react-redux";
import {
  getCustomer,
  clearUsers,
  editCustomer,
} from "../../actions/customer_action";
import {
  BootstrapTable,
  TableHeaderColumn,
  SizePerPageDropDown,
} from "react-bootstrap-table";
import "react-bootstrap-table/dist/react-bootstrap-table.min.css";
import { getDistrict } from "../../actions/district_action";
import { getGoodsClass } from "../../actions/GoodsClass_Action";
//import Loading from '../../components/Loading';

var SearchObj1 = {};
var onChangeSearch = {};
Object.defineProperty(onChangeSearch, "beginDate", {
  value: new Date().toISOString(),
  writable: true,
  enumerable: true,
  configurable: true,
});
Object.defineProperty(onChangeSearch, "endDate", {
  value: new Date().toISOString().slice(0, 10) + " 23:59:59",
  writable: true,
  enumerable: true,
  configurable: true,
});
class Customerlist extends Component {
  //<<---*--->>/
  constructor(props) {
    super(props);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.click = this.click.bind(this);
    this.Refresh = this.Refresh.bind(this);
    this.isonisType = this.isonisType.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.hiddenclick = this.hiddenclick.bind(this);
    this.renderShowsTotal = this.renderShowsTotal.bind(this);
    this.state = {
      value: true,
      clicked: false,
      Loading: false,
      rows: [],
      onis: false,
      onisplus: false,
      beginDate: "",
      endDate: "",
    };
    document.title = "Хэрэглэгчийн жагсаалт - Оньс админ";
  }
  //<<---*--->>/
  componentWillMount() {
    this.setState({ Loading: true });
    var currentdate = new Date();
    this.props.getGoodsClass();
    this.props.clearUsers();
    this.props.getDistrict();
    if (Object.keys(SearchObj1).length === 0) {
      SearchObj1 = {
        beginDate: currentdate.toLocaleDateString() + " 00:00:00",
        endDate: currentdate.toLocaleDateString() + " 23:59:59",
      };
      this.props.getCustomer(SearchObj1);
    } else {
      this.props.getCustomer(SearchObj1);
    }
    this.setState({ Loading: false });
  }
  //<<---*--->>/
  handleFormSubmit(formProps) {
    formProps.preventDefault();
    this.setState({ Loading: true });
    let obj = {};
    obj.beginDate = formProps.target.beginDate.value;
    obj.endDate = formProps.target.endDate.value;

    obj.beginDate += " 00:00:00";
    obj.endDate += " 23:59:59";
    obj.userType = this.isonisType();
    obj.regNum = formProps.target.regNum.value;
    obj.userName = formProps.target.userName.value;
    obj.district = formProps.target.district.value;
    obj.phonenum = formProps.target.phonenum.value;
    obj.dealernum = formProps.target.dealernum.value;
    SearchObj1 = obj;
    console.log(obj);
    this.props.getCustomer(obj);
    /*obj.beginDate = bgnDate;
    obj.endDate = endDate;*/
    this.setState({ Loading: false });
  }
  //<<---*--->>/
  handlerClickCleanFiltered() {
    this.refs.regnum.cleanFiltered();
    this.refs.username.cleanFiltered();
    this.refs.phonenum.cleanFiltered();
  }
  //<<---*--->>/
  editClick(row) {
    this.props.editCustomer(row);
  }
  //<<---*--->>/
  click() {
    print();
  }
  //<<---*--->>/
  Refresh() {
    window.location.reload();
  }
  //<<---*--->>/
  hiddenclick() {
    if (this.refs.table.state.selectedRowKeys.length > 0) {
      var selectedrow = [];
      for (var key in this.props.rows) {
        if (
          this.props.rows[key].username == this.refs.table.state.selectedRowKeys
        ) {
          selectedrow = this.props.rows[key];
        }
      }
      this.editClick(selectedrow);
    } else {
      alert("Засах мөрөө сонгоно уу!");
    }
  }
  handleNew = () => {
    this.setState({ isNew: true }, () => {
      this.openModal();
    });
  };
  //<<---*--->>/
  buttonFormatter(row) {
    return (
      <button
        onClick={() => this.editClick(row)}
        className="btn btn-warning btn-sm btn-edit"
        style={{
          lineHeight: "0.5px",
          height: "27px",
          marginTop: "-11px",
          marginBottom: "-9px",
        }}
      >
        Засах
      </button>
    );
  }
  //<<---*--->>/
  numberofrows(rowIdx) {
    return rowIdx;
  }
  checkCustomer(e) {
    let obj = {};
    const { beginDate } = this.state;
    const { endDate } = this.state;
    obj.beginDate = beginDate;
    obj.endDate = endDate;

    obj.beginDate += " 00:00:00";
    obj.endDate += " 23:59:59";
    // obj.beginDate = "2021-07-21 00:00:00";
    // obj.endDate = "2021-07-21 23:59:59";
    (obj.userType = e), (obj.regNum = "");
    obj.userName = "";
    obj.district = "";
    obj.phonenum = "";
    obj.dealernum = "";
    console.log(obj);
    this.props.getCustomer(obj);
  }
  //<<---*--->>/
  handleClick(e) {
    if (e.target.name === "onis") {
      if (this.state.onis === false) {
        this.checkCustomer(1);
        this.setState({ onis: true });
      } else {
        this.checkCustomer(0);
        this.setState({ onis: false });
      }
    } else if (e.target.name === "onisplus") {
      if (this.state.onisplus === false) {
        this.checkCustomer(2);
        this.setState({ onisplus: true });
      } else {
        this.checkCustomer(0);
        this.setState({ onisplus: false });
      }
    }
  }
  handleDate(e) {
    console.log(e);
    let beginDate = e.target.value;
    this.setState({ beginDate });
  }
  handleEndDate(e) {
    console.log(e);
    let endDate = e.target.value;
    this.setState({ endDate });
  }
  //<<---*--->>/
  isonisType() {
    if (this.state.onis === true && this.state.onisplus === false) {
      return 1;
    } else if (this.state.onisplus === true && this.state.onis === false) {
      return 2;
    } else {
      return 0;
    }
  }
  //<<---*--->>/
  onToggleDropDown = (toggleDropDown) => {
    toggleDropDown();
  };
  //<<---*--->>/
  toggleClass() {
    if (!this.state.clicked) {
      this.refs.test.style.height = this.refs.test.style.height + "100px";
      this.setState({ clicked: !this.clicked });
    } else {
      this.refs.test.style.height = this.refs.test.style.height - "100px";
      this.setState({ clicked: this.clicked });
    }
  }
  //<<---*--->>/
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
  //<<---*--->>/
  renderShowsTotal(start, to, total) {
    console.log("istrue", this.props.istrue);
    return (
      <div className="row" style={{ marginLeft: "5px" }}>
        <p style={{ color: "#607d8b", marginRight: "5px", cursor: "pointer" }}>
          {" "}
          Бүгд ( {this.props.total} )
        </p>
        |
        <p
          style={{
            color: "#f8cb00",
            marginRight: "5px",
            marginLeft: "5px",
            cursor: "pointer",
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
            cursor: "pointer",
          }}
        >
          {" "}
          Идэвхгүй ( {this.props.isfalse} ){" "}
        </p>
      </div>
    );
  }
  //<<---*--->>/
  handleDoubleClick = (row) => {
    this.editClick(row);
  };
  //<<---*--->>/
  render() {
    const { handleSubmit } = this.props;
    const { rowsdist } = this.props;
    const { rows } = this.props;
    var tmpArray = rows;
    tmpArray = tmpArray.filter((item) => {
      if (this.isonisType() === 0) return item;
      else if (item.usertype === this.isonisType()) return item;
      else return item;
    });
    //<<---*--->>/
    const qualityType = {
      0: "Идэвхигүй",
      1: "Идэвхитэй",
    };
    //<<---*--->>/
    const selectRowProp = {
      mode: "radio",
      bgColor: "pink", // you should give a bgcolor, otherwise, you can't regonize which row has been selected
      hideSelectColumn: true, // enable hide selection column.
      clickToSelect: true, // you should enable clickToSelect, otherwise, you can't select column.
    };

    function indexN(cell, row, enumObject, index) {
      return <div>{index + 1}</div>;
    }

    const appFormat = {
      1: "Oньс",
      2: "ОньсПлас",
    };

    const distFormatter = {
      "01": "Архангай",
      27: "Багануур",
      28: "Багахангай",
      26: "Баянгол",
      24: "Баянзүрх",
      "02": "Баян-Өлгий",
      "03": "Баянхонгор",
      "04": "Булган",
      "05": "Говь-Алтай",
      32: "Говьсүмбэр",
      19: "Дархан-Уул",
      "06": "Дорноговь",
      "07": "Дорнод",
      "08": "Дундговь",
      "09": "Завхан",
      29: "Налайх",
      20: "Орхон",
      10: "Өвөрхангай",
      11: "Өмнөговь",
      34: "Сонгинохайрхан",
      12: "Сүхбаатар /аймаг/",
      25: "Сүхбаатар /дүүрэг/",
      13: "Сэлэнгэ",
      14: "Төв",
      15: "Увс",
      23: "Хан-Уул",
      16: "Ховд",
      17: "Хөвсгөл",
      18: "Хэнтий",
      35: "Чингэлтэй",
    };
    function dateFormatter(cell, row) {
      if (cell === null) {
        return null;
      }
      return cell.substring(0, 10) + "\n" + cell.substring(11, 19);
    }

    function enumFormatter(cell, row, enumObject) {
      return enumObject[cell];
    }

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
      hideSizePerPage: true,
      onRowDoubleClick: this.handleDoubleClick,
      paginationShowsTotal: this.renderShowsTotal, // Accept bool or function
      prePage: "Өмнөх", // Previous page button text
      nextPage: "Дараах", // Next page button text
      firstPage: "Эхнийх", // First page button text
      lastPage: "Сүүлийх",
      sizePerPage: 10, // which size per page you want to locate as default
      pageStartIndex: 1, // where to start counting the pages
      paginationPosition: "bottom",
      hidePageListOnlyOnePage: true,
      noDataText: "Өгөгдөл олдсонгүй",
    };
    var distcode = [],
      distname = [];
    if (rowsdist !== undefined && rowsdist !== null) {
      distcode = Object.keys(rowsdist).map(function (key) {
        var user = rowsdist[key];
        user.name = key;
        return user.distcode;
      });

      distname = Object.keys(rowsdist).map(function (key) {
        var user = rowsdist[key];
        user.name = key;
        return user.distname;
      });
    }

    var distOptions = distcode.map(function (item, index) {
      return (
        <option key={index} value={item}>
          {distname[index]}
        </option>
      );
    });

    return (
      <div className="animated fadeIn">
        <div className="row">
          <div className="col-lg-12">
            <div className="card">
              <div className="card-header test" ref="test">
                <form onSubmit={this.handleFormSubmit} id="myForm">
                  <div className="row">
                    <div
                      className="form-group col-sm-1.3"
                      style={{ marginLeft: "20px" }}
                    >
                      <label>Бүртгүүлсэн огноо</label>
                      <Field
                        name="beginDate"
                        component="input"
                        type="date"
                        className="form-control dateclss"
                        onChange={(e) => this.handleDate(e)}
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
                        onChange={(e) => this.handleEndDate(e)}
                      />
                    </div>

                    <div
                      className="form-group col-sm-1.3"
                      style={{ marginLeft: "20px" }}
                    >
                      <label>Нэвтрэх дугаар</label>
                      <input
                        name="userName"
                        ref="user"
                        type="Number"
                        maxLength="6"
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
                      <Field
                        name="phonenum"
                        component="input"
                        type="Number"
                        maxLength="8"
                        className="form-control"
                      />
                    </div>

                    <div
                      className="form-group col-sm-1.3"
                      style={{ marginLeft: "20px" }}
                    >
                      <label> Дүүрэг </label>
                      <Field
                        name="district"
                        component="select"
                        className="form-control"
                      >
                        <option />
                        {distOptions}
                      </Field>
                    </div>

                    <div
                      className="form-group col-sm-1.3"
                      style={{ marginLeft: "20px" }}
                    >
                      <label>Борлуулагч</label>
                      <Field
                        name="dealernum"
                        component="input"
                        type="text"
                        className="form-control"
                      />
                    </div>
                  </div>
                  <div className="form-group col-sm-1.3">
                    &nbsp;&nbsp;
                    <Field
                      name="onis"
                      component="input"
                      type="checkbox"
                      onChange={this.handleClick}
                    />
                    &nbsp;&nbsp;
                    <label>Оньс &nbsp;&nbsp;</label>
                    &nbsp;&nbsp;&nbsp;&nbsp;
                    <Field
                      name="onisplus"
                      component="input"
                      type="checkbox"
                      onChange={this.handleClick}
                    />
                    &nbsp;&nbsp;
                    <label>ОньсПлас</label>
                    <button
                      type="button"
                      className="btn"
                      style={{
                        backgroundColor: "#b0bec5",
                        color: "white",
                        float: "right",
                      }}
                      onClick={() => this.click()}
                    >
                      <i className="fa fa-print" /> Хэвлэх
                    </button>
                    &nbsp;&nbsp;
                    <button
                      type="button"
                      className="btn"
                      style={{
                        backgroundColor: "#f7a115",
                        color: "white",
                        float: "right",
                        marginRight: 15,
                      }}
                      onClick={() => this.hiddenclick()}
                    >
                      <i className="fa fa-paper-plane-o" /> Засах
                    </button>
                    &nbsp;&nbsp;
                    <button
                      type="submit"
                      className="btn btn-primary"
                      form="myForm"
                      style={{ float: "right", marginRight: 15 }}
                    >
                      <i className="fa fa-retweet" /> Ачаалах
                    </button>
                    &nbsp;&nbsp;
                    <Link
                      to={"/customeraddlist"}
                      className="btn btn-success"
                      hidden
                    >
                      <i className="fa fa-file-text-o" /> Шинэ{" "}
                    </Link>
                  </div>
                </form>
              </div>

              <div className="card-block tmpresponsive">
                <BootstrapTable
                  data={tmpArray}
                  ref="table"
                  hover={true}
                  pagination={true}
                  tableHeaderClass="tbl-header-class sticky-header"
                  tableBodyClass="tbl-body-class"
                  options={options}
                  maxHeight={"480px"}
                  bordered={true}
                  selectRow={selectRowProp}
                  striped
                  condensed
                >
                  <TableHeaderColumn
                    dataField="rank"
                    width="3%"
                    dataFormat={indexN}
                    headerAlign="center"
                    dataAlign="center"
                    dataSort={true}
                  >
                    <span className="descr"> №&nbsp;&nbsp;&nbsp;</span>{" "}
                  </TableHeaderColumn>
                  <TableHeaderColumn
                    dataField="usertype"
                    width="5%"
                    headerAlign="center"
                    dataAlign="center"
                    dataSort={true}
                    dataFormat={enumFormatter}
                    formatExtraData={appFormat}
                  >
                    {" "}
                    <span className="descr">
                      {" "}
                      Систем&nbsp;&nbsp;&nbsp;
                    </span>{" "}
                  </TableHeaderColumn>
                  <TableHeaderColumn
                    ref="username"
                    width="5%"
                    headerAlign="center"
                    dataField="username"
                    dataAlign="center"
                    dataSort={true}
                    isKey
                  >
                    <span className="descr">
                      Нэвтрэх дугаар&nbsp;&nbsp;&nbsp;
                    </span>
                  </TableHeaderColumn>
                  <TableHeaderColumn
                    dataField="ownername"
                    width="6%"
                    headerAlign="center"
                    dataAlign="center"
                    dataSort={true}
                  >
                    <span className="descr">
                      Удирдлагын нэр&nbsp;&nbsp;&nbsp;
                    </span>
                  </TableHeaderColumn>
                  <TableHeaderColumn
                    ref="regnum"
                    width="6%"
                    headerAlign="center"
                    dataField="regnum"
                    dataAlign="center"
                    dataSort={true}
                  >
                    <span className="descr">РД&nbsp;&nbsp;&nbsp;</span>
                  </TableHeaderColumn>
                  <TableHeaderColumn
                    ref="phoneNum"
                    width="4%"
                    headerAlign="center"
                    dataField="phonenum"
                    dataAlign="center"
                    dataSort={true}
                  >
                    <span className="descr">Утас&nbsp;&nbsp;&nbsp;</span>
                  </TableHeaderColumn>
                  <TableHeaderColumn
                    dataField="storename"
                    width="7%"
                    headerAlign="center"
                    dataAlign="center"
                    dataSort={true}
                  >
                    <span className="descr">
                      Дэлгүүрийн нэр&nbsp;&nbsp;&nbsp;
                    </span>
                  </TableHeaderColumn>
                  <TableHeaderColumn
                    dataField="classname"
                    width="10%"
                    headerAlign="center"
                    dataAlign="center"
                    dataSort={true}
                  >
                    <span className="descr">
                      Үйл ажиллагааны чиглэл&nbsp;&nbsp;&nbsp;
                    </span>
                  </TableHeaderColumn>
                  <TableHeaderColumn
                    dataField="distcode"
                    width="6%"
                    headerAlign="center"
                    dataAlign="center"
                    dataSort={true}
                    dataFormat={enumFormatter}
                    formatExtraData={distFormatter}
                  >
                    <span className="descr">Дүүрэг&nbsp;&nbsp;&nbsp;</span>{" "}
                  </TableHeaderColumn>
                  <TableHeaderColumn
                    dataField="address"
                    width="10%"
                    headerAlign="center"
                    dataAlign="center"
                    dataSort={true}
                  >
                    <span className="descr">Хаяг&nbsp;&nbsp;&nbsp;</span>
                  </TableHeaderColumn>
                  <TableHeaderColumn
                    dataField="apiurl"
                    width="8%"
                    headerAlign="center"
                    dataAlign="center"
                    dataSort={true}
                  >
                    <span className="descr">PosApi URL&nbsp;&nbsp;&nbsp;</span>
                  </TableHeaderColumn>
                  <TableHeaderColumn
                    dataField="dealernum"
                    width="6%"
                    headerAlign="center"
                    dataAlign="center"
                    dataSort={true}
                  >
                    <span className="descr">Борлуулагч&nbsp;&nbsp;&nbsp;</span>
                  </TableHeaderColumn>
                  <TableHeaderColumn
                    dataField="email"
                    width="11%"
                    headerAlign="center"
                    dataAlign="center"
                    dataSort={true}
                  >
                    {" "}
                    <span className="descr">И-мэйл&nbsp;&nbsp;&nbsp;</span>
                  </TableHeaderColumn>
                  <TableHeaderColumn
                    dataField="insymd"
                    width="6%"
                    headerAlign="center"
                    dataAlign="center"
                    dataSort={true}
                    dataFormat={dateFormatter}
                  >
                    <span className="descr">
                      Бүртгүүлсэн огноо&nbsp;&nbsp;&nbsp;
                    </span>
                  </TableHeaderColumn>
                  <TableHeaderColumn
                    dataField="isactive"
                    width="5%"
                    headerAlign="center"
                    dataAlign="center"
                    dataSort={true}
                    dataFormat={enumFormatter}
                    formatExtraData={qualityType}
                  >
                    <span className="descr">Төлөв&nbsp;&nbsp;&nbsp;</span>
                  </TableHeaderColumn>
                </BootstrapTable>
              </div>
              {/* <div className="new-card-footer">
                <button type="submit" className="btn btn-primary" form="myForm">
                  <i className="fa fa-retweet" /> Ачаалах
                </button>
                &nbsp;&nbsp;
                <Link to={"/customeraddlist"} className="btn btn-success" hidden>
                  <i className="fa fa-file-text-o" /> Шинэ{" "}
                </Link>
                &nbsp;&nbsp;
                <button
                  type="button"
                  className="btn"
                  style={{ backgroundColor: "#f7a115", color: "white" }}
                  onClick={() => this.hiddenclick()}
                >
                  <i className="fa fa-paper-plane-o" /> Засах
                </button>
                &nbsp;&nbsp;
                <button
                  type="button"
                  className="btn"
                  style={{ backgroundColor: "#b0bec5", color: "white" }}
                  onClick={() => this.click()}
                >
                  <i className="fa fa-print" /> Хэвлэх
                </button>
              </div> */}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const form = reduxForm({
  form: "Customerlist",
});

function mapStateToProps(state) {
  var istrue = 0;
  var isfalse = 0;
  var total = 0;
  for (var i = 0; i < state.customer.rows.length; i++) {
    if (state.customer.rows[i].isactive === 1) {
      istrue++;
    }
    if (state.customer.rows[i].isactive === 0) {
      isfalse++;
    }
    total++;
  }

  if (Object.keys(SearchObj1).length === 0) {
    return {
      rowsdist: state.district.rows,
      rows: state.customer.rows,
      columns: state.customer.columns,
      goodClass: state.goodsclass.rows,
      istrue: istrue,
      isfalse: isfalse,
      total: total,
      initialValues: {
        endDate: new Date().toISOString().slice(0, 10),
        beginDate: new Date().toISOString().slice(0, 10),
      },
    };
  } else {
    return {
      rowsdist: state.district.rows,
      rows: state.customer.rows,
      columns: state.customer.columns,
      istrue: istrue,
      isfalse: isfalse,
      total: total,
      goodClass: state.goodsclass.rows,
      initialValues: {
        endDate: new Date(SearchObj1.endDate).toISOString().slice(0, 10),
        beginDate: new Date(SearchObj1.beginDate).toISOString().slice(0, 10),
        userName: SearchObj1.userName,
        regNum: SearchObj1.regNum,
        phonenum: SearchObj1.phonenum,
      },
    };
  }
}
export default connect(mapStateToProps, {
  getDistrict,
  getCustomer,
  clearUsers,
  editCustomer,
  getGoodsClass,
})(form(Customerlist));
