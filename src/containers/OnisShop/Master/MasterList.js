import React, { Component } from "react";
import { connect } from "react-redux";
import { Field, reduxForm } from "redux-form";
import TableFok from "../../../components/TableFok";
import { MasterListTableTitle } from "./TableTitle";
import Moment from "moment";
import MasterModal from "./MasterModal";
import { GetAllMasterList } from "../../../actions/OnisShop/LicenseAction";

class Components extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      isNew: true,
      selectedRow: null,
    };
  }

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

  handleReload = (e) => {
    this.props.GetAllMasterList();
  }

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

  closeModal = (isReload) => {
    this.setState({ isOpen: false }, () => {
      if (isReload) {
        this.handleReload();
      }
    });
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
                {/* <form id="myForm">
                  <div className="row" name="formProps">
                    <div className="form-group col-sm-1.3 mr-1-rem">
                      <label>Гэрээ хийсэн огноо</label>
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
                      <label>Регистрийн дугаар</label>
                      <Field
                        ref="regNum"
                        name="regNum"
                        component="input"
                        type="text"
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
                </form> */}
                <button
                  type="button"
                  className="btn btn-edit-new mr-1-rem"
                  style={{float:'right'}}
                  onClick={this.handleEdit}
                >
                  <i className="fa fa-paper-plane-o" />
                  Засах
                </button>
                <button
                  type="button"
                  className="btn btn-success mr-1-rem"
                  style={{float:'right'}}
                  onClick={this.handleNew}
                >
                  <i className="fa fa-file-text-o" />
                  Шинэ
                </button>
                <button
                  type="button"
                  className="btn btn-primary"
                  style={{float:'right'}}
                  onClick={this.handleReload}
                >
                  <i className="fa fa-retweet" />
                  Ачаалaх
                </button>
              </div>
              <div className="card-block col-md-12 col-lg-12 col-sm-12 tmpresponsive">
                <TableFok
                  title={MasterListTableTitle}
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
            Ачаалaх
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
        <MasterModal
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

const form = reduxForm({ form: "masterList" });


function mapStateToProps(state) {
  return {
    data: state.shopLicense.data,
  };
}
export default connect(mapStateToProps, {
  GetAllMasterList
})(form(Components));
