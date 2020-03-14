import { Breadcrumb, Table, Row, Col } from "antd";
import React from "react";
class TodoTable extends React.Component {
  render() {
    const dataSource = [
      {
        key: "1",
        name: "Mike",
        age: 32,
        address: "10 Downing Street"
      },
      {
        key: "2",
        name: "John",
        age: 42,
        address: "10 Downing Street"
      }
    ];

    const columns = [
      {
        title: "Name",
        dataIndex: "name",
        key: "name"
      },
      {
        title: "Age",
        dataIndex: "age",
        key: "age"
      },
      {
        title: "Address",
        dataIndex: "address",
        key: "address"
      }
    ];
    return (
      <div className="todo-table">
        <Row gutter={[16, 16]} justify="center" align="middle">
          <Col span={12}>
            <Table dataSource={dataSource} columns={columns} />
          </Col>
        </Row>

        <style jsx>
          {`
            .todo-table {
              margin-top: 50px;
            }
          `}
        </style>
      </div>
    );
  }
}

export default TodoTable;
