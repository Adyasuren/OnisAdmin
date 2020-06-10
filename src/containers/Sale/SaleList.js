import React, { Component } from "react";
import { Field, reduxForm } from "redux-form";
import { connect } from "react-redux";
import {
  BootstrapTable,
  TableHeaderColumn,
  SizePerPageDropDown
} from "react-bootstrap-table";
import "react-bootstrap-table/dist/react-bootstrap-table.min.css";
import {
  getStoreList,
  getSaleList,
  clearSaleList,
  getYearSaleList
} from "../../actions/sale_action";

var SearchObj4 = {};
var onChangeSearch = {};

var isCheckonis = false;
var isCheckonisplus = false;
var usertypes = 0;
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

class SaleList extends Component {
  constructor(props) {
    super(props);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.click = this.click.bind(this);
    this.Refresh = this.Refresh.bind(this);
    this.isonisType = this.isonisType.bind(this);
    this.renderShowsTotal = this.renderShowsTotal.bind(this);
    this.state = {
      searchType: 0,
      split: new Date(
        new Date().getYear(),
        new Date().getMonth() + 1,
        0
      ).getDate(),
      month: 0,
      year: 0,
      checkBox: false,
      Loading: false
    };
    document.title = "Борлуулалтын жагсаалт - Оньс админ";
  }
  componentWillMount() {
    this.setState({ Loading: true });
    this.props.clearSaleList();
    this.props.getStoreList();
    this.setState({
      month: new Date().getMonth(),
      year: new Date().getFullYear()
    });
    this.setState({ Loading: false });
  }

  handleFormSubmit(formProps) {
    this.setState({ Loading: true });
    this.props.clearSaleList();
    var searchTmp = {};

    if (this.state.searchType === 0) {
      let beginDate = formProps.DatePicker + "-01T00:00:00";
      let endDate = formProps.DatePicker + "-" + this.state.split + "T23:59:59";
      if (formProps === "Бүгд") {
        searchTmp = {
          beginDate: beginDate,
          endDate: endDate
        };
      } else {
        searchTmp = {
          beginDate: beginDate,
          endDate: endDate,
          storeId: formProps.storeId,
          regNum: formProps.regNum
        };
      }
      searchTmp.userType = this.isonisType(isCheckonis, isCheckonisplus);
      this.props.getSaleList(searchTmp);
    } else {
      let beginDate = formProps.DatePicker.slice(0, 4) + "-01-01T00:00:00";
      let endDate = formProps.DatePicker.slice(0, 4) + "-12-31T23:59:59";
      if (formProps === "Бүгд") {
        searchTmp = {
          beginDate: beginDate,
          endDate: endDate,
          regNum: formProps.regNum
        };
      } else {
        searchTmp = {
          beginDate: beginDate,
          endDate: endDate,
          storeId: formProps.storeId,
          regNum: formProps.regNum,
          userType: usertypes
        };
      }
      searchTmp.userType = this.isonisType(isCheckonis, isCheckonisplus);
      this.props.getYearSaleList(searchTmp);
    }
    this.setState({ Loading: false });
  }

  click() {
    this.props.clearSaleList();
    //print();
  }

  Refresh() {
    window.location.reload();
  }

  onToggleDropDown = toggleDropDown => {
    toggleDropDown();
  };

  checkBoxChange = e => {
    if (e.target.checked === true) {
      this.setState({ checkBox: true });
    } else {
      this.setState({ checkBox: false });
    }
  };

