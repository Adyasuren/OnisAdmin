import React, { Component } from "react";
import { Field, reduxForm } from "redux-form";
import { connect } from "react-redux";
import {
  getSellerCalculation,
  getDealers
} from "../../actions/sellerCalculation_action";
import {
  BootstrapTable,
  TableHeaderColumn,
  SizePerPageDropDown,
  ExportCSVButton
} from "react-bootstrap-table";

var date = new Date();
var lastDay = new Date().toISOString().slice(0, 10);
var firstDay = new Date(date.getFullYear(), date.getMonth(), 2)
  .toISOString()
  .slice(0, 10);
var SearchObj1 = {};
// var onChangeSearch={};
// Object.defineProperty(onChangeSearch, "startDate",{ value: firstDay, writable: true, enumerable: true, configurable: true});
// Object.defineProperty(onChangeSearch, "endDate",{ value: lastDay, writable: true, enumerable: true, configurable: true});
class SellerCalculation extends Component {
  constructor(props) {
    super(props);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.changer = this.changer.bind(this);
    this.renderShowsTotal = this.renderShowsTotal.bind(this);
    this.renderShowsDetailTotal = this.renderShowsDetailTotal.bind(this);
    this.numberWithCommas = this.numberWithCommas.bind(this);
    this.onClickHandler = this.onClickHandler.bind(this);

    this.state = {
      filter: {
        startDate: firstDay,
        endDate: lastDay,
        dealerNum: null
      },
      selectedRowInfo: {
        dealerNum: "dealer",
        type: "(type)"
      }
    };
  }

  handleExportCSVButtonClick = onClick => {
    onClick();
  };

  createCustomExportCSVButton = onClick => {
    return (
      <ExportCSVButton
        btnText="Excel-рүү хөрвүүлэх"
        onClick={() => this.handleExportCSVButtonClick(onClick)}
      />
    );
  };

  numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
  handleFormSubmit(formProps) {
    var bgnDate = formProps.startDate;
    var endDate = formProps.endDate;
    // formProps.startDate += " 00:00:00";
    // formProps.endDate += " 23:59:59";
    SearchObj1 = formProps;
    this.props.getDealers(formProps);
    formProps.startDate = bgnDate;
    formProps.endDate = endDate;
  }
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
  onToggleDropDown = toggleDropDown => {
    toggleDropDown();
  };
  renderShowsTotal(start, to, total) {
    return (
      <div
        className="row"
        style={{
          marginLeft: "5px"
        }}
      >
        <p
          style={{
            color: "#607d8b",
            marginRight: "5px",
            cursor: "pointer"
          }}
        >
          Бүгд ( {this.numberWithCommas(this.props.total) + "₮"})
        </p>
      </div>
    );
  }
  renderShowsDetailTotal(start, to, total) {
    return (
      <div
        className="row"
        style={{
          marginLeft: "5px"
        }}
      >
        <p
          style={{
            color: "#607d8b",
            marginRight: "5px",
            cursor: "pointer"
          }}
        >
          Бүгд ( {this.numberWithCommas(this.props.detailsTotal) + "₮"})
        </p>

        <p
          style={{
            color: "#ed7d31",
            marginRight: "5px",
            cursor: "pointer"
          }}
        >
          Оньс ( {this.numberWithCommas(this.props.onisCount) + " хэрэглэгч"}{" "}
          {this.numberWithCommas(this.props.onisAmount) + "₮"})
        </p>

        <p
          style={{
            color: "#5b9bd5",
            marginRight: "5px",
            cursor: "pointer"
          }}
        >
          Оньс Плас ({" "}
          {this.numberWithCommas(this.props.onisPlusCount) + " хэрэглэгч"}{" "}
          {this.numberWithCommas(this.props.onisPlusAmount) + "₮"})
        </p>
      </div>
    );
  }

  changer(event) {
    // try{this.setState({Searched: this.refs.table.state.sizePerPage});}
    // catch(e){}
  }

  componentWillMount() {
    if (Object.keys(SearchObj1).length === 0) {
      SearchObj1 = {
        startDate: this.state.filter.startDate,
        endDate: this.state.filter.endDate
      };
      console.log(SearchObj1);
      this.props.getDealers(SearchObj1);
    } else {
      this.props.getDealers(SearchObj1);
    }
  }

  onClickHandler(row) {
    this.setState(
      {
        filter: {
          startDate: this.props.filterStartDate,
          endDate: this.props.filterEndDate,
          dealerNum: row.dealernum
        }
      },
      () => {
        this.props.getSellerCalculation(this.state.filter);
        this.setState({
          selectedRowInfo: {
            dealerNum: row.dealernum,
            type: "(" + row.typee + ")"
          }
        });
      }
    );
    //  this.props.getSellerCalculation(this.state)
  }

