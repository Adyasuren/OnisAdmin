import React, { Component } from "react";
import { Field, reduxForm } from "redux-form";
import { connect } from "react-redux";
import { getFeedback } from "../../actions/feedback_action";
import {
  BootstrapTable,
  TableHeaderColumn,
  SizePerPageDropDown
} from "react-bootstrap-table";
import "react-bootstrap-table/dist/react-bootstrap-table.min.css";

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

var isCheckonis = false;
var isCheckonisplus = false;

class feedbackList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: true,
      isActive: false,
      Searched: 10,
      Loading: true
    };

    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.click = this.click.bind(this);
    this.changer = this.changer.bind(this);
    this.Refresh = this.Refresh.bind(this);
    this.isonisType = this.isonisType.bind(this);
    this.renderShowsTotal = this.renderShowsTotal.bind(this);
    document.title = "Санал хүсэлтийн жагсаалт - Оньс админ";
  }

  componentWillMount() {
    this.setState({ Loading: true });
    var currentdate = new Date();
    if (Object.keys(SearchObj1).length === 0) {
      SearchObj1 = {
        beginDate: currentdate.toLocaleDateString() + " 00:00:00",
        endDate: currentdate.toLocaleDateString() + " 23:59:59"
      };
      this.props.getFeedback(SearchObj1);
    } else {
      this.props.getFeedback(SearchObj1);
    }
    this.setState({ Loading: false });
  }

  handleFormSubmit(formProps) {
    this.setState({ Loading: true });
    var bgnDate = formProps.beginDate;
    var endDate = formProps.endDate;
    formProps.beginDate += " 00:00:00";
    formProps.endDate += " 23:59:59";
    SearchObj1 = formProps;
    this.setState({ Searched: true });
    formProps.beginDate = bgnDate;
    formProps.endDate = endDate;
    formProps.userType = this.isonisType(isCheckonis, isCheckonisplus);
    this.props.getFeedback(formProps);
    this.setState({ Loading: false });
  }

  handlerClickCleanFiltered() {
    this.refs.username.cleanFiltered();
    this.refs.isactive.cleanFiltered();
    this.refs.typeid.cleanFiltered();
  }

  renderShowsTotal(total) {
    return (
      <div className="row">
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <p
          style={{
            color: "#607d8b",
            marginRight: "5px",
            cursor: "pointer"
          }}
          onClick={() => console.log(this.props)}
        >
          Бүгд ( {this.props.total})
        </p>
      </div>
    );
  }

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
    if (isCheckonis === true && isCheckonisplus === false) return 1;
    else if (isCheckonisplus === true && isCheckonis === false) return 2;
    else return 0;
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
    SearchObj1 = onChangeSearch;
    this.props.getFeedback(onChangeSearch);
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

    tmpArray = tmpArray.filter(item => {
      if (this.isonisType(isCheckonis, isCheckonisplus) === 0) {
        return item;
      } else if (
        item.userType === this.isonisType(isCheckonis, isCheckonisplus)
      ) {
        return item;
      } else {
        return item;
      }
    });

    function dateFormatter(cell, row) {
      if (cell === null) {
        return null;
      }
      return cell.substring(0, 10) + "\n" + cell.substring(11, 19);
    }

    const selectRowProp = {
      mode: "radio",
      bgColor: "pink", // you should give a bgcolor, otherwise, you can't regonize which row has been selected
      hideSelectColumn: true, // enable hide selection column.
      clickToSelect: true // you should enable clickToSelect, otherwise, you can't select column.
    };
    const options = {
      onRowClick: function(row) {},
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
      paginationShowsTotal: this.renderShowsTotal,
      sizePerPageDropDown: this.renderSizePerPageDropDown,
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

    function enumFormatter(cell, row, enumObject) {
      return enumObject[cell];
    }

    return (
      <div className="animated fadeIn">
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
                    dataField="rank"
                    width="40px"
                    headerAlign="center"
                    dataAlign="center"
                    dataSort={true}
                    isKey
                  >
                    <span className="descr">Д.д&nbsp;&nbsp;&nbsp;</span>
                  </TableHeaderColumn>
                  <TableHeaderColumn
                    dataField="userType"
                    width="80px"
                    headerAlign="center"
                    dataAlign="center"
                    dataSort={false}
                    dataFormat={enumFormatter}
                    formatExtraData={appFormat}
                  >
                    <span className="descr">Систем&nbsp;&nbsp;&nbsp;</span>
                  </TableHeaderColumn>
                  <TableHeaderColumn
                    dataField="userName"
                    width="90px"
                    headerAlign="center"
                    dataAlign="center"
                    dataSort={true}
                  >
                    <span className="descr">
                      Нэвтрэх дугаар&nbsp;&nbsp;&nbsp;
                    </span>
                  </TableHeaderColumn>
                  <TableHeaderColumn
                    dataField="ownerName"
                    width="90px"
                    headerAlign="center"
                    dataAlign="center"
                    dataSort={true}
                  >
                    <span className="descr">
                      Удирдлагын нэр&nbsp;&nbsp;&nbsp;
                    </span>
                  </TableHeaderColumn>
                  <TableHeaderColumn
                    dataField="regNum"
                    width="80px"
                    headerAlign="center"
                    dataAlign="center"
                    dataSort={true}
                  >
                    <span className="descr">РД&nbsp;&nbsp;&nbsp;</span>
                  </TableHeaderColumn>
                  <TableHeaderColumn
                    dataField="phoneNum"
                    width="80px"
                    headerAlign="center"
                    dataAlign="center"
                    dataSort={true}
                  >
                    <span className="descr">Утас&nbsp;&nbsp;&nbsp;</span>
                  </TableHeaderColumn>
                  <TableHeaderColumn
                    dataField="storeName"
                    width="130px"
                    headerAlign="center"
                    dataAlign="center"
                    dataSort={true}
                  >
                    <span className="descr">
                      Дэлгүүрийн нэр&nbsp;&nbsp;&nbsp;
                    </span>
                  </TableHeaderColumn>
                  <TableHeaderColumn
                    dataField="goodsName"
                    width="150px"
                    headerAlign="center"
                    dataAlign="center"
                    dataSort={true}
                  >
                    <span className="descr">
                      Үйл ажиллагааны чиглэл&nbsp;&nbsp;&nbsp;
                    </span>
                  </TableHeaderColumn>
                  <TableHeaderColumn
                    dataField="note"
                    width="300px"
                    headerAlign="center"
                  >
                    <span className="descr">
                      Санал хүсэлт&nbsp;&nbsp;&nbsp;
                    </span>
                  </TableHeaderColumn>
                  <TableHeaderColumn
                    dataField="insYmd"
                    width="100px"
                    headerAlign="center"
                    dataAlign="center"
                    dataSort={true}
                    dataFormat={dateFormatter}
                  >
                    <span className="descr">
                      Илгээсэн огноо&nbsp;&nbsp;&nbsp;
                    </span>
                  </TableHeaderColumn>
                </BootstrapTable>
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
const form = reduxForm({ form: "feedbackList" });

function mapStateToProps(state) {
  var total = 0;
  for (var i = 0; i < state.feedback.rows.length; i++) {
    total++;
  }

  if (Object.keys(SearchObj1).length === 0) {
    return {
      rows: state.feedback.rows,
      columns: state.feedback.columns,
      total: total,
      initialValues: {
        endDate: new Date().toISOString().slice(0, 10),
        beginDate: new Date().toISOString().slice(0, 10)
      }
    };
  } else {
    return {
      rows: state.feedback.rows,
      columns: state.feedback.columns,
      total: total,
      initialValues: {
        endDate: SearchObj1.endDate.slice(0, 10),
        beginDate: SearchObj1.beginDate.slice(0, 10),
        userName: SearchObj1.userName,
        regNum: SearchObj1.regNum,
        phoneNum: SearchObj1.phoneNum
      }
    };
  }
}
export default connect(
  mapStateToProps,
  { getFeedback }
)(form(feedbackList));
//orient uphold prize isolate strike hotel office bracket toilet express plastic exhaust
