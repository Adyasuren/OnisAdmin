import React, { Component } from "react";
import { Field, reduxForm } from "redux-form";
import { connect } from "react-redux";
import { insertLicense } from "../../actions/license_action";
import {
  insertPayment,
  getPaymentListtmp,
  cancelEdit
} from "../../actions/transac_action";
import { getCustomer } from "../../actions/customer_action";
import {
  BootstrapTable,
  TableHeaderColumn,
  SizePerPageDropDown
} from "react-bootstrap-table";
import "react-bootstrap-table/dist/react-bootstrap-table.min.css";
import UserAddPopup from "./UserAddPopup";
import licenseApi from "../../api/licenseApi";
import MDSpinner from "react-md-spinner";
import niceAlert from "sweetalert";


class TransacAdd extends Component {
  constructor(props) {
    super(props);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleChanges = this.handleChanges.bind(this);
    this.Change = this.Change.bind(this);
    this.state = {
      value: true,
      isActive: false,
      selectedRows: [],
      modalOpen: false,
      isLoading: false
    };
  }
  handleFormSubmit(formProps) {
    if (formProps.payamt > 0) {
      this.setState({ isLoading: true });
      let userName = this.state.selectedRows.map((item, i) => {
        return { userName: item.username };
      });
      let tmp = {
        paymentType: formProps.typeid,
        payedAmount: formProps.payamt,
        description: formProps.description,
        userName: userName
      };
      licenseApi.insertMultipleCustomerPayment(tmp).then(Response => {
        this.setState({ isLoading: false });
        console.log(Response);
        niceAlert(Response.message);
        window.location.href = "/paymentlist";
      });
    } else {
      niceAlert("Төлсөн дүн 0 байж болохгүй!");
    }
  }

  handleChange(e) {
    var tmp;
    for (var key in this.props.rows) {
      if (e.target.value === this.props.rows[key].username) tmp = key;
    }
    this.props.change("storename", this.props.rows[tmp].storename);
    this.props.change("regnum", this.props.rows[tmp].regnum);
    this.props.change("phonenumber", this.props.rows[tmp].phonenum);
  }
  handleChanges(e) {
    this.props.checkemail(e.target.value);
  }
  Change() {
    this.props.checkregnum(1);
  }
  cellButton(cell, row, formatExtraData, rowIdx) {
    return (
      <button className="button" onClick={() => this.handleRemove(row)}>
        <i className="fa fa-trash-o" />
      </button>
    );
  }



  toggleModal = () => {
    this.setState({
      modalOpen: !this.state.modalOpen
    });
  };

  render() {
    console.log("transacAdd");
    const { handleSubmit } = this.props;
    

    if (this.state.isLoading === true) {
      return <MDSpinner className="spinner" size={100} />;
    }
    return (
      <form name="TransAdd" onSubmit={handleSubmit(this.handleFormSubmit)}>
        <div className="card-block">
                  <button
                    type="button"
                    className="btn btn-sm btn-primary button-save"
                    onClick={this.toggleModal}
                  >
                    + Хэрэглэгч нэмэх
                  </button>
                </div>
        <UserAddPopup
          modalOpen={this.state.modalOpen}
          closeModal={() => this.setState({ modalOpen: false })}
          handleSelectedRow={this.handleSelectedRow}
        />
      </form>
    );
  }
}

const form = reduxForm({ form: "TransacAdd", enableReinitialize: true });

function mapStateToProps(state) {
  return {
    rows: state.customer.rows,
    columns: state.customer.columns,
    message: state.licenseAdd.message,
    initialValues: {
      beginDate: new Date().toISOString().slice(0, 10)
    }
  };
}
export default connect(
  mapStateToProps,
  { insertLicense, getCustomer, insertPayment, getPaymentListtmp, cancelEdit }
)(form(TransacAdd));
