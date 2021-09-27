import React, { Component } from "react";
import moment from 'moment';
import { Field, reduxForm } from "redux-form";

class Calendar extends Component {

  constructor(props) {
    super(props);
    this.state = {
      selected: [],
      currentMonth: moment(),
      sdate: moment().format("yyyy-MM-DD").toString(),
      edate: moment().format("yyyy-MM-DD"),
      type: 0,
      style: "",
      activeDate: "",
      isOpenCalendar: false,
    }
  }

  getDays = (start, end, isRender) => {
    if (start, end) {
      if (!isRender) {
        this.setState({ sdate: start.format("yyyy-MM-DD"), edate: end.format("yyyy-MM-DD") })
      }


      var days = [];
      var dayz = [];
      var day = start;

      while (day <= end) {
        days.push(day.toDate());
        dayz.push(moment(day).format("yyyyMMDD"));
        day = day.clone().add(1, 'd');
      }
      return dayz;
    }
  }

  handleClickThisWeek = () => {
    var startOfWeek = moment().startOf('week').add(1, 'd');
    var endOfWeek = moment().endOf('week').add(1, 'd');
    this.setState({ selected: this.getDays(startOfWeek, endOfWeek) })
    console.log()
  }

  handleClickLastWeek = () => {
    var startOfWeek = moment().startOf('week').subtract(6, 'days');
    var endOfWeek = moment().endOf('week').subtract(6, 'days');
    this.setState({ selected: this.getDays(startOfWeek, endOfWeek) })
  }

  handleClickThisMonth = () => {
    var startOfWeek = moment().startOf('month');
    var endOfWeek = moment().endOf('month');

    this.setState({ selected: this.getDays(startOfWeek, endOfWeek), sdate: startOfWeek.format("yyyy-MM-DD") })
  }

  handleClickThisYear = () => {
    var startOfYear = moment().startOf('year');
    var endOfYear = moment().endOf('year');
    this.setState({ selected: this.getDays(startOfYear, endOfYear) })
  }

  handleMonth = (subs) => {
    this.setState({ currentMonth: moment(this.state.currentMonth).subtract(subs, 'month') })
  }

  handlePreviousMonth = () => {
    this.setState({ currentMonth: moment(this.state.currentMonth).subtract(1, 'month') })
  }

  handleNextMonth = () => {
    this.setState({ currentMonth: moment(this.state.currentMonth).subtract(-1, 'months') })
  }

  checkDays = (day) => {
    const { selected } = this.state;
    if (day && selected) return selected.find(a => a === day)
    console.log(day);
  }

  handleDate = (e) => {
    this.setState({ [e.target.name]: e.target.value })
  }

  handleSetDate = (date) => {
    const { activeDate } = this.state;
    if (date) {
      this.setState({ [activeDate]: date.format("yyyy-MM-DD") })
      /* this.setState({ sdate: start.format("yyyy-MM-DD"), edate: end.format("yyyy-MM-DD") }) */
    }
  }

  onClick = (type) => {
    this.setState({ type: type });
  };

  onClickDate = (e) => {
    const { isOpenCalendar, activeDate } = this.state;
    if (!isOpenCalendar)
      this.setState({ isOpenCalendar: true })

    if (activeDate !== e.target.name)
      this.setState({ activeDate: e.target.name })
  }

  closeModal = () => {
    const { isOpenCalendar } = this.state;
    if (isOpenCalendar)
      this.setState({ isOpenCalendar: false })
  };

