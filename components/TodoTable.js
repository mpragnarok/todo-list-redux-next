import { Breadcrumb, Table, Row, Col, Button } from "antd";
import { CheckOutlined, MinusOutlined } from "@ant-design/icons";
const { Column, ColumnGroup } = Table;
import React from "react";
import "../static/sass/TodoTable.scss";
class TodoTable extends React.Component {
  render() {
    const data = [
      {
        key: "1",
        todos: "Make dinner"
      },
      {
        key: "2",
        todos: "Finish todo list side project"
      },
      {
        key: "2",
        todos: "Look up SASS doc"
      }
    ];

    return (
      <div className="todo-table">
        <Row gutter={[16, 16]} justify="center" align="middle">
          <Col span={12}>
            <Table dataSource={data}>
              <Column title="Todos" dataIndex="todos" key="todos" />
              <Column
                title="Actions"
                key="action"
                render={() => (
                  <span>
                    <Button
                      shape="circle"
                      icon={<CheckOutlined />}
                      className="action-button"
                    />
                    <Button shape="circle" icon={<MinusOutlined />} />
                  </span>
                )}
              />
            </Table>
          </Col>
        </Row>
      </div>
    );
  }
}

export default TodoTable;
