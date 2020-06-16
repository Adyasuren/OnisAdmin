import React, { Component } from "react";
import { reduxForm } from "redux-form";
import { connect } from "react-redux";
import { insertBanners } from "../../actions/banner_action";
import { bannerList} from "../../actions/banner_action";
import { SizePerPageDropDown } from "react-bootstrap-table";
import Modal from "react-modal";
import "react-bootstrap-table/dist/react-bootstrap-table.min.css";

var SearchObj1 = new Object();

class posApiPopUp extends Component {
  constructor(props) {
    super(props);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.Refresh = this.Refresh.bind(this);
    this.renderShowsTotal = this.renderShowsTotal.bind(this);
    this.newclick = this.newclick.bind(this);

    this.state = {
      value: true,
      clicked: false,
      Loading: false,
      rows: [],
      selectedRows: [],
    };
    document.title = "Баннер - Оньс админ";
  }

  //WARNING! To be deprecated in React v17. Use componentDidMount instead.
  componentWillMount() {
    this.setState({ Loading: true });
    if (Object.keys(SearchObj1).length === 0) {
      this.props.insertBanners(SearchObj1);
    } else {
      this.props.insertBanners(SearchObj1);
    }
    this.setState({ Loading: false });
  }

  handleFormSubmit(formProps) {
    formProps.beginDate = "2000-01-01";
    formProps.endDate = "2999-12-31";
    this.setState({ Loading: true });
    SearchObj1 = formProps;
    this.props.insertBanners(formProps);
    this.setState({ Loading: false });
  }

  handlerClickCleanFiltered() {
    this.refs.regnum.cleanFiltered();
    this.refs.username.cleanFiltered();
    this.refs.phonenum.cleanFiltered();
  }

  newclick = () => {
    this.props.closeModal();
  };
  cclick = () => {
    this.props.Banner_reducer_add();
  }

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
  renderSizePerPageDropDown = (props) => {
    return (
      <SizePerPageDropDown
        className="my-size-per-page"
        btnContextual="btn-warning"
        variation="dropdown"
        {...props}
        onClick={() => this.onToggleDropDown(props.toggleDropDown)}
      />
    );
  };

  renderShowsTotal(start, to, tota) {
    return (
      <div className="row">
        <p
          style={{ color: "#607d8b", marginRight: "5px", cursor: "pointer" }}
          onClick={() => console.log(this.props)}
        >
          {" "}
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Бүгд ( {this.props.total} )
        </p>
        <p style={{ color: "#f8cb00", marginRight: "5px", cursor: "pointer" }}>
          | Сонгосон ( {this.props.checked} )
        </p>
      </div>
    );
  }

  render() {
    return (
      <Modal
        isOpen={this.props.modalOpen}
        closeModal={() => this.setState({ modalOpen: false })}
        className="animatedpopup animated fadeIn customPopUp"
      >
        {/* <Loading show={this.state.Loading}/> */}
        <div className="popup-container">
          <div className="row">
            <div className="col-lg-12">
              <div className="card">
                <div className="card-headers card-header test">
                  <p style={{ color: "black", fontSize: "1.6em" }}>
                    Баннер бүртгэх
                  </p>
                </div>
                <div className="row">
                  <div className="col-lg-12">
                    <div className="card">
                      <div className="card-headers card-header test">
                        <p style={{ color: "black", fontSize: "1.6em" }}>
                          Баннер бүртгэх
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="popup-body">
                  <div className="popup-body-inside">
                    <label className="popup-front-text">
                    Баннерын нэр
                    </label>
                    <input type="input" className="popup-input" />
                    <br />
                    <label className="popup-front-text">
                    Баннерын байршил
                    </label>
                    <input type="input" className="popup-input" />
                    <br />
                    <label className="popup-front-text"> Эхлэх огноо</label>
                    <input
                      type="date"
                      id="datemax"
                      name="datemax"
                      className="popup-input"
                    />
                    <br />
                    <label className="popup-front-text">Дуусах огноо</label>
                    <input
                      type="date"
                      id="datemax"
                      name="datemax"
                      className="popup-input"
                    />
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
                    <label className="popup-front-text">Бүртгэсэн огноо</label>
                    <input
                      type="date"
                      id="datemax"
                      name="datemax"
                      className="popup-input"
                    />
                    <br />
                  </div>
                </div>

                <div className="card-block card-blocks">
                  <button
                    className="btn btn-primary"
                    form="myForm"
                    onClick={this.newclick}
                    style={{ backgroundColor: "gray", color: "white" }}
                  >
                    <i className="fa fa-ban" /> Болих
                  </button>
                  &nbsp;&nbsp;
                  <button
                    className="btn"
                    onClick = { this.cclick }
                    style={{ backgroundColor: "#f7a115", color: "white" }}
                  >
                    <i className="fa fa-save" /> Хадгалах&nbsp;
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Modal>
    );
  }
}
const form = reduxForm({
  form: "posApiPopUp",
});

function mapStateToProps(state) {
  var total = 0;
  var checked = 0;
  for (var i = 0; i < state.customer.rows.length; i++) {
    total++;
  }

  return {
    rows: state.customer.rows,
    columns: state.customer.columns,
    total: total,
  };
}
export default connect(mapStateToProps, { insertBanners, bannerList })(
  form(posApiPopUp)
);