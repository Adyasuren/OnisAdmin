import React, { Component } from "react";
import { connect } from "react-redux";
import { Field, reduxForm } from "redux-form";
import TableFok from "../../../components/TableFok";
import { ShopUserListTableTitle } from "./TableTitle";
import { GetAllUserList } from "../../../actions/OnisShop/UserListAction";
import UserModal from "./UserModal";

let searchobj = {};

class Components extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      isNew: true,
      selectedRow: null,
      selectedProvince: 0,
      selectedDistrict: 0,
      selectedDistricts: [],
    };
  }

  handleReload = (e) => {
    e.preventDefault();
    let tmp = {};
    tmp.startdate = this.refs.startCreatedDate.value;
    tmp.enddate = this.refs.endCreatedDate.value;
    tmp.regno =
      this.refs.regNum.value == undefined ? "" : this.refs.regNum.value;
    tmp.phoneno =
      this.refs.phoneno.value == undefined
        ? 0
        : Number(this.refs.phoneno.value);
    tmp.provinceid = this.state.selectedProvince;
    tmp.committeeid = 0;
    tmp.districtid = this.state.selectedDistrict;
    tmp.saler = this.refs.saler.value == undefined ? "" : this.refs.saler.value;
    /*  tmp.distcode = this.refs.distcode.value == undefined ? "" : this.refs.distcode.value; */
    tmp.name = this.refs.NAME.value == undefined ? "" : this.refs.NAME.value;
    tmp.version =
      this.refs.version.value == undefined ? "" : this.refs.version.value;
    searchobj = tmp;
    this.props.GetAllUserList(tmp);
  };

  renderProvince = () => {
    const { districts } = this.props;
    let tmp = districts.map((item, i) => {
      return (
        <option key={i} data-value={item.provinceid} value={item.provincenm} />
      );
    });

    return tmp;
  };

  onChangeProvince = (e) => {
    const { districts } = this.props;
    if (districts) {
      let value = districts.find((item) => item.provincenm == e.target.value);
      this.refs.distcode.value = "";
      if (value)
        this.setState({
          selectedDistricts: value.districts,
          selectedProvince: value.provinceid,
        });
      else
        this.setState({
          selectedDistricts: [],
          selectedProvince: 0,
          selectedDistrict: 0,
        });
    }
  };

  renderDistricts = () => {
    const { selectedDistricts } = this.state;
    let tmp = selectedDistricts.map((item, i) => {
      return (
        <option key={i} data-value={item.districtid} value={item.districtnm} />
      );
    });
    return tmp;
  };

  onChangeDistrict = (e) => {
    const { selectedDistricts } = this.state;
    if (selectedDistricts) {
      let value = selectedDistricts.find(
        (item) => item.districtnm == e.target.value
      );
      if (value) this.setState({ selectedDistrict: value.districtid });
      else this.setState({ selectedDistrict: 0 });
    }
  };

  openModal = () => {
    this.setState({ isOpen: true });
  };

  closeModal = (success) => {
    this.setState({ isOpen: false });
    if (success === true) {
      this.handleReload();
    }
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

  handleNew = () => {
    this.setState({ isNew: true }, () => {
      this.openModal();
    });
  };

  handleEdit = () => {
    if (this.state.selectedRow != null) {
      this.setState({ isNew: false }, () => {
        this.openModal();
      });
    } else {
      console.log("Мөр сонго");
    }
  };

  render() {
    const { isOpen, isNew, selectedRow } = this.state;
    const { data } = this.props;
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
                      <label>Татвар төлөгчийн нэр</label>
                      <input
                        ref="NAME"
                        name="NAME"
                        type="string"
                        className="form-control"
                        maxLength="15"
                      />
                    </div>
                    <div className="form-group col-sm-1.3 mr-1-rem">
                      <label>Татвар төлөгчийн дугаар</label>
                      <input
                        name="regNum"
                        ref="regNum"
                        type="text"
                        className="form-control"
                        maxLength="10"
                      />
                    </div>
                    <div className="form-group col-sm-1.3 mr-1-rem">
                      <label>Утасны дугаар</label>
                      <input
                        name="phoneno"
                        ref="phoneno"
                        maxLength="8"
                        type="Number"
                        className="form-control"
                      />
                    </div>
                    <div className="form-group col-sm-1.3 mr-1-rem">
                      <label>Борлуулагчын нэр</label>
                      <input
                        name="saler"
                        ref="saler"
                        type="text"
                        className="form-control"
                      />
                    </div>
                    <div className="form-group col-sm-1.3 mr-1-rem">
                      <label>Аймаг/Хот</label>
                      <input
                        type="text"
                        list="custom-datalist"
                        name="province"
                        ref="province"
                        className="form-control"
                        style={{ width: "100%" }}
                        autoComplete="off"
                        onChange={this.onChangeProvince}
                      />
                      <datalist id="custom-datalist">
                        <select>{this.renderProvince()}</select>
                      </datalist>
                    </div>
                    <div className="form-group col-sm-1.3 mr-1-rem">
                      <label>Сум/Дүүрэг</label>
                      <input
                        type="text"
                        list="custom-datalist1"
                        name="distcode"
                        ref="distcode"
                        className="form-control"
                        style={{ width: "100%" }}
                        autoComplete="off"
                        onChange={this.onChangeDistrict}
                      />
                      <datalist id="custom-datalist1">
                        <select>{this.renderDistricts()}</select>
                      </datalist>
                    </div>
                    <div className="form-group col-sm-1.3 mr-1-rem">
                      <label>Хувилбар</label>
                      <input
                        name="version"
                        ref="version"
                        type="number"
                        className="form-control"
                      />
                    </div>
                  </div>
                  <button
                    type="button"
                    className="btn btn-edit-new mr-1-rem"
                    style={{ float: "right" }}
                    onClick={this.handleEdit}
                  >
                    <i className="fa fa-paper-plane-o" />
                    Засах
                  </button>
                  <button
                    type="submit"
                    className="btn btn-primary"
                    style={{ float: "right" }}
                  >
                    <i className="fa fa-retweet" />
                    Ачаалах
                  </button>
                </form>
              </div>
              <div className="card-block col-md-12 col-lg-12 col-sm-12 tmpresponsive">
                <TableFok
                  title={ShopUserListTableTitle}
                  data={data}
                  rowClick={this.rowClick}
                />
              </div>
            </div>
          </div>
        </div>
        {/* <div>
          <button type="button" className="btn btn-primary" onClick={this.handleReload}>
            <i className="fa fa-retweet" />
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
          </div> */}
        <UserModal
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

const form = reduxForm({ form: "shopUserlist" });

function mapStateToProps(state) {
  return {
    data: state.shopUserList.data,
    districts: state.district.data,
    initialValues:
      Object.keys(searchobj).length === 0
        ? {
            startCreatedDate: new Date().toISOString().slice(0, 10),
            endCreatedDate: new Date().toISOString().slice(0, 10),
          }
        : {
            startCreatedDate: new Date(searchobj.startdate)
              .toISOString()
              .slice(0, 10),
            endCreatedDate: new Date(searchobj.enddate)
              .toISOString()
              .slice(0, 10),
            phoneno: searchobj.phoneno,
            regno: searchobj.regno,
            provinceid: searchobj.provinceid,
            committeeid: searchobj.committeeid,
            districtid: searchobj.districtid,
            saler: searchobj.saler,
          },
  };
}

export default connect(mapStateToProps, { GetAllUserList })(form(Components));
