import React, { Component } from "react";
import { connect } from "react-redux";
import { Field, reduxForm } from "redux-form";
import TableFok from "../../../../components/TableFok";
import { MerchantReportTableTitle } from "./TableTitle";
import { GetAllFeedBack } from "../../../../actions/OnisShop/FeedbackAction";
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
      isOpen: false,
    };
  }

  handleReload = (e) => {
    e.preventDefault();
    let tmp = {};
    tmp.startdate = this.refs.startCreatedDate.value;
    tmp.enddate = this.refs.endCreatedDate.value;
    tmp.type = this.refs.type.value == "0" ? null : Number(this.refs.type.value);
    tmp.text = this.refs.textValue.value ? this.refs.textValue.value : "";
    tmp.regno = this.refs.regno.value ? this.refs.regno.value : "";
    searchobj = tmp;
    this.props.GetAllFeedBack(tmp);
  };

  render() {
    const { data, isLoading } = this.props;
    return (
      <div className="animated fadeIn">
        <div className="row">
          <div className="col-lg-12 col-md-12 col-sm-12">
            <div className="card">
              <div className="card-header">
                <form id="myForm" onSubmit={this.handleReload}>
                  <div className="row" name="formProps">
                  <div className="form-group col-sm-1.3 mr-1-rem">
                      <label>Огноо</label>
                      <div className="display-flex">
                        <Field
                          ref="startCreatedDate"
                          name="startCreatedDate"
                          component="input"
                          type="date"
                          className="form-control dateclss"
                        />
                        <Field
                          ref="endCreatedDate"
                          name="endCreatedDate"
                          component="input"
                          type="date"
                          className="form-control dateclss mr-l-05-rem"
                        />
                      </div>
                    </div>
                    <div className="form-group col-sm-1.3 mr-1-rem">
                      <label>Шүүлтүүрүүд</label>
                      <div className="display-flex">
                        <button
                          type="submit"
                          className="btn btn-primary"
                        >
                          7 хоногоор
                        </button>
                        <button
                          type="submit"
                          className="btn btn-primary"
                          style={{ marginLeft: 15 }}
                        >
                          Сараар
                        </button>
                        <button
                          type="submit"
                          className="btn btn-primary"
                          style={{ marginLeft: 15 }}
                        >
                          Жилээр
                        </button>
                      </div>
                    </div>
                  </div>
                  <button
                    type="submit"
                    className="btn btn-primary"
                    style={{ float: 'right' }}
                  >
                    <i className={`fa fa-cog ${isLoading ? "fa-spin" : ""}`} />
                    Ачаалаx
                  </button>
                </form>
              </div>
              <div className="card-block col-md-12 col-lg-12 col-sm-12 tmpresponsive">
                <TableFok title={MerchantReportTableTitle} data={data} />
              </div>
            </div>
          </div>
        </div>
        {/* <div>
          <button
            type="button"
            className="btn btn-primary"
            onClick={this.handleReload}
          >
            <i className={`fa fa-cog ${isLoading ? "fa-spin" : ""}`} />
            Ачаалаx
          </button>
        </div> */}
      </div>
    );
  }
}

const form = reduxForm({ form: "shopMerchantReport" });

function mapStateToProps(state) {
  return {
    data: state.feedbackReducer.data,
    isLoading: state.feedbackReducer.isLoading,
    initialValues: Object.keys(searchobj).length === 0 ? {
      startCreatedDate: new Date().toISOString().slice(0, 10),
      endCreatedDate: new Date().toISOString().slice(0, 10),
    }: {
      startCreatedDate: new Date(searchobj.startdate).toISOString().slice(0, 10),
      endCreatedDate: new Date(searchobj.enddate).toISOString().slice(0, 10)
    }
  };
}

export default connect(mapStateToProps, { GetAllFeedBack })(form(Components));