  render() {
    const { handleSubmit } = this.props;
    var tmpArray = [];
    var detailTmpArray = [];
    console.log(this.props.data);
    if (this.props.data !== undefined) {
      tmpArray = this.props.data;
    }
    if (this.props.details !== undefined) {
      detailTmpArray = this.props.details;
    } else {
      detailTmpArray = [];
    }

    const selectRowProp = {
      mode: "radio",
      bgColor: "pink", // you should give a bgcolor, otherwise, you can't regonize which row has been selected
      hideSelectColumn: true, // enable hide selection column.
      clickToSelect: true // you should enable clickToSelect, otherwise, you can't select column.
    };

    const appFormat = {
      "1": "Oньс",
      "2": "ОньсПлас"
    };
    function indexN(cell, row, enumObject, index) {
      return <div>{index + 1}</div>;
    }

    function enumFormatter(cell, row, enumObject) {
      return enumObject[cell];
    }

    function dateFormatter(cell, row) {
      if (cell === null) {
        return null;
      }
      return cell.substring(0, 10) + "\n" + cell.substring(11, 19);
    }

    function priceFormatter(cell, row) {
      if (cell !== null) {
        return cell.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + "₮";
      }
    }
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
          value: tmpArray.length
        }
      ], // you can change the dropdown list for size per page
      hideSizePerPage: true,

      sizePerPageDropDown: this.renderSizePerPageDropDown,
      paginationShowsTotal: this.renderShowsTotal, // Accept bool or function
      exportCSVBtn: this.createCustomExportCSVButton,
      onRowClick: this.onClickHandler,
      noDataText: "Өгөгдөл олдсонгүй",
      prePage: "Өмнөх", // Previous page button text
      nextPage: "Дараах", // Next page button text
      firstPage: "Эхнийх", // First page button text
      lastPage: "Сүүлийх",
      sizePerPage: 10, // which size per page you want to locate as default
      pageStartIndex: 1, // where to start counting the pages
      paginationPosition: "bottom",
      hidePageListOnlyOnePage: true
    };

    const detailOptions = {
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
          value: detailTmpArray.length
        }
      ], // you can change the dropdown list for size per page
      hideSizePerPage: true,

      sizePerPageDropDown: this.renderSizePerPageDropDown,
      paginationShowsTotal: this.renderShowsDetailTotal, // Accept bool or function
      exportCSVBtn: this.createCustomExportCSVButton,
      noDataText: "Өгөгдөл олдсонгүй",
      prePage: "Өмнөх", // Previous page button text
      nextPage: "Дараах", // Next page button text
      firstPage: "Эхнийх", // First page button text
      lastPage: "Сүүлийх",
      sizePerPage: 10, // which size per page you want to locate as default
      pageStartIndex: 1, // where to start counting the pages
      paginationPosition: "bottom",
      hidePageListOnlyOnePage: true
    };

    return (
      <div className="animated fadeIn">
        <div className="row">
          <div className="col-lg-12">
            <div className="card">
              <div className="card-header test" ref="test">
                <h6 className="card-title">Борлуулагчийн тооцоо</h6>
              </div>
              <div className="card-block tmpresponsive">
                <form
                  onSubmit={handleSubmit(this.handleFormSubmit)}
                  id="myForm"
                >
                  <div className="row">
                    <div
                      className="form-group col-sm-1.3"
                      style={{
                        marginLeft: "20px"
                      }}
                    >
                      <label>Төлбөр төлсөн огноо</label>
                      <Field
                        name="startDate"
                        component="input"
                        type="date"
                        className="form-control dateclss"
                        required="required"
                      />
                    </div>

                    <div
                      className="form-group col-sm-1.3"
                      style={{
                        marginLeft: "20px"
                      }}
                    >
                      <label>&nbsp;&nbsp;&nbsp;</label>
                      <Field
                        name="endDate"
                        component="input"
                        type="date"
                        className="form-control dateclss"
                        required="required"
                      />
                    </div>

                    <div
                      className="form-group col-sm-1.3"
                      style={{
                        marginLeft: "20px"
                      }}
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
                </form>
                <BootstrapTable
                  data={tmpArray}
                  tableHeaderClass="tbl-header-class"
                  tableBodyClass="tbl-body-class"
                  ref="table"
                  options={options}
                  maxHeight={"450px"}
                  width={"100%"}
                  bordered={true}
                  selectRow={selectRowProp}
                  exportCSV
                  striped={true}
                  hover={true}
                  pagination={true}
                  condensed={true}
                >
                  <TableHeaderColumn
                    dataField="rank"
                    width="20px"
                    dataAlign="center"
                    headerAlign="center"
                    dataFormat={indexN}
                    csvHeader="Д.д"
                  >
                    <span className="descr">Д.д&nbsp;&nbsp;&nbsp;</span>
                  </TableHeaderColumn>
                  <TableHeaderColumn
                    dataField="dealernum"
                    width="80px"
                    dataAlign="center"
                    headerAlign="center"
                    isKey
                    csvHeader="Борлуулагч"
                  >
                    <span className="descr">Борлуулагч&nbsp;&nbsp;&nbsp;</span>
                  </TableHeaderColumn>
                  <TableHeaderColumn
                    dataField="typee"
                    width="80px"
                    dataAlign="center"
                    headerAlign="center"
                    csvHeader="Борлуулагчийн төрөл"
                  >
                    <span className="descr">
                      Борлуулагчийн төрөл&nbsp;&nbsp;&nbsp;
                    </span>
                  </TableHeaderColumn>
                  <TableHeaderColumn
                    dataField="cnt"
                    width="80px"
                    dataAlign="center"
                    headerAlign="center"
                    csvHeader="Хэрэглэгчийн тоо"
                  >
                    <span className="descr">
                      Хэрэглэгчийн тоо&nbsp;&nbsp;&nbsp;
                    </span>
                  </TableHeaderColumn>
                  <TableHeaderColumn
                    dataField="paydamount"
                    width="80px"
                    dataAlign="center"
                    dataFormat={priceFormatter}
                    headerAlign="center"
                    csvHeader="Борлуулагчийн тооцоо нийлэх дүн"
                  >
                    <span className="descr">
                      Борлуулагчийн тооцоо нийлэх дүн&nbsp;&nbsp;&nbsp;
                    </span>
                  </TableHeaderColumn>
                </BootstrapTable>
              </div>
            </div>
            <div className="card-block">
              <button type="submit" className="btn btn-primary" form="myForm">
                <i className="fa fa-retweet" />
                Ачаалах
              </button>
              &nbsp;&nbsp;
            </div>
            <div className="card">
              <div className="card-header test" ref="test">
                <h6 className="card-title">Задаргаа</h6>
              </div>
              <div className="card-block tmpresponsive">
                <BootstrapTable
                  data={detailTmpArray}
                  tableHeaderClass="tbl-header-class"
                  tableBodyClass="tbl-body-class"
                  ref="table"
                  options={detailOptions}
                  maxHeight={"450px"}
                  width={"100%"}
                  bordered={true}
                  selectRow={selectRowProp}
                  striped={true}
                  hover={true}
                  pagination={true}
                  exportCSV
                  csvFileName={
                    this.state.selectedRowInfo.dealerNum +
                    this.state.selectedRowInfo.type +
                    ".csv"
                  }
                  condensed={true}
                >
                  <TableHeaderColumn
                    dataField="rank"
                    width="50px"
                    dataAlign="center"
                    headerAlign="center"
                    dataFormat={indexN}
                    csvHeader="Д.д"
                  >
                    <span className="descr">Д.д&nbsp;&nbsp;&nbsp;</span>
                  </TableHeaderColumn>
                  <TableHeaderColumn
                    dataField="payddate"
                    width="80px"
                    dataAlign="center"
                    headerAlign="center"
                    csvHeader="Төлбөр төлсөн огноо"
                    dataFormat={dateFormatter}
                  >
                    <span className="descr">
                      Төлбөр төлсөн огноо&nbsp;&nbsp;&nbsp;
                    </span>
                  </TableHeaderColumn>
                  <TableHeaderColumn
                    dataField="username"
                    width="160px"
                    dataAlign="center"
                    headerAlign="center"
                    csvHeader="Хэрэглэгч"
                  >
                    <span className="descr">
                      Нэвтрэх дугаар&nbsp;&nbsp;&nbsp;
                    </span>
                  </TableHeaderColumn>
                  <TableHeaderColumn
                    dataField="paydamt"
                    width="80px"
                    dataAlign="center"
                    headerAlign="center"
                    dataSort={true}
                    dataFormat={priceFormatter}
                    csvHeader="Дүн"
                  >
                    <span className="descr">Дүн&nbsp;&nbsp;&nbsp;</span>
                  </TableHeaderColumn>
                  <TableHeaderColumn
                    dataField="dealernum"
                    width="80px"
                    dataAlign="center"
                    headerAlign="center"
                    isKey
                    csvHeader="Борлуулагч"
                  >
                    <span className="descr">Борлуулагч&nbsp;&nbsp;&nbsp;</span>
                  </TableHeaderColumn>
                  <TableHeaderColumn
                    dataField="storename"
                    width="80px"
                    dataAlign="center"
                    headerAlign="center"
                    csvHeader="Дэлгүүрийн нэр"
                  >
                    <span className="descr">
                      Дэлгүүрийн нэр&nbsp;&nbsp;&nbsp;
                    </span>
                  </TableHeaderColumn>
                  <TableHeaderColumn
                    dataField="regnum"
                    width="80px"
                    dataAlign="center"
                    headerAlign="center"
                    csvHeader="Регистрийн дугаар"
                  >
                    <span className="descr">
                      Регистрийн дугаар&nbsp;&nbsp;&nbsp;
                    </span>
                  </TableHeaderColumn>
                  <TableHeaderColumn
                    dataField="usertype"
                    width="80px"
                    dataAlign="center"
                    formatExtraData={appFormat}
                    dataFormat={enumFormatter}
                    headerAlign="center"
                    csvHeader="Систем"
                  >
                    <span className="descr">Систем&nbsp;&nbsp;&nbsp;</span>
                  </TableHeaderColumn>
                  <TableHeaderColumn
                    dataField="phonenum"
                    width="80px"
                    dataAlign="center"
                    headerAlign="center"
                    csvHeader="Утас"
                  >
                    <span className="descr">Утас&nbsp;&nbsp;&nbsp;</span>
                  </TableHeaderColumn>
                  <TableHeaderColumn
                    dataField="insymd"
                    width="80px"
                    dataAlign="center"
                    headerAlign="center"
                    csvHeader="Бүртгүүлсэн огноо"
                    dataFormat={dateFormatter}
                  >
                    <span className="descr">
                      Бүртгүүлсэн огноо&nbsp;&nbsp;&nbsp;
                    </span>
                  </TableHeaderColumn>
                </BootstrapTable>
                <br />
                <br />
                <br />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const form = reduxForm({ form: "sellerCalculation" });

function mapStateToProps(state) {
  var total = 0;
  var detailsTotal = 0;
  var tmpList = state.sellerCalculation.rows.dealersWithAmounts;
  var detailsTmpList = state.sellerCalculation.details;

  var onisCount = 0;
  var onisPlusCount = 0;
  var onisAmount = 0;
  var onisPlusAmount = 0;

  if (tmpList !== undefined) {
    for (var index = 0; index < tmpList.length; index++) {
      if (tmpList[index].paydamount !== null) {
        total += tmpList[index].paydamount;
      }
    }
  }

  if (detailsTmpList !== undefined) {
    for (var i = 0; i < detailsTmpList.length; i++) {
      if (detailsTmpList[i].paydamt !== null) {
        detailsTotal += detailsTmpList[i].paydamt;
      }

      if (detailsTmpList[i].usertype === 1) {
        if (detailsTmpList[i].paydamt !== null) {
          onisAmount += detailsTmpList[i].paydamt;
        }
        onisCount++;
      } else {
        if (detailsTmpList[i].paydamt !== null) {
          onisPlusAmount += detailsTmpList[i].paydamt;
        }
        onisPlusCount++;
      }
    }
  }
  if (Object.keys(SearchObj1).length === 0) {
    return {
      filterStartDate: state.sellerCalculation.rows.startDate,
      filterEndDate: state.sellerCalculation.rows.endDate,
      data: state.sellerCalculation.rows.dealersWithAmounts,
      details: state.sellerCalculation.details,
      total: total,
      onisCount: onisCount,
      onisPlusCount: onisPlusCount,
      onisAmount: onisAmount,
      onisPlusAmount: onisPlusAmount,
      detailsTotal: detailsTotal,
      initialValues: {
        endDate: lastDay,
        startDate: firstDay
      }
    };
  } else {
    return {
      filterStartDate: state.sellerCalculation.rows.startDate,
      filterEndDate: state.sellerCalculation.rows.endDate,
      data: state.sellerCalculation.rows.dealersWithAmounts,
      details: state.sellerCalculation.details,
      total: total,
      onisCount: onisCount,
      onisPlusCount: onisPlusCount,
      onisAmount: onisAmount,
      onisPlusAmount: onisPlusAmount,
      detailsTotal: detailsTotal,
      initialValues: {
        endDate: SearchObj1.endDate,
        startDate: SearchObj1.startDate,
        dealerNum: SearchObj1.dealerNum
      }
    };
  }
}

export default connect(
  mapStateToProps,
  { getSellerCalculation, getDealers }
)(form(SellerCalculation));
