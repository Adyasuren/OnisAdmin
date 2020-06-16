import React, { Component } from "react";
import { Link } from "react-router";
import { Field, reduxForm } from "redux-form";
import { connect } from "react-redux";
import {
  getCustomer,
  clearUsers,
  editCustomer
} from "../../actions/customer_action";
import {
  BootstrapTable,
  TableHeaderColumn,
  SizePerPageDropDown
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
  configurable: true
});
Object.defineProperty(onChangeSearch, "endDate", {
  value: new Date().toISOString().slice(0, 10) + " 23:59:59",
  writable: true,
  enumerable: true,
  configurable: true
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
      onisplus: false
    };
    document.title = "Хэрэглэгчийн жагсаалт - Оньс админ";
  }
  //<<---*--->>/
  componentWillMount() {
    console.log(SearchObj1);
    this.setState({ Loading: true });
    var currentdate = new Date();
    this.props.getGoodsClass();
    this.props.clearUsers();
    this.props.getDistrict();
    if (Object.keys(SearchObj1).length === 0) {
      SearchObj1 = {
        beginDate: currentdate.toLocaleDateString() + " 00:00:00",
        endDate: currentdate.toLocaleDateString() + " 23:59:59"
      };
      console.log("if");
      this.props.getCustomer(SearchObj1);
    } else {
      console.log("else");
      this.props.getCustomer(SearchObj1);
    }
    this.setState({ Loading: false });
  }
  //<<---*--->>/
  handleFormSubmit(formProps) {
    this.setState({ Loading: true });
    var bgnDate = formProps.beginDate;
    var endDate = formProps.endDate;
    formProps.beginDate += " 00:00:00";
    formProps.endDate += " 23:59:59";
    formProps.userType = this.isonisType();
    SearchObj1 = formProps;
    this.props.getCustomer(formProps);
    formProps.beginDate = bgnDate;
    formProps.endDate = endDate;
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
          marginBottom: "-9px"
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
  //<<---*--->>/
  handleClick(e) {
    if (e.target.name === "onis") {
      if (this.state.onis === false) {
        this.setState({ onis: true });
      } else {
        this.setState({ onis: false });
      }
    } else if (e.target.name === "onisplus") {
      if (this.state.onisplus === false) {
        this.setState({ onisplus: true });
      } else {
        this.setState({ onisplus: false });
      }
    }
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
  onToggleDropDown = toggleDropDown => {
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
  //<<---*--->>/
  renderShowsTotal(start, to, total) {
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
  //<<---*--->>/
  handleDoubleClick = row => {
    this.editClick(row);
  };
  //<<---*--->>/
  render() {
    const { handleSubmit } = this.props;
    const { rowsdist } = this.props;
    const { rows } = this.props;
    var tmpArray = rows;
    tmpArray = tmpArray.filter(item => {
      if (this.isonisType() === 0) return item;
      else if (item.usertype === this.isonisType()) return item;
      else return item;
    });
    //<<---*--->>/
    const qualityType = {
      0: "Идэвхигүй",
      1: "Идэвхитэй"
    };
    //<<---*--->>/
    const selectRowProp = {
      mode: "radio",
      bgColor: "pink", // you should give a bgcolor, otherwise, you can't regonize which row has been selected
      hideSelectColumn: true, // enable hide selection column.
      clickToSelect: true // you should enable clickToSelect, otherwise, you can't select column.
    };

    function indexN(cell, row, enumObject, index) {
      return <div>{index + 1}</div>;
    }

    const appFormat = {
      "1": "Oньс",
      "2": "ОньсПлас"
    };

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
      noDataText: "Өгөгдөл олдсонгүй"
    };

    var distcode = Object.keys(rowsdist).map(function (key) {
      var user = rowsdist[key];
      user.name = key;
      return user.distcode;
    });

    var distname = Object.keys(rowsdist).map(function (key) {
      var user = rowsdist[key];
      user.name = key;
      return user.distname;
    });

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
                        name="beginDate"
                        component="input"
                        type="date"
                        className="form-control dateclss"
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
                        type="text"
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
                    <label>ОньсПлас </label>
                  </div>
                </form>
              </div>

              <div className="card-block tmpresponsive">
                <BootstrapTable
                  data={tmpArray}
                  hover={true}
                  pagination={true}
                  tableHeaderClass="tbl-header-class sticky-header"
                  tableBodyClass="tbl-body-class"
                  options={options}
                  maxHeight={"600px"}
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
                    <span className="descr">Д.д&nbsp;&nbsp;&nbsp;</span>
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
                    dataField="storename"
                    width="5%"
                    headerAlign="center"
                    dataAlign="center"
                    dataSort={true}
                  >
                    <span className="descr">
                      Дэлгүүрийн нэр&nbsp;&nbsp;&nbsp;
                    </span>
                  </TableHeaderColumn>
                  <TableHeaderColumn
                    dataField="storename"
                    width="5%"
                    headerAlign="center"
                    dataAlign="center"
                    dataSort={true}
                  >
                    <span className="descr">
                      Татвар төлөгчийн нэр&nbsp;&nbsp;&nbsp;
                    </span>
                  </TableHeaderColumn>
                  <TableHeaderColumn
                    headerAlign="center"
                    dataField="ownername"
                    dataAlign="left"
                    dataSort={true}
                  >
                    <span className="descr">Татвар төлөгчийн дугаар</span>
                  </TableHeaderColumn>
                  <TableHeaderColumn
                    dataField="activity"
                    headerAlign="center"
                    dataAlign="left"
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
                    dataField="classname"
                    width="15%"
                    headerAlign="center"
                    dataAlign="center"
                    dataSort={true}
                  >
                    <span className="descr">
                      Үйл ажиллагааны чиглэл&nbsp;&nbsp;&nbsp;
                    </span>
                  </TableHeaderColumn>
                  <TableHeaderColumn
                    ref="phoneNum"
                    width="5%"
                    headerAlign="center"
                    dataField="phonenum"
                    dataAlign="center"
                    dataSort={true}
                  >
                    <span className="descr">Утас&nbsp;&nbsp;&nbsp;</span>
                  </TableHeaderColumn>
                  <TableHeaderColumn
                    dataField="distcode"
                    width="5%"
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
                    width="5%"
                    headerAlign="center"
                    dataAlign="center"
                    dataSort={true}
                  >
                    <span className="descr">Хаяг&nbsp;&nbsp;&nbsp;</span>
                  </TableHeaderColumn>
                  <TableHeaderColumn
                    dataField="apiurl"
                    width="10%"
                    headerAlign="center"
                    dataAlign="center"
                    dataSort={true}
                  >
                    <span className="descr">PosApi &nbsp;&nbsp;&nbsp;</span>
                  </TableHeaderColumn>
                  <TableHeaderColumn
                    dataField="apiurl"
                    width="10%"
                    headerAlign="center"
                    dataAlign="center"
                    dataSort={true}
                  >
                    <span className="descr">Лиценз&nbsp;&nbsp;&nbsp;</span>
                  </TableHeaderColumn>
                  <TableHeaderColumn
                    dataField="insymd"
                    width="5%"
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
        </div>
      </div>
    );
  }
}

const form = reduxForm({
  form: "Customerlist"
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
        beginDate: new Date().toISOString().slice(0, 10)
      }
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
        endDate: SearchObj1.endDate,
        beginDate: SearchObj1.beginDate,
        userName: SearchObj1.userName,
        regNum: SearchObj1.regNum,
        phonenum: SearchObj1.phonenum
      }
    };
  }
}
export default connect(
  mapStateToProps,
  { getDistrict, getCustomer, clearUsers, editCustomer, getGoodsClass }
)(form(Customerlist));
