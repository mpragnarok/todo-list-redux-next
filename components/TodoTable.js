import { Breadcrumb, Table, Row, Col, Button } from "antd";
import { CheckOutlined, MinusOutlined } from "@ant-design/icons";
const { Column, ColumnGroup } = Table;
import { connect } from "react-redux";
import React from "react";

import "../public/static/sass/TodoTable.scss";
class TodoTable extends React.Component {
  state = {
    todos: this.props.todos
  };
  render() {
    return (
      <div className="todo-table">
        <Row gutter={[16, 16]} justify="center" align="middle">
          <Col span={12}>
            <Table dataSource={this.state.todos}>
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

function mapStateToProps(state) {
  return {
    todos: state.todos
  };
}

export default connect(mapStateToProps)(TodoTable);
