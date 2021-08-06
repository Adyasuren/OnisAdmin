import React, { Component } from "react";
import { reduxForm } from "redux-form";
import { connect } from "react-redux";
import Modal from "react-modal";
import TableFok from "../../components/TableFok";
import licenseApi from "../../api/licenseApi";
import toastr from "toastr";
import "toastr/build/toastr.min.css";
import CurrencyInput from "react-currency-input";
import swal from "sweetalert";
import {getFirstUsers} from "../../actions/license_action"

toastr.options = {
    positionClass: "toast-top-center",
    hideDuration: 1000,
    timeOut: 4000,
    closeButton: true,
};

class LicenseTransfer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedUser: {},
            smsqty: 0,
        };
    }

    componentWillMount() {
        this.props.getFirstUsers();
     }

    formSubmit = (e) => {
        e.preventDefault();
        const { selectedUser, smsqty, payprice } = this.state;
        if (payprice.replaceAll(",", "")) {
            if (Number(payprice.replaceAll(",", "")) >= 200) {
                if (selectedUser) {
                    swal(`Хадгалахдаа итгэлтэй байна уу ?`, {
                        buttons: ["Үгүй", "Тийм"],
                    }).then((value) => {
                        if (value) {
                            let body = {
                                useriD1: Number(selectedUser.userid),
                                useriD2: Number(selectedUser.userid),
                                insby: Number(localStorage.getItem("id")),
                            };
                            licenseApi.LicenseSwap(body).then((res) => {
                                if (res.success) {
                                    toastr.success("Амжилттай");
                                    this.closeModal(res.success);
                                } else {
                                    toastr.error(res.message);
                                }
                            });
                        }
                    });
                } else {
                    toastr.error("Хэрэглэгч сонгоно уу.");
                }
            } else {
                toastr.error("200 - с дээш дүнгээр сунгах боломжтой");
            }
        } else {
            toastr.error("Дүн оруулна уу");
        }
    };

    renderStoreList = () => {
        const { firstUserList } = this.props;
        let tmp = firstUserList.map((item, i) => {
            return (
                <option key={i} value={item.username}>
                    {`${item.storename} ${item.regnum}`}
                </option>
            );
        });
        return tmp;
    };
    renderSecondStoreList = () => {
        const { secondUserList } = this.props;
        let tmp = secondUserList.map((item, i) => {
            return (
                <option key={i} value={item.username}>
                    {`${item.storename} ${item.regnum}`}
                </option>
            );
        });
        return tmp;
    };

    closeModal = (isReload) => {
        this.props.reset();
        this.props.closeModal(isReload);
    };

    storeChange = (e) => {
        const { firstUserList } = this.props;
        if (e.target.value) {
            let value = firstUserList.find((a) => a.username == e.target.value);
            if (value) {
                this.setState({ selectedUser: value });
                licenseApi.getUsersInfo(value.username).then((res) => {
                    if (res.success) {

                    }
                });
            } else {
                this.setState({ selectedUser: {} });
            }
        } else {
            this.setState({ selectedUser: {} });
        }
    };

    storeSecondChange = (e) => {
        const { secondUserList } = this.props;
        if (e.target.value) {
            let value = secondUserList.find((a) => a.username == e.target.value);
            if (value) {
                this.setState({ selectedUser: value });
                licenseApi.getUsersInfo(value.username).then((res) => {
                    if (res.success) {

                    }
                });
            } else {
                this.setState({ selectedUser: {} });
            }
        } else {
            this.setState({ selectedUser: {} });
        }
    };

    render() {
        const { selectedUser, smsqty} = this.state;
        const {firstUserList} = this.props;
        const {secondUserList} = this.props;
        var currentdate = new Date();
        return (
            <Modal
                isOpen={this.props.isOpen}
                closeModal={() => this.closeModal()}
                className="animated fadeIn col-md-8 col-lg-8 col-sm-8 mx-auto"
            >
                <form
                    id="popupform"
                    name="popupform"
                    onSubmit={this.formSubmit}
                >
                    <div className="animated fadeIn ">
                        <div className="card">
                            <div className="card-header test">
                                <strong>&lt;&lt; Лицензийн хоног шилжүүлэх </strong>
                                <button
                                    className="tn btn-sm btn-primary button-ban card-right"
                                    onClick={() => this.closeModal()}
                                >
                                    X
                                </button>
                            </div>
                            <div
                                className="card-block col-md-12 col-lg-12 col-sm-12 tmpresponsive"
                                style={{ display: "flex" }}
                            >
                                <div className="col-md-5 col-lg-5 col-sm-5 tmpresponsive">
                                    <div className="row">
                                        <label htmlFor="company" className="col-md-4">
                                            Нэвтрэх дугаар<span className="red">*</span>
                                        </label>
                                        <div className="col-md-8">
                                            <input
                                                type="text"
                                                list="custom-datalist"
                                                name="storeid"
                                                ref="storeid"
                                                className="form-control"
                                                style={{ width: "100%" }}
                                                autoComplete="off"
                                                onChange={this.storeChange}
                                            />
                                            <datalist id="custom-datalist">
                                                {this.renderStoreList()}
                                            </datalist>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <label htmlFor="company" className="col-md-4">
                                            Дэлгүүрийн нэр<span className="red">*</span>
                                        </label>
                                        <div className="col-md-8">
                                            <input
                                                name="storenm"
                                                style={{ width: "100%" }}
                                                className="form-control"
                                                type="text"
                                                value={selectedUser.storename}
                                                required
                                                disabled
                                            />
                                        </div>
                                    </div>
                                    <div className="row">
                                        <label htmlFor="company" className="col-md-4">
                                            Регистрийн дугаар<span className="red">*</span>
                                        </label>
                                        <div className="col-md-8">
                                            <input
                                                name="storenm"
                                                style={{ width: "100%" }}
                                                className="form-control"
                                                type="text"
                                                value={selectedUser.regnum}
                                                required
                                                disabled
                                            />
                                        </div>
                                    </div>
                                    <div className="row">
                                        <label htmlFor="company" className="col-md-4">
                                            Үлдэгдэл хоног<span className="red">*</span>
                                        </label>
                                        <div className="col-md-8">
                                            <input
                                                name="storenm"
                                                style={{ width: "100%" }}
                                                className="form-control"
                                                type="text"
                                                value={selectedUser.id}
                                                required
                                                disabled
                                            />
                                        </div>
                                    </div>
                                    <div className="row">
                                        <label htmlFor="company" className="col-md-4">
                                            Мессежний эрх<span className="red">*</span>
                                        </label>
                                        <div className="col-md-8">
                                            <input
                                                name="storenm"
                                                style={{ width: "100%" }}
                                                className="form-control"
                                                type="text"
                                                required
                                                disabled
                                                value={smsqty}
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-2 col-lg-2 col-sm-2 tmpresponsive">
                                </div>
                                <div className="col-md-5 col-lg-5 col-sm-5 tmpresponsive">
                                    <div className="row">
                                        <label htmlFor="company" className="col-md-4">
                                            Шилжүүлэх нэвтрэх дугаар<span className="red">*</span>
                                        </label>
                                        <div className="col-md-8">
                                            <input
                                                type="text"
                                                list="custom-datalist"
                                                name="username"
                                                className="form-control"
                                                style={{ width: "100%" }}
                                                autoComplete="off"
                                                onChange={this.storeChange}
                                            />
                                            <datalist id="custom-datalist">
                                                {this.renderStoreList()}
                                            </datalist>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <label htmlFor="company" className="col-md-4">
                                            Дэлгүүрийн нэр<span className="red">*</span>
                                        </label>
                                        <div className="col-md-8">
                                            <input
                                                name="storenm"
                                                style={{ width: "100%" }}
                                                className="form-control"
                                                type="text"
                                                value={selectedUser.storename}
                                                required
                                                disabled
                                            />
                                        </div>
                                    </div>
                                    <div className="row">
                                        <label htmlFor="company" className="col-md-4">
                                            Регистрийн дугаар<span className="red">*</span>
                                        </label>
                                        <div className="col-md-8">
                                            <input
                                                name="storenm"
                                                style={{ width: "100%" }}
                                                className="form-control"
                                                type="text"
                                                value={selectedUser.regnum}
                                                required
                                                disabled
                                            />
                                        </div>
                                    </div>
                                    <div className="row">
                                        <label htmlFor="company" className="col-md-4">
                                            Үлдэгдэл хоног<span className="red">*</span>
                                        </label>
                                        <div className="col-md-8">
                                            <input
                                                name="storenm"
                                                style={{ width: "100%" }}
                                                className="form-control"
                                                type="text"
                                                value={selectedUser.storename}
                                                required
                                                disabled
                                            />
                                        </div>
                                    </div>
                                    <div className="row">
                                        <label htmlFor="company" className="col-md-4">
                                            Мессежний эрх<span className="red">*</span>
                                        </label>
                                        <div className="col-md-8">
                                            <input
                                                name="storenm"
                                                style={{ width: "100%" }}
                                                className="form-control"
                                                type="text"
                                                required
                                                disabled
                                                value={smsqty}
                                            />
                                        </div>
                                    </div>
                                    <div className="row">
                                        <label htmlFor="company" className="col-md-4">
                                            Бүртгэсэн огноо<span className="red">*</span>
                                        </label>
                                        <div className="col-md-8">
                                            <input
                                                name="insertdate"
                                                style={{ width: "100%" }}
                                                className="form-control"
                                                type="text"
                                                disabled
                                                value={
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
                                        <label htmlFor="company" className="col-md-4">
                                            Бүртгэсэн хэрэглэгч<span className="red">*</span>
                                        </label>
                                        <div className="col-md-8">
                                            <input
                                                name="logname"
                                                style={{ width: "100%" }}
                                                className="form-control"
                                                type="text"
                                                value={localStorage.getItem("logname")}
                                                disabled
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="card-footer test">
                                <div className="card-right">
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
                                        /* onClick={this.formSubmit} */
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
}
const form = reduxForm({
    form: "LicenseTransfer",
});

function mapStateToProps(state) {
    return {
        onisUserList: state.saleList.onisuserlist,
        firstUserList: state.license.firstUserList,
        secondUserList: state.license.secondUserList,
    };
}
export default connect(mapStateToProps, {getFirstUsers})(form(LicenseTransfer));
