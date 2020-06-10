import React, { Component } from "react";
import * as Table from "reactabular-table";

class CompanyList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      query: "",
      columns: [
        {
          property: "no",
          header: {
            label: "№"
          }
        },
        {
          property: "name",
          header: {
            label: "Байгууллагын Нэр"
          }
        },
        {
          property: "regnum",
          header: {
            label: "Регистер"
          }
        },
        {
          property: "type",
          header: {
            label: "Төрөл"
          }
        },
        {
          property: "director",
          header: {
            label: "Захирал"
          }
        },
        {
          property: "phone",
          header: {
            label: "Утас"
          }
        },
        {
          property: "email",
          header: {
            label: "Имэйл"
          }
        }
      ],
      rows: [
        {
          no: 1,
          name: "Грийн сити ХХК",
          regnum: "2498742",
          type: "Бизнес",
          director: "Админ",
          phone: "90001901",
          email: "test@gmail.com"
        },
        {
          no: 1,
          name: "Скай трейдинг ХХК",
          regnum: "2473243",
          type: "Бизнес",
          director: "Админ",
          phone: "90001901",
          email: "test@gmail.com"
        }
      ]
    };
  }

  render() {
    const { columns, rows, query } = this.state;
    console.log(rows);
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
                    Байгууллагын нэр
                  </button>
                  <button type="button" className="btn btn-primary">
                    Төрөл
                  </button>
                </div>

                <Table.Provider className="table" columns={columns}>
                  <Table.Header />
                  <Table.Body rows={rows} rowKey="id" />
                </Table.Provider>

                <div className="d-flex justify-content-end form-group">
                  <button type="button" className="btn btn-primary">
                    Шинэ байгууллага бүртгэх
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
export default CompanyList;
