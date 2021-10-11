import React, { Component } from "react";
import { connect } from "react-redux";
import { Field, reduxForm } from "redux-form";
import TableFok from "../../../../components/TableFok";
import moment from 'moment';
import { UserReportTableTitle } from "./TableTitle";
import { GetShopReportUser, GetAllColumns } from "../../../../actions/OnisShop/ShopReportAction"
import toastr from "toastr";
import "toastr/build/toastr.min.css";
import Calendar from "../../../../components/Calendar";

toastr.options = {
  positionClass: "toast-top-center",
  hideDuration: 1000,
  timeOut: 4000,
  closeButton: true,
};

let searchobj = {}

class Components extends Component {
  constructor(props) {
    super(props);
    this.state = {
      columns: [],
      data: [],
      isOpen: false,
      footerData: [],
      sumConnection: 0,
      currentMonth: moment(),
      hasconnect: 0,
      startdate: moment().format("yyyy-MM-DD").toString(),
      enddate:moment().format("yyyy-MM-DD").toString()
    };
  }

  componentDidMount() {
    console.log(UserReportTableTitle.length)
    if (UserReportTableTitle.length === 6) {
      this.props.GetAllColumns().then((columnRes) => {
        if (columnRes.success) {
          columnRes.data.map((item) => {
            let obj = {
              data: item.code,
              label: item.name,

              format: "merchantType",
              props: {
                width: "70px",
                dataSort: true,
              },
            };

            UserReportTableTitle.push(obj);
          });
          this.setState({ columns: UserReportTableTitle });
        }
      });
    } else {
      this.setState({ columns: UserReportTableTitle });
    }
  }

  headerClick = (row, columnIndex, rowIndex) => {
    const { columns } = this.state;
    if (!isNaN(columns[columnIndex].data)) {
      this.props
        .GetHistory(row.storeid, columns[columnIndex].data)
        .then((res) => {
          if (res.success) {
            if (res.data.length > 0) {
              this.setState({ history: res.data }, () => {
                this.openModal();
              });
            }
          }
        });
    }
  };

  closeModal = (value) => {
    if (value === true) {
      this.handleReload();
    }
    this.setState({ isOpen: false });
  };

  handleReload = (e) => {
    e.preventDefault();
    let tmp = {};
    tmp.startymd = this.refs.calendar.state.sdate;
    tmp.endymd = this.refs.calendar.state.edate;
    tmp.regno = this.refs.regno.value ? this.refs.regno.value : "";
    tmp.hasconnect = this.state.hasconnect;
    let tableData = [];
    searchobj = tmp;
    this.props.GetShopReportUser(tmp).then((res) => {
      if (res.success) {
        res.data.map((item, i) => {
          let dataObj = {};
          dataObj.rank = i + 1;
          dataObj.storeid = item.storeid;
          dataObj.storename = item.storename;
          dataObj.regno = item.regno;
          console.log(dataObj);
          item.services.map((item1) => {
            dataObj[item1.servicecode] = item1.status;
          });
          tableData.push(dataObj);
        });
        let tmp = [
          [
            {
              label: "Нийт",
              columnIndex: 1,
            },
          ],
        ];
        let sumConnection = 0;
        if (this.props.columns) {
          let index = 4;
          this.props.columns.map((item) => {
            let sum = 0;
            tableData.map((item1, i) => {
              if (item1[item.code] !== undefined && item1[item.code] !== NaN) {
                if (item1[item.code] == 1) sum++;
              }
            });
            tmp[0].push({
              label: "0",
              columnIndex: index,
              align: "center",
              formatter: () => {
                return (
                  <strong>
                    {sum === 0
                      ? "-"
                      : sum.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                  </strong>
                );
              },
            });
            sumConnection += sum;
            index++;
          });
        }
        this.setState({ data: tableData, footerData: tmp, sumConnection });
      }
    });
  };

  handleClick = (ev) =>  {
    this.setState({ hasconnect: ev.target.checked ? 0 : 1 });
  }

  render() {
    const { isLoading } = this.props;
    const {columns, data, footerData, sumConnection} = this.state;
    return (
      <div className="animated fadeIn">
        <div className="row">
          <div className="col-lg-12 col-md-12 col-sm-12">
            <div className="card" style={{ borderRadius: 8 }}>
              <div className="card-header" style={{ borderRadius: 8 }}>
                <form id="myForm" onSubmit={this.handleReload}>
                  <div className="row" name="formProps">
                    <div className="form-group col-sm-4 mr-1-rem">
                      <div className="dropdown">
                        <span>
                          Огноо сонгох
                        </span>
                        <div className="display-flex" style={{ marginTop: 10 }}>
                          <Calendar
                            ref="calendar"
                            closeModal={this.closeModal}
                            value={this.handleGetValue}/>
                        </div>
                      </div>
                    </div>
                    <div className="form-group col-sm-1.3 mr-1-rem">
                      <label>Регистрийн дугаар</label>
                      <Field
                        name="regno"
                        ref="regno"
                        component="input"
                        type="text"
                        className="form-control"
                        style={{ borderRadius: 8 }}
                      />
                    </div>
                    <div className="form-group col-sm-1.3 mr-1-rem">
                      <div className="display-flex">
                        &nbsp; &nbsp;
                        <Field
                          name="hasconnect"
                          ref="hasconnect"
                          component="input"
                          type="checkbox"
                          style={{ marginTop: 33 }}
                          onChange={ev => this.handleClick(ev)}
                        />
                        &nbsp; &nbsp;
                        <label style={{ marginTop: 33 }}>Огт холболтгүй хэрэглэгч &nbsp; &nbsp; </label>
                        &nbsp; &nbsp; &nbsp; &nbsp;
                      </div>
                    </div>
                  </div>
                  <button
                    type="submit"
                    className="btn btn-primary"
                    style={{ float: 'right', borderRadius: 8 }}
                  >
                    <i className={`fa fa-cog ${isLoading ? "fa-spin" : ""}`} />
                    Ачаалаx
                  </button>
                </form>
              </div>
              <div className="card-block col-md-12 col-lg-12 col-sm-12 tmpresponsive">
                <TableFok title={columns}
                  data={data}
                  sumValue={sumConnection}
                  sumValueText={"Нийт холболт хийгдсэн: "}
                  footerData={footerData}
                  rowClick={this.headerClick} />
              </div>
            </div>
          </div>
        </div >
        <div>
        </div>
      </div >
    );
  }
}

const form = reduxForm({ form: "shopUserReport" });

function mapStateToProps(state) {
  return {
    data: state.shopReportReducer.data,
    isLoading: state.shopReportReducer.isLoading,
    columns: state.shopReportReducer.columns,
  };
}

export default connect(mapStateToProps, { GetAllColumns, GetShopReportUser })(form(Components));
