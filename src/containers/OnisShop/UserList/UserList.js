import React, { Component } from "react";
import { connect } from "react-redux";
import { Field, reduxForm } from "redux-form";
import TableFok from "../../../components/TableFok";
import { ShopUserListTableTitle } from "./TableTitle"
import { GetAllUserList } from "../../../actions/OnisShop/UserListAction";
import UserModal from "./UserModal";

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
    let tmp = {};
    tmp.startdate = this.refs.startCreatedDate.value;
    tmp.enddate = this.refs.endCreatedDate.value;
    tmp.regno = this.refs.regNum.value == undefined ? "" : this.refs.regNum.value;
    tmp.phoneno = this.refs.phoneno.value == undefined ? 0 : Number(this.refs.phoneno.value)
    tmp.distcode = this.refs.distcode.value == undefined ? "" : this.refs.distcode.value;
    tmp.name = this.refs.NAME.value == undefined ? "" : this.refs.NAME.value;
    this.props.GetAllUserList(tmp);
   
  }

  renderDistricts = () => {
    const { districts } = this.props;
    let tmp = districts.map((item, i) => {
      return (
        <option value={item.code} key={i}>
          {item.name}
        </option>
      )
    });
    
    return tmp;
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

  handleNew = () => {
    this.setState({ isNew: true }, () => {
      this.openModal();
    });
  }

  handleEdit = () => {
    if (this.state.selectedRow != null) {
      this.setState({ isNew: false }, () => {
        this.openModal();
      });
    } else {
      console.log("Мөр сонго");
    }
  };

  render() {
    const { isOpen, isNew, selectedRow } = this.state;
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
                        <input
                          ref="NAME"
                          name="NAME"
                          type="string"
                          className="form-control"
                          maxLength="15"
                        />
                      </div>
                      <div className="form-group col-sm-1.3 mr-1-rem">
                        <label>
                        Татвар төлөгчийн дугаар
                        </label>
                        <input 
                         name="regNum" 
                         ref="regNum" 
                         type="text"
                         className="form-control" 
                         maxLength="10"
                         />
                      </div>
                      <div className="form-group col-sm-1.3 mr-1-rem">
                        <label>
                          Утасны дугаар
                        </label>
                        <input
                          name="phoneno"
                          ref="phoneno"
                          maxLength="8"
                          type="Number"  
                          className="form-control"
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
                <TableFok title={ShopUserListTableTitle} data={data} rowClick={this.rowClick} />
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
          <UserModal isNew={isNew} isOpen={isOpen} openModal={this.openModal} closeModal={this.closeModal} selectedRow={selectedRow} />
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
