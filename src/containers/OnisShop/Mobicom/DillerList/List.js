import React, { Component } from "react";
import { connect } from "react-redux";
import { Field, reduxForm } from "redux-form";
import TableFok from "../../../../components/TableFok";
import { DillerListTableTitle } from "./TableTitle"
import swal from 'sweetalert';
import toastr from 'toastr'
import 'toastr/build/toastr.min.css'
import { GetAllDillerList } from "../../../../actions/OnisShop/MobicomAction";
import MobicomApi from "../../../../api/OnisShop/MobicomApi";
import Modal from "./Modal";

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
      selectedRow: null,
    };
  }

  componentDidMount() {
   
  }

  handleEdit = () => {
    if (this.state.selectedRow != null) {
      this.openModal();
    } else {
      console.log("Мөр сонго");
    }
  };

openModal = () => {
  this.setState({ isOpen: true });
}

closeModal = (isReload) => {
  this.setState({ isOpen: false }, () => {
    if(isReload)
    {
      this.handleReload();
    }
  });
};

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

  handleReload = () => {
    let tmp = {}
    tmp.startymd = this.refs.startDate.value;
    tmp.endymd = this.refs.endDate.value;
    tmp.dealerregno = this.refs.dillerRegno.value;
    tmp.regno = this.refs.storeRegno.value;
    this.props.GetAllDillerList(tmp)
  }

  disableBtn = (cell, row) => {
    let tmp = {
        id: row.id,
        dealername: row.dealername,
        dealerregno: row.dealerregno,
        isenable: row.isenable == 1 ? 2 : 1
    }
    let qustText = tmp.isenable == 1 ? "идэвхижүүлэхдээ" : "цуцлахдаа"
    swal(`${tmp.dealername} - диллерийг ${qustText} итгэлтэй байна уу ?`, {
      buttons: ["Үгүй", "Тийм"],
    }).then(value => {
      if(value) {
        MobicomApi.EditDiller(tmp).then((res) => {
          if(res.success) {
            toastr.success(res.message);
            this.handleReload();
          } else {
            toastr.error(res.message);
          }
        });
      }
    });
  }

  render() {
    const { data, isLoading } = this.props;
    const { isOpen, selectedRow } = this.state;
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
                            ref="startDate"
                            name="startDate"
                            component="input"
                            type="date"
                            className="form-control dateclss"
                          />
                          <Field
                            ref="endDate"
                            name="endDate"
                            component="input"
                            type="date"
                            className="form-control dateclss mr-l-05-rem"
                          />
                        </div>
                      </div>
                      <div className="form-group col-sm-1.3 mr-1-rem">
                        <label>
                        Диллерийн РД
                        </label>
                        <Field
                          ref="dillerRegno"
                          name="dillerRegno"
                          component="input"
                          type="text"
                          className="form-control"
                        />
                      </div>
					            <div className="form-group col-sm-1.3 mr-1-rem">
                        <label>
                          Дэлгүүрийн РД
                        </label>
                        <Field
                          ref="storeRegno"
                          name="storeRegno"
                          component="input"
                          type="text"
                          className="form-control"
                        />
                      </div>	
                     		
                    </div>
                </form>
              </div>
              <div className="card-block col-md-12 col-lg-12 col-sm-12 tmpresponsive">
                <TableFok title={DillerListTableTitle} data={data} disableBtn={this.disableBtn} rowClick={this.rowClick}/>
              </div>
            </div>
          </div>
        </div>
        <div>
          <button type="button" className="btn btn-primary" onClick={this.handleReload}>
            <i className={`fa fa-cog ${isLoading ? 'fa-spin' : ''}`} />
            Ачаалах
          </button>
          <button
            type="button"
            className="btn btn-edit-new mr-1-rem"
            onClick={this.handleEdit}
          >
            <i className="fa fa-paper-plane-o" />
            Засах
          </button>
        </div>
        <Modal isOpen={isOpen} openModal={this.openModal} closeModal={this.closeModal} selectedRow={selectedRow} />
      </div>
    );
  }
}

const form = reduxForm({ form: "mobiDillerChargeList" });

function mapStateToProps(state) {
  console.log(state)
  return {
    data: state.shopMobicom.data,
    initialValues: {
      startDate: new Date().toISOString().slice(0, 10),
      endDate: new Date().toISOString().slice(0, 10),
    },
  }
}

export default connect(mapStateToProps, { GetAllDillerList })(form(Components));
