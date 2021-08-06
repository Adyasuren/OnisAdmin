import React, { Component } from "react";
import { connect } from "react-redux";
import { Field, reduxForm } from "redux-form";
import TableFok from "../../../components/TableFok";
import { NonVatProductsTableTitle } from "./TableTitle"
import {
  GetProduct
} from "../../../actions/OnisShop/NonVatProductAction";;
import NonVatModal from "./Modal"

class Components extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      isNew: true,
      selectedRow: null,
    };
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

  handleEdit = () => {
    if (this.state.selectedRow != null) {
      this.setState({ isNew: false })
      this.openModal();
    } else {
      console.log("Мөр сонго");
    }
  };

  handleNew = () => {
    this.setState({ isNew: true }, () => {
      this.openModal();
    });
  };

  openModal = () => {
    this.setState({ isOpen: true });
  };

  closeModal = (isReload) => {
    this.setState({ isOpen: false }, () => {
      if (isReload) {
        this.handleReload();
      }
    });
  };

  closeHistoryModal = () => {
    this.setState({ isOpenHistory: false });
  };

  handleReload = () => {
    let tmp = {
      barcode: this.refs.barcode.value ? this.refs.barcode.value : null,
      regno: this.refs.regno.value ? this.refs.regno.value : null
    }
    this.props.GetProduct(tmp);
  }

  render() {
    const { isOpen, isNew, selectedRow } = this.state;
    const { data } = this.props;
    return (
      <div className="animated fadeIn">
        <div className="row">
          <div className="col-lg-12 col-md-12 col-sm-12">
            <div className="card">
              <div className="card-header">
                <form id="myForm">
                  <div className="row" name="formProps">
                    <div className="form-group col-sm-1.3 mr-1-rem">
                      <label>Бар код</label>
                      <Field
                        ref="barcode"
                        name="barcode"
                        component="input"
                        type="text"
                        className="form-control"
                      />
                    </div>
                    <div className="form-group col-sm-1.3 mr-1-rem">
                      <label>Дэлгүүрийн РД</label>
                      <input
                        ref="regno"
                        name="regno"
                        type="text"
                        maxLength="10"
                        className="form-control"
                      />
                    </div>
                  </div>
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
                    Ачаалах
                  </button>
                </form>
              </div>
              <div className="card-block col-md-12 col-lg-12 col-sm-12 tmpresponsive">
                <TableFok
                  title={NonVatProductsTableTitle}
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
            Ачаалах
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
        <NonVatModal
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

const form = reduxForm({ form: "masterList1" });

function mapStateToProps(state) {
  return {
    data: state.nonVatProduct.data,
    initialValues: {
      invoiceDate: new Date().toISOString().slice(0, 10),
      paymentDate: new Date().toISOString().slice(0, 10),
    },
  };
}

export default connect(mapStateToProps, {
  GetProduct
})(form(Components));
