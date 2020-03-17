import React from "react";
import { connect } from "react-redux";
import {
  deleteTodo,
  toggleTodo,
  setVisibilityFilter
} from "../store/actions/actionCreator";
import {
  SHOW_ALL,
  SHOW_COMPLETED,
  SHOW_ACTIVE
} from "../store/actions/actionsTypes";
import { bindActionCreators } from "redux";

import { Tabs, Table, Row, Col, Button } from "antd";
import { CheckOutlined, MinusOutlined } from "@ant-design/icons";
const { TabPane } = Tabs;
const { Column, ColumnGroup } = Table;

import "../public/static/sass/TodoTable.scss";

class TodoTable extends React.Component {
  tabKeyToActionType = key => {
    switch (key) {
      case "1":
        this.props.setVisibilityFilter(SHOW_ALL);
        return;
      case "2":
        this.props.setVisibilityFilter(SHOW_COMPLETED);
        return;
      case "3":
        this.props.setVisibilityFilter(SHOW_ACTIVE);
        return;
      default:
        throw new Error("Unknown filter key: " + key);
    }
  };
  render() {
    return (
      <div className="todo-table">
        <Row gutter={[16, 16]} justify="center" align="middle">
          <Tabs onChange={this.tabKeyToActionType} type="card">
            <TabPane tab="All" key="1" />
            <TabPane tab="Completed" key="2" />
            <TabPane tab="Active" key="3" />
          </Tabs>
        </Row>
        <Row gutter={[16, 16]} justify="center" align="middle">
          <Col span={12}>
            <Table dataSource={this.props.todos}>
              <Column
                title="Todos"
                dataIndex="text"
                key="text"
                className=""
                render={(text, row) => (
                  <span
                    style={{
                      textDecoration: row.completed ? "line-through" : "none",
                      color: row.completed ? "gray" : "black"
                    }}
                  >
                    {text}
                    {row.completed ? "(completed)" : ""}
                  </span>
                )}
              />

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

const getVisibleTodos = (todos, filter) => {
  switch (filter) {
    case SHOW_ALL:
      return todos;
    case SHOW_COMPLETED:
      return todos.filter(t => t.completed);
    case SHOW_ACTIVE:
      return todos.filter(t => !t.completed);
    default:
      throw new Error("Unknown filter: " + filter);
  }
};

const mapStateToProps = state => {
  return {
    todos: getVisibleTodos(state.todos, state.visibilityFilter),
    visibilityFilter: state.visibilityFilter
  };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      deleteTodo,
      toggleTodo,
      setVisibilityFilter
    },
    dispatch
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(TodoTable);
