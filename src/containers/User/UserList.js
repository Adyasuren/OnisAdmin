import React, { Component } from "react";
import * as Table from "reactabular-table";
import { connect } from "react-redux";
import { getUsers } from "../../actions/user_action";

class UserList extends Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    this.props.getUsers();
  }

  render() {
    const { columns, rows } = this.props;
    return (
      <div className="animated fadeIn">
        <div className="row">
          <div className="col-lg-12">
            <div className="card">
              <div className="card-header">
                <i className="fa fa-align-justify" /> Хэрэглэгч Бүртгэх
              </div>
              <div className="card-block">
                <div className="form-group">
                  <button type="button" className="btn btn-primary">
                    Регистер
                  </button>
                  <button type="button" className="btn btn-primary">
                    Байгуллагын нэр
                  </button>
                </div>

                <Table.Provider className="table" columns={columns}>
                  <Table.Header />
                  <Table.Body rows={rows} rowKey="id" />
                </Table.Provider>

                <div className="d-flex justify-content-end form-group">
                  <button type="button" className="btn btn-primary">
                    Шинэ
                  </button>
                  <button type="button" className="btn btn-primary">
                    Өөрчлөх
                  </button>
                  <button type="button" className="btn btn-primary">
                    Хадгалах
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    rows: state.user.rows,
    columns: state.user.columns
  };
}

export default connect(
  mapStateToProps,
  { getUsers }
)(UserList);