  handleChange(e) {
    switch (e.terget.name) {
      case "regNum":
        Object.defineProperty(onChangeSearch, "regNum", {
          value: e.target.value,
          writable: true,
          enumerable: true,
          configurable: true
        });
        break;
      default:
        break;
    }
    SearchObj4 = onChangeSearch;
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

  handleClick(e) {
    switch (e.target.name) {
      case "onis":
        if (isCheckonis) {
          isCheckonis = false;
        } else {
          isCheckonis = true;
        }
        break;
      case "onisplus":
        if (isCheckonisplus) {
          isCheckonisplus = false;
        } else {
          isCheckonisplus = true;
        }
        break;
      default:
        break;
    }
  }

  isonisType(isCheckonis, isCheckonisplus) {
    if (isCheckonis === true && isCheckonisplus === false) {
      return 1;
    } else if (isCheckonisplus === true && isCheckonis === false) {
      return 2;
    } else {
      return 0;
    }
  }

  renderShowsTotal(start, to, total) {
    return (
      <div>
        <p
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
            Идэвхтэй ( {this.props.istrue})
          </span>
          |
          <span
            style={{
              color: "#C0C0C0"
            }}
          >
            Идэвхгүй ( {this.props.isfalse})
          </span>
        </p>
      </div>
    );
  }

  yearOrMonth() {
    return (
      <TableHeaderColumn
        row="0"
        colSpan={this.state.split}
        height="50px"
        headerAlign="center"
        dataAlign="center"
      >
        <span className="descr">Борлуулалт&nbsp;&nbsp;&nbsp;</span>
      </TableHeaderColumn>
    );
  }

  isOnisValue(onisValue, onisplusValue) {}

  convertDate(i) {
    switch (i) {
      case 0:
        return "Да";
      case 1:
        return "Мя";
      case 2:
        return "Лха";
      case 3:
        return "Пү";
      case 4:
        return "Ба";
      case 5:
        return "Бя";
      default:
        return "Ня";
    }
  }

  //Жил сар сонгон split State-ийг солих хэсэг
  getDate = e => {
    this.props.clearSaleList();
    if (this.state.searchType === 0) {
      this.setState({
        split: new Date(
          e.target.value.slice(0, 4),
          e.target.value.slice(5, 7),
          0
        ).getDate(),
        month: e.target.value.slice(5, 7) - 1
      });
    } else {
      this.setState({ split: 12 });
    }
  };

  //
  change = e => {
    this.props.clearSaleList();
    if (e.target.value === 0) {
      this.setState({
        searchType: 0,
        split: new Date(
          this.refs.searchType.context._reduxForm.values.DatePicker.slice(0, 4),
          this.refs.searchType.context._reduxForm.values.DatePicker.slice(5, 7),
          0
        ).getDate()
      });
    } else {
      this.setState({ searchType: 1, split: 12 });
    }
  };

  //Сар жил сонгоход тэдгээрийн хайлтын field-ийг солин зурах
  dateType = () => {
    if (this.state.searchType === 0) {
      return (
        <Field
          name="DatePicker"
          component="input"
          onChange={this.getDate}
          type="month"
          ref="DatePicker"
          className="form-control dateclss"
        />
      );
    } else {
      return (
        <Field
          name="DatePicker"
          component="select"
          size="20px"
          value={this.state.selectValue}
          ref="DatePicker"
          onChange={this.getDate}
          className="form-control dateclss"
        >
          {this.yearLister()}
        </Field>
      );
    }
  };

  //Жил сонгох хэсгийн жилийг өрөн зурж байгаа хэсэг
  yearLister() {
    var tmp = new Date().getFullYear() - 2015;
    var tmpList = [];
    for (var i = 0; i < tmp; i++) {
      tmpList.push(
        <option key={i} value={new Date().getFullYear() - i}>
          {new Date().getFullYear() - i}
        </option>
      );
    }
    return tmpList;
  }

  //Сар жилээр table-ийг дүүргэн өрж зурж байгаа хэсэг
  month() {
    let monthList = [];
    if (this.state.searchType === 0) {
      if (!this.refs.DatePicker) {
        for (let k = 0; k < this.state.split; k++) {
          monthList.push(
            <TableHeaderColumn
              key={k}
              headerAlign="center"
              row="1"
              dataFormat={this.boldFormat}
              width="50px"
              dataAlign="center"
            >
              <span className="descr">
                {k + 1}
                <br />
              </span>
            </TableHeaderColumn>
          );
        }
      } else {
        for (let i = 0; i < this.state.split; i++) {
          if (
            new Date(
              this.refs.DatePicker.value.slice(0, 4),
              this.state.month,
              i
            ).getDay() < 5
          ) {
            let tmp1 = i + 1;
            if (tmp1 < 10) {
              tmp1 = "0" + tmp1;
            }
            let tmp = "d" + tmp1;
            monthList.push(
              <TableHeaderColumn
                key={i}
                headerAlign="center"
                dataField={tmp}
                dataFormat={this.boldFormat}
                height="50px"
                row="1"
                width="60px"
                dataAlign="right"
              >
                <span className="descr">
                  {i + 1}
                  <br />
                  {this.convertDate(
                    new Date(this.state.year, this.state.month, i).getDay()
                  )}
                </span>
              </TableHeaderColumn>
            );
          } else {
            let tmp1 = i + 1;
            if (tmp1 < 10) {
              tmp1 = "0" + tmp1;
            }
            let tmp = "d" + tmp1;
            monthList.push(
              <TableHeaderColumn
                key={i}
                tdStyle={{
                  background: "#e6e6e6"
                }}
                dataFormat={this.boldFormat}
                dataField={tmp.toString()}
                thStyle={{
                  background: "#e6e6e6"
                }}
                headerAlign="center"
                height="50px"
                row="1"
                width="60px"
                dataAlign="right"
              >
                <span className="descr">
                  {i + 1}
                  <br />
                  {this.convertDate(
                    new Date(this.state.year, this.state.month, i).getDay()
                  )}
                </span>
              </TableHeaderColumn>
            );
          }
        }
      }
    } else {
      for (let y = 0; y < 12; y++) {
        if (y + 1 <= 9) {
          let tmp1 = y + 1;
          let tmp = "0" + tmp1;
          monthList.push(
            <TableHeaderColumn
              key={y}
              dataField={"m" + tmp.toString()}
              dataFormat={this.boldFormat}
              headerAlign="center"
              tdStyle={{
                background: ""
              }}
              dataAlign="right"
              minWidth="50px"
              width="60px"
              row="1"
            >
              <span className="descr">
                {y + 1}-р
                <br />
                Сар
              </span>
            </TableHeaderColumn>
          );
        } else {
          monthList.push(
            <TableHeaderColumn
              key={y}
              dataField={"m" + (y + 1).toString()}
              dataFormat={this.boldFormat}
              headerAlign="center"
              tdStyle={{
                background: ""
              }}
              dataAlign="right"
              minWidth="50px"
              width="60px"
              row="1"
            >
              <span className="descr">
                {y + 1}-р
                <br />
                Сар
              </span>
            </TableHeaderColumn>
          );
        }
      }
    }

    return monthList;
  }

  boldFormat(cell) {
    if (cell !== 0) {
      return <b>{cell}</b>;
    } else {
      return 0;
    }
  }

  render() {
    const { handleSubmit } = this.props;
    const { rows, rowscust } = this.props;

    function renderOptions() {
      if (rowscust.length !== 0) {
        let tmp = rowscust.map((item, i) => {
          return (
            <option key={i} value={item.storeid}>
              {item.storeid}
              {item.storename}
            </option>
          );
        });
        return tmp;
      }
    }

    const appFormat = {
      "1": "Oньс",
      "2": "ОньсПлас"
    };

    function indexN(cell, row, enumObject, index) {
      return <div>{index + 1}</div>;
    }

    var dataTmp = [];
    var counter = 0;
    let rank = 1;
    var users = [];
    if (this.state.checkBox === false) {
      if (this.state.searchType === 0) {
        // Implementing month search data
        for (let runner1 = 0; runner1 < rows.length; runner1++) {
          for (let runner2 = 1; runner2 <= this.state.split; runner2++) {
            // add days field into the data
            let runnerTmp = runner2;
            if (runnerTmp < 10) {
              runnerTmp = "0" + runnerTmp;
            }
            let tmp = "d" + runnerTmp;
            let obj = {};

            if (rows[runner1].slsDate.slice(8, 10) === runnerTmp) {
              obj[tmp] = rows[runner1].amount;
            } else {
              obj[tmp] = 0;
            }
            rows[runner1] = Object.assign({}, rows[runner1], obj);
          }
        }

        rows.map((row, rowcount) => {
          var count = 0;
          dataTmp.map((data, datacount) => {
            if (row.storeId === data.storeId) {
              let name = "d" + row.slsDate.slice(8, 10);
              // let obj = {};
              // obj[name] = row.amount;
              data[name] = row.amount;
              // data = Object.assign({}, data, row);
              dataTmp[datacount] = data;
            } else {
              count++;
            }
            return "datatmp map function";
          });
          if (count === dataTmp.length) {
            dataTmp.push(row);
          }
          return "row map function";
        });
      }
      if (this.state.searchType === 1) {
        // Implementing year search data
        for (let i = 0; i < rows.length; i++, counter = 0) {
          for (let j = 0; j < dataTmp.length; j++) {
            if (rows[i].storeId === dataTmp[j].storeId) {
              counter++;
            }
          }
          if (counter === 0) {
            rows[i] = Object.assign({}, rows[i], { rank: rank });
            dataTmp.push(rows[i]);
            rank++;
          }
        }
        let i = 0;
        while (i < dataTmp.length) {
          dataTmp[i].m01 = 0;
          dataTmp[i].m02 = 0;
          dataTmp[i].m03 = 0;
          dataTmp[i].m04 = 0;
          dataTmp[i].m05 = 0;
          dataTmp[i].m06 = 0;
          dataTmp[i].m07 = 0;
          dataTmp[i].m08 = 0;
          dataTmp[i].m09 = 0;
          dataTmp[i].m10 = 0;
          dataTmp[i].m11 = 0;
          dataTmp[i].m12 = 0;
          i++;
        }

        for (let j = 0; j < rows.length; j++) {
          let nameChecker = "m" + rows[j].slsDate.slice(5, 7);
          for (let k = 0; k < dataTmp.length; k++) {
            if (rows[j].storeId === dataTmp[k].storeId) {
              switch (nameChecker) {
                case "m01":
                  dataTmp[k].m01 += rows[j].amount;
                  break;
                case "m02":
                  dataTmp[k].m02 += rows[j].amount;
                  break;
                case "m03":
                  dataTmp[k].m03 += rows[j].amount;
                  break;
                case "m04":
                  dataTmp[k].m04 += rows[j].amount;
                  break;
                case "m05":
                  dataTmp[k].m05 += rows[j].amount;
                  break;
                case "m06":
                  dataTmp[k].m06 += rows[j].amount;
                  break;
                case "m07":
                  dataTmp[k].m07 += rows[j].amount;
                  break;
                case "m08":
                  dataTmp[k].m08 += rows[j].amount;
                  break;
                case "m09":
                  dataTmp[k].m09 += rows[j].amount;
                  break;
                case "m10":
                  dataTmp[k].m10 += rows[j].amount;
                  break;
                case "m11":
                  dataTmp[k].m11 += rows[j].amount;
                  break;
                case "m12":
                  dataTmp[k].m12 += rows[j].amount;
                  break;
                default:
                  break;
              }
            }
          }
        }
      }
    } else {
      rowscust.forEach(obj => {
        if (users.indexOf(obj) === -1) users.push(obj);
      });
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
          value: dataTmp.length
        }
      ], // you can change the dropdown list for size per page
      hideSizePerPage: true,
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
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <div
                      className="form-group col-md-1.3"
                      style={{
                        marginLeft: "20px"
                      }}
                    >
                      <label>Огноо</label>
                      <Field
                        name="searchtype"
                        value={this.state.selectValue}
                        onChange={this.change}
                        component="select"
                        ref="searchType"
                        className="form-control"
                      >
                        <option value="0">Сар</option>
                        <option value="1">Жил</option>
                      </Field>
                    </div>
                    <div
                      className="form-group col-sm-1.3 date"
                      style={{
                        marginLeft: "20px",
                        marginTop: "10px"
                      }}
                      id="datetimepicker3"
                    >
                      <label />
                      {this.dateType()}
                    </div>
                    <div
                      className="form-group col-sm-1.3"
                      style={{
                        marginLeft: "20px"
                      }}
                    >
                      <label>Дэлгүүр</label>
                      <Field
                        name="storeId"
                        ref="user"
                        component="select"
                        className="form-control"
                      >
                        <option value="">Бүгд</option>
                        {/* {cOptions} */}
                        {renderOptions()}
                      </Field>
                    </div>
                    <div
                      className="form-group col-sm-1.3"
                      style={{
                        marginLeft: "20px"
                      }}
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
                      style={{
                        visibility: "hidden"
                      }}
                    >
                      <label>
                        Гүйлгээ хийгээгүй&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                      </label>
                      <Field
                        name="regNum"
                        component="input"
                        onChange={this.checkBoxChange}
                        type="checkbox"
                        className="form-control"
                      />
                    </div>
                  </div>

                  <div
                    className="form-group col-sm-1.3"
                    style={{
                      marginLeft: "5px"
                    }}
                  >
                    &nbsp;
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
                    <label>ОньсПлас</label>
                  </div>
                </form>
              </div>

              <div className="card-block tmpresponsive">
                {/* <a onClick={ this.handlerClickCleanFiltered.bind(this) } style={ { cursor: 'pointer' } }>Шүүлтүүр арилгах</a> */}
                <BootstrapTable
                  ref="table"
                  data={dataTmp}
                  hover={true}
                  pagination={true}
                  tableHeaderClass="tbl-header-class"
                  tableBodyClass="tbl-body-class"
                  maxHeight={"500px"}
                  width={"100%"}
                  options={options}
                  bordered={true}
                  striped={true}
                  condensed={true}
                >
                  <TableHeaderColumn
                    ref="rank"
                    dataField="rank"
                    headerAlign="center"
                    row="0"
                    rowSpan="2"
                    dataAlign="center"
                    width="50px"
                    dataSort={true}
                    isKey
                    dataFormat={indexN}
                  >
                    <span className="descr">Д.д &nbsp;&nbsp;&nbsp;</span>
                  </TableHeaderColumn>
                  <TableHeaderColumn
                    dataField="userType"
                    headerAlign="center"
                    rowSpan="2"
                    dataAlign="center"
                    width="90px"
                    dataSort={true}
                    dataFormat={enumFormatter}
                    formatExtraData={appFormat}
                  >
                    <span className="descr">Систем&nbsp;&nbsp;&nbsp;</span>
                  </TableHeaderColumn>
                  {/* <TableHeaderColumn ref="storeId"   dataField='storeId'                      headerAlign='center' row='0' rowSpan='2' dataAlign="right"  width='80px'  dataSort={true}   isKey   ><span className="descr">Д/код                 &nbsp;&nbsp;&nbsp;</span></TableHeaderColumn> */}
                  <TableHeaderColumn
                    dataField="userName"
                    headerAlign="center"
                    rowSpan="2"
                    dataAlign="center"
                    width="165px"
                    dataSort={true}
                  >
                    <span className="descr">
                      Нэвтрэх дугаар &nbsp;&nbsp;&nbsp;
                    </span>
                  </TableHeaderColumn>
                  <TableHeaderColumn
                    dataField="regNum"
                    headerAlign="center"
                    rowSpan="2"
                    dataAlign="center"
                    width="165px"
                    dataSort={true}
                  >
                    <span className="descr">
                      Регистрийн дугаар &nbsp;&nbsp;&nbsp;
                    </span>
                  </TableHeaderColumn>
                  <TableHeaderColumn
                    dataField="storeName"
                    headerAlign="center"
                    row="0"
                    rowSpan="2"
                    dataAlign="left"
                    width="150px"
                    dataSort={true}
                  >
                    <span className="descr">
                      Дэлгүүрийн нэр &nbsp;&nbsp;&nbsp;
                    </span>
                  </TableHeaderColumn>
                  <TableHeaderColumn
                    ref="ownerName"
                    dataField="ownerName"
                    headerAlign="center"
                    row="0"
                    rowSpan="2"
                    dataAlign="left"
                    width="150px"
                    dataSort={true}
                  >
                    <span className="descr">
                      Удирдлагын нэр &nbsp;&nbsp;&nbsp;
                    </span>
                  </TableHeaderColumn>
                  <TableHeaderColumn
                    ref="className"
                    dataField="className"
                    headerAlign="center"
                    row="0"
                    rowSpan="2"
                    dataAlign="left"
                    width="200px"
                    dataSort={true}
                  >
                    <span className="descr">
                      Үйл ажиллагааны чиглэл&nbsp;&nbsp;&nbsp;
                    </span>
                  </TableHeaderColumn>
                  {/* <TableHeaderColumn dataField='amount' headerAlign='center' rowSpan='2' dataAlign="center" width='165px' dataSort={true}>
                  <span className="descr">
                    Борлуулалтын дүн &nbsp;&nbsp;&nbsp;</span>
                </TableHeaderColumn>
                <TableHeaderColumn dataField='slsDate' headerAlign='center' rowSpan='2' dataAlign="center" width='165px' dataSort={true}>
                  <span className="descr">
                    Борлуулалтын огноо &nbsp;&nbsp;&nbsp;</span>
                </TableHeaderColumn> */}
                  {this.yearOrMonth()}
                  {this.month()}
                </BootstrapTable>
              </div>
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
const form = reduxForm({ form: "Customerlist" });

function mapStateToProps(state) {
  var month = new Date().getMonth() + 1;
  if (month < 10) {
    month = "0" + month;
  }
  var dataTmp = [];
  if (state.saleList.rows.length !== 0) {
    dataTmp = state.saleList.rows;
  } else {
    dataTmp = state.saleList.year;
  }

  var tmp = new Date().getFullYear() + "-" + month;
  return {
    rowsdist: state.district.rows,
    rowscust: state.saleList.stores,
    columnscust: state.customer.columns,
    rows: dataTmp,
    columns: state.saleList.columns,
    initialValues: {
      DatePicker: tmp,
      regNum: SearchObj4.regNum
    }
  };
}
export default connect(
  mapStateToProps,
  { getStoreList, getSaleList, clearSaleList, getYearSaleList }
)(form(SaleList));
