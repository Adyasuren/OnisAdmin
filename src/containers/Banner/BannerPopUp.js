import React, { Component } from "react";
import { Field, reduxForm } from "redux-form";
import { connect, Provider } from "react-redux";
import { insertBanners } from "../../actions/banner_action";
import { bannerList} from "../../actions/banner_action";
import "bootstrap/dist/css/bootstrap.min.css";
import bannerApi from "../../api/banner_api";
import { SizePerPageDropDown } from "react-bootstrap-table";
import Modal from "react-modal";
import "react-bootstrap-table/dist/react-bootstrap-table.min.css";
import { style } from "../../../public/css/style.css"
import niceAlert from "sweetalert";

var SearchObj1 = new Object();
var currentdate = new Date();
var beginDate = currentdate;
var endDate = currentdate;

class BannerPopup extends Component {
  constructor(props) {
    super(props);
    this.Refresh = this.Refresh.bind(this);
    this.renderShowsTotal = this.renderShowsTotal.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleChanges = this.handleChanges.bind(this);
    this.Change = this.Change.bind(this);
    this.newclick = this.newclick.bind(this);
    // this.fileInput = React.createRef();

    this.state = {
      value: true,
      clicked: false,
      Loading: false,
      rows: [],
      selectedRows: [],
      file: {},
      fields: {},
      errors: {}
    };
    document.title = "Баннер - Оньс админ";
  }

  //WARNING! To be deprecated in React v17. Use componentDidMount instead.
  componentWillMount() {
  }

  handleFormSubmit = (e) => {
    e.preventDefault();
    console.log("test")
    let formProps = {};
    formProps.startDate = this.refs.startdate.value;
    formProps.endDate = this.refs.enddate.value;
    formProps.bannerNm = this.refs.bannernm.value 
    this.setState({ Loading: true });
    SearchObj1 = formProps;
    let formData = new FormData();
 
    formData.append('IMG', this.state.file);
    bannerApi.insertBanners(formData, formProps).then(res => {
      console.log(res);
      niceAlert(Response.message);
    });  
    
    this.setState({ Loading: false });
    console.log(this.refs);
    niceAlert("Амжилттай хадгаллаа");
    this.props.closeModal();
  
  }

  onChangeFile = (e) => {
    console.log(e.target.files);
    this.setState({ file: e.target.files[0] });
    /*this.input.current.value;
    this.handleImageChange.bind(this); */
  }

  handleSubmit(formProps) {
    // formProps.beginDate = "2000-01-01";
    // formProps.endDate = "2999-12-31";
    this.setState({ Loading: true });
    SearchObj1 = formProps;
    this.props.bannerList(formProps);
    this.setState({ Loading: false });
  }

  handleChange(e) {
    var tmp;
    for (var key in this.props.rows) {
      if (e.target.value === this.props.rows[key].bannernm) tmp = key;
    }
    this.props.change("bannernm", this.props.rows[tmp].bannernm);
    this.props.change("startymd", this.props.rows[tmp].startymd);
    this.props.change("endymdber", this.props.rows[tmp].endymd);
  }

  handleChanges(e) {
    this.props.checkemail(e.target.value);
  }

  Change() {
    this.props.checkstartymd(1);
  }

    handleRemove = row => {
      console.log(this.state);
      var index = this.state.selectedRows.indexOf(row);
      this.state.selectedRows.splice(index, 1);
      this.setState(this.state.selectedRows);
    };
  
    handleSaveList = list => {
      console.log(list);
    };

