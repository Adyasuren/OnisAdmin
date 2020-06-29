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
  SizePerPageDropDown
} from "react-bootstrap-table";
// import "react-bootstrap-table/dist/react-bootstrap-table.min.css";
import BannerPopUp from "./BannerPopUp";
import niceAlert from "sweetalert";
import banner_api from '../../api/banner_api';



const selectRowProp = {
  mode: "radio",
  bgColor: "pink", // you should give a bgcolor, otherwise, you can't regonize which row has been selected
  hideSelectColumn: true, // enable hide selection column.
  clickToSelect: true // you should enable clickToSelect, otherwise, you can't select column.
};

var currentdate=new Date();
var SearchObj4={};
var selectedrank="";
var onChangeSearch={};

// Object.defineProperty(onChangeSearch, "startdate", {
//   value: new Date().toISOString().slice(0, 10),
//   writable: true,
//   enumerable: true,
//   configurable: true,
// });
// Object.defineProperty(onChangeSearch, "enddate", {
//   value: new Date().toISOString().slice(0, 10),
//   writable: true,
//   enumerable: true,
//   configurable: true,
// });

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
      // isLoading: false,
      Loading: true,
      modalOpen: false,
      rows:[],
      selectedrow: {}
    };
    this.click=this.click.bind(this);
    this.Refresh=this.Refresh.bind(this);
    // this.renderShowsTotal=this.renderShowsTotal.bind(this);
    // this.isonisType=this.isonisType.bind(this);
    document.title="Баннер - Оньс админ";
  }

  handleSelectedRow=(list) => {
    let temp=this.state.selectedRows.concat(list);
    this.setState({ selectedRows: temp });
    this.toggleModal();
  };

  componentWillMount() {
    this.setState({ Loading: true });
    let date = new Date();
    if (Object.keys(SearchObj4).length === 0){
      let month = date.getMonth() + 1;
      SearchObj4={
        startdate: date.getFullYear() + "-" + month + "-"  + date.getDate(),
        enddate: date.getFullYear() + "-" + month + "-"  + date.getDate(),
      };
      this.props.bannerList(SearchObj4);
    }
   this.setState({Loading: false});
}


