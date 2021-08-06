import React, { Component } from "react";
import { connect } from "react-redux";
import { Field, reduxForm } from "redux-form";
import TableFok from "../../components/TableFok";
import toastr from "toastr";
import "toastr/build/toastr.min.css";
import { SmsReportTableTitle } from "./SmsTableTitle";
import { GetSmsReport } from "../../actions/license_action";

let searchobj = {};

toastr.options = {
  positionClass: "toast-top-center",
  hideDuration: 1000,
  timeOut: 4000,
  closeButton: true,
};

class SmsReport extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sum: 0,
    };
  }

  handleReload = (e) => {
    e.preventDefault();
    let body = {
      regno: this.refs.regno.value == undefined ? "" : this.refs.regno.value,
      name: this.refs.name.value == undefined ? "" : this.refs.name.value,
      username:
        this.refs.username.value == undefined ? "" : this.refs.username.value,
      phoneno:
        this.refs.phoneno.value == undefined ? "" : this.refs.phoneno.value,
      sdate: this.refs.startdate.value,
      edate: this.refs.enddate.value,
    };

    this.props.GetSmsReport(body).then((res) => {
      if (res.success) {
        let sum = 0;
        res.value.map((item) => {
          sum = sum + item.amount;
        });
        this.setState({ sum });
      }
    });
  };

  render() {
    const { smsReport } = this.props;
    const { sum } = this.state;
    return (
      <div className="animated fadeIn">
        <div className="row">
          <div className="col-lg-12 col-md-12 col-sm-12">
            <div className="card">
              <div className="card-header">
                <form id="myForm" onSubmit={this.handleReload}>
                  <div className="row" name="formProps">
                    <div className="form-group col-sm-1.3 mr-1-rem">
                      <label>Огнoо</label>
                      <div className="display-flex">
                        <Field
                          ref="startdate"
                          name="startdate"
                          component="input"
                          type="date"
                          className="form-control dateclss"
                        />
                      </div>
                    </div>
                    <div className="form-group col-sm-1.3 mr-1-rem">
                      <label>&nbsp;</label>
                      <div className="display-flex">
                        <Field
                          ref="enddate"
                          name="enddate"
                          component="input"
                          type="date"
                          className="form-control dateclss"
                        />
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
                      />
                    </div>
                    <div className="form-group col-sm-1.3 mr-1-rem">
                      <label>Нэр</label>
                      <Field
                        name="name"
                        ref="name"
                        component="input"
                        type="text"
                        className="form-control"
                      />
                    </div>
                    <div className="form-group col-sm-1.3 mr-1-rem">
                      <label>Нэвтрэх нэр</label>
                      <Field
                        name="username"
                        ref="username"
                        component="input"
                        type="text"
                        className="form-control"
                      />
                    </div>
                    <div className="form-group col-sm-1.3 mr-1-rem">
                      <label>Утасны дугаар</label>
                      <Field
                        name="phoneno"
                        ref="phoneno"
                        component="input"
                        type="text"
                        className="form-control"
                      />
                    </div>
                  </div>
                  <div>
                    <button
                      type="submit"
                      className="btn btn-primary"
                      style={{ float: 'right' }}
                    >
                      <i className="fa fa-retweet" />
                      Ачаалах
                    </button>
                  </div>
                </form>
              </div>
              <div className="card-block col-md-12 col-lg-12 col-sm-12 tmpresponsive">
                <TableFok
                  title={SmsReportTableTitle}
                  data={smsReport}
                  sumValue={sum}
                />
              </div>
              {/* <div>
                <button
                  type="button"
                  className="btn btn-primary"
                  style={{float: 'right'}}
                  onClick={this.handleReload}
                >
                  <i className="fa fa-retweet" />
                  Ачаалах
                </button>
              </div> */}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const form = reduxForm({ form: "smsReport" });

function mapStateToProps(state) {
  return {
    initialValues: {
      startdate: new Date().toISOString().slice(0, 10),
      enddate: new Date().toISOString().slice(0, 10),
    },
    smsReport: state.license.smsReport,
  };
}

export default connect(mapStateToProps, { GetSmsReport })(form(SmsReport));
