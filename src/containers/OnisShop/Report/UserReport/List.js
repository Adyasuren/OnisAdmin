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
      columns: UserReportTableTitle,
      data: [],
      isOpen: false,
      footerData: [],
      sumConnection: 0,
      currentMonth: moment(),
      hasconnect: 0,
      startdate: moment().format("yyyy-MM-DD").toString(),
      enddate: moment().format("yyyy-MM-DD").toString(),
      height: false,
    };
  }

  componentDidMount() {
    if (UserReportTableTitle.length === 4) {
      this.props.GetAllColumns().then((columnRes) => {
        if (columnRes.success) {
          columnRes.data.map((item) => {
            let obj = {
              data: item.code,
              label: item.name,
              format: "financeFormatPrice",
              props: {
                width: "75px",
                dataSort: true,
              },
            };
            let footer = [
              {
                data: "sum",
                label: "Нийт",
                format: "price",
                props: {
                  width: "75px",
                  dataSort: true,
                },
              }
            ]
            UserReportTableTitle.push(obj);
            // this.setState({ columns: [...obj,...footer] })
          });
          UserReportTableTitle.push({
            data: "sumRow",
            label: "Нийт",
            format: "price",
            props: {
              width: "75px",
              dataSort: true,
            },
          })
          this.setState({ columns: UserReportTableTitle });
        }
      });
    }
  }

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
          let amountSum = 0;
          dataObj.rank = i + 1;
          dataObj.storeid = item.storeid;
          dataObj.storename = item.storename;
          dataObj.district = item.district;
          dataObj.address = item.address;
          dataObj.regno = item.regno;
          item.services.map((item1) => {
            dataObj[item1.servicecode] = item1.amount;
            amountSum += item1.amount;
            dataObj.sumRow = amountSum;
          });
          tableData.push(dataObj);
        });
        this.setState({ data: tableData });
      }
    });
  };

  handleClick = (ev) => {
    this.setState({ hasconnect: ev.target.checked ? 0 : 1 });
  }

  render() {
    const { isLoading } = this.props;
    const { columns, data, height } = this.state;
    return (
      <div className="animated fadeIn">
        <div className="row">
          <div className="col-lg-12 col-md-12 col-sm-12">
            <div className="card" style={{ borderRadius: 8}}>
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
                            value={this.handleGetValue} />
                        </div>
                      </div>
                    </div>
                    <div className="form-group col-sm-1.3 mr-1-rem">
                      <label>ТТ дугаар</label>
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
                    style={{ float: 'right', borderRadius: 8, marginTop:-80 }}
                  >
                    <i className={`fa fa-cog ${isLoading ? "fa-spin" : ""}`} />
                    Ачаалаx
                  </button>
                </form>
              </div>
              <div className="card-block col-md-12 col-lg-12 col-sm-12 tmpresponsive">
                <TableFok title={columns}
                  data={data}
                  // height = {height}
                  />
                {/* sumValue={sumConnection}
                  sumValueText={"Нийт холболт хийгдсэн: "}  */}
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
    initialValues: Object.keys(searchobj).length === 0 ? {
      regno: searchobj.regno
    } : {
      regno: searchobj.regno
    }
  };
}

export default connect(mapStateToProps, { GetAllColumns, GetShopReportUser })(form(Components));