handleFormSubmit = (e) => {
  e.preventDefault();
  this.setState({ Loading: true });

  SearchObj4={
    startdate: SearchObj4.startdate,
    enddate: SearchObj4.enddate,
  };
  
      banner_api.bannerList (SearchObj4).then(Response => {
        console.log(Response);
        if (Response.success === true){
          this.props.bannerList(SearchObj4)
          niceAlert(Response.message);
          this.state({Loading:false});
        } niceAlert(Response.message);
        if(SearchObj4.startdate === null && SearchObj4.enddate === null){
          niceAlert(Response.message);
        } niceAlert(Response.message);
      });
  this.props.bannerList(SearchObj4);
  this.setState({ Loading: false });
}



  // isonisType(isCheckonis, isCheckonisplus) {
  //   if (isCheckonis === true && isCheckonisplus === false) return 1;
  //   else if (isCheckonisplus === true && isCheckonis === false) return 2;
  //   else return 0;
  // }

  
  handleChange(e) {
    switch (e.target.name) {
      case "startdate":
        SearchObj4.startdate = e.target.value;
        break;
      case "enddate":
        SearchObj4.enddate = e.target.value;
        break;
      default:
        break;
    }
    // SearchObj4 = onChangeSearch;
    // this.props.bannerList(SearchObj4);
  }
  
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

  hiddenclick = () => {
    var selectedrow=[];
   if (this.refs.table.state.selectedRowKeys.length > 0) {
      for (var key in this.props.bannerData) {
        if (this.props.bannerData[key].rank === selectedrank) {
          selectedrow=this.props.bannerData[key];
          this.setState({selectedrow: selectedrow}, ()=>{ this.handleEdit()})
        
        }
      }
    } else {
      alert("Засах мөрөө сонгоно уу!");
    } 
  }

  editClick = (row) => {
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

  // renderShowsTotal(start, to, total) {
  //   return (
  //     <div className="row" style={{ marginLeft: "5px" }}>
  //       <p style={{ color: "#607d8b", marginRight: "5px", cursor: "pointer" }}>
  //         {" "}
  //         Бүгд ( {this.props.total} )
  //       </p>
  //       |
  //       <p
  //         style={{
  //           color: "#f8cb00",
  //           marginRight: "5px",
  //           marginLeft: "5px",
  //           cursor: "pointer"
  //         }}
  //         onClick={() => (this.props.rows=[])}
  //       >
  //         {" "}
  //         Идэвхтэй ( {this.props.istrue} ){" "}
  //       </p>
  //       |
  //       <p
  //         style={{
  //           color: "#C0C0C0",
  //           marginRight: "5px",
  //           marginLeft: "5px",
  //           cursor: "pointer"
  //         }}
  //       >
  //         {" "}
  //         Идэвхгүй ( {this.props.isfalse} ){" "}
  //       </p>
  //     </div>
  //   );
  // }

  toggleModal=() => {
    this.setState({ modalOpen: true });
  };

  handleDoubleClick=rows=> {
    this.editClick(rows);
  };

  handleEdit = () => {
    if(this.state.selectedrow != undefined)
    {
      this.props.updateBanners(this.state.selectedrow.id, 0);
      niceAlert("Amjilttai zaslaa");
      this.Refresh();
      
    }banner_api.bannerList (SearchObj4).then(Response => {
      if (Response.success === false){
        console.log(Response)
        // this.props.bannerList(SearchObj4)
        niceAlert(Response.message);
      }
    });
    // this.props.updateBanners(this.state.selectedrow);
  }



  render() {
    // console.log(this.state.Loading);   
    const { handleSubmit, rows, bannerData, rowsdist }=this.props;
    const Loading = this.state;
    var tmpArray=rows;
    tmpArray=tmpArray.filter(item => {
      if (this.isonisType() === 0) return item;
      else if (item.usertype === this.isonisType()) return item;
      else return item;});
    
      // if (this.state.isLoading === true) {
      //   return <MDSpinner className="spinner" size={40} />;
      // }
   

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
      onRowClick: function(row) {
        selectedrank = row.rank;
      },
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


    // renderSizePerPageDropDown = props => {
    //   return (
    //     <SizePerPageDropDown
    //       className="my-size-per-page"
    //       btnContextual="btn-warning"
    //       variation="dropdown"
    //       {...props}
    //       onClick={() => this.onToggleDropDown(props.toggleDropDown)}
    //     />
    //   );
    // };

    
    function qualityType(cell) {
      if (cell === 0) {
        return null;
      }
      if (cell === 1) {
        return "Идэвхитэй";
      }
      if (cell === 2) {
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
                  onSubmit={this.handleFormSubmit}
                  id="myForm"
                >
                  <div className="row">
                    <div
                      className="form-group col-sm-1.3"
                      style={{ marginLeft: "20px" }}
                    >
                      <label>Бүртгүүлсэн огноо</label>
                      <Field
                        name="startdate"
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
                      <label>&nbsp;&nbsp;&nbsp;</label>
                      <Field
                        name="enddate"
                        component="input"
                        type="date"
                        className="form-control dateclss"
                        onChange={this.handleChange.bind(this)}
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
                  tableHeaderClass="tbl-header-class sticky-header"
                  tableBodyClass="tbl-body-class"
                  options={options}
                  maxHeight={"300px"}
                  bordered={true}
                  ref="table"
                  selectRow={selectRowProp}
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
          <button type="submit" className="btn btn-primary" form="myForm" >
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
            onClick={this.hiddenclick}
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
          // selectedrow={this.state.selectedrow}
          closeModal={() => this.setState({ modalOpen: false })}
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
        startdate: new Date().toISOString().slice(0, 10),
        enddate: new Date().toISOString().slice(0, 10),
      }
    };
  } else {
    tmp={
      rows: state.desktop.rows,
      istrue: istrue,
      isfalse: isfalse,
      isexpired: isexpired,
      initialValues: {
        enddate: SearchObj4.enddate,
        startdate: SearchObj4.startdate,
    }
  }
}
if(state.bannerList.data != undefined)
{
  state.bannerList.data.map((item, i) => {
    item.rank = i + 1;
  })
}

tmp.bannerData=state.bannerList.data;
return tmp;
}
export default connect(mapStateToProps, {
  insertBanners,
  updateBanners,
  bannerList
})(form(Banner));

