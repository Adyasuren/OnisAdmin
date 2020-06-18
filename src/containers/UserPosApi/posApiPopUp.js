import React, { Component } from "react";
import { Field, reduxForm } from "redux-form";
import { connect } from "react-redux";
import Modal from "react-modal";
import "react-bootstrap-table/dist/react-bootstrap-table.min.css";
import { regPosApi } from "../../actions/userPos_action";
import "bootstrap/dist/css/bootstrap.min.css";

var inputObj = {};

class posApiPopUp extends Component {
  constructor(props) {
    super(props);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.Refresh = this.Refresh.bind(this);
    this.newclick = this.newclick.bind(this);
    this.state = {
      value: true,
      clicked: false,
      Loading: false,
      SelectedFile: null,
      file: {},
    };
  }

  componentWillMount() {
    this.setState({ Loading: true });
    if (Object.keys(inputObj).length === 0) {
      inputObj = {
        filePath: "",
        regno: 0,
      };
      this.setState({ Loading: false });
    }
  }

  handleFormSubmit(formProps) {
    this.setState({ Loading: true });
    console.log("submit");
    //this.props.regPosApi(formProps);
    let formData = new FormData(this.form);
    formData.append("file", this.state.value); //append the values with key, value pair

    this.props.regPosApi(formData, formProps);
    console.log("formdata", formData);
    this.setState({ Loading: false });
    this.newclick();
  }

  newclick = () => {
    this.props.closeModal();
  };

  Refresh() {
    window.location.reload();
  }

  handleRowClick = (row) => {
    let tmp = this.state.selectedRows;
    console.log(tmp, "<---");
    tmp.push(row);
    this.setState({
      selectedRows: tmp,
    });
  };

  numberofrows(cell, formatExtraData, row, rowIdx) {
    return rowIdx;
  }

  onToggleDropDown = (toggleDropDown) => {
    toggleDropDown();
  };

  toggleClass() {
    if (!this.state.clicked) {
      this.refs.test.style.height = this.refs.test.style.height + "100px";
      this.setState({ clicked: !this.clicked });
    } else {
      this.refs.test.style.height = this.refs.test.style.height - "100px";
      this.setState({ clicked: this.clicked });
    }
  }

  handleChange = (event) => {
    this.setState({ file: event.target.value });
    console.log("event target.value", event.target.value);
  };

  render() {
    const { handleSubmit } = this.props;
    const divStyle = {
      width: "inherit",
    };
    var currentdate = new Date();
    return (
      <Modal
        isOpen={this.props.modalOpen}
        closeModal={() => this.setState({ modalOpen: false })}
        className="animatedpopup animated fadeIn customPopUp"
      >
        <form id="popupform" onSubmit={handleSubmit(this.handleFormSubmit)}>
          <div className="animated fadeIn ">
            <div className="card-header">
              <strong> </strong>
            </div>
            <div className="card-header">
              <strong> </strong>
            </div>
            <div className="row"></div>
            <div className="card-header">
              <strong>&lt;&lt; POSAPI бүртгэх</strong>
              <button
                className="tn btn-sm btn-primary button-ban card-right"
                onClick={() => this.newclick()}
              >
                X
              </button>
            </div>
            <div className="row">
              <div className="col-md-12">
                <div className="card">
                  <div className="card-block">
                    <div className="form-group row">
                      <label className="col-md-5">
                        Татвар төлөгчийн дугаар<span className="red">*</span>
                      </label>
                      <div className="col-md-7">
                        <Field
                          name="regno"
                          component="input"
                          style={divStyle}
                          type="input"
                          className="form-control dateclss"
                          required
                        />
                      </div>
                    </div>
                    <div className="form-group row">
                      <label className="col-md-5">
                        Татвар төлөгчийн нэр<span className="red">*</span>
                      </label>
                      <div className="col-md-7">
                        <Field
                          name="storenm"
                          component="input"
                          style={divStyle}
                          className="form-control"
                          type="input"
                          required
                        />
                      </div>
                    </div>
                    <div className="form-group row">
                      <label className="col-md-5">
                        Салбар<span className="red">*</span>
                      </label>
                      <div className="col-md-7">
                        <Field
                          name="branch"
                          component="input"
                          style={divStyle}
                          className="form-control"
                          required
                        />
                      </div>
                    </div>
                    <div className="form-group row">
                      <label className="col-md-5">
                        PosApi байршил<span className="red">*</span>
                      </label>
                      <div className="col-md-7">
                        <Field
                          name="url"
                          component="input"
                          type="file"
                          style={divStyle}
                          onChange={this.handleChange.bind(this)}
                          value
                        />
                      </div>
                    </div>
                    <div className="form-group row">
                      <label className="col-md-5">
                        Төлөв<span className="red">*</span>
                      </label>
                      <div className="col-md-7">
                        <Field
                          name="description"
                          component="select"
                          style={divStyle}
                          className="form-control"
                          disabled="disabled"
                          required
                        >
                          <option>Идэвхтэй</option>
                        </Field>
                      </div>
                    </div>
                    <div className="form-group row">
                      <label className="col-md-5">
                        Бүртгэсэн хэрэглэгч<span className="red">*</span>
                      </label>
                      <div className="col-md-7">
                        <Field
                          name="updemp"
                          component="input"
                          style={divStyle}
                          className="form-control"
                          type="text"
                          value={localStorage.getItem("logname")}
                          placeholder={localStorage.getItem("logname")}
                          disabled="disabled"
                        />
                      </div>
                    </div>

                    <div className="form-group row">
                      <label className="col-md-5">
                        Бүртгэсэн огноо<span className="red">*</span>
                      </label>
                      <div className="col-md-7">
                        <Field
                          name="updymd"
                          component="input"
                          style={divStyle}
                          className="form-control"
                          type="text"
                          placeholder={
                            currentdate.toLocaleDateString() +
                            " " +
                            currentdate.getHours() +
                            ":" +
                            currentdate.getMinutes() +
                            ":" +
                            currentdate.getSeconds()
                          }
                          disabled="disabled"
                        />
                      </div>
                    </div>
                    <div className="card-right">
                      <button
                        type="button"
                        className="btn btn-sm btn-primary button-ban"
                        onClick={() => this.newclick()}
                        form="popupform"
                      >
                        <i className="fa fa-ban" />
                        &nbsp;Болих
                      </button>
                      <button
                        type="submit"
                        className="btn btn-sm btn-primary button-save"
                        form="popupform"
                      >
                        <i className="fa fa-save" />
                        &nbsp;Хадгалах
                      </button>
                      &nbsp;
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      </Modal>
    );
  }
}
const form = reduxForm({
  form: "posApiPopUp",
});

function mapStateToProps(state) {
  var total = 0;
  for (var i = 0; i < state.customer.rows.length; i++) {
    total++;
  }

  return {
    rows: state.customer.rows,
    columns: state.customer.columns,
    total: total,
  };
}
export default connect(mapStateToProps, { regPosApi })(form(posApiPopUp));
