import React, { Component } from "react";
import { connect } from "react-redux";
import { Field, reduxForm } from "redux-form";
import TableFok from "../../../../components/TableFok";
import { DillerChargeListTableTitle } from "./TableTitle"
import toastr from 'toastr'
import 'toastr/build/toastr.min.css'
import { GetAllDillerPaymentList } from "../../../../actions/OnisShop/MobicomAction";
import MobicomApi from "../../../../api/OnisShop/MobicomApi";


toastr.options = {
  positionClass: 'toast-top-center',
  hideDuration: 1000,
  timeOut: 4000,
  closeButton: true
}

let searchobj = {}

class Components extends Component {
  constructor(props) {
    super(props);
    this.state = {
      balance: 0
    };
  }

  componentDidMount() {
    MobicomApi.GetMobicomBalance().then((res) => {
      if (res.success) {
        this.setState({ balance: res.data })
      }
    })
  }

  generateFooterItems = (index, label) => {
    let tmp = {
      label: "0",
      columnIndex: index,
      align: "center",
      formatter: data => {
        let sum = 0;
        data.map((item, i) => {
          if (item[label] !== undefined && item[label] !== NaN) {
            sum += item[label];
          }
        });
        return (
          <strong>
            {sum === 0 ? "-" : sum.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
          </strong>
        );
      }
    }
    return tmp;
  }

  handleReload = (e) => {
    e.preventDefault();
    let tmp = {
      startymd: this.refs.startDate.value,
      endymd: this.refs.endDate.value,
      dealerregno: this.refs.dillerRegno.value == undefined ? "" : this.refs.dillerRegno.value,
      regno: this.refs.storeRegno.value == undefined ? "" : this.refs.storeRegno.value,
    }
    searchobj = tmp;
    this.props.GetAllDillerPaymentList(tmp);
  }

  render() {
    const { data, isLoading, paymentSum } = this.props;
    const { balance } = this.state;
    const footerData = [
      [
        {
          label: "Нийт",
          columnIndex: 1
        },
        this.generateFooterItems(6, "amount"),
      ]
    ];
    return (
      <div className="animated fadeIn">
        <div className="row">
          <div className="col-lg-12 col-md-12 col-sm-12">
            <div className="card">
              <div className="card-header">
                <form id="myForm" onSubmit={this.handleReload}>
                  <div className="row" name="formProps">
                    <div className="form-group col-sm-1.3 mr-1-rem">
                      <label>Цэнэглэлт хийсэн огноо</label>
                      <div className="display-flex">
                        <Field
                          ref="startDate"
                          name="startDate"
                          component="input"
                          type="date"
                          className="form-control dateclss"
                        />
                        <Field
                          ref="endDate"
                          name="endDate"
                          component="input"
                          type="date"
                          className="form-control dateclss mr-l-05-rem"
                        />
                      </div>
                    </div>
                    <div className="form-group col-sm-1.3 mr-1-rem">
                      <label>
                        Диллерийн РД
                      </label>
                      <Field
                        ref="dillerRegno"
                        name="dillerRegno"
                        component="input"
                        type="text"
                        className="form-control"
                      />
                    </div>
                    <div className="form-group col-sm-1.3 mr-1-rem">
                      <label>
                        Дэлгүүрийн РД
                      </label>
                      <Field
                        ref="storeRegno"
                        name="storeRegno"
                        component="input"
                        type="text"
                        className="form-control"
                      />
                    </div>
                    <div className="form-group col-sm-1.3 mr-1-rem">
                      <label>
                        Датакейрын үлдэгдэл
                      </label>
                      <input
                        disabled
                        type="text"
                        value={new Intl.NumberFormat('mn-MN').format(balance)}
                        className="form-control"
                      />
                    </div>
                  </div>
                  <button type="submit" className="btn btn-primary" style={{ float: 'right' }} >
                    <i className={`fa fa-cog ${isLoading ? 'fa-spin' : ''}`} />
                    Ачаалах
                  </button>
                </form>
              </div>
              <div className="card-block col-md-12 col-lg-12 col-sm-12 tmpresponsive">
                <TableFok title={DillerChargeListTableTitle} data={data} sumValue={paymentSum} footerData={footerData} />
              </div>
            </div>
          </div>
        </div>
        {/* <div>
          <button type="button" className="btn btn-primary" onClick={this.handleReload}>
            <i className={`fa fa-cog ${isLoading ? 'fa-spin' : ''}`} />
            Ачаалах
          </button>
        </div> */}
      </div>
    );
  }
}

const form = reduxForm({ form: "mobiDillerChargeList" });

function mapStateToProps(state) {
  return {
    data: state.shopMobicom.paymentList,
    isLoading: state.shopMobicom.isLoading,
    paymentSum: state.shopMobicom.paymentSum,
    initialValues: Object.keys(searchobj).length === 0 ?  {
      startDate: new Date().toISOString().slice(0, 10),
      endDate: new Date().toISOString().slice(0, 10),
    }: {
      startDate: new Date(searchobj.startymd).toISOString().slice(0, 10),
      endDate: new Date(searchobj.endymd).toISOString().slice(0, 10)
    }
  };
}

export default connect(mapStateToProps, { GetAllDillerPaymentList })(form(Components));
