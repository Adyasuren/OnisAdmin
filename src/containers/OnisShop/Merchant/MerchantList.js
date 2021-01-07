import React, { Component } from "react";
import { connect } from "react-redux";
import { Field, reduxForm, resetSection } from "redux-form";
import TableFok from "../../../components/TableFok";
import {
  GetAllColumns,
  GetMerchantData,
  GetHistory,
} from "../../../actions/OnisShop/MerchantAction";
import { MerchantTableTitle } from "./TableTitle";
import toastr, { info } from "toastr";
import MerchantHistory from "./MerchantHistory";
import "toastr/build/toastr.min.css";
toastr.options = {
  positionClass: "toast-top-center",
  hideDuration: 1000,
  timeOut: 4000,
  closeButton: true,
};

class Components extends Component {
  constructor(props) {
    super(props);
    this.state = {
      columns: [],
      data: [],
      isOpen: false,
      history: [],
    };
  }

  componentDidMount() {
    if(MerchantTableTitle.length === 2){
      this.props.GetAllColumns().then((columnRes) => {
        if (columnRes.success) {
          columnRes.data.map((item) => {
            let obj = {
              data: item.code,
              label: item.name,

              format: "merchantType",
              props: {
                width: "80px",
                dataSort: true,
              },
            };
            
            MerchantTableTitle.push(obj);
          });
          this.setState({ columns: MerchantTableTitle });
        }
      });
    } else {
      this.setState({ columns: MerchantTableTitle });
    }
  }
 handleChange(e) {
   let isChecked = e.target.checked;
   //do whatever you want with isChecked value
  }
  openModal = () => {
    this.setState({ isOpen: true });
  };

  handleReload = () => {
    let tmp = {
      regno: this.refs.regNum.value === undefined ? "" : this.refs.regNum.value,
      phoneno:
        this.refs.phoneNo.value === undefined ? 0 : Number(this.refs.phoneNo.value),
      distcode: "",
      startdate: this.refs.startCreatedDate.value,
      enddate: this.refs.endCreatedDate.value,
    };
    let data = [];
    this.props.GetMerchantData(tmp).then((res) => {
      if (res.success) {
        res.data.map((item, i) => {
          let dataObj = {};
          dataObj.rank = i + 1;
          dataObj.storeid = item.storeid;
          dataObj.storename = item.storename;
          dataObj.regno = item.regno;
          item.services.map((item1) => {
            dataObj[item1.servicecode] = item1.status;
          });
          data.push(dataObj);
        });
        this.setState({ data });
      }
    });
  };
  getCheckboxValue(event) {
    const value = event.target.value;
}
  headerClick = (row, columnIndex, rowIndex) => {
    const { columns } = this.state;
    if (!isNaN(columns[columnIndex].data)) {
      this.props
        .GetHistory(row.storeid, columns[columnIndex].data)
        .then((res) => {
          if (res.success) {
            console.log(res);
            if (res.data.length > 0) {
              console.log(res.data);
              this.setState({ history: res.data }, () => {
                this.openModal();
              });
            }
          }
        });
    }
  };
  renderStoreList = () => {
    const { storeList } = this.props;
    let tmp = storeList.map((item, i) => {
      return (
        <option key={i} value={item.regno}>
          {`${item.storenm}`}
        </option>
      );
    });
    return tmp;
  };
  render() {
    const { columns, data } = this.state;
    const { isLoading } = this.props;
    return (
      <div className="animated fadeIn">
        <div className="row">
          <div className="col-lg-12 col-md-12 col-sm-12">
            <div className="card">
              <div className="card-header">
                <form id="myForm">
                  <div className="row" name="formProps">
                    <div className="form-group col-sm-1.3 mr-1-rem">
                      <label>Бүртгүүлсэн огноо</label>
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
                    <div className="form-group col-sm-1.3 mr-1-rem">
                      <label>Татвар төлөгчийн дугаар</label>
                      <input type="text" list="data" name="regNum" ref="regNum" className="form-control" style={{ width: "100%" }} autoComplete="off"/>
                  <datalist id="data">
                    {this.renderStoreList()}
                  </datalist>
                    </div>
                    <div className="form-group col-sm-1.3 mr-1-rem">
                      <label>Утасны дугаар</label>
                      <input
                        ref="phoneNo"
                        name="phoneNo"
                        type="Number"
                        maxLength="8"
                        className="form-control"
                      />
                    </div>
                  </div>
                </form>
              </div>
              <div className="card-block col-md-12 col-lg-12 col-sm-12 tmpresponsive">
                <TableFok
                  title={columns}
                  data={data}
                  rowClick={this.headerClick}
                />
              </div>
            </div>
          </div>
        </div>
        <div>
          <button
            type="button"
            className="btn btn-primary"
            onClick={this.handleReload}
          >
            <i className={`fa fa-cog ${isLoading ? "fa-spin" : ""}`} />
            Ачаалах
          </button>
        </div>
        <MerchantHistory
          modalOpen={this.state.isOpen}
          history={this.state.history}
          closeModal={() => this.setState({ isOpen: false })}
        />
      </div>
    );
  }
}

const form = reduxForm({ form: "merchantList" });

function mapStateToProps(state) {
  return {
    data: state.merchantReducer.data,
    columns: state.merchantReducer.columns,
    storeList: state.OnisShop.rows,
    initialValues: {
      startCreatedDate: new Date().toISOString().slice(0, 10),
      endCreatedDate: new Date().toISOString().slice(0, 10),
    },
  };
}

export default connect(mapStateToProps, {
  GetAllColumns,
  GetMerchantData,
  GetHistory,
})(form(Components));
