import React, { Component } from "react";
import { Field, reduxForm } from "redux-form";
import { connect } from "react-redux";
import Modal from "react-modal";
import "react-bootstrap-table/dist/react-bootstrap-table.min.css";
// import { regPosApi, posApiList } from "../../actions/userPos_action";
// import "bootstrap/dist/css/bootstrap.min.css";
// import UserPosApi from "../../api/userpos_api";
import { UpdatePopUp } from "../../actions/UpdatePopUp_action";
import {
    BootstrapTable,
    TableHeaderColumn,
    SizePerPageDropDown
  } from "react-bootstrap-table";

var inputObj = new Object();

class UpdatePopUps extends Component {
  constructor(props) {
    super(props);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.newclick = this.newclick.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.state = {
      value: true,
      clicked: false,
      Loading: false,
      SelectedFile: null,
      file: {},
    };
  }

  componentWillMount() {
    // this.setState({ Loading: true });
    // if (Object.keys(inputObj).length === 0) {
    //   inputObj = {
    //     filePath: "",
    //     regno: 0,
    //   };
    //   this.setState({ Loading: false });
    // }
  }

  handleFormSubmit = () => {
    console.log("refs regno", this.refs.regno.value);
    let formProps = {};
    formProps.regno = this.refs.regno.value;
    this.setState({ Loading: true });
    inputObj = formProps;
    let formData = new FormData();

    formData.append("file", this.state.file);

    console.log(formData, formProps);
    // UserPosApi.regPosApi(formData, formProps).then((res) => {
    //   console.log("res", res);
    // 
    this.setState({ Loading: false });
    this.newclick();
  };

  hiddenclick=()=>{
    this.props.closeModal();
  }
  onChangeFile = (e) => {
    console.log(e.target.files);
    this.setState({ file: e.target.files[0] });
    /*this.input.current.value;
    this.handleImageChange.bind(this); */
  };

  handleSubmit(formProps) {
    this.setState({ Loading: true });
    inputObj = formProps;
    // this.props.posApiList(formProps);
    this.setState({ Loading: false });
  }

  newclick = () => {
    this.props.closeModal();
  };

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

  handleChange(e) {
    var tmp;
    for (var key in this.props.rows) {
      if (e.target.value === this.props.rows[key].username) tmp = key;
    }
    this.props.change("regno", this.props.rows[tmp].regno);
  }

  render() {
    const { handleSubmit } = this.props;
    const { error } = this.props;
    const { rows } = this.props;
    const divStyle = {
      width: "inherit",
    };
    console.log(this.props.rows)
    var currentdate = new Date();
    function vatFormatter(cell, row) {
      if (row.type === 1) {
        return "UI";
      }
      if (row.type === 2) {
        return "API";
      }
    }
    function vatFormatter1(cell, row) {
      if (row.bit === 1) {
        return "64 bit";
      }
      if (row.bit === 2) {
        return "32 bit";
      }
    }
    return (
      <Modal
        isOpen={this.props.modalOpen}
        closeModal={() => this.setState({ modalOpen: false })}
        className="animatedpopup animated fadeIn customPopUp"
      >
        <form id="popupform">
        <div className="col-md-6">
          <div className="animated fadeIn ">
            <div className="card-header">
              <strong> </strong>
            </div>
            <div className="card-header">
              <strong> </strong>
            </div>
            <div className="row"></div>
            <div className="card-header">
              <strong>&lt;&lt; Файлуудын байршил</strong>
            </div>




        <div className="row">
          <div className="col-lg-12">
            <div className="card">
              <div className="card-block tmpresponsive">
                <BootstrapTable
                   data={rows}
                  hover={true}
                  ref="table"
                  pagination={true}
                  tableHeaderClass="tbl-header-class sticky-header"
                  tableBodyClass="tbl-body-class"
                //   options={options}
                  bordered={true}
                //   selectRow={selectRowProp}
                  condensed
                  maxHeight={"552px"}
                  striped={true}
                >
                  <TableHeaderColumn
                    dataField="id"
                    headerAlign="center"
                    isKey={true}
                    dataAlign="center"
                    dataSort={true}
                  >
                    <span className="descr"> Төрөл </span>
                  </TableHeaderColumn>
                  <TableHeaderColumn
                    dataField="type"
                    headerAlign="center"
                    dataAlign="center"
                    dataSort={true}
                    dataFormat={vatFormatter1}
                  >
                    <span className="descr"> Version </span>
                  </TableHeaderColumn>
                  <TableHeaderColumn
                    dataField="bit"
                    headerAlign="center"
                    dataAlign="center"
                    dataSort={true}
                    dataFormat={vatFormatter}
                  >
                    <span className="descr"> Bit </span>
                  </TableHeaderColumn>
                  <TableHeaderColumn
                    dataField="url"
                    headerAlign="center"
                    dataAlign="center"
                    dataSort={true}
                  >
                    <span className="descr"> URL </span>
                  </TableHeaderColumn>
                </BootstrapTable>
              </div>
              <div className="card-footer card-right">
                    {error && <div className="caution">{error}</div>} <br />
                    <button
                      type="button"
                      className="btn btn-sm btn-primary button-ban"
                      onClick={() => this.hiddenclick()}
                    >
                      <i className="fa fa-ban" /> Болих
                    </button>
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
  console.log(state.updatepopup)
  var total = 0;
  for (var i = 0; i < state.customer.rows.length; i++) {
    total++;
  }

  return {
    rows: state.updatepopup.rows,
    columns: state.customer.columns,
    total: total,
  };
}
export default connect(mapStateToProps, {UpdatePopUp})(
  form(UpdatePopUps)
);