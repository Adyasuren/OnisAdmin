import React, { Component } from "react";
import { Field, reduxForm, reset } from "redux-form";
import { connect } from "react-redux";
import Modal from "react-modal";
import niceAlert from "sweetalert";
import ShopUserList from "../../../api/OnisShop/UserListApi";
import { userList } from "../../../actions/onisUser_action";
import swal from "sweetalert";
import toastr from "toastr";
import "toastr/build/toastr.min.css";
import { Map, TileLayer, Marker } from "react-leaflet";
toastr.options = {
  positionClass: "toast-top-center",
  hideDuration: 1000,
  timeOut: 4000,
  closeButton: true,
};

class ShopUserModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      regno: "",
      selectedStorenm: "",
      latlng: null,
    };
  }

  renderStoreList = () => {
    const { storeList } = this.props;
    let tmp = storeList.map((item, i) => {
      return (
        <option key={i} value={item.regno}>
          {`${item.regno} ${item.storenm}`}
        </option>
      );
    });
    return tmp;
  };

  formSubmit = (e) => {
    e.preventDefault();
    const { latlng } = this.state;
    const { selectedRow } = this.props;
    let body = {
      storeid: selectedRow.id,
      saler: e.target.saler.value,
      insbyname: localStorage.getItem("logname"),
      lat: selectedRow.latitude,
      lng: selectedRow.longitude,
    };
    ShopUserList.UpdateSaler(body).then((res) => {
      if (res.success) {
        toastr.success(res.message);
        this.closeModal(true);
      } else {
        toastr.error(res.message);
      }
    });
  };

  closeModal = (success) => {
    this.props.reset();
    this.setState({ regno: "" });
    this.props.closeModal(success);
  };

  storeChange = (e) => {
    const { storeList } = this.props;
    if (storeList) {
      this.setState({
        selectedStorenm: storeList.find((i) => i.regno == e.target.value)
          .storenm,
      });
    }
  };

  deleteUser = () => {
    const { selectedRow } = this.props;
    swal(`Устгахдаа итгэлтэй байна уу ?`, {
      buttons: ["Үгүй", "Тийм"],
    }).then((value) => {
      if (value) {
        ShopUserList.DeleteUser(selectedRow.id).then((res) => {
          if (res.success) {
            toastr.success(res.message);
            this.closeModal(true);
          } else {
            toastr.error(res.message);
          }
        });
      }
    });
  };

  checkConnection = () => {
    /* const {selectedRow} = this.props;
    ShopUserList.CheckConnection(selectedRow.id).then((res) => {

    }); */
  };

  handleClick = (e) => {
    let { isNew, selectedRow } = this.props;
    selectedRow.latitude = e.latlng.lat;
    selectedRow.longitude = e.latlng.lng;
    this.setState({ latlng: e.latlng });
  };

  render() {
    const { isNew, selectedRow } = this.props;
    const { selectedStorenm, latlng } = this.state;
    const position = [47.92006479046048, 106.92200596960494];
    var currentdate = new Date();
    if (selectedRow) {
      return (
        <Modal
          isOpen={this.props.isOpen}
          closeModal={() => this.closeModal()}
          className="animatedpopup animated fadeIn col-md-6 mx-auto"
        >
          <form id="popupform" name="popupform" onSubmit={this.formSubmit}>
            <div className="animated fadeIn ">
              <div className="card">
                <div className="card-header test">
                  <strong>&lt;&lt; Хэрэглэгч </strong>
                  <button
                    className="tn btn-sm btn-primary button-ban card-right"
                    onClick={() => this.closeModal()}
                  >
                    X
                  </button>
                </div>
                <div className="card-block col-md-12 col-lg-12 col-sm-12 tmpresponsive">
                  <div className="row">
                    <label htmlFor="company" className="col-md-4">
                      Борлуулагчийн нэр<span className="red">*</span>
                    </label>
                    <div className="col-md-8">
                      <input
                        type="text"
                        ref="saler"
                        name="saler"
                        className="form-control"
                        style={{ width: "100%" }}
                        required
                      />
                    </div>
                  </div>
                  <div className="row">
                    <label htmlFor="company" className="col-md-4">
                      Зассан огноо<span className="red">*</span>
                    </label>
                    <div className="col-md-8">
                      <input
                        name="updymd"
                        className="form-control"
                        style={{ width: "100%" }}
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
                    </div>
                  </div>
                  <div className="row">
                    <div style={{ width: "100%", height: "300px" }}>
                      <Map
                        center={position}
                        zoom={13}
                        onClick={this.handleClick}
                        className="user-list-map"
                      >
                        <TileLayer
                          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />
                        <Marker
                          position={[
                            selectedRow.latitude,
                            selectedRow.longitude,
                          ]}
                        ></Marker>
                      </Map>
                    </div>
                  </div>
                </div>
                <div className="card-footer test">
                  <div className="card-right">
                    {/* <button
                      type="button"
                      className="btn btn-sm btn-primary button-ban"
                      style={{ marginRight: 5 }}
                        onClick={this.checkConnection}
                    >
                      Холболт тохируулах
                    </button> */}
                    <button
                      type="button"
                      className="btn btn-sm btn-primary button-ban"
                      style={{ marginRight: 5 }}
                      onClick={this.deleteUser}
                    >
                      Түр устгах
                    </button>
                    <button
                      type="button"
                      className="btn btn-sm btn-primary button-ban"
                      onClick={() => this.closeModal()}
                    >
                      <i className="fa fa-ban" />
                      Болих
                    </button>
                    <button
                      type="submit"
                      className="btn btn-sm btn-primary button-save"
                    >
                      <i className="fa fa-save" />
                      Хадгалах
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </Modal>
      );
    }
    return null;
  }
}
const form = reduxForm({
  form: "ShopUserModal",
});

function mapStateToProps(state) {
  return {
    storeList: state.OnisShop.rows,
  };
}
export default connect(mapStateToProps, {
  userList,
})(form(ShopUserModal));
