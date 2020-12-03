import React, { Component } from "react";
import { connect } from "react-redux";
import { Field, reduxForm } from "redux-form";
import TableFok from "../../../components/TableFok";
import { ShopUserListTableTitle } from "./TableTitle"
import { GetAllUserList } from "../../../actions/OnisShop/UserListAction";

class Components extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  handleReload = () => {
    let tmp = {};
    tmp.startdate = this.refs.startCreatedDate.value;
    tmp.enddate = this.refs.endCreatedDate.value;
    tmp.name = this.refs.name.value == undefined ? "string" : this.refs.name.value;
    tmp.regno = this.refs.regNum.value == undefined ? "" : this.refs.regNum.value;
    tmp.phoneno = this.refs.phoneno.value == undefined ? 0 : Number(this.refs.phoneno.value)
    tmp.distcode = this.refs.distcode.value == undefined ? "" : this.refs.distcode.value;
    this.props.GetAllUserList(tmp);
  }

  renderDistricts = () => {
    const { districts } = this.props;
    let tmp = districts.map((item, i) => {
      return (
        <option value={item.code}>
          {item.name}
        </option>
      )
    });
    
    return tmp;
  }

  render() {
    const { data } = this.props;
    console.log(data)
    return (
      <div className="animated fadeIn">
        <div className="row">
          <div className="col-lg-12 col-md-12 col-sm-12">
            <div className="card">
              <div className="card-header">
                <form id="myForm">
                  <div className="row" name="formProps">
                      <div className="form-group col-sm-1.3 mr-1-rem">
                        <label>Бүртгүүлсэн огноо</label>
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
                        <label>
                        Татвар төлөгчийн нэр
                        </label>
                        <Field
                          ref="name"
                          name="name"
                          component="input"
                          type="string"
                          className="form-control"
                          maxLength="10"
                        />
                      </div>
                      <div className="form-group col-sm-1.3 mr-1-rem">
                        <label>
                        Татвар төлөгчийн дугаар
                        </label>
                        <Field
                          ref="regNum"
                          name="regNum"
                          component="input"
                          type="Number"
                          className="form-control"
                          maxLength="7"
                        />
                      </div>
                      <div className="form-group col-sm-1.3 mr-1-rem">
                        <label>
                          Утасны дугаар
                        </label>
                        <Field
                          name="phoneno"
                          ref="phoneno"
                          component="input"
                          type="phone"
                          className="form-control"
                          maxLength="8"
                        />
                      </div>
                      <div
                      className="form-group col-sm-1.3 mr-1-rem">
                      <label>Дүүрэг</label>
                      <Field
                        name="distcode"
                        ref="distcode"
                        component="select"
                        className="form-control"
                      >
                        <option />
                        {this.renderDistricts()}
                      </Field>
                    </div>
                    </div>
                </form>
              </div>
              <div className="card-block col-md-12 col-lg-12 col-sm-12 tmpresponsive">
                <TableFok title={ShopUserListTableTitle} data={data} />
              </div>
            </div>
          </div>
        </div>
        <div>
          <button type="button" className="btn btn-primary" onClick={this.handleReload}>
            <i className="fa fa-retweet" />
            Ачаалах
          </button>
          <button
            type="button"
            className="btn btn-edit-new mr-1-rem"
            onClick={this.handleEdit}
          >
            <i className="fa fa-paper-plane-o" />
            Засах
          </button>
        </div>
      </div>
    );
  }
}

const form = reduxForm({ form: "shopUserlist" });

function mapStateToProps(state) {
  return {
    data: state.shopUserList.data,
    districts: state.district.data,
    initialValues: {
      startCreatedDate: new Date().toISOString().slice(0, 10),
      endCreatedDate: new Date().toISOString().slice(0, 10),
    },
  }
}

export default connect(mapStateToProps, { GetAllUserList })(form(Components));
