import React, { Component } from "react";
import { Field, reduxForm } from "redux-form";
import { connect } from "react-redux";
import { insertBanners } from "../../actions/banner_action";
import { bannerList} from "../../actions/banner_action";
import "bootstrap/dist/css/bootstrap.min.css";
import bannerApi from "../../api/banner_api";
// import { SizePerPageDropDown } from "react-bootstrap-table";
import Modal from "react-modal";
import "react-bootstrap-table/dist/react-bootstrap-table.min.css";

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

  handleFormSubmit = () => {
    let formProps = {};
    formProps.startDate = this.refs.startdate.value;
    formProps.endDate = this.refs.enddate.value;
    formProps.bannerNm = this.refs.bannernm.value 
    this.setState({ Loading: true });
    SearchObj1 = formProps;
    let formData = new FormData();

    formData.append('IMG', this.state.file);
    bannerApi.insertBanners(formData, formProps).then(res => {
      console.log(res)
    });
    this.setState({ Loading: false });
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
      if (e.target.value === this.props.rows[key].username) tmp = key;
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
    this.refs.username.cleanFiltered();
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

  // handleValidation(){
  //   let fields = this.state.fields;
  //   let errors = {};
  //   let formIsValid = true;

  //   //Name
  //   if(!fields["bannernm"]){
  //      formIsValid = false;
  //      errors["bannernm"] = "Cannot be empty";
  //   }

  //   if(typeof fields["bannernm"] !== "undefined"){
  //      if(!fields["bannernm"].match(/^[a-zA-Z]+$/)){
  //         formIsValid = false;
  //         errors["bannernm"] = "Only letters";
  //      }        
  //   }

  //   //Image
  //   if(!fields["imgnm"]){
  //      formIsValid = false;
  //      errors["imgnm"] = "Cannot be empty";
  //   }

  //   if(typeof fields["imgnm"] !== "undefined"){
  //         errors["email"] = "Image is not valid";
  //       }
  // }  
  //  this.setState({errors: errors});
  //  return formIsValid;
// }

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
    const {handleSubmit} = this.props;
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
                  <div className="popup-body-inside" form="Form">
                  <form id = "Form">
                    <label className="popup-front-text">
                    Баннерын нэр
                    </label>
                    <input  ref="bannernm" type="input" className="popup-input" name="bannernm" id="bannernm" formNoValidate/>
                    <br />
                    <label className="popup-front-text">
                    Баннерын байршил
                    </label>
                    <input type="file" name="file" onChange={this.onChangeFile}/>
                    
                    <br />
                    <label className="popup-front-text"> Эхлэх огноо</label>
                    <input
                      type="date"
                      id="datemax"
                      ref="startdate"
                      name="datemax"
                      className="popup-input"
                    />
                    <br />
                    <label className="popup-front-text">Дуусах огноо</label>
                    <input
                      ref="enddate"
                      type="date"
                      id="datemax"
                      name="datemax"
                      className="popup-input"
                    />
                    <br />
                    <label className="popup-front-text">Төлөв</label>
                    <select className="pop-up-input">
                      <option value="1">Идэвхтэй</option>
                      <option value="2">Идэвхгүй</option>
                    </select>
                    <br />
                    <label className="popup-front-text">
                    Бүртгэсэн хэрэглэгч
                    </label>
                    <Field
                        name="updemp"
                        component="input"
                        ref="createdUser"
                        // style={divStyle}
                        className="form-control"
                        type="text"
                        value={localStorage.getItem("logname")}
                        placeholder={localStorage.getItem("logname")}
                        disabled="disabled"
                      />
                    <br />
                    <label className="popup-front-text">Бүртгэсэн огноо</label>
                    <Field
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
                      />
                    <br />
                    </form>
                  </div>
                </div>

                <div className="card-block card-blocks">
                  <button
                    className="btn btn-primary"
                    form ="Form"
                    onClick={this.newclick}
                    style={{ backgroundColor: "gray", color: "white" }}
                  >
                    <i className="fa fa-ban" /> Болих
                  </button>
                  &nbsp;&nbsp;
                  <button
                    type="submit"
                    className="btn"
                    form="Form"
                    onClick = { this.handleFormSubmit }
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