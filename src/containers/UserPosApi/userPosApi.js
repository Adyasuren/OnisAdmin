import React, { Component } from "react";
import { Field, reduxForm } from "redux-form";
import { connect } from "react-redux";
import {
  BootstrapTable,
  TableHeaderColumn,
  SizePerPageDropDown,
} from "react-bootstrap-table";
import "react-bootstrap-table/dist/react-bootstrap-table.min.css";
import { posApiList } from "../../actions/userPos_action";
import PosApiPopUp from "./posApiPopUp";
//import Loading from '../../components/Loading';
/* import InlineCss from "react-inline-css"; */
var SearchObj10 = {};
var onChangeSearch = {};
Object.defineProperty(onChangeSearch, "startdate", {
  value: new Date().toISOString(),
  writable: true,
  enumerable: true,
  configurable: true,
});
Object.defineProperty(onChangeSearch, "enddate", {
  value: new Date().toISOString().slice(0, 10) + " 23:59:59",
  writable: true,
  enumerable: true,
  configurable: true,
});
var selectedrank = "";

class userPosApi extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: true,
      isActive: false,
      Searched: 10,
      Loading: true,
      modalOpen: false,
    };

    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.click = this.click.bind(this);
    this.changer = this.changer.bind(this);
    this.hiddenclick = this.hiddenclick.bind(this);
    this.Refresh = this.Refresh.bind(this);
    this.renderShowsTotal = this.renderShowsTotal.bind(this);
    console.log("Хэрэглэгчийн пос api");
  }

  handleSelectedRow = (list) => {
    let temp = this.state.selectedRows.concat(list);
    this.setState({ selectedRows: temp });

    this.toggleModal();
  };
  componentWillMount() {
    this.setState({ Loading: true });
    this.props.posApiList(SearchObj10);
    if (Object.keys(SearchObj10).length === 0) {
      SearchObj10 = {
        regno: "",
        phoneno: 0,
        startdate: "2000-06-16T02:54:34.987Z",
        enddate: "2020-06-16T02:54:34.987Z",
      };
      this.props.posApiList(SearchObj10);
    } else {
      this.props.posApiList(SearchObj10);
    }
    this.setState({ Loading: false });
    // console.log(SearchObj10);
  }

  handleFormSubmit(formProps) {
    this.setState({ Loading: true });
    var bgnDate = formProps.startdate;
    var endDate = formProps.enddate;
    var regno = formProps.regno;
    var phoneno = formProps.phoneno;
    formProps.startdate += "T00:00:00.000Z";
    formProps.enddate += "T23:59:59.999Z";
    formProps.regno = regno;
    formProps.phoneno = phoneno;
    //SearchObj10 = formProps;
    formProps.startdate = bgnDate;
    formProps.enddate = endDate;
    this.props.posApiList(SearchObj10);

    this.setState({ Loading: false });
  }

  handlerClickCleanFiltered() {
    this.refs.username.cleanFiltered();
    this.refs.payddate.cleanFiltered();
    this.refs.paydamount.cleanFiltered();
    this.refs.isactive.cleanFiltered();
    this.refs.typeid.cleanFiltered();
  }

  editClick(row) {
    this.setState({ Loading: true });
    this.props.editPayment(row);
    this.setState({ Loading: false });
  }

  handleChange(e) {
    switch (e.target.name) {
      case "startdate":
        Object.defineProperty(onChangeSearch, "startdate", {
          value: e.target.value + " 00:00:00",
          writable: true,
          enumerable: true,
          configurable: true,
        });
        break;
      case "enddate":
        Object.defineProperty(onChangeSearch, "enddate", {
          value: e.target.value + " 23:59:59",
          writable: true,
          enumerable: true,
          configurable: true,
        });
        break;

      case "userName":
        Object.defineProperty(onChangeSearch, "userName", {
          value: e.target.value,
          writable: true,
          enumerable: true,
          configurable: true,
        });
        break;
      case "regNum":
        Object.defineProperty(onChangeSearch, "regNum", {
          value: e.target.value,
          writable: true,
          enumerable: true,
          configurable: true,
        });
        break;
      case "phoneNum":
        Object.defineProperty(onChangeSearch, "phoneNum", {
          value: e.target.value,
          writable: true,
          enumerable: true,
          configurable: true,
        });
        break;
      default:
        break;
    }
    SearchObj10 = onChangeSearch;
  }

  click() {
    print();
  }

  Refresh() {
    window.location.reload();
  }

  keyDown = (event) => {
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

  numberofrows(rowIdx) {
    return rowIdx;
  }

  renderShowsTotal(total) {
    return (
      <div>
        <a
          style={{
            color: "#607d8b",
            width: "400px",
          }}
        >
          Бүгд ( {total}) |
          <span
            style={{
              color: "#f8cb00",
            }}
          >
            Амжилттай ( {this.props.istrue})
          </span>
          | Амжилтгүй ( {this.props.isfalse})
        </a>
      </div>
    );
  }

  onToggleDropDown = (toggleDropDown) => {
    toggleDropDown();
  };

  renderSizePerPageDropDown = (props) => {
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

  toggleModal = () => {
    this.setState({ modalOpen: true });
  };

  render() {
    const { handleSubmit } = this.props;
    const { rows } = this.props;
    var tmpArray = rows;
    function indexN(cell, row, enumObject, index) {
      return <div>{index + 1}</div>;
    }

    const selectRowProp = {
      mode: "radio",
      bgColor: "pink", // you should give a bgcolor, otherwise, you can't regonize which row has been selected
      hideSelectColumn: true, // enable hide selection column.
      clickToSelect: true, // you should enable clickToSelect, otherwise, you can't select column.
    };
    const options = {
      onRowClick: function (row) {
        selectedrank = row.rank;
      },
      page: 1, // which page you want to show as default

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
      defaultSortOrder: "asc", // default sort order
    };

    function columnClassNameFormat(row) {
      return row.issuccess === 1
        ? "td-selected-column-success"
        : "td-selected-column-fall";
    }

    function qualityType(cell) {
      if (cell === null) {
        return null;
      }
      if (cell === 1) {
        return "Идэвхтэй";
      }
      if (cell === 0) {
        return "Идэвхгүй";
      }
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
                      <label>Бүртгүүлсэн огноо</label>
                      <Field
                        ref="startdate"
                        name="startdate"
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
                        <br />
                      </label>
                      <br />
                      <Field
                        ref="startdate"
                        name="enddate"
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
                    {/*<div className="form-group col-sm-1.3">
        <label>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</label>
        <button type="submit" className="form-control button-save btn">Шүүх</button>
      </div>*/}
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
                  maxHeight={"300px"}
                  width={"100%"}
                  bordered={true}
                  selectRow={selectRowProp}
                  striped={true}
                  hover={true}
                  pagination={true}
                  condensed={true}
                >
                  <TableHeaderColumn
                    width="70px"
                    dataField="rank"
                    dataAlign="center"
                    headerAlign="center"
                    dataSort={true}
                    isKey={true}
                    dataFormat={indexN}
                  >
                    <span className="descr">
                      &nbsp;&nbsp; Д.д&nbsp;&nbsp;&nbsp;
                    </span>
                  </TableHeaderColumn>

                  <TableHeaderColumn
                    width="90px"
                    dataField="regno"
                    headerAlign="center"
                    dataAlign="center"
                  >
                    <span className="descr">
                      Татвар төлөгчийн дугаар&nbsp;&nbsp;&nbsp;
                    </span>
                  </TableHeaderColumn>

                  <TableHeaderColumn
                    width="70px"
                    dataField="storenm"
                    dataAlign="center"
                    headerAlign="center"
                  >
                    <span className="descr">
                      &nbsp;&nbsp; Татвар төлөгчийн нэр&nbsp;&nbsp;&nbsp;
                    </span>
                  </TableHeaderColumn>

                  <TableHeaderColumn
                    width="130px"
                    ref="phoneno"
                    dataField="phoneno"
                    dataAlign="center"
                    headerAlign="center"
                  >
                    <span className="descr">Утас&nbsp;&nbsp;</span>
                  </TableHeaderColumn>

                  <TableHeaderColumn
                    width="80px"
                    ref="distnm"
                    dataField="distnm"
                    dataAlign="center"
                    headerAlign="center"
                    columnClassName={columnClassNameFormat}
                  >
                    <span className="descr">
                      Дүүрэг /Аймаг/&nbsp;&nbsp;&nbsp;
                    </span>
                  </TableHeaderColumn>

                  <TableHeaderColumn
                    width="80px"
                    ref="url"
                    dataField="url"
                    dataAlign="center"
                    headerAlign="center"
                    columnClassName={columnClassNameFormat}
                  >
                    <span className="descr">PosApi&nbsp;&nbsp;&nbsp;</span>
                  </TableHeaderColumn>

                  <TableHeaderColumn
                    width="80px"
                    ref="posinsymd"
                    dataField="posinsymd"
                    headerAlign="center"
                    dataAlign="center"
                  >
                    <span className="descr">POSAPI бүртгэсэн огноо</span>
                  </TableHeaderColumn>

                  <TableHeaderColumn
                    width="90px"
                    ref="insymd"
                    dataField="insymd"
                    headerAlign="center"
                    dataAlign="center"
                  >
                    <span className="descr">Бүртгүүлсэн огноо</span>
                  </TableHeaderColumn>

                  <TableHeaderColumn
                    width="90px"
                    ref="insby"
                    dataField="insby"
                    headerAlign="center"
                    dataAlign="center"
                  >
                    <span className="descr">Бүртгэсэн хэрэглэгч</span>
                  </TableHeaderColumn>

                  <TableHeaderColumn
                    width="80px"
                    ref="isenable"
                    dataField="isenable"
                    headerAlign="center"
                    dataAlign="center"
                    // tdStyle={{
                    //   borderRight: "1px solid #cfd8dc",
                    // }}
                    // thStyle={{
                    //   borderRight: "1px solid #cfd8dc",
                    // }}
                    columnClassName={columnClassNameFormat}
                    dataFormat={qualityType}
                  >
                    <span className="descr">Төлөв</span>
                  </TableHeaderColumn>
                </BootstrapTable>
              </div>
            </div>
          </div>
        </div>
        <div className="card-block">
          <button type="submit" className="btn btn-primary" form="myForm">
            Ачаалах
          </button>
          &nbsp;&nbsp;
          <button
            type="button"
            className="btn btn-success"
            onClick={this.toggleModal}
          >
            Шинэ&nbsp;&nbsp;&nbsp;
          </button>
          &nbsp;&nbsp;
          <button
            type="button"
            className="btn"
            style={{
              backgroundColor: "#f7a115",
              color: "white",
            }}
            onClick={this.toggleModal}
          >
            Засах&nbsp;&nbsp;
          </button>
          &nbsp;&nbsp;
          <button
            type="button"
            className="btn"
            style={{
              backgroundColor: "#b0bec5",
              color: "white",
            }}
            onClick={() => this.click()}
          >
            Хэвлэх&nbsp;
          </button>
        </div>
        <PosApiPopUp
          modalOpen={this.state.modalOpen}
          closeModal={() => this.setState({ modalOpen: false })}
          // handleSelectedRow={this.handleSelectedRow}
        />
      </div>
    );
  }
}

const form = reduxForm({ form: "UserPosApi" });

function mapStateToProps(state) {
  if (Object.keys(SearchObj10).length === 0) {
    return {
      rows: state.shop.rows,
      columns: state.shop.columns,
      initialValues: {
        enddate: SearchObj10.enddate,
        startdate: SearchObj10.startdate,
      },
    };
  } else {
    return {
      rows: state.shop.rows,
      columns: state.shop.columns,
      initialValues: {
        enddate: SearchObj10.enddate,
        startdate: SearchObj10.startdate,
        userName: SearchObj10.userName,
        regNum: SearchObj10.regNum,
        phoneNum: SearchObj10.phoneNum,
      },
    };
  }
}
export default connect(mapStateToProps, {
  posApiList,
})(form(userPosApi));
//orient uphold prize isolate strike hotel office bracket toilet express plastic exhaust
