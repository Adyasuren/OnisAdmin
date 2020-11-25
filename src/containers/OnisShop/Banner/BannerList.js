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
    positionClass : 'toast-top-center',
    hideDuration: 1000,
    timeOut: 4000,
    closeButton: true
  }

class Components extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
    };
  }

  handleReload = () => {
    let tmp = {};
    tmp.startdate = this.refs.startCreatedDate.value;
    tmp.enddate = this.refs.endCreatedDate.value;
    this.props.GetAllBanner(tmp);
  }

Btn = (cell, row) => {
    ShopBannerApi.DisableBanner(row.id, localStorage.getItem("id")).then(res => {
      if(res.success)
      {
        toastr.success("Амжилттай идэвхигүй болголоо.");
        this.handleReload();
      }
      else
      {
        toastr.error(res.message);
      }
    });
  }
  
  handleNew = () => {
      this.openModal();
  }

  openModal = () => {
    this.setState({ isOpen: true });
  }

  closeModal = (success) => {
    this.setState({ isOpen: false })
    if(success === true)
    {
      this.handleReload();
    }
  }

  render() {
    const { data, isLoading } = this.props;
    const { isOpen } = this.state;
    return (
      <div className="animated fadeIn">
        <div className="row">
          <div className="col-lg-12 col-md-12 col-sm-12">
            <div className="card">
              <div className="card-header">
                <form id="myForm">
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
                </form>
              </div>
              <div className="card-block col-md-12 col-lg-12 col-sm-12 tmpresponsive">
                <TableFok title={ShopBannerTableTitle} rowClick={this.rowClick} data={data} disableBtn={this.disableBtn} />
              </div>
            </div>
          </div>
        </div>
        <div>
          <button type="button" className="btn btn-primary" onClick={this.handleReload}>
            <i className={`fa fa-cog ${isLoading ? 'fa-spin' : ''}`} />
            Ачаалах
          </button>
          <button type="button" className="btn btn-success mr-1-rem" onClick={this.handleNew}>
            <i className="fa fa-file-text-o" />
            Шинэ
          </button>
        </div>
        <BannerModal isOpen={isOpen} openModal={this.openModal} closeModal={this.closeModal} />
      </div>
    );
  }
}

const form = reduxForm({ form: "shopBannerList" });

function mapStateToProps(state) {
  return {
    data: state.shopBannerList.data,
    isLoading: state.shopBannerList.isLoading,
    initialValues: {
      startCreatedDate: new Date().toISOString().slice(0, 10),
      endCreatedDate: new Date().toISOString().slice(0, 10),
    },
  }
}

export default connect(mapStateToProps, { GetAllBanner })(form(Components));
