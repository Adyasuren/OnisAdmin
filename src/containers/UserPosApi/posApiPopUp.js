import React, { Component } from "react";
import { Field, reduxForm } from "redux-form";
import { connect } from "react-redux";
import Modal from "react-modal";
import "react-bootstrap-table/dist/react-bootstrap-table.min.css";
import { regPosApi, posApiList } from "../../actions/userPos_action";
import "bootstrap/dist/css/bootstrap.min.css";
import UserPosApi from "../../api/userpos_api";
import niceAlert from "sweetalert";

// var inputObj = new Object();

class posApiPopUp extends Component {
  constructor(props) {
    super(props);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.newclick = this.newclick.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.state = {
      value: true,
      clicked: false,
      Loading: false,
      file: {},
    };
  }

  componentWillMount() {}

  handleFormSubmit = (e) => {
    e.preventDefault();
    let formProps = {};
    document.body.style.cursor = "wait";
    formProps.regno = this.refs.regno.value;
    this.setState({ Loading: true });
    // inputObj = formProps;
    let formData = new FormData();
    formData.append("file", this.state.file);
    UserPosApi.regPosApi(formData, formProps).then((res) => {
      console.log(res);
      this.newclick();
    });
    document.body.style.cursor = "default";
    this.setState({ Loading: false });
  };

  onChangeFile = (e) => {
    this.setState({ file: e.target.files[0] });
    this.refs.fileInput.value = e.target.files[0].name;
  };

  handleSubmit(formProps) {
    this.setState({ Loading: true });
    // inputObj = formProps;
    this.props.posApiList(formProps);
    this.setState({ Loading: false });
  }

  newclick = () => {
    this.props.closeModal();
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

  handleChange(e) {
    var tmp;
    for (var key in this.props.rows) {
      if (e.target.value === this.props.rows[key].username) tmp = key;
    }
    this.props.change("regno", this.props.rows[tmp].regno);
  }

  render() {
    const { handleSubmit, selectedrow } = this.props;

    console.log("selectedrow", selectedrow);

    const divStyle = {
      width: "inherit",
    };
    var currentdate = new Date();
    return (
      <Modal
        isOpen={this.props.modalOpen}
        closeModal={() => {
          this.setState({ modalOpen: false });
        }}
        className="animatedpopup animated fadeIn customPopUp"
      >
        <form id="popupform" onSubmit={this.handleFormSubmit}>
          <div className="animated fadeIn ">
            <div className="card">
              <div className="card-header test">
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
                      <div className="form-group row popup-front-text">
                        <label className="col-md-5">
                          Татвар төлөгчийн дугаар<span className="red">*</span>
                        </label>
                        <input
                          name="regno"
                          ref="regno"
                          style={divStyle}
                          type="input"
                          className="form-control col-md-6"
                          required
                          defaultValue={selectedrow.regno}
                        />
                      </div>
                      <div className="form-group row popup-front-text">
                        <label className="col-md-5">
                          Татвар төлөгчийн нэр<span className="red">*</span>
                        </label>
                        <input
                          name="storenm"
                          style={divStyle}
                          className="form-control col-md-6"
                          type="input"
                          required
                          defaultValue={selectedrow.storenm}
                        />
                      </div>
                      <div className="form-group row popup-front-text">
                        <label className="col-md-5">
                          Салбар<span className="red">*</span>
                        </label>
                        <input
                          name="branch"
                          style={divStyle}
                          className="form-control col-md-6"
                          required
                        />
                      </div>
                      <div className="form-group row popup-front-text">
                        <label className="col-md-5">
                          PosApi байршил<span className="red">*</span>
                        </label>
                        <input
                          name="file"
                          ref="fileInput"
                          type="input"
                          style={divStyle}
                          required
                          value={selectedrow.url}
                          className="col-md-6 form-control"
                        />
                        <input
                          className="col-md-4"
                          name="file"
                          id="fileInput"
                          type="file"
                          style={divStyle}
                          accept=".zip, .rar"
                          onChange={this.onChangeFile}
                          title=" "
                        />
                      </div>
                      <div className="form-group row popup-front-text ">
                        <label className="col-md-5">
                          Төлөв<span className="red">*</span>
                        </label>
                        <Field
                          name="description"
                          component="select"
                          style={divStyle}
                          className="form-control col-md-6"
                          disabled="disabled"
                          required
                        >
                          <option>Идэвхтэй</option>
                        </Field>
                      </div>
                      <div className="form-group row popup-front-text">
                        <label className="col-md-5">
                          Бүртгэсэн хэрэглэгч<span className="red">*</span>
                        </label>
                        <Field
                          name="insby"
                          component="input"
                          style={divStyle}
                          className="form-control col-md-6"
                          type="text"
                          value={localStorage.getItem("id")}
                          placeholder={localStorage.getItem("logname")}
                          disabled="disabled"
                        />
                      </div>

                      <div className="form-group row popup-front-text">
                        <label className="col-md-5">
                          Бүртгэсэн огноо<span className="red">*</span>
                        </label>
                        <Field
                          name="updymd"
                          component="input"
                          style={divStyle}
                          className="form-control col-md-6"
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
                          // onClick={this.handleFormSubmit}
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
export default connect(mapStateToProps, { regPosApi, posApiList })(
  form(posApiPopUp)
);
