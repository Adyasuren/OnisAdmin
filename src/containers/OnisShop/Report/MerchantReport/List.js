import React, { Component } from "react";
import { connect } from "react-redux";
import { reduxForm } from "redux-form";
import TableFok from "../../../../components/TableFok";
import moment from 'moment';
import { GetShopReportMerchant, GetAllColumns } from "../../../../actions/OnisShop/ShopReportAction"
import { Field } from "redux-form";
import { MerchantReportTableTitle } from "./TableTitle";
import toastr from "toastr";
import "toastr/build/toastr.min.css";

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
      selected: 1,
      isyear: false,
      startdate: moment().format("yyyy-01-01").toString(),
      enddate: moment().format("yyyy-12-31").toString(),
      sdate: moment().format("yyyy-MM").toString(),
      columns: [],
      data: [],
      title: [],
      isPager: false
    };
  }

  componentDidMount() {
    this.props.GetAllColumns()
    this.onChangeType()
  }

  Mock = () => {
    let {data, columns} = this.props;
    let tmp = []
    let tmp1= []
    columns.map((item, i) => {
      var value = data.find(x => x.servicecode == item.code);
      item.rank = i +1
      tmp.push( {...item, ...value})
    })


    this.setState({  data: tmp })
  }

  handleReload = (e) => {
    e.preventDefault();
    let tmp = {};
    tmp.startymd = this.state.startdate;
    tmp.endymd = this.state.enddate;
    if (this.state.selected === 1)
      tmp.isyear = true;
    else
      tmp.isyear = false;
      let tableData = [];
    searchobj = tmp;
    this.props.GetShopReportMerchant(tmp).then((res) => {
      this.Mock()
    })
  };

  onChangeType = (e) => {
    const {sdate} = this.state;
    let header = [
      {
        data: "name",
        label: "Нэр",
        format: "financeFormat",
        props: {
          width: "70px",
          dataSort: true,
        },
      }
    ]
    let count = e ? e.target.value == 1 ? 12 : moment(sdate, "YYYY-MM").daysInMonth() : 12
    let details = []
    for (let i = 1; i <= count; i++) {
      details.push({
        data: `f${i}`,
        label: `${i} ${e ? e.target.value == 1 ? "сар" : "өдөр" : "сар"}`,
        format: "price",
        props: {
          width: "75px",
          dataSort: true,
        }
      })
    }
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
    // this.state.selected = e.target.value
    this.setState({ title: [...header, ...details,...footer] })
  }


  onChangeYear = (value) => {
    this.state.startdate = value + "-01-01"
    this.state.enddate = value + "-12-31"
    this.state.sdate = value
  }

  onChangeMonth = (value) => {
    this.state.startdate = value + "-01"
    this.state.enddate = value + "-31"
    this.state.sdate = value
  }

  dateType = () => {
    const { selected } = this.state;
    if (selected && selected == 1) {
      return (
        <Field
          name="DatePicker"
          component="select"
          size="20px"
          value= "1"
          onChange={(e) => this.onChangeYear(e.target.value)}
          ref="DatePicker"
          className="form-control dateclss"
        >
          {this.yearLister()}
        </Field>
      );
    } else {
      return (
        <Field
          name="DatePicker"
          component="input"
          onChange={(e) => this.onChangeMonth(e.target.value)}
          value="2"
          type="month"
          ref="DatePicker"
          className="form-control dateclss"
        />
      );
    }
  };

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

  render() {
    const { selected, data, isPager, title } = this.state;
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
                        <label>Огноо сонгох</label>
                        <div className="row">
                          <Field
                            name="searchtype"
                            value={selected}
                            onChange={this.onChangeType}
                            component="select"
                            ref="searchType"
                            className="form-control"
                            style={{ borderRadius: 8 }}
                          >
                            <option value={1}>Жил</option>
                            <option value={2}>Сар</option>
                          </Field>
                          <label style={{ marginLeft: 20 }} />
                          {this.dateType()}
                        </div>
                      </div>
                    </div>
                  </div>
                  <button
                    type="submit"
                    className="btn btn-primary"
                    style={{ float: 'right', borderRadius: 8 }}
                  >
                    <i className={`fa fa-cog`} />
                    Ачаалаx
                  </button>
                </form>
              </div>
              <div className="card-block col-md-12 col-lg-12 col-sm-12 tmpresponsive">
                <TableFok title={title} data={data} isPager={isPager}/>
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
    columns: state.shopReportReducer.columns,
    data: state.shopReportReducer.data
  };
}

export default connect(mapStateToProps, { GetShopReportMerchant, GetAllColumns })(form(Components));
