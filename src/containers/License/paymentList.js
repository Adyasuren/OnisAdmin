import React, { Component } from "react";
import { Field, reduxForm } from "redux-form";
import { connect } from "react-redux";
import {
  getLicense,
  clearLicense,
  clearPaymentList
} from "../../actions/license_action";
import {
  BootstrapTable,
  TableHeaderColumn,
  SizePerPageDropDown
} from "react-bootstrap-table";
import { editPayment, newPayment } from "../../actions/transac_action";
import "react-bootstrap-table/dist/react-bootstrap-table.min.css";
import { getPaymentList } from "../../actions/transac_action";
//import Loading from '../../components/Loading';
/* import InlineCss from "react-inline-css"; */

var SearchObj2 = {};
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
var selectedrank = "";

class PaymentList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: true,
      isActive: false,
      Searched: 10,
      Loading: true,
      onis: false,
      onisplus: false
    };

    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.click = this.click.bind(this);
    this.changer = this.changer.bind(this);
    this.hiddenclick = this.hiddenclick.bind(this);
    this.newclick = this.newclick.bind(this);
    this.Refresh = this.Refresh.bind(this);
    this.isonisType = this.isonisType.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.renderShowsTotal = this.renderShowsTotal.bind(this);
    document.title = "Төлбөрийн жагсаалт - Оньс админ";
  }

  componentWillMount() {
    this.setState({ Loading: true });
    var currentdate = new Date();
    this.props.clearPaymentList();
    if (Object.keys(SearchObj2).length === 0) {
      SearchObj2 = {
        beginDate: currentdate.toLocaleDateString() + " 00:00:00",
        endDate: currentdate.toLocaleDateString() + " 23:59:59"
      };
      this.props.getPaymentList(SearchObj2);
    } else {
      this.props.getPaymentList(SearchObj2);
    }
    this.setState({ Loading: false });
  }

  handleFormSubmit(formProps) {
    this.setState({ Loading: true });
    var bgnDate = formProps.beginDate;
    var endDate = formProps.endDate;
    formProps.beginDate += " 00:00:00";
    formProps.endDate += " 23:59:59";
    formProps.usertype = this.isonisType();
    SearchObj2 = formProps;
    this.setState({ Searched: true });
    this.props.getPaymentList(formProps);
    formProps.beginDate = bgnDate;
    formProps.endDate = endDate;
    this.setState({ Loading: false });

    console.log(formProps.usertype);
  }

  handlerClickCleanFiltered() {
    this.refs.username.cleanFiltered();
    this.refs.payddate.cleanFiltered();
    this.refs.paydamount.cleanFiltered();
    this.refs.isactive.cleanFiltered();
    this.refs.typeid.cleanFiltered();
  }

  newclick = () => {
    this.props.newPayment();
  };

  editClick(row) {
    this.setState({ Loading: true });
    this.props.editPayment(row);
    this.setState({ Loading: false });
  }
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

  isonisType() {
    if (this.state.onis === true && this.state.onisplus === false) {
      return 1;
    } else if (this.state.onisplus === true && this.state.onis === false) {
      return 2;
    } else {
      return 0;
    }
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
      case "regNum":
        Object.defineProperty(onChangeSearch, "regNum", {
          value: e.target.value,
          writable: true,
          enumerable: true,
          configurable: true
        });
        break;
      case "phoneNum":
        Object.defineProperty(onChangeSearch, "phoneNum", {
          value: e.target.value,
          writable: true,
          enumerable: true,
          configurable: true
        });
        break;
      default:
        break;
    }
    SearchObj2 = onChangeSearch;
    this.props.getPaymentList(onChangeSearch);
  }

  click() {
    print();
  }

  Refresh() {
    window.location.reload();
  }

  keyDown = event => {
    if (event.key === "F4") {
    }
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
  buttonFormatter(cell, row, formatExtraData, rowIdx) {
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
        <a
          style={{
            color: "#607d8b",
            width: "400px"
          }}
        >
          Бүгд ( {total}) |
          <span
            style={{
              color: "#f8cb00"
            }}
          >
            Амжилттай ( {this.props.istrue})
          </span>
          | Амжилтгүй ( {this.props.isfalse})
        </a>
      </div>
    );
  }

  onToggleDropDown = toggleDropDown => {
    toggleDropDown();
  };

  renderSizePerPageDropDown = props => {
    return (
      <SizePerPageDropDown
        className="my-size-per-page"
        btnContextual="btn-warning"
        onChange={this.changer()}
        variation="dropdown"
        {...props}
        onClick={() => this.onToggleDropDown(props.toggleDropDown)}
      />
    );
  };

  changer(event) {
    // try{this.setState({Searched: this.refs.table.state.sizePerPage});}
    // catch(e){}
  }

  render() {
    const { handleSubmit } = this.props;
    const { rows } = this.props;
    var tmpArray = rows;
    function sumTotal() {
      var sum = 0;
      var i, j;
      let sumJoined = "";
      //Sum авч байгаа хэсэг
      if (rows.length !== 0) {
        for (var tmp = 0; tmp < rows.length; tmp++) {
          if (rows[tmp].issuccess === 1) {
            sum += rows[tmp].payamt;
          }
        }
      }
      //Орон тооцоолох хэсэг
      if (sum !== 0) {
        let sumLength = sum.toString().length;
        var decider = sumLength / 3;
        decider -= decider % 1;
        sum = reverseTheString(sum.toString());
        if (sumLength % 3 === 0) {
          decider--;
        }
        for (i = 0, j = 0; j < decider; j++, i += 3) {
          sumJoined += sum.toString().slice(i, i + 3) + "'";
        }
        if (sum.toString().length === 3) {
          sumJoined = sum.toString();
        }
        sumJoined += sum.toString().slice(i);
      } else {
        return sum;
      }
      return reverseTheString(sumJoined);
    }

    function indexN(cell, row, enumObject, index) {
      return <div>{index + 1}</div>;
    }

    function reverseTheString(str) {
      return str
        .split("")
        .reverse()
        .join("");
    }

    const selectRowProp = {
      mode: "radio",
      bgColor: "pink", // you should give a bgcolor, otherwise, you can't regonize which row has been selected
      hideSelectColumn: true, // enable hide selection column.
      clickToSelect: true // you should enable clickToSelect, otherwise, you can't select column.
    };
    const options = {
      onRowClick: function(row) {
        selectedrank = row.rank;
      },
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
      sizePerPageDropDown: this.renderSizePerPageDropDown,
      // paginationShowsTotal: this.renderShowsTotal ,  Accept bool or function
      noDataText: "Өгөгдөл олдсонгүй",
      prePage: "Өмнөх", // Previous page button text
      nextPage: "Дараах", // Next page button text
      firstPage: "Эхнийх", // First page button text
      lastPage: "Сүүлийх",
      sizePerPage: 10, // which size per page you want to locate as default
      pageStartIndex: 1, // where to start counting the pages
      paginationPosition: "bottom",
      hidePageListOnlyOnePage: true,
      defaultSortName: "rank", // default sort column name
      defaultSortOrder: "asc" // default sort order
    };

    const appFormat = {
      "1": "Oньс",
      "2": "ОньсПлас"
    };
    const paytype = {
      0: "Энгийн",
      1: "Скайтел",
      2: "Хаан банк",
      3: "Онлайнаар",
      4: "Посоор"
    };

    const payissuccess = {
      1: "Амжилттай",
      0: "Амжилтгүй"
    };

    function enumFormatter(cell, row, enumObject) {
      return enumObject[cell];
    }

    function priceFormatter(cell, row) {
      return "₮" + cell.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    function dateFormatter(cell, row) {
      if (cell === null) {
        return null;
      }
      return cell.substring(0, 10) + " " + cell.substring(11, 19);
    }

    function columnClassNameFormat(fieldValue, row, rowIdx, colIdx) {
      return row.issuccess === 1
        ? "td-selected-column-success"
        : "td-selected-column-fall";
    }
    /* onChange={this.handleChange.bind(this)} */
    return (
      <div className="animated fadeIn">
        {/* <Loading show={this.state.Loading}/> */}
        <div className="row">
          <div className="col-lg-12 col-md-12 col-sm-12">
            <div className="card">
              <div className="card-header">
                <form
                  onSubmit={handleSubmit(this.handleFormSubmit)}
                  id="myForm"
                >
                  <div className="row" name="formProps">
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <div className="form-group col-sm-1.3">
                      <label>Гүйлгээний огноо</label>
                      <Field
                        ref="beginDate"
                        name="beginDate"
                        component="input"
                        type="date"
                        className="form-control dateclss"
                      />
                    </div>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <div className="form-group col-sm-1.3">
                      <label>&nbsp;&nbsp;&nbsp;</label>
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
                        <option value="4">Посоор</option>
                      </Field>
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
                        onChange={this.handleChange.bind(this)}
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
                        Регистрийн дугаар&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                      </label>
                      <Field
                        name="regNum"
                        onChange={this.handleChange.bind(this)}
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
                        Утасны дугаар &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                      </label>
                      <Field
                        name="phoneNum"
                        onChange={this.handleChange.bind(this)}
                        component="input"
                        type="number"
                        className="form-control"
                      />
                    </div>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{" "}
                    {/*<div className="form-group col-sm-1.3">
        <label>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</label>
        <button type="submit" className="form-control button-save btn">Шүүх</button>
      </div>*/}
                  </div>
                  <div className="form-group col-sm-1.3">
                    &nbsp;
                    <Field
                      name="onis"
                      component="input"
                      type="checkbox"
                      onChange={this.handleClick}
                    />
                    &nbsp;&nbsp;
                    <label>Оньс &nbsp;&nbsp;</label>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <Field
                      name="onisplus"
                      component="input"
                      type="checkbox"
                      onChange={this.handleClick}
                    />
                    &nbsp;&nbsp;
                    <label>ОньсПлас</label>
                  </div>
                </form>
              </div>
              <div className="card-block col-md-12 col-lg-12 col-sm-12 tmpresponsive">
                {/* <a onClick={ this.handlerClickCleanFiltered.bind(this) } style={ { cursor: 'pointer' } }>Шүүлтүүр арилгах</a> --> */}
                {/* <div className="table-responsive"> */}
                <BootstrapTable
                  data={tmpArray}
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
                  {/* <TableHeaderColumn  dataField='rank'  width='80px' dataAlign="center" headerAlign='center' dataSort={true}><span className="descr">Д.д&nbsp;&nbsp;&nbsp;</span></TableHeaderColumn> */}
                  <TableHeaderColumn
                    width="60px"
                    dataField="rank"
                    dataAlign="center"
                    headerAlign="center"
                    dataSort={true}
                    isKey
                    dataFormat={indexN}
                  >
                    <span className="descr">
                      &nbsp;&nbsp; Д.д&nbsp;&nbsp;&nbsp;
                    </span>
                  </TableHeaderColumn>
                  <TableHeaderColumn
                    width="90px"
                    dataField="usertype"
                    headerAlign="center"
                    dataAlign="center"
                    formatExtraData={appFormat}
                    dataFormat={enumFormatter}
                  >
                    <span className="descr">Систем&nbsp;&nbsp;&nbsp;</span>
                  </TableHeaderColumn>
                  <TableHeaderColumn
                    width="120px"
                    ref="trandate"
                    dataField="trandate"
                    dataAlign="center"
                    headerAlign="center"
                    dataFormat={dateFormatter}
                    dataSort={true}
                    columnClassName={columnClassNameFormat}
                  >
                    <span className="descr">Огноо&nbsp;&nbsp;</span>
                  </TableHeaderColumn>
                  <TableHeaderColumn
                    width="80px"
                    ref="payamt"
                    dataField="payamt"
                    dataAlign="center"
                    headerAlign="center"
                    dataSort={true}
                    dataFormat={priceFormatter}
                    columnClassName={columnClassNameFormat}
                  >
                    <span className="descr">Дүн&nbsp;&nbsp;&nbsp;</span>
                  </TableHeaderColumn>
                  <TableHeaderColumn
                    width="200px"
                    dataField="description"
                    dataAlign="left"
                    headerAlign="center"
                    dataSort={true}
                    columnClassName={columnClassNameFormat}
                  >
                    <span className="descr">Гүйлгээний утга</span>
                  </TableHeaderColumn>
                  <TableHeaderColumn
                    width="80px"
                    ref="typeid"
                    dataField="typeid"
                    headerAlign="center"
                    dataAlign="center"
                    dataSort={true}
                    dataFormat={enumFormatter}
                    columnClassName={columnClassNameFormat}
                    formatExtraData={paytype}
                    tdStyle={{
                      borderRight: "1px solid #cfd8dc"
                    }}
                    thStyle={{
                      borderRight: "1px solid #cfd8dc"
                    }}
                  >
                    <span className="descr">Төлбөрийн хэлбэр</span>
                  </TableHeaderColumn>
                  <TableHeaderColumn
                    width="80px"
                    ref="username"
                    dataField="username"
                    headerAlign="center"
                    dataAlign="center"
                    dataSort={true}
                  >
                    <span className="descr">Нэвтрэх дугаар</span>
                  </TableHeaderColumn>
                  <TableHeaderColumn
                    width="80px"
                    ref="regnum"
                    dataField="regnum"
                    headerAlign="center"
                    dataAlign="center"
                    dataSort={true}
                  >
                    <span className="descr">Регистрийн дугаар</span>
                  </TableHeaderColumn>
                  <TableHeaderColumn
                    width="150px"
                    ref="sotrename"
                    dataField="storename"
                    headerAlign="center"
                    dataAlign="center"
                    dataSort={true}
                  >
                    <span className="descr">Дэлгүүрийн нэр</span>
                  </TableHeaderColumn>
                  <TableHeaderColumn
                    width="80px"
                    ref="phonenum"
                    dataField="phonenum"
                    headerAlign="center"
                    dataAlign="center"
                    dataSort={true}
                    tdStyle={{
                      borderRight: "1px solid #cfd8dc"
                    }}
                    thStyle={{
                      borderRight: "1px solid #cfd8dc"
                    }}
                  >
                    <span className="descr">Утасны дугаар</span>
                  </TableHeaderColumn>
                  <TableHeaderColumn
                    width="80px"
                    ref="issuccess"
                    dataField="issuccess"
                    headerAlign="center"
                    dataAlign="center"
                    dataSort={true}
                    dataFormat={enumFormatter}
                    columnClassName={columnClassNameFormat}
                    formatExtraData={payissuccess}
                  >
                    <span className="descr">Лиценз сунгагдсан эсэх</span>
                  </TableHeaderColumn>
                  <TableHeaderColumn
                    width="120px"
                    ref="startdate"
                    dataField="startdate"
                    headerAlign="center"
                    dataAlign="center"
                    dataFormat={dateFormatter}
                    dataSort={true}
                  >
                    <span className="descr">
                      Эхлэх хугацаа&nbsp;&nbsp;&nbsp;
                    </span>
                  </TableHeaderColumn>
                  <TableHeaderColumn
                    width="120px"
                    ref="enddate"
                    dataField="enddate"
                    headerAlign="center"
                    dataAlign="center"
                    dataFormat={dateFormatter}
                    dataSort={true}
                  >
                    <span className="descr">
                      Дуусах хугацаа&nbsp;&nbsp;&nbsp;
                    </span>
                  </TableHeaderColumn>
                  <TableHeaderColumn
                    width="120px"
                    ref="updymd"
                    dataField="updymd"
                    headerAlign="center"
                    dataAlign="center"
                    dataSort={true}
                    dataFormat={dateFormatter}
                  >
                    <span className="descr">
                      Зассан огноо&nbsp;&nbsp;&nbsp;
                    </span>
                  </TableHeaderColumn>
                  <TableHeaderColumn
                    width="80px"
                    ref="updemp"
                    dataField="updemp"
                    headerAlign="center"
                    dataAlign="center"
                    dataSort={true}
                  >
                    <span className="descr">
                      Зассан хэрэглэгч&nbsp;&nbsp;&nbsp;
                    </span>
                  </TableHeaderColumn>
                </BootstrapTable>
                <b className="descr">Хайлтын нийт дүн: {sumTotal()}</b>
              </div>
              {/* </div> */}
            </div>
          </div>
        </div>
        <div className="card-block">
          <button type="submit" className="btn btn-primary" form="myForm">
            <i className="fa fa-retweet" />
            Ачаалах
          </button>
          &nbsp;&nbsp;
          <button
            type="button"
            className="btn btn-success"
            onClick={() => this.newclick()}
          >
            <i className="fa fa-file-text-o" />
            Шинэ&nbsp;&nbsp;&nbsp;
          </button>
          &nbsp;&nbsp;
          <button
            type="button"
            className="btn"
            style={{
              backgroundColor: "#f7a115",
              color: "white"
            }}
            onClick={() => this.hiddenclick()}
          >
            <i className="fa fa-paper-plane-o" />
            Засах&nbsp;&nbsp;
          </button>
          &nbsp;&nbsp;
          <button
            type="button"
            className="btn"
            style={{
              backgroundColor: "#b0bec5",
              color: "white"
            }}
            onClick={() => this.click()}
          >
            <i className="fa fa-print" />
            Хэвлэх&nbsp;
          </button>
        </div>
      </div>
    );
  }
}
const form = reduxForm({ form: "PaymentList" });

function mapStateToProps(state) {
  if (Object.keys(SearchObj2).length === 0) {
    return {
      rows: state.paymentlist.rows,
      columns: state.paymentlist.columns,
      initialValues: {
        endDate: new Date().toISOString().slice(0, 10),
        beginDate: new Date().toISOString().slice(0, 10)
      }
    };
  } else {
    return {
      rows: state.paymentlist.rows,
      columns: state.paymentlist.columns,
      initialValues: {
        endDate: SearchObj2.endDate.slice(0, 10),
        beginDate: SearchObj2.beginDate.slice(0, 10),
        paymentType: SearchObj2.paymentType,
        userName: SearchObj2.userName,
        regNum: SearchObj2.regNum,
        phoneNum: SearchObj2.phoneNum
      }
    };
  }
}
export default connect(
  mapStateToProps,
  {
    getLicense,
    clearLicense,
    getPaymentList,
    clearPaymentList,
    editPayment,
    newPayment
  }
)(form(PaymentList));
//orient uphold prize isolate strike hotel office bracket toilet express plastic exhaust
