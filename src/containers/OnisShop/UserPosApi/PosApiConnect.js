import React, { Component } from "react";
import { connect } from "react-redux";
import { Field, reduxForm } from "redux-form";
import TableFok from "../../../components/TableFok";
import { UserPosApiTableTitle } from "./TableTitle"
import PosApiModal from "./PosApiModal";
import {
  GetAllPosApiList
} from "../../../actions/OnisShop/UserPosApiAction";

class Components extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      isNew: true,
      selectedRow: null,
    };
  }

  handleReload = () => {
		let tmp = {
      startdate: this.refs.startCreatedDate.value,
      enddate: this.refs.endCreatedDate.value,
      regno: this.refs.regNum.value == undefined ? "" : this.refs.regNum.value,
      phoneno: this.refs.phoneNum.value == undefined ? 0 : Number(this.refs.phoneNum.value),
      type: this.refs.status.value ? Number(this.refs.status.value) : null,
      posno: this.refs.posno.value ? Number(this.refs.posno.value) : null
    };
		this.props.GetAllPosApiList(tmp);
  }

  handleNew = () => {
    this.setState({ isNew: true }, () => {
      this.openModal();
    });
  }

  handleEdit = () => {
    if(this.state.selectedRow != null)
    {
      this.setState({ isNew: false }, () => {
        this.openModal();
      });
    }
    else
    {
      console.log("Мөр сонго");
    }
  }

  openModal = () => {
    this.setState({ isOpen: true });
  }

  closeModal = (success) => {
    this.setState({ isOpen: false })
    if(success === true)
    {
      this.handleReload();
    }
  }

  rowClick = (row) => {
    const { selectedRow } = this.state;
    if(this.state.selectedRow === null)
    {
      this.setState({ selectedRow: row });
    }
    else
    {
      if(selectedRow.rank !== row.rank)
      {
        this.setState({ selectedRow: row });
      }
      else
      {
        this.setState({ selectedRow: null });
      }
    }
  }

  render() {
    const { isOpen, isNew, selectedRow } = this.state;
		const { data } = this.props;
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
                        Татвар төлөгчийн дугаар
                        </label>
                        <input 
                         name="regNum" 
                         ref="regNum" 
                         maxLength="10"
                         type="text" 
                         className="form-control" 
                         />
                      </div>
                      <div className="form-group col-sm-1.3 mr-1-rem">
                        <label>
                        Пос
                        </label>
                        <input 
                         name="posno" 
                         ref="posno" 
                         maxLength="10"
                         type="text" 
                         className="form-control" 
                         />
                      </div>
                      <div className="form-group col-sm-1.3 mr-1-rem">
                        <label>
                          Утасны дугаар
                        </label>
                        <inputh
                          name="phoneNum"
                          ref="phoneNum"
                          maxLength="8"
                          type="Number"
                          className="form-control"
                        />
                      </div>
                      <div className="form-group col-sm-1.3 mr-1-rem">
                      <label>Төрөл</label>
                      <select
                      name="status"
                      ref="status"
                      style={{ width: "100%" }}
                      className="form-control"
                    >
                      <option value={null}>Бүгд</option>
                      <option value={1}>Үндсэн</option>
                      <option value={2}>Нэмэлт</option>
                    </select>
                    </div>
                    </div>
                </form>
              </div>
              <div className="card-block col-md-12 col-lg-12 col-sm-12 tmpresponsive">
                <TableFok title={UserPosApiTableTitle} data={data} rowClick={this.rowClick}/>
              </div>
            </div>
          </div>
        </div>
        <div>
          <button type="button" className="btn btn-primary" onClick={this.handleReload}>
            <i className="fa fa-retweet" />
            Ачаалах
          </button>
          <button type="button" className="btn btn-success mr-1-rem" onClick={this.handleNew}>
            <i className="fa fa-file-text-o" />
            Шинэ
          </button>
          <button type="button" className="btn btn-edit-new mr-1-rem" onClick={this.handleEdit}>
            <i className="fa fa-paper-plane-o" />
            Засах
          </button>
        </div>
        <PosApiModal isNew={isNew} isOpen={isOpen} openModal={this.openModal} closeModal={this.closeModal} selectedRow={selectedRow} />
      </div>
    );
  }
}

const form = reduxForm({ form: "userPosApiConnect" });

function mapStateToProps(state) {
  return {
    data: state.userPosApi.data,
    initialValues: {
      startCreatedDate: new Date().toISOString().slice(0, 10),
      endCreatedDate: new Date().toISOString().slice(0, 10),
    },
  }
}

export default connect(mapStateToProps, {
  GetAllPosApiList
})(form(Components));
