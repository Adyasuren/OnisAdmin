import React, { Component } from "react";
import { Field, reduxForm } from "redux-form";
import { connect } from "react-redux";
import {
  updateBanners,
  insertBanners,
  bannerList,
} from "../../actions/banner_action";
import {
  BootstrapTable,
  TableHeaderColumn,
} from "react-bootstrap-table";
import "react-bootstrap-table/dist/react-bootstrap-table.min.css";
import PosApiPopUp from "../UserPosApi/posApiPopUp";


var currentdate = new Date();
var SearchObj4 = {};
var selectedrank = "";
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

class Banner extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filter: 1,
      isCheckonis: false,
      isCheckonisplus: false,
      value: true,
      isActive: false,
      Loading: true,
      modalOpen: false,
      rows:[],
    };
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.click = this.click.bind(this);
    // this.changer = this.changer.bind(this);
    this.hiddenclick = this.hiddenclick.bind(this);
    // this.handleClick = this.handleClick.bind(this);
    // this.Refresh = this.Refresh.bind(this);
    this.renderShowsTotal = this.renderShowsTotal.bind(this);
    // this.isonisType = this.isonisType.bind(this);
    this.click = this.click.bind(this);
    document.title = "Баннер - Оньс админ";
  }

  handleSelectedRow = (list) => {
    let temp = this.state.selectedRows.concat(list);
    this.setState({ selectedRows: temp });
    this.toggleModal();
  };

  componentWillMount() {
    this.setState({ Loading: true });
    SearchObj4.beginDate = "2000-01-01";
    SearchObj4.endDate = "2999-12-31";
    // this.props.clearLBane[se();
    // this.props.getBanners(SearchObj4);
    if (Object.keys(SearchObj4).length === 0){
      SearchObj4 = {
        beginDate: currentdate.toLocaleDateString() + "00:00:00",
        endDate: currentdate.toLocaleDateString() + "23:59:59",
      };
      this.props.bannerList(SearchObj4);
    }else {
      // this.props.bannerList(SearchObj4);
    }
    this.setState({Loading: false});
  }

  handleFormSubmit(formProps) {
    this.setState({ Loading: true });
    var bgnDate = formProps.startdate;
    var endDate = formProps.enddate;
    var value = [];
    var data = [];
    var rowsCount = 0;
    var message = [];
    var success = true;
    formProps.startdate += "T00:00:00.000Z";
    formProps.enddate += "T23:59:59.999Z";
    SearchObj4 = formProps;
    this.setState({ Searched: true });
    this.props.insertBanners(formProps);
    formProps.startdate = bgnDate;
    formProps.enddate = endDate;
    this.setState({ Loading: false });
  }

  // cclick() {
  //   this.props.clearBanners();
  // }


  // isonisType(isCheckonis, isCheckonisplus) {
  //   if (isCheckonis === true && isCheckonisplus === false) return 1;
  //   else if (isCheckonisplus === true && isCheckonis === false) return 2;
  //   else return 0;
  // }

  
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
    
  buttonFormatter(rows) {
    return (
      <button
        onClick={() => this.editClick(rows)}
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

  numberofrows(rowIdx) {
    return rowIdx;
  }

  renderShowsTotal(total) {
    return (
      <div>
        <p style={{ color: "#607d8b", width: "500px" }}>
          <a style={{ color: "#607d8b" }} onClick={this.tpmFilter}>
            Бүгд ( {total} ){" "}
          </a>
          |
          <a
            href="#"
            onClick={() => this.setState({ filter: 1 })}
            style={{ color: "#FFC11B" }}
          >
            {" "}
            Идэвхитэй ( {this.props.istrue} ){" "}
          </a>
          |
          <a
            href="#"
            onClick={() => this.setState({ filter: 0 })}
            style={{ color: "red" }}
          >
            {" "}
            Идэвхигүй ( {this.props.isexpired} ){" "}
          </a>{" "}
          
        </p>
      </div>
    );
  }

  toggleModal = () => {
    this.setState({ modalOpen: true });
  };

  handleDoubleClick = rows=> {
    this.editClick(rows);
  };

  render() {
    const { handleSubmit, rows } = this.props;
    // const { rows } = this.props;
    var tmpArray = rows;
    

    function reverseTheString(str) {
      return str.split("").reverse().join("");
    }

    // const options = {
    //   onRowClick: function (row) {
    //     selectedrank = row.rank;
    //   },
    //   page: 1, // which page you want to show as default

    //   hideSizePerPage: true,
    //   sizePerPageDropDown: this.renderSizePerPageDropDown,
    //   // paginationShowsTotal: this.renderShowsTotal ,  Accept bool or function
    //   noDataText: "Өгөгдөл олдсонгүй",
    //   prePage: "Өмнөх", // Previous page button text
    //   nextPage: "Дараах", // Next page button text
    //   firstPage: "Эхнийх", // First page button text
    //   lastPage: "Сүүлийх",
    //   sizePerPage: 10, // which size per page you want to locate as default
    //   pageStartIndex: 1, // where to start counting the pages
    //   paginationPosition: "bottom",
    //   hidePageListOnlyOnePage: true,
    //   defaultSortName: "rank", // default sort column name
    //   defaultSortOrder: "asc", // default sort order
    // };
    
    function columnClassNameFormat(rows) {
      return rows.status <= 0
        ? "td-selected-column-fall"
        : "td-selected-column-success";
    }


    function qualityType(cell) {
      if (cell === null) {
        return null;
      }
      if (cell === 1) {
        return "Идэвхитэй";
      }
      if (cell === 0) {
        return "Идэвхигүй";
      }
    }

    

    return (
      <div
          className="animatedpopup animated fadeIn"
        >  {/* <Loading show={this.state.Loading}/> */}
        <div className="rows">
          <div className="col-lg-12 col-md-12 col-sm-12">
            <div className="card">
              <div className="card-header">
                <form
                  onSubmit={handleSubmit(this.handleFormSubmit)}
                  id="myForm"
                >
                  <div className="rows">
                    <div
                      className="form-group col-sm-1.3"
                      style={{ marginLeft: "20px" }}
                    >
                      <label>Бүртгүүлсэн огноо:</label>
                      <Field
                        ref="beginDate"
                        name="beginDate"
                        component="input"
                        type="date"
                        className="form-control dateclss"
                      />
                    </div>
                    &nbsp;&nbsp;
                    <div className="form-group col-sm-1.3">
                      <label>&nbsp;&nbsp;&nbsp;</label>
                      <Field
                        name="endDate"
                        component="input"
                        type="date"
                        className="form-control dateclss"
                      />
                    </div>
                  </div>
                </form>
              </div>
              <div className="card-block tmpresponsive">
                <BootstrapTable
                  data={tmpArray}
                  hover={true}
                  pagination={true}
                  ref="table"
                  maxHeight={"500px"}
                  width={"500px"}
                  tableHeaderClass="tbl-header-class"
                  tableBodyClass="tbl-body-class"
                  bordered={true}
                  striped
                  condensed
                >
                  <TableHeaderColumn
                    dataField="rank"
                    width="50px"
                    dataAlign="center"
                    headerAlign="center"
                    // dataSort={true}
                    columnClassName={columnClassNameFormat}
                    isKey
                  >
                    <span className="descr">Д.д &nbsp;&nbsp;&nbsp;</span>
                  </TableHeaderColumn>
                  
                  <TableHeaderColumn
                    // ref="bannerdate"
                    dataField="storeName"
                    width="100px"
                    dataAlign="center"
                    headerAlign="center"
                    // dataSort={true}
                    columnClassName={columnClassNameFormat}
                  >
                    <span className="descr">
                      Баннерын нэр &nbsp;&nbsp;&nbsp;
                    </span>
                  </TableHeaderColumn>

                  <TableHeaderColumn
                    // ref="banneramount"
                    dataField="regNum"
                    width="100px"
                    dataAlign="center"
                    headerAlign="center"
                    // dataSort={true}
                    columnClassName={columnClassNameFormat}
                  >
                    <span className="descr">
                    Баннерын байршил &nbsp;&nbsp;&nbsp;
                    </span>
                  </TableHeaderColumn>

                  <TableHeaderColumn
                    dataField="userName"
                    width="100px"
                    dataAlign="center"
                    headerAlign="center"
                    // dataSort={true}
                    columnClassName={columnClassNameFormat}
                  >
                    <span className="descr">
                      Эхлэх огноо &nbsp;&nbsp;&nbsp;
                    </span>
                  </TableHeaderColumn>

                  <TableHeaderColumn
                    dataField="licenseDay"
                    width="100px"
                    dataAlign="center"
                    headerAlign="center"
                    columnClassName={columnClassNameFormat}
                    // dataSort={true}
                  >
                    <span className="descr">
                      Дуусах огноо&nbsp;&nbsp;&nbsp;
                    </span>
                  </TableHeaderColumn>

                  <TableHeaderColumn
                    ref="phoneNum"
                    dataField="phoneNum"
                    width="100px"
                    dataAlign="center"
                    headerAlign="center"
                    // dataSort={true}
                    columnClassName={columnClassNameFormat}
                  >
                    <span className="descr">
                      Бүртгүүлсэн огноо &nbsp;&nbsp;&nbsp;
                    </span>
                  </TableHeaderColumn>

                  <TableHeaderColumn
                    ref="isactive"
                    dataField="isActive"
                    width="100px"
                    dataAlign="center"
                    headerAlign="center"
                    // dataSort={true}
                    columnClassName={columnClassNameFormat}
                    dataFormat={qualityType}
                  >
                    <span className="descr">Төлөв &nbsp;&nbsp;&nbsp;</span>
                  </TableHeaderColumn>
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
            onClick={() => this.hiddenclick()}
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

const form = reduxForm({
  form: "Banner_infoReducer"
});

let istrue = 0;
  let isfalse = 0;
  let isexpired = 0;

function mapStateToProps(state) {
  if(Object.keys(SearchObj4).length === 0){
    return {
      // // rows: state.desktop.rows,
      // istrue: istrue,
      // isfalse: isfalse,
      // isexpired: isexpired,
      initialValues: {
        startDate: new Date().toISOString().slice(0, 10),
        endDate: new Date().toISOString().slice(0, 10),
      }
    };
  } else {
    return {
      // rows: state.desktop.rows,
      // istrue: istrue,
      // isfalse: isfalse,
      // isexpired: isexpired,
      initialValues: {
        endDate: SearchObj4.endDate,
        startDate: SearchObj4.startDate
      }
    };
  }
}

  
export default connect(mapStateToProps, {
  insertBanners,
  updateBanners,
  bannerList
})(form(Banner));
