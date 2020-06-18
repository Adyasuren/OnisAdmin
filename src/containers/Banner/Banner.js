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
  // SizePerPageDropDown,
} from "react-bootstrap-table";
// import "react-bootstrap-table/dist/react-bootstrap-table.min.css";
import BannerPopUp from "./BannerPopUp";


var currentdate=new Date();
var SearchObj4={};
var selectedrank="";
var onChangeSearch={};

Object.defineProperty(onChangeSearch, "startDate", {
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

class Banner extends Component {
  constructor(props) {
    super(props);
    this.state={
      filter: 1,
      isCheckonis: false,
      isCheckonisplus: false,
      value: true,
      isActive: false,
      Searched: 10,
      Loading: true,
      modalOpen: false,
      rows:[],
    };
    this.handleFormSubmit=this.handleFormSubmit.bind(this);
    this.click=this.click.bind(this);
    // this.changer=this.changer.bind(this);
    this.hiddenclick=this.hiddenclick.bind(this);
    // this.handleClick=this.handleClick.bind(this);
    this.Refresh=this.Refresh.bind(this);
    this.renderShowsTotal=this.renderShowsTotal.bind(this);
    // this.isonisType=this.isonisType.bind(this);
    this.click=this.click.bind(this);
    this.renderShowsTotal=this.renderShowsTotal.bind(this);
    document.title="Баннер - Оньс админ";
  }

  handleSelectedRow=(list) => {
    let temp=this.state.selectedRows.concat(list);
    this.setState({ selectedRows: temp });
    this.toggleModal();
  };

  componentWillMount() {
      this.setState({ Loading: true });
      // SearchObj4.beginDate="2000-06-16T02:54:34.987Z";
      // SearchObj4.endDate="2999-12-31";
    // this.props.clearLBane[se();
    // this.props.getBanners(SearchObj4);
     if (Object.keys(SearchObj4).length === 0){
       SearchObj4={
         startDate: "2000-06-16T02:54:34.987Z",
         endDate: "2020-06-17T02:54:34.987Z",
       };
       this.props.bannerList(SearchObj4);
     }else {
      // this.props.bannerList(SearchObj4);
     }
     this.setState({Loading: false});
  }

  handleFormSubmit(formProps) {
    this.setState({ Loading: true });
    SearchObj4={
      startDate: "2000-06-16T02:54:34.987Z",
      endDate: currentdate,
    };
    this.props.bannerList(SearchObj4);
    this.setState({ Loading: false });
  }



  // isonisType(isCheckonis, isCheckonisplus) {
  //   if (isCheckonis === true && isCheckonisplus === false) return 1;
  //   else if (isCheckonisplus === true && isCheckonis === false) return 2;
  //   else return 0;
  // }

  
  click() {
    print();
  }
  // cclick(){
  //   this.props.handleSubmit();
  // }

  Refresh() {
    window.location.reload();
  }

  keyDown=event => {
    if (event.key === "F4") {
    }
  };

  hiddenclick() {
    var selectedrow=[];
    if (this.refs.table.state.selectedRowKeys.length > 0) {
      for (var key in this.props.rows) {
        if (this.props.rows[key].rank === selectedrank) {
          selectedrow=this.props.rows[key];
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

  createCustomClearButton=onClick => {
    return (
      <button className="btn btn-warning" onClick={onClick}>
        Clean
      </button>
    );
  };

  numberofrows(rowIdx) {
    return rowIdx;
  }

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
          onClick={() => (this.props.rows=[])}
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

  toggleModal=() => {
    this.setState({ modalOpen: true });
  };

  handleDoubleClick=rows=> {
    this.editClick(rows);
  };

  render() {
    const { handleSubmit, rows, bannerData, rowsdist }=this.props;

    var tmpArray=rows;
    tmpArray=tmpArray.filter(item => {
      if (this.isonisType() === 0) return item;
      else if (item.usertype === this.isonisType()) return item;
      else return item;
    });
   
    console.log(bannerData)

    // function reverseTheString(str) {
    //   return str.split("").reverse().join("");
    // }

    // function dateFormatter(cell, row) {
    //   if (cell === null) {
    //     return null;
    //   }
    //   return cell.substring(0, 10) + "\n" + cell.substring(11, 19);
    // }

    // function enumFormatter(cell, row, enumObject) {
    //   return enumObject[cell];
    // }

    // const options={
    //   onRowClick: function (row) {
    //     selectedrank=row.rank;
    //   },
    //   page: 1, // which page you want to show as default
    //   sizePerPageDropDown: this.renderSizePerPageDropDown,
    //   sizePerPageList: [
    //     {
    //       text: "10",
    //       value: 10
    //     },
    //     {
    //       text: "20",
    //       value: 20
    //     },
    //     {
    //       text: "30",
    //       value: 30
    //     },
    //     {
    //       text: "40",
    //       value: 40
    //     },
    //     {
    //       text: "Бүгд",
    //       value: rows.length
    //     }
    //   ],
    //   hideSizePerPage: true,
    //   // sizePerPageDropDown: this.renderSizePerPageDropDown,
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

                    
                  </div>

                </form>
              </div>

    
    
              <div className="card-block tmpresponsive">
                <BootstrapTable
                  data={bannerData}
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
                    isKey
                  >
                    <span className="descr">Д.д &nbsp;&nbsp;&nbsp;</span>
                  </TableHeaderColumn>
                  
                  <TableHeaderColumn
                    // ref="bannerdate"
                    dataField="bannernm"
                    width="100px"
                    dataAlign="center"
                    headerAlign="center"
                    // dataSort={true}
                  >
                    <span className="descr">
                      Баннерын нэр &nbsp;&nbsp;&nbsp;
                    </span>
                  </TableHeaderColumn>

                  <TableHeaderColumn
                    // ref="banneramount"
                    dataField="imgnm"
                    width="100px"
                    dataAlign="center"
                    headerAlign="center"
                    // dataSort={true}
                  >
                    <span className="descr">
                    Баннерын байршил &nbsp;&nbsp;&nbsp;
                    </span>
                  </TableHeaderColumn>

                  <TableHeaderColumn
                    dataField="startymd"
                    width="100px"
                    dataAlign="center"
                    headerAlign="center"
                    // dataSort={true}
                  >
                    <span className="descr">
                      Эхлэх огноо &nbsp;&nbsp;&nbsp;
                    </span>
                  </TableHeaderColumn>

                  <TableHeaderColumn
                    dataField="endymd"
                    width="100px"
                    dataAlign="center"
                    headerAlign="center"
                    // dataSort={true}
                  >
                    <span className="descr">
                      Дуусах огноо&nbsp;&nbsp;&nbsp;
                    </span>
                  </TableHeaderColumn>

                  <TableHeaderColumn
                    ref="insymd"
                    dataField="insymd"
                    width="100px"
                    dataAlign="center"
                    headerAlign="center"
                    // dataSort={true}
                  >
                    <span className="descr">
                      Бүртгүүлсэн огноо &nbsp;&nbsp;&nbsp;
                    </span>
                  </TableHeaderColumn>

                  <TableHeaderColumn
                    ref="isenale"
                    dataField="isenable"
                    width="100px"
                    dataAlign="center"
                    headerAlign="center"
                    // dataSort={true}
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
            form="Form"
            id="Form"
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
        <BannerPopUp
          modalOpen={this.state.modalOpen}
          closeModal={() => this.setState({ modalOpen: false })}
          // handleSelectedRow={this.handleSelectedRow}
        />
      </div>
    );
  }
}

const form=reduxForm({
  form: "Banner_reducer"
});

let istrue=0;
  let isfalse=0;
  let isexpired=0;

function mapStateToProps(state) {
  let tmp={};
  if(Object.keys(SearchObj4).length === 0){
    tmp={
      rows: state.desktop.rows,
      istrue: istrue,
      isfalse: isfalse,
      isexpired: isexpired,
      initialValues: {
        startDate: new Date().toISOString().slice(0, 10),
        endDate: new Date().toISOString().slice(0, 10),
      }
    };
  } else {
    tmp={
      rows: state.desktop.rows,
      istrue: istrue,
      isfalse: isfalse,
      isexpired: isexpired,
      initialValues: {
        endDate: SearchObj4.endDate,
        startDate: SearchObj4.startDate,
    }
  }
}
tmp.bannerData=state.bannerList.data;
return tmp;
}
export default connect(mapStateToProps, {
  insertBanners,
  updateBanners,
  bannerList
})(form(Banner));
