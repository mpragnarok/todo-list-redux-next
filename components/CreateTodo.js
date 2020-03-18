import React from "react";
import "../public/static/sass/CreateTodo.scss";
import { Row, Col, Input, Button } from "antd";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { addTodo } from "../store/actions/actionCreator";
import { PlusCircleOutlined } from "@ant-design/icons";

class CreateTodo extends React.Component {
  state = {
    todoText: ""
  };

  onChangeTodoText = event => {
    this.setState({
      todoText: event.target.value
    });
  };

  render() {
    const { todoText } = this.state;
    return (
      <div className="create-todo">
        <Row gutter={[16, 16]} justify="center" align="middle">
          <h1>Create Todos</h1>
        </Row>
        <Row gutter={[16, 16]} justify="center" align="middle">
          <Col span={8}>
            <Input
              placeholder="Create todo here"
              value={todoText}
              onChange={this.onChangeTodoText}
            ></Input>
          </Col>
          <Col span={4}>
            <Button
              danger
              type="primary"
              className="button-margin"
              onClick={() => {
                this.setState({ todoText: "" });
              }}
            >
              Cancel
            </Button>
            <Button
              type="primary"
              icon={<PlusCircleOutlined />}
              onClick={() => {
                if (this.state.todoText.length > 0) {
                  this.props.addTodo(this.state.todoText);
                  this.setState({ todoText: "" });
                }
              }}
            >
              Add Todo
            </Button>
          </Col>
        </Row>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      addTodo
    },
    dispatch
  );
};

export default connect(null, mapDispatchToProps)(CreateTodo);
