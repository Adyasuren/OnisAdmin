import React, { Component } from "react";
import { connect } from "react-redux";
import { reduxForm } from "redux-form";
import TableFok from "../../../../components/TableFok";
import moment from 'moment';
import { GetAllFeedBack } from "../../../../actions/OnisShop/FeedbackAction";
import { Field } from "redux-form";


class Components extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: 1,
      title: []
    };
  }

  componentWillMount() {
    // this.onChangeType();
  }

  handleReload = (e) => {
    e.preventDefault();

  };

  onChangeType = (e) => {
    let header = [
      {
        data: "rank",
        label: "№",
        format: "custom",
        props: {
          width: "60px",
        }
      },
      {
        data: "",
        label: "ТТД",
        format: "custom",
        props: {
          width: "60px",
        },
      }
    ]
    let count = e.target.value == 1 ? 12 : moment("2020-09").daysInMonth()
    let details = []
    for (let i = 1; i <= count; i++) {
      details.push({
        data: i,
        label: `${i} ${e.target.value == 1 ? "сар" : "өдөр"}`,
        format: "custom",
        props: {
          width: "60px",
        }
      })
    }
    this.setState({ selected: e.target.value, title: [...header, ...details] })
  }

  dateType = () => {
    const { selected } = this.state;
    console.log(selected)
    if (selected == 1) {
      return (
        <Field
          name="DatePicker"
          component="select"
          size="20px"
          value={selected}
          ref="DatePicker"
          // onChange={this.onChangeType}
          className="form-control dateclss"
        >
          {this.yearLister()}
        </Field>
      );
    } else {
      return (
        <Field
          name="DatePicker"
          component="input"
          onChange={this.onChangeType}
          type="month"
          ref="DatePicker"
          className="form-control dateclss"
        />
      );
    }
  };

  yearLister() {
    var tmp = new Date().getFullYear() - 2015;
    var tmpList = [];
    for (var i = 0; i < tmp; i++) {
      tmpList.push(
        <option key={i} value={new Date().getFullYear() - i}>
          {new Date().getFullYear() - i}
        </option>
      );
    }
    return tmpList;
  }

  render() {
    const { selected, title } = this.state;
    return (
      <div className="animated fadeIn">
        <div className="row">
          <div className="col-lg-12 col-md-12 col-sm-12">
            <div className="card" style={{ borderRadius: 8 }}>
              <div className="card-header" style={{ borderRadius: 8 }}>
                <form id="myForm" onSubmit={this.handleReload}>
                  <div className="row" name="formProps">
                    <div className="form-group col-sm-4 mr-1-rem">
                      <div className="dropdown">
                        <label>Огноо сонгох</label>
                        <div className="row">
                          <Field
                            name="searchtype"
                            value={selected}
                            onChange={this.onChangeType}
                            component="select"
                            ref="searchType"
                            className="form-control"
                            style={{ borderRadius: 8 }}
                          >
                            <option value={1}>Жил</option>
                            <option value={2}>Сар</option>
                          </Field>
                          <label style={{ marginLeft: 20 }} />
                          {this.dateType()}
                        </div>
                      </div>
                    </div>
                  </div>
                  <button
                    type="submit"
                    className="btn btn-primary"
                    style={{ float: 'right', borderRadius: 8 }}
                  >
                    <i className={`fa fa-cog`} />
                    Ачаалаx
                  </button>
                </form>
              </div>
              <div className="card-block col-md-12 col-lg-12 col-sm-12 tmpresponsive">
                <TableFok title={title} data={[]} />
              </div>
            </div>
          </div>
        </div >
        <div>
        </div>
      </div >
    );
  }
}

const form = reduxForm({ form: "shopUserReport" });

function mapStateToProps(state) {
  return {
  };
}

export default connect(mapStateToProps, { GetAllFeedBack })(form(Components));