  handlerClickCleanFiltered() {
    this.refs.startymd.cleanFiltered();
    this.refs.bannernm.cleanFiltered();
    this.refs.endymd.cleanFiltered();
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



  // numberofrows(cell, formatExtraData, row, rowIdx) {
  //   return rowIdx;
  // }

  // onToggleDropDown = (toggleDropDown) => {
  //   toggleDropDown();
  // };

  // toggleClass() {
  //   if (!this.state.clicked) {
  //     this.refs.test.style.height = this.refs.test.style.height + "100px";
  //     this.setState({ clicked: !this.clicked });
  //   } else {
  //     this.refs.test.style.height = this.refs.test.style.height - "100px";
  //     this.setState({ clicked: this.clicked });
  //   }
  // }
  // renderSizePerPageDropDown = (props) => {
  //   return (
  //     <SizePerPageDropDown
  //       className="my-size-per-page"
  //       btnContextual="btn-warning"
  //       variation="dropdown"
  //       {...props}
  //       onClick={() => this.onToggleDropDown(props.toggleDropDown)}
  //     />
  //   );
  // };

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
    // const {handleFormSubmit} = this.props;
    const {handleSubmit, selectedrow} = this.props;
    const divStyle = {
      width: "inherit",
    };
    // console.log(selectedrow)
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
              <strong>&lt;&lt; Баннер бүртгэх </strong>
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
                      Баннерын нэр<span className="red">*</span>
                      </label>
                      <div className="col-md-7">
                      <input ref="bannernm" 
                        type="input" 
                        // defaultValue={selectedrow.bannernm} 
                        className="form-control" 
                        name="bannernm" 
                        id="bannernm" 
                        required/>
                      </div>
                    </div>
                    <div className="form-group row popup-front-text">
                      <label className="col-md-5">
                      Баннерын байршил<span className="red">*</span>
                      </label>
                      <div className="col-md-7">
                      <input type="file" 
                        className="file-input"
                        name="file" 
                        id="file" 
                        accept=".jpeg, .png, .jpg, .tif, .tiff "
                        // defaultValue={selectedrow.file} 
                        onChange={this.onChangeFile} 
                        required/>
                        </div>
                      </div>
                    <div className="form-group row popup-front-text">
                      <label className="col-md-5">
                      Эхлэх огноо<span className="red">*</span>
                      </label>
                      <div className="col-md-7">
                      <input
                        type="date"
                        id="datemax"
                        ref="startdate"
                        name="datemax"
                        // defaultValue={selectedrow.startymd}
                        className="form-control"
                        required
                      />
                      </div>
                    </div>
                    <div className="form-group row popup-front-text">
                      <label className="col-md-5">
                      Дуусах огноо<span className="red">*</span>
                      </label>
                      <div className="col-md-7">
                      <input
                        ref="enddate"
                        type="date"
                        id="datemax"
                        name="datemax"
                        // defaultValue={selectedrow.endymd}
                        className="form-control"
                        required                      
                      />
                      </div>
                    </div>
                    <div className="form-group row popup-front-text ">
                      <label className="col-md-5">
                        Төлөв<span className="red">*</span>
                      </label>
                      <div className="col-md-7">
                      <select className="form-control" id="isenable">
                      <option value="1">Идэвхтэй</option>
                      <option value="2">Идэвхгүй</option>
                      {/* style={divStyle} */}
                      </select>
                          
                      </div>
                    </div>
                    <div className="form-group row popup-front-text">
                      <label className="col-md-5">
                        Бүртгэсэн хэрэглэгч<span className="red">*</span>
                      </label>
                      <div className="col-md-7">
                      <input
                        name="updemp"
                        component="input"
                        ref="createdUser"
                        // style={divStyle}
                        className="form-control"
                        type="text"
                        value={localStorage.getItem("id")}
                        placeholder={localStorage.getItem("id")}
                        disabled="disabled"
                        id="createduser"
                      />
                      </div>
                    </div>

                    <div className="form-group row popup-front-text">
                      <label className="col-md-5">
                        Бүртгэсэн огноо<span className="red">*</span>
                      </label>
                      <div className="col-md-7">
                      <input
                        name="updymd"
                        component="input"
                        ref="createdDate"
                        // style={divStyle}
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
                        id="createddate"
                        // style={divStyle}

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
  form: "BannerPopup",
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
  form(BannerPopup)
);