  render() {
    const { sdate, edate, isLoading, isOpenCalendar } = this.state;
    var startOfWeek = moment(this.state.currentMonth).startOf('month');
    var endOfWeek = moment(this.state.currentMonth).endOf('month');
    let days = this.getDays(startOfWeek, endOfWeek, true);
    return (
      <div>
        <div className="display-flex">
          <input
            ref="sdate"
            name="sdate"
            type="input"
            className="form-control dateclss"
            style={{ borderRadius: 8 }}
            value={sdate}
            onClick={this.onClickDate}
          />
          <input
            ref="edate"
            name="edate"
            type="input"
            className="form-control dateclss mr-l-05-rem"
            style={{ borderRadius: 8 }}
            value={edate}
            onClick={this.onClickDate}
          />
        </div>
        <div className={`dropdown-content ${isOpenCalendar ? "dropdown-content-block" : ""}`}>
          <div className="col-lg-12 col-md-12 col-sm-12 tmpresponsive" style={{ display: "flex" }}>
            <div className="col-lg-7 col-md-7 col-sm-7 tmpresponsive">
              <div className="card" style={{ borderRadius: 8, borderColor: "#e3e3e3" }}>
                <div>{moment(this.state.currentMonth).format("YYYY-оны M-р сар")}</div>
                <div></div>
                <div style={{ display: "flex", flexWrap: "wrap", width: "100%" }}>
                  {days.map((i, key) => (
                    <div className={`calendar-day calendar-day-${this.checkDays(moment(i).format("yyyyMMDD")) ? "active" : "none"}`}
                      onClick={() => {
                        this.setState({ selected: [moment(i).format("yyyyMMDD")] })
                        this.handleSetDate(moment(i))
                      }}>{moment(i).format('D')}</div>
                  ))}
                </div>
              </div>
              <div >
                <button
                  className="testButton"
                  style={{ borderRadius: 8 }}
                  onClick={() => this.handleMonth(1)}
                >
                  <i className={`fa fa-cog ${isLoading ? "fa-spin" : ""}`} />
                  {'<'}Өмнөх сар
                </button>
                <button
                  type="submit"
                  className="testButton"
                  style={{ borderRadius: 8, float: "right", marginTop: 1 }}
                  onClick={() => this.handleMonth(-1)}
                >
                  <i className={`fa fa-cog ${isLoading ? "fa-spin" : ""}`} />
                  Дараа сар{'>'}
                </button>
              </div>
            </div>
            <div className="col-lg-5 col-md-5 col-sm-5 tmpresponsive" style={{ marginTop: 25 }}>
              <div>
                <button
                  type="submit"
                  className="testButton"
                  style={{ borderRadius: 8 }}
                  onClick={() => { this.setState({ selected: [moment().format("yyyyMMDD")] }), this.handleSetDate(moment()) }}
                >
                  <i className={`fa fa-cog ${isLoading ? "fa-spin" : ""}`} />
                  Өнөөдөр
                </button></div>
              <div >
                <button
                  type="button"
                  className="testButton"
                  style={{ borderRadius: 8, marginTop: 5 }}
                  onClick={() => {
                    this.setState({ selected: [moment().subtract(1, 'day').format("yyyyMMDD")] }),
                      this.handleSetDate(moment().subtract(1, 'day'))
                  }}
                >
                  <i className={`fa fa-cog ${isLoading ? "fa-spin" : ""}`} />
                  Өчигдөр
                </button></div>
              <div >
                <button
                  type="submit"
                  className="testButton"
                  style={{ borderRadius: 8, marginTop: 5 }}
                  onClick={() => this.handleClickThisWeek()}
                >
                  <i className={`fa fa-cog ${isLoading ? "fa-spin" : ""}`} />
                  Энэ долоо хоног
                </button></div>
              <div >
                <button
                  type="submit"
                  className="testButton"
                  style={{ borderRadius: 8, marginTop: 5 }}
                  onClick={() => this.handleClickLastWeek()}
                >
                  <i className={`fa fa-cog ${isLoading ? "fa-spin" : ""}`} />
                  Өнгөрсөн 7 хоног
                </button></div>
              <div >
                <button
                  type="submit"
                  className="testButton"
                  style={{ borderRadius: 8, marginTop: 5 }}
                  onClick={() => this.handleClickThisMonth()}
                >
                  <i className={`fa fa-cog ${isLoading ? "fa-spin" : ""}`} />
                  Энэ сар
                </button></div>
              <div >
                <button
                  type="submit"
                  className="testButton"
                  style={{ borderRadius: 8, marginTop: 5 }}
                  onClick={() => this.handleClickThisYear()}
                >
                  <i className={`fa fa-cog ${isLoading ? "fa-spin" : ""}`} />
                  Энэ жил
                </button></div>
            </div>
            <div>
            <button
              className="tn btn-sm btn-primary button-ban card-right"
              onClick={this.closeModal}
            >
              X
            </button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Calendar