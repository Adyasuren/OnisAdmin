import React, { Component } from "react";
import { connect } from "react-redux";
import { Field, reduxForm } from "redux-form";
import TableFok from "../../../components/TableFok";
import { ShopBannerTableTitle } from "./TableTitle"
import { GetAllBanner } from "../../../actions/OnisShop/ShopBannerAction";
import ShopBannerApi from "../../../api/OnisShop/ShopBannerApi";
import toastr from 'toastr'
import BannerModal from "./BannerModal";
import 'toastr/build/toastr.min.css'
toastr.options = {
  positionClass: 'toast-top-center',
  hideDuration: 1000,
  timeOut: 4000,
  closeButton: true
}

let searchobj = {}

class Components extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      isNew: true,
      selectedRow: null,
    };
  }
  handleReload = (e) => {
    e.preventDefault();
    let tmp = {};
    tmp.startdate = this.refs.startCreatedDate.value;
    tmp.enddate = this.refs.endCreatedDate.value;
    searchobj = tmp;
    this.props.GetAllBanner(tmp);
  }
  disableBtn = (cell, row) => {
    let formProps = {}
    formProps.id = row.id;
    formProps.bannernm = row.bannernm;
    formProps.startymd = row.startymd;
    formProps.endymd = row.endymd;
    formProps.insby = Number(localStorage.getItem("id"));
    formProps.isenable = row.isenable == 1 ? 2 : 1;
    ShopBannerApi.EditBanner(formProps).then((res) => {
      if (res.success) {
        if (formProps.isenable == 1) {
          toastr.success("Амжилттай идэвхитэй болголоо.");
        } else {
          toastr.success("Амжилттай идэвхигүй болголоо.");
        }
        this.closeModal(res.success);
      } else {
        toastr.error(res.message);
      }
    })
  }

  handleNew = () => {
    this.openModal();
  };

  openModal = () => {
    this.setState({ isOpen: true });
  }

  closeModal = (success) => {
    this.setState({ isOpen: false })
    if (success === true) {
      this.handleReload();
    }
  }
  rowClick = (row) => {
    const { selectedRow } = this.state;
    if (this.state.selectedRow === null) {
      this.setState({ selectedRow: row });
    }
    else {
      if (selectedRow.rank !== row.rank) {
        this.setState({ selectedRow: row });
      }
      else {
        this.setState({ selectedRow: null });
      }
    }
  }

  handleEdit = () => {
    if (this.state.selectedRow != null) {
      this.setState({ isNew: false }, () => {
        this.openModal();
      });
    } else {
      toastr.error("Засах мөр сонгоно уу.")
    }
  };

  handleNew = () => {
    this.setState({ isNew: true }, () => {
      this.openModal();
    });
  }

  openModal = () => {
    this.setState({ isOpen: true });
  }

  closeModal = (success) => {
    this.setState({ isOpen: false })
    if (success === true) {
      this.handleReload();
    }
  }

  render() {
    const { data, isLoading } = this.props;
    const { isOpen, isNew, selectedRow } = this.state;
    return (
      <div className="animated fadeIn">
        <div className="row">
          <div className="col-lg-12 col-md-12 col-sm-12">
            <div className="card">
              <div className="card-header">
                <form id="myForm" onSubmit={this.handleReload}>
                  <div className="row" name="formProps">
                    <div className="form-group col-sm-1.3 mr-1-rem">
                      <label>Бүртгэсэн огноо</label>
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
                  </div>
                  <button type="button" className="btn btn-edit-new mr-1-rem" style={{float:'right'}} onClick={this.handleEdit}>
                    <i className="fa fa-paper-plane-o" />
                    Засах
                  </button>
                  <button type="button" className="btn btn-success mr-1-rem" style={{float:'right'}} onClick={this.handleNew}>
                    <i className="fa fa-file-text-o" />
                    Шинэ
                  </button>
                  <button type="submit" className="btn btn-primary" style={{float:'right'}}>
                    <i className={`fa fa-cog ${isLoading ? 'fa-spin' : ''}`} />
                    Ачаалах
                  </button>
                </form>
              </div>
              <div className="card-block col-md-12 col-lg-12 col-sm-12 tmpresponsive">
                <TableFok title={ShopBannerTableTitle} rowClick={this.rowClick} data={data} disableBtn={this.disableBtn} />
              </div>
            </div>
          </div>
        </div>
        {/* <div>
          <button type="button" className="btn btn-primary" onClick={this.handleReload}>
            <i className={`fa fa-cog ${isLoading ? 'fa-spin' : ''}`} />
            Ачаалах
          </button>
          <button type="button" className="btn btn-success mr-1-rem" onClick={this.handleNew}>
            <i className="fa fa-file-text-o" />
            Шинэ
          </button>
          <button type="button" className="btn btn-edit-new mr-1-rem" onClick={this.handleEdit}>
            <i className="fa fa-paper-plane-o" />
            Засах
          </button>
        </div> */}
        <BannerModal isNew={isNew} isOpen={isOpen} openModal={this.openModal} closeModal={this.closeModal} selectedRow={selectedRow} />
      </div>

    );
  }
}

const form = reduxForm({ form: "shopBannerList" });

function mapStateToProps(state) {
  return {
    data: state.shopBannerList.data,
    isLoading: state.shopBannerList.isLoading,
    initialValues: Object.keys(searchobj).length === 0 ?  {
      startCreatedDate: new Date().toISOString().slice(0, 10),
      endCreatedDate: new Date().toISOString().slice(0, 10),
    }: {
      startCreatedDate: new Date(searchobj.startdate).toISOString().slice(0, 10),
      endCreatedDate: new Date(searchobj.enddate).toISOString().slice(0, 10)
    }
  };
}

export default connect(mapStateToProps, { GetAllBanner })(form(Components));
