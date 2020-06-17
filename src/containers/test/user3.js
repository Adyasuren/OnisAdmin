import React, { Component } from "react";
import { Link } from "react-router";
import { Field, reduxForm } from "redux-form";
import { connect } from "react-redux";
import { getCustomer } from "../../actions/customer_action";
import { getPaymentListtmp } from "../../actions/transac_action";
import {
  BootstrapTable,
  TableHeaderColumn,
  SizePerPageDropDown
} from "react-bootstrap-table";
import "react-bootstrap-table/dist/react-bootstrap-table.min.css";

var SearchObj1 = new Object();

class user3 extends Component {
  constructor(props) {
    super(props);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.Refresh = this.Refresh.bind(this);
    this.renderShowsTotal = this.renderShowsTotal.bind(this);
    this.newclick = this.newclick.bind(this);
    this.state = {
      value: true,
      clicked: false,
      Loading: false,
      rows: [],
      selectedRows: []
    };
    document.title = "Бүх хэрэглэгч - Оньс админ";
  }

  componentWillMount() {
    SearchObj1.beginDate = "2000-01-01";
    SearchObj1.endDate = "2999-12-31";
    this.setState({ Loading: true });
    this.props.getCustomer(SearchObj1);
    this.setState({ Loading: false });
  }

  handleFormSubmit(formProps) {
    formProps.beginDate = "2000-01-01";
    formProps.endDate = "2999-12-31";
    this.setState({ Loading: true });
    SearchObj1 = formProps;
    this.props.getCustomer(formProps);
    this.setState({ Loading: false });
  }

  handlerClickCleanFiltered() {
    this.refs.regnum.cleanFiltered();
    this.refs.username.cleanFiltered();
    this.refs.phonenum.cleanFiltered();
  }
  newclick = () => {
    this.props.getPaymentListtmp();
  };
  Refresh() {
    window.location.reload();
  }

  handleRowClick = row => {
    let tmp = this.state.selectedRows;
    console.log(tmp, "<---");
    tmp.push(row);
    this.setState({
      selectedRows: tmp
    });
  };

  numberofrows(cell, formatExtraData, row, rowIdx) {
    return rowIdx;
  }

  onToggleDropDown = toggleDropDown => {
    toggleDropDown();
  };

  toggleClass() {
    if (!this.state.clicked) {
      this.refs.test.style.height = this.refs.test.style.height + "100px";
      this.setState({ clicked: !this.clicked });
    } else {
      this.refs.test.style.height = this.refs.test.style.height - "100px";
      this.setState({ clicked: this.clicked });
    }
  }
  renderSizePerPageDropDown = props => {
    return (
      <SizePerPageDropDown
        className="my-size-per-page"
        btnContextual="btn-warning"
        variation="dropdown"
        {...props}
        onClick={() => this.onToggleDropDown(props.toggleDropDown)}
      />
    );
  };

  renderShowsTotal(start, to, tota) {
    return (
      <div className="row">
        <p
          style={{ color: "#607d8b", marginRight: "5px", cursor: "pointer" }}
          onClick={() => console.log(this.props)}
        >
          {" "}
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Бүгд ( {this.props.total} )
        </p>
        <p style={{ color: "#f8cb00", marginRight: "5px", cursor: "pointer" }}>
          | Сонгосон ( {this.props.checked} )
        </p>
      </div>
    );
  }

  render() {
    const { rows } = this.props;

    const selectRowProp = {
      mode: "radio",
      bgColor: "pink", // you should give a bgcolor, otherwise, you can't regonize which row has been selected
      hideSelectColumn: true, // enable hide selection column.
      clickToSelect: true // you should enable clickToSelect, otherwise, you can't select column.
    };
    const appFormat = {
      "1": "Oньс",
      "2": "ОньсПлас"
    };
    function checkBoxFormat(cell, row) {
      return (
        <div>
          <input type="checkbox" ref="criticalData" />
        </div>
      );
    }

    function enumFormatter(cell, row, enumObject) {
      return enumObject[cell];
    }
    const options = {
      page: 1, // which page you want to show as default
      sizePerPageDropDown: this.renderSizePerPageDropDown,
      sizePerPageList: [
        {
          text: "10",
          value: 10
        },
        {
          text: "20",
          value: 20
        },
        {
          text: "30",
          value: 30
        },
        {
          text: "40",
          value: 40
        },
        {
          text: "Бүгд",
          value: rows.length
        }
      ], // you can change the dropdown list for size per page
      onRowClick: this.handleRowClick,
      hideSizePerPage: true,
      paginationShowsTotal: this.renderShowsTotal, // Accept bool or function
      prePage: "Өмнөх", // Previous page button text
      nextPage: "Дараах", // Next page button text
      firstPage: "Эхнийх", // First page button text
      lastPage: "Сүүлийх",
      sizePerPage: 10, // which size per page you want to locate as default
      pageStartIndex: 1, // where to start counting the pages
      paginationPosition: "bottom",
      hidePageListOnlyOnePage: true,
      noDataText: "Өгөгдөл олдсонгүй"
    };
    return (
      <div className="animatedpopup animated fadeIn">
        {/* <Loading show={this.state.Loading}/> */}
        </div>
    );
  }
}
const form = reduxForm({
  form: "TransacAddpopup"
});

function mapStateToProps(state) {
  var total = 0;
  var checked = 0;
  for (var i = 0; i < state.customer.rows.length; i++) {
    total++;
  }

  return {
    rows: state.customer.rows,
    columns: state.customer.columns,
    total: total
  };
}
export default connect(
  mapStateToProps,
  { getCustomer, getPaymentListtmp }
)(form(test));
