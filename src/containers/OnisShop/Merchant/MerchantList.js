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

let searchobj = {}

class Components extends Component {
  constructor(props) {
    super(props);
    this.state = {
      columns: [],
      data: [],
      isOpen: false,
      history: [],
      footerData: [],
      sumConnection: 0,
    };
  }

  componentDidMount() {
    if (MerchantTableTitle.length === 3) {
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

  handleReload = (e) => {
    e.preventDefault();
    let tmp = {
      regno: this.refs.regNum.value === undefined ? "" : this.refs.regNum.value,
      phoneno: 0,
      name: this.refs.name.value === undefined ? "" : this.refs.name.value,
      distcode: "",
      startdate: this.refs.startCreatedDate.value,
      enddate: this.refs.endCreatedDate.value,
      saler: this.refs.saler.value === undefined ? "" : this.refs.saler.value,
    };
    let tableData = [];
    searchobj = tmp;
    this.props.GetMerchantData(tmp).then((res) => {
      if (res.success) {
        res.data.map((item, i) => {
          let dataObj = {};
          dataObj.rank = i + 1;
          dataObj.storeid = item.storeid;
          dataObj.storename = item.storename;
          dataObj.regno = item.regno;
          console.log(item);
          item.services.map((item1) => {
            dataObj[item1.servicecode] = item1.status;
          });
          tableData.push(dataObj);
        });
        let tmp = [
          [
            {
              label: "Нийт",
              columnIndex: 1,
            },
          ],
        ];
        let sumConnection = 0;
        if (this.props.columns) {
          let index = 4;
          this.props.columns.map((item) => {
            let sum = 0;
            tableData.map((item1, i) => {
              if (item1[item.code] !== undefined && item1[item.code] !== NaN) {
                if (item1[item.code] == 1) sum++;
              }
            });
            tmp[0].push({
              label: "0",
              columnIndex: index,
              align: "center",
              formatter: () => {
                return (
                  <strong>
                    {sum === 0
                      ? "-"
                      : sum.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                  </strong>
                );
              },
            });
            sumConnection += sum;
            index++;
          });
        }
        this.setState({ data: tableData, footerData: tmp, sumConnection });
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
            if (res.data.length > 0) {
              this.setState({ history: res.data }, () => {
                this.openModal();
              });
            }
          }
        });
    }
  };

  generateFooterItems = (index, label) => {
    let tmp = {
      label: "0",
      columnIndex: index,
      align: "center",
      formatter: (data) => {
        let sum = 0;
        data.map((item, i) => {
          if (item[label] !== undefined && item[label] !== NaN) {
            sum += item[label];
          }
        });
        return (
          <strong>
            {sum === 0
              ? "-"
              : sum.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
          </strong>
        );
      },
    };
    return tmp;
  };

  render() {
    const { columns, data, footerData, sumConnection } = this.state;
    const { isLoading } = this.props;
    /* const footerData = [
      [
        {
          label: "Нийт",
          columnIndex: 1
        },
        this.generateFooterItems(8, "dealerbalance"),
      ]
    ]; */
    return (
      <div className="animated fadeIn">
        <div className="row">
          <div className="col-lg-12 col-md-12 col-sm-12">
            <div className="card">
              <div className="card-header">
                <form id="myForm" onSubmit={this.handleReload}>
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
                      <input
                        ref="regNum"
                        name="regNum"
                        type="text"
                        maxLength="10"
                        className="form-control"
                      />
                    </div>
                    <div className="form-group col-sm-1.3 mr-1-rem">
                      <label>Татвар төлөгчийн нэр</label>
                      <input
                        ref="name"
                        name="name"
                        type="text"
                        maxLength="10"
                        className="form-control"
                      />
                    </div>
                    <div className="form-group col-sm-1.3 mr-1-rem">
                      <label>Борлуулагч</label>
                      <input
                        ref="saler"
                        name="saler"
                        type="text"
                        maxLength="10"
                        className="form-control"
                      />
                    </div>
                    {/*  <div className="form-group col-sm-1.3 mr-1-rem">
                      <label>Утасны дугаар</label>
                      <input
                        ref="phoneNo"
                        name="phoneNo"
                        type="Number"
                        maxLength="8"
                        className="form-control"
                      />
                    </div> */}
                  </div>
                  <button
                    type="submit"
                    className="btn btn-primary"
                    style={{ float: 'right' }}
                  >
                    <i className={`fa fa-cog ${isLoading ? "fa-spin" : ""}`} />
                    Ачаалах
                  </button>
                </form>
              </div>
              <div className="card-block col-md-12 col-lg-12 col-sm-12 tmpresponsive">
                <TableFok
                  title={columns}
                  data={data}
                  sumValue={sumConnection}
                  sumValueText={"Нийт холболт хийгдсэн: "}
                  footerData={footerData}
                  rowClick={this.headerClick}
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
            <i className={`fa fa-cog ${isLoading ? "fa-spin" : ""}`} />
            Ачаалах
          </button>
        </div> */}
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
    initialValues:Object.keys(searchobj).length === 0 ? {
      startCreatedDate: new Date().toISOString().slice(0, 10),
      endCreatedDate: new Date().toISOString().slice(0, 10),
    }: {
      startCreatedDate: new Date(searchobj.startdate).toISOString().slice(0, 10),
      endCreatedDate: new Date(searchobj.enddate).toISOString().slice(0, 10)
    }
  };
}

export default connect(mapStateToProps, {
  GetAllColumns,
  GetMerchantData,
  GetHistory,
})(form(Components));
