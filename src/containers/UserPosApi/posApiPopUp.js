import React, { Component } from "react";
import { reduxForm } from "redux-form";
import { connect } from "react-redux";
import { SizePerPageDropDown } from "react-bootstrap-table";
import Modal from "react-modal";
import "react-bootstrap-table/dist/react-bootstrap-table.min.css";
import { regPosApi } from "../../actions/userPos_action";
import { Form } from "react-bootstrap";
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
    var filePath = formProps.filePath;
    var regno = formProps.regno;
    this.props.regPosApi(formProps);
    this.setState({ Loading: false });
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

  render() {
    const { handleSubmit } = this.props;
    return (
      <Modal
        isOpen={this.props.modalOpen}
        closeModal={() => this.setState({ modalOpen: false })}
        className="animatedpopup animated fadeIn customPopUp"
      >
        {/* <Loading show={this.state.Loading}/> */}
        {/* <div className="popup-container">
          <div className="row">
            <div className="col-lg-12">
              <div className="card">
                <div className="card-headers card-header test">
                  <p style={{ color: "black", fontSize: "1.6em" }}>
                    POSAPI бүртгэх
                  </p>
                </div>
                <form
                  onSubmit={handleSubmit(this.handleFormSubmit)}
                  id="popupform"
                >
                  <div className="popup-body">
                    <div className="popup-body-inside">
                      <label className="popup-front-text">
                        Татвар төлөгчийн дугаар
                      </label>
                      <input className="popup-input"></input>
                      <br />
                      <label className="popup-front-text">
                        Татвар төлөгчийн нэр
                      </label>
                      <input type="input" className="popup-input" value="" />
                      <br />
                      <label className="popup-front-text">Салбар</label>
                      <select className="pop-up-input"></select>
                      <br />
                      <label className="popup-front-text">POSAPI байршил</label>
                      <input type="file" className="popup-input"></input>
                      <br />
                      <label className="popup-front-text">Төлөв</label>
                      <select className="pop-up-input">
                        <option>Идэвхтэй</option>
                        <option>Идэвхгүй</option>
                      </select>
                      <br />
                      <label className="popup-front-text">
                        Бүртгэсэн хэрэглэгч
                      </label>
                      <input type="input" className="popup-input" />
                      <br />
                      <label className="popup-front-text">
                        Бүртгэсэн огноо
                      </label>
                      <input
                        type="date"
                        id="datemax"
                        name="datemax"
                        className="popup-input"
                      />
                      <br />
                    </div>
                  </div>
                </form>

                <div className="card-block card-blocks">
                  <button
                    className="btn btn-primary"
                    form="popupform"
                    onClick={this.newclick}
                    style={{ backgroundColor: "gray", color: "white" }}
                  >
                    <i className="fa fa-ban" /> Болих
                  </button>
                  &nbsp;&nbsp;
                  <button
                    className="btn"
                    style={{ backgroundColor: "#f7a115", color: "white" }}
                    form="popupform"
                  >
                    <i className="fa fa-save" /> Хадгалах&nbsp;
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div> */}
        <Form>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" placeholder="Enter email" />
            <Form.Text className="text-muted">
              We'll never share your email with anyone else.
            </Form.Text>
          </Form.Group>
        </Form>
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
