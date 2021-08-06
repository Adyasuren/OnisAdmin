import React, { Component } from "react";
import { connect } from "react-redux";
import { Field, reduxForm } from "redux-form";
import TableFok from "../../../components/TableFok";
import { QpayListTableTitle } from "./TableTitle";
import LendModal from "./LendModal";
import Moment from "moment";
import { GetAllLendSettings } from "../../../actions/OnisShop/LendActions";

let searchobj = {}

class LendList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      isNew: true,
      selectedRow: null,
    };
  }

  handleReload = (e) => {
    e.preventDefault();
    let tmp = {};
    tmp.startymd = this.refs.startContractDate.value;
    tmp.endymd = this.refs.endContractDate.value;
    tmp.regno =
      this.refs.regNum.value == undefined ? "" : this.refs.regNum.value;
    tmp.phoneno =
      this.refs.phoneNum.value == undefined ? "" : this.refs.phoneNum.value;
      searchobj = tmp;
    this.props.GetAllLendSettings(tmp);
  };

  handleNew = () => {
    this.setState({ isNew: true }, () => {
      this.openModal();
    });
  };

  handleEdit = () => {
    if (this.state.selectedRow != null) {
      this.setState({ isNew: false }, () => {
        this.openModal();
      });
    } else {
      console.log("Мөр сонго");
    }
  };

  openModal = () => {
    this.setState({ isOpen: true });
  };

  closeModal = (value) => {
    if(value === true) {
      this.handleReload();
    }
    this.setState({ isOpen: false });
  };

  rowClick = (row) => {
    const { selectedRow } = this.state;
    if (this.state.selectedRow === null) {
      this.setState({ selectedRow: row });
    } else {
      if (selectedRow.rank !== row.rank) {
        this.setState({ selectedRow: row });
      } else {
        this.setState({ selectedRow: null });
      }
    }
  };
 
  render() {
    const { isOpen, isNew, selectedRow } = this.state;
    const { data } = this.props;
    return (
      <div className="animated fadeIn">
        <div className="row">
          <div className="col-lg-12 col-md-12 col-sm-12">
            <div className="card">
              <div className="card-header">
                <form id="myForm" onSubmit={this.handleReload}>
                  <div className="row" name="formProps">
                    <div className="form-group col-sm-1.3 mr-1-rem">
                      <label>Бүртгэсэн огноо</label>
                      <div className="display-flex">
                        <Field
                          ref="startContractDate"
                          name="startContractDate"
                          component="input"
                          type="date"
                          className="form-control dateclss"
                        />
                        <Field
                          ref="endContractDate"
                          name="endContractDate"
                          component="input"
                          type="date"
                          className="form-control dateclss mr-l-05-rem"
                        />
                      </div>
                    </div>
                    <div className="form-group col-sm-1.3 mr-1-rem">
                      <label>Татвар төлөгчийн дугаар</label>
                      <input 
                       ref="regNum"
                       name="regNum" 
                       type="text"
                       maxLength="10"
                       className="form-control" 
                       />
                    </div>
                    <div className="form-group col-sm-1.3 mr-1-rem">
                      <label>Утасны дугаар</label>
                      <Field
                        name="phoneNum"
                        ref="phoneNum"
                        component="input"
                        type="text"
                        className="form-control"
                      />
                    </div>
                  </div>
                  <button
                    type="button"
                    className="btn btn-edit-new mr-1-rem"
                    style={{ float: 'right' }}
                    onClick={this.handleEdit}
                  >
                    <i className="fa fa-paper-plane-o" />
                    Засах
                  </button>
                  <button
                    type="button"
                    className="btn btn-success mr-1-rem"
                    style={{ float: 'right' }}
                    onClick={this.handleNew}
                  >
                    <i className="fa fa-file-text-o" />
                    Шинэ
                  </button>
                  <button
                    type="submit"
                    className="btn btn-primary"
                    style={{ float: 'right' }}
                  >
                    <i className="fa fa-retweet" />
                    Ачаалах
                  </button>
                </form>
              </div>
              <div className="card-block col-md-12 col-lg-12 col-sm-12 tmpresponsive">
                <TableFok
                  title={QpayListTableTitle}
                  data={data}
                  rowClick={this.rowClick}
                />
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
            <i className="fa fa-retweet" />
            Ачаалах
          </button>
          <button
            type="button"
            className="btn btn-success mr-1-rem"
            onClick={this.handleNew}
          >
            <i className="fa fa-file-text-o" />
            Шинэ
          </button>
          <button
            type="button"
            className="btn btn-edit-new mr-1-rem"
            onClick={this.handleEdit}
          >
            <i className="fa fa-paper-plane-o" />
            Засах
          </button>
        </div> */}
        <LendModal
          isNew={isNew}
          isOpen={isOpen}
          openModal={this.openModal}
          closeModal={this.closeModal}
          selectedRow={selectedRow}
        />
      </div>
    );
  }
}

const form = reduxForm({ form: "lendConnectList" });

function mapStateToProps(state) {
  return {
    data: state.shopLend.data,
    initialValues:Object.keys(searchobj).length === 0 ? {
      startContractDate: new Date().toISOString().slice(0, 10),
      endContractDate: new Date().toISOString().slice(0, 10),
    }: {
      startContractDate: new Date(searchobj.startymd).toISOString().slice(0, 10),
      endContractDate: new Date(searchobj.endymd).toISOString().slice(0, 10)
    }
  };
}

export default connect(mapStateToProps, {
  GetAllLendSettings,
})(form(LendList));
